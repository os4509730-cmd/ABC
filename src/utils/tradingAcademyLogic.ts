/**
 * TITAN TRADER — Pure logic functions
 * Decoupled from React DOM for fast unit testing & high reliability.
 */

import { CandleClassification, PositionCalculation } from '../types/academy';

export interface LevelInfo {
  level: number;
  title: string;
  rankBadge: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
}

export const RANKS = [
  { level: 1, title: 'Wall Cadet', badge: '🛡️', minXp: 0, maxXp: 60 },
  { level: 2, title: 'Scout Vanguard', badge: '⚔️', minXp: 60, maxXp: 150 },
  { level: 3, title: 'Survey Corps Elite', badge: '🦅', minXp: 150, maxXp: 280 },
  { level: 4, title: 'Section Commander', badge: '🎖️', minXp: 280, maxXp: 450 },
  { level: 5, title: 'Titan Slayer', badge: '🔥', minXp: 450, maxXp: 700 },
  { level: 6, title: 'Supreme Market Commander', badge: '👑', minXp: 700, maxXp: 999999 },
];

/**
 * Calculates level, title, and XP progress bar percentage
 */
export function calculateLevel(xp: number): LevelInfo {
  const safeXp = Math.max(0, Math.floor(xp));

  for (let i = RANKS.length - 1; i >= 0; i--) {
    const rank = RANKS[i];
    if (safeXp >= rank.minXp) {
      const isMaxLevel = i === RANKS.length - 1;
      const currentLevelBase = rank.minXp;
      const nextLevelThreshold = isMaxLevel ? rank.minXp + 300 : rank.maxXp;
      const range = nextLevelThreshold - currentLevelBase;
      const progressInsideLevel = safeXp - currentLevelBase;
      const progressPercent = isMaxLevel
        ? 100
        : Math.min(100, Math.max(0, Math.round((progressInsideLevel / range) * 100)));

      return {
        level: rank.level,
        title: rank.title,
        rankBadge: rank.badge,
        currentLevelXp: safeXp,
        nextLevelXp: nextLevelThreshold,
        progressPercent,
      };
    }
  }

  return {
    level: 1,
    title: RANKS[0].title,
    rankBadge: RANKS[0].badge,
    currentLevelXp: safeXp,
    nextLevelXp: RANKS[0].maxXp,
    progressPercent: 0,
  };
}

/**
 * Classifies a candle based on Open, High, Low, Close
 */
export function classifyCandle(
  open: number,
  high: number,
  low: number,
  close: number
): CandleClassification {
  const range = Math.max(0.0001, high - low);
  const bodySize = Math.abs(close - open);
  const isBullish = close > open;
  const isBearish = close < open;
  // A true Doji has an extremely slender body (<= 6% of candle range)
  const isDoji = (bodySize / range) <= 0.06;

  const upperShadow = isBullish ? high - close : high - open;
  const lowerShadow = isBullish ? open - low : close - low;

  const bodyRatio = bodySize / range;
  const upperShadowRatio = upperShadow / range;
  const lowerShadowRatio = lowerShadow / range;

  let recognizedPattern = 'Standard Candle';
  let description = isBullish
    ? 'Bullish candle: Buyers drove price upward above the open.'
    : isBearish
    ? 'Bearish candle: Sellers seized control and drove price lower.'
    : 'Neutral candle: Minimal price divergence between open and close.';

  // Pattern detection rules: check Hammer / Shooting Star first if lower or upper shadow dominates
  if (lowerShadowRatio >= 0.55 && upperShadowRatio <= 0.15 && bodyRatio <= 0.35 && !isDoji) {
    recognizedPattern = 'Hammer';
    description = 'Bullish reversal pattern: Long lower wick rejects lower prices at support.';
  } else if (upperShadowRatio >= 0.55 && lowerShadowRatio <= 0.15 && bodyRatio <= 0.35 && !isDoji) {
    recognizedPattern = 'Shooting Star / Inverted Hammer';
    description = 'Rejection of higher prices: Bears counter-attacked and forced price back down.';
  } else if (isDoji) {
    if (upperShadowRatio >= 0.35 && lowerShadowRatio >= 0.35) {
      recognizedPattern = 'Long-Legged Doji';
      description = 'Severe indecision: both bulls and bears fought intensely with zero net gain.';
    } else if (upperShadowRatio >= 0.6 && lowerShadowRatio <= 0.15) {
      recognizedPattern = 'Gravestone Doji';
      description = 'Bearish exhaustion: Bulls attempted an attack but were completely repelled.';
    } else if (lowerShadowRatio >= 0.6 && upperShadowRatio <= 0.15) {
      recognizedPattern = 'Dragonfly Doji';
      description = 'Bullish defense: Sellers pushed deep into territory, but bulls regained the gate.';
    } else {
      recognizedPattern = 'Standard Doji';
      description = 'Equilibrium of forces. The market is waiting for a catalyst.';
    }
  } else if (bodyRatio >= 0.85) {
    recognizedPattern = isBullish ? 'Bullish Marubozu' : 'Bearish Marubozu';
    description = isBullish
      ? 'Pure overwhelming buyer dominance. Zero hesitation from open to close.'
      : 'Devastating seller onslaught. The bears crushed all bid liquidity.';
  } else if (bodyRatio <= 0.35 && upperShadowRatio >= 0.25 && lowerShadowRatio >= 0.25) {
    recognizedPattern = 'Spinning Top';
    description = 'Tension in the order book. Neither side could secure a directional breakout.';
  }

  return {
    type: isDoji ? 'doji' : isBullish ? 'bullish' : 'bearish',
    bodySize: Number(bodySize.toFixed(2)),
    range: Number(range.toFixed(2)),
    upperShadow: Number(upperShadow.toFixed(2)),
    lowerShadow: Number(lowerShadow.toFixed(2)),
    bodyRatio: Number(bodyRatio.toFixed(3)),
    upperShadowRatio: Number(upperShadowRatio.toFixed(3)),
    lowerShadowRatio: Number(lowerShadowRatio.toFixed(3)),
    recognizedPattern,
    description,
  };
}

