/**
 * TITAN TRADER — Anime Trading Academy
 * Core domain types
 */

export interface CandleData {
  id: string;
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  label?: string;
  pattern?: string;
  annotation?: string;
}

export type MentorExpression = 'neutral' | 'proud' | 'scolding' | 'tactical' | 'intense';

export interface QuizQuestion {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  mentorPraise: string;
  mentorScold: string;
}

export interface LessonSection {
  id: string;
  title: string;
  badge?: string;
  explanation: string;
  keyTakeaways: string[];
  interactiveMode?: 'anatomy-sandbox' | 'pattern-spotter' | 'trend-lines' | 'support-resistance' | 'volume-rsi' | 'risk-calc';
  sampleCandles?: CandleData[];
  patternHighlight?: {
    name: string;
    description: string;
    signal: 'Bullish' | 'Bearish' | 'Indecision';
    reliability: 'High' | 'Medium' | 'Extreme';
    rules: string[];
  };
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  tagline: string;
  icon: string;
  description: string;
  estimatedMinutes: number;
  unlockedLevel: number;
  lessons: LessonSection[];
  quiz: QuizQuestion[];
  xpReward: number;
  diamondsReward: number;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  xpReward: number;
  diamondsReward: number;
  completed: boolean;
  claimed: boolean;
  actionKey: string;
}

export interface Achievement {
  id: string;
  title: string;
  badge: string;
  description: string;
  requirement: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface UserProgress {
  xp: number;
  diamonds: number;
  streakDays: number;
  lastActiveDate: string;
  completedChapters: string[];
  // Quiz ID mapped to attempt record
  completedQuizzes: Record<
    string,
    {
      score: number;
      total: number;
      passed: boolean;
      rewardsClaimed: boolean;
      completedAt: string;
    }
  >;
  missions: DailyMission[];
  claimedMissionIds: string[];
  achievements: Achievement[];
  soundEnabled: boolean;
  activeChapterId: string;
}

export interface PositionCalculation {
  accountBalance: number;
  riskPercent: number;
  entryPrice: number;
  stopLossPrice: number;
  takeProfitPrice: number;
  dollarRisk: number;
  riskPerUnit: number;
  positionSizeUnits: number;
  totalPositionCost: number;
  rewardPerUnit: number;
  riskRewardRatio: number;
  isInvalid: boolean;
  errorMessage?: string;
}

export interface CandleClassification {
  type: 'bullish' | 'bearish' | 'doji';
  bodySize: number;
  range: number;
  upperShadow: number;
  lowerShadow: number;
  bodyRatio: number;
  upperShadowRatio: number;
  lowerShadowRatio: number;
  recognizedPattern: string;
  description: string;
}
