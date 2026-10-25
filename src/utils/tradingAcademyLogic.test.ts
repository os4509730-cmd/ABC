import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateLevel,
  classifyCandle,
  calculatePositionSize,
  evaluateQuizRewards,
  updateDailyStreak,
} from './tradingAcademyLogic';

test('calculateLevel computes levels, titles, and XP progress percentages', () => {
  const cadet = calculateLevel(0);
  assert.equal(cadet.level, 1);
  assert.equal(cadet.title, 'Wall Cadet');
  assert.equal(cadet.progressPercent, 0);

  const scout = calculateLevel(80);
  assert.equal(scout.level, 2);
  assert.equal(scout.title, 'Scout Vanguard');
  // 80 - 60 = 20 / 90 = 22%
  assert.equal(scout.progressPercent, 22);

  const elite = calculateLevel(200);
  assert.equal(elite.level, 3);
  assert.equal(elite.title, 'Survey Corps Elite');

  const supreme = calculateLevel(850);
  assert.equal(supreme.level, 6);
  assert.equal(supreme.title, 'Supreme Market Commander');
  assert.equal(supreme.progressPercent, 100);
});

test('classifyCandle detects Hammer pattern accurately', () => {
  // Hammer: Open 100, High 102, Low 85, Close 103
  // Range: 17, body: 3 (17%), lower wick: 15 (88%), upper wick: 1 (5.8%)
  const result = classifyCandle(100, 102, 85, 103);
  assert.equal(result.type, 'bullish');
  assert.equal(result.recognizedPattern, 'Hammer');
});

test('classifyCandle detects Shooting Star / Inverted Hammer pattern', () => {
  // Shooting Star: Open 100, High 115, Low 99, Close 98
  // Range: 16, body: 2 (12.5%), upper wick: 15 (93.7%), lower wick: 1 (6.2%)
  const result = classifyCandle(100, 115, 99, 98);
  assert.equal(result.recognizedPattern, 'Shooting Star / Inverted Hammer');
});

test('classifyCandle detects Marubozu full momentum candle', () => {
  const bullishMarubozu = classifyCandle(100, 110, 100, 110);
  assert.equal(bullishMarubozu.recognizedPattern, 'Bullish Marubozu');
  assert.equal(bullishMarubozu.type, 'bullish');
});

test('classifyCandle detects Doji indecision candle', () => {
  const doji = classifyCandle(100, 108, 92, 100.1);
  assert.equal(doji.type, 'doji');
  assert.match(doji.recognizedPattern, /Doji/);
});

test('calculatePositionSize enforces strict risk management math', () => {
  // Account = $10,000, 2% risk = $200
  // Entry = $100, Stop Loss = $95 (Risk per unit = $5)
  // Position size = $200 / $5 = 40 units
  // Take Profit = $110 (Reward per unit = $10 -> R:R 1:2)
  const calc = calculatePositionSize(10000, 2, 100, 95, 110);
  assert.equal(calc.isInvalid, false);
  assert.equal(calc.dollarRisk, 200);
  assert.equal(calc.riskPerUnit, 5);
  assert.equal(calc.positionSizeUnits, 40);
  assert.equal(calc.totalPositionCost, 4000);
  assert.equal(calc.rewardPerUnit, 10);
  assert.equal(calc.riskRewardRatio, 2);
});

test('calculatePositionSize flags invalid parameters', () => {
  const invalid = calculatePositionSize(10000, 2, 100, 100);
  assert.equal(invalid.isInvalid, true);
  assert.match(invalid.errorMessage || '', /identical/);
});

test('evaluateQuizRewards awards 10 XP and 2 diamonds on first attempt, 0 on duplicates', () => {
  const firstSuccess = evaluateQuizRewards(false, true);
  assert.equal(firstSuccess.awardXp, 10);
  assert.equal(firstSuccess.awardDiamonds, 2);
  assert.equal(firstSuccess.isClaimable, true);

  const duplicateAttempt = evaluateQuizRewards(true, true);
  assert.equal(duplicateAttempt.awardXp, 0);
  assert.equal(duplicateAttempt.awardDiamonds, 0);
  assert.equal(duplicateAttempt.isClaimable, false);

  const failedAttempt = evaluateQuizRewards(false, false);
  assert.equal(failedAttempt.awardXp, 0);
  assert.equal(failedAttempt.awardDiamonds, 0);
  assert.equal(failedAttempt.isClaimable, false);
});

test('updateDailyStreak handles same-day, consecutive, and broken streaks', () => {
  const today = new Date('2026-10-25T12:00:00Z');
  // Same day
  const sameDay = updateDailyStreak('2026-10-25', 3, today);
  assert.equal(sameDay.newStreak, 3);
  assert.equal(sameDay.isStreakIncremented, false);

  // Consecutive day
  const consecutive = updateDailyStreak('2026-10-24', 3, today);
  assert.equal(consecutive.newStreak, 4);
  assert.equal(consecutive.isStreakIncremented, true);

  // Missed day (broken streak)
  const broken = updateDailyStreak('2026-10-20', 5, today);
  assert.equal(broken.newStreak, 1);
  assert.equal(broken.isStreakIncremented, true);
});