/**
 * Position sizing formula based on Risk Management Golden Rules:
 * Dollar Risk = Account Balance * (Risk % / 100)
 * Risk per unit = |Entry Price - Stop Loss Price|
 * Position Size = Dollar Risk / Risk per unit
 */
export function calculatePositionSize(
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLossPrice: number,
  takeProfitPrice: number = 0
): PositionCalculation {
  if (accountBalance <= 0 || riskPercent <= 0 || entryPrice <= 0 || stopLossPrice <= 0) {
    return {
      accountBalance,
      riskPercent,
      entryPrice,
      stopLossPrice,
      takeProfitPrice,
      dollarRisk: 0,
      riskPerUnit: 0,
      positionSizeUnits: 0,
      totalPositionCost: 0,
      rewardPerUnit: 0,
      riskRewardRatio: 0,
      isInvalid: true,
      errorMessage: 'Please enter valid positive values for all parameters.',
    };
  }

  if (entryPrice === stopLossPrice) {
    return {
      accountBalance,
      riskPercent,
      entryPrice,
      stopLossPrice,
      takeProfitPrice,
      dollarRisk: 0,
      riskPerUnit: 0,
      positionSizeUnits: 0,
      totalPositionCost: 0,
      rewardPerUnit: 0,
      riskRewardRatio: 0,
      isInvalid: true,
      errorMessage: 'Entry Price and Stop Loss cannot be identical. Set a protective buffer.',
    };
  }

  const dollarRisk = accountBalance * (riskPercent / 100);
  const riskPerUnit = Math.abs(entryPrice - stopLossPrice);
  const positionSizeUnits = dollarRisk / riskPerUnit;
  const totalPositionCost = positionSizeUnits * entryPrice;

  let rewardPerUnit = 0;
  let riskRewardRatio = 0;

  if (takeProfitPrice > 0) {
    const isLong = entryPrice > stopLossPrice;
    if (isLong && takeProfitPrice > entryPrice) {
      rewardPerUnit = takeProfitPrice - entryPrice;
      riskRewardRatio = Number((rewardPerUnit / riskPerUnit).toFixed(2));
    } else if (!isLong && takeProfitPrice < entryPrice) {
      rewardPerUnit = entryPrice - takeProfitPrice;
      riskRewardRatio = Number((rewardPerUnit / riskPerUnit).toFixed(2));
    }
  }

  return {
    accountBalance,
    riskPercent,
    entryPrice,
    stopLossPrice,
    takeProfitPrice,
    dollarRisk: Number(dollarRisk.toFixed(2)),
    riskPerUnit: Number(riskPerUnit.toFixed(2)),
    positionSizeUnits: Number(positionSizeUnits.toFixed(2)),
    totalPositionCost: Number(totalPositionCost.toFixed(2)),
    rewardPerUnit: Number(rewardPerUnit.toFixed(2)),
    riskRewardRatio,
    isInvalid: false,
  };
}

/**
 * Checks if quiz reward can be claimed.
 * Requirements state: "Award 10 XP and 2 virtual diamonds for a correct first attempt.
 * Prevent duplicate reward claims and save progress after refreshing."
 */
export function evaluateQuizRewards(
  quizAlreadyClaimed: boolean,
  isCorrect: boolean
): { awardXp: number; awardDiamonds: number; isClaimable: boolean } {
  if (!quizAlreadyClaimed && isCorrect) {
    return {
      awardXp: 10,
      awardDiamonds: 2,
      isClaimable: true,
    };
  }
  return {
    awardXp: 0,
    awardDiamonds: 0,
    isClaimable: false,
  };
}

/**
 * Evaluates daily streak given the last active ISO date string
 */
export function updateDailyStreak(
  lastActiveDateStr: string,
  currentStreak: number,
  now: Date = new Date()
): { newStreak: number; updatedDate: string; isStreakIncremented: boolean } {
  const todayStr = now.toISOString().slice(0, 10);
  if (!lastActiveDateStr) {
    return { newStreak: 1, updatedDate: todayStr, isStreakIncremented: true };
  }

  const lastDate = new Date(lastActiveDateStr);
  const nowDate = new Date(todayStr);
  const diffTime = nowDate.getTime() - lastDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

  if (diffDays === 0) {
    // Already logged in today
    return { newStreak: Math.max(1, currentStreak), updatedDate: todayStr, isStreakIncremented: false };
  } else if (diffDays === 1) {
    // Consecutive day
    return { newStreak: currentStreak + 1, updatedDate: todayStr, isStreakIncremented: true };
  } else {
    // Missed a day or more -> reset to 1
    return { newStreak: 1, updatedDate: todayStr, isStreakIncremented: true };
  }
}
