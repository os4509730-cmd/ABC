/**
 * TITAN TRADER — Anime Trading Academy
 * Complete interactive application entry point
 */

import React, { useState, useEffect } from 'react';
import { UserProgress, Chapter } from './types/academy';
import {
  CHAPTERS_DATA,
  INITIAL_DAILY_MISSIONS,
  INITIAL_ACHIEVEMENTS,
} from './data/chaptersData';
import { calculateLevel, updateDailyStreak } from './utils/tradingAcademyLogic';
import { soundEffects } from './utils/soundEffects';

import { BackgroundEmbers } from './components/BackgroundEmbers';
import { HeaderNav } from './components/HeaderNav';
import { ChaptersDashboard } from './components/ChaptersDashboard';
import { ChapterDetailView } from './components/ChapterDetailView';
import { CandlestickChart } from './components/CandlestickChart';
import { CandleAnatomyInteractive } from './components/CandleAnatomyInteractive';
import { InteractivePatternDojo } from './components/InteractivePatternDojo';
import { RiskManagementCalculator } from './components/RiskManagementCalculator';
import { MissionsAndAchievements } from './components/MissionsAndAchievements';
import { QuizModal } from './components/QuizModal';
import { MentorAvatar } from './components/MentorAvatar';
import { ExportHtmlModal } from './components/ExportHtmlModal';

const LOCAL_STORAGE_KEY = 'titan_trader_cadet_progress_v1';

const INITIAL_PROGRESS: UserProgress = {
  xp: 45,
  diamonds: 10,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().slice(0, 10),
  completedChapters: [],
  completedQuizzes: {},
  missions: INITIAL_DAILY_MISSIONS,
  claimedMissionIds: [],
  achievements: INITIAL_ACHIEVEMENTS,
  soundEnabled: true,
  activeChapterId: 'ch-1',
};

const MIKASA_TACTICAL_QUOTES = [
  'If you hesitate for even a second in the order book, the titan bears will swallow your capital whole.',
  'Your stop-loss is not a sign of weakness—it is the tactical armor that ensures you survive to fight another day.',
  'Observe the wicks at support. When the defenders reject lower prices, that is where we strike.',
  'A foolish cadet risks 50% on a whim. A true vanguard master risks only 1% and lets mathematics conquer the market.',
  'Do not look away from the red candles. Fear is overcome through discipline, not blindness.',
];

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Recalculate daily streak
        const streakUpdate = updateDailyStreak(parsed.lastActiveDate, parsed.streakDays);
        return {
          ...INITIAL_PROGRESS,
          ...parsed,
          streakDays: streakUpdate.newStreak,
          lastActiveDate: streakUpdate.updatedDate,
          // merge achievements & missions in case schema expanded
          missions: parsed.missions || INITIAL_DAILY_MISSIONS,
          achievements: parsed.achievements || INITIAL_ACHIEVEMENTS,
        };
      }
    } catch {
      // fallback
    }
    return INITIAL_PROGRESS;
  });

  const [activeTab, setActiveTab] = useState<
    'chapters' | 'chart' | 'anatomy' | 'dojo' | 'risk' | 'missions' | 'achievements'
  >('chapters');

  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [activeQuizChapter, setActiveQuizChapter] = useState<Chapter | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [mentorQuoteIdx, setMentorQuoteIdx] = useState<number>(0);
  const [showMentorDialog, setShowMentorDialog] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage quota or incognito
    }
  }, [progress]);

  // Sync sound controller
  useEffect(() => {
    soundEffects.setEnabled(progress.soundEnabled);
  }, [progress.soundEnabled]);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 4000);
  };

  const handleToggleSound = () => {
    setProgress((prev) => {
      const nextSound = !prev.soundEnabled;
      soundEffects.setEnabled(nextSound);
      return { ...prev, soundEnabled: nextSound };
    });
  };

  // Dispatch tactical mission actions (e.g. inspecting anatomy, reviewing patterns, running risk calc)
  const handleTacticalAction = (actionKey: string) => {
    setProgress((prev) => {
      let updated = false;
      const nextMissions = prev.missions.map((m) => {
        if (m.actionKey === actionKey && !m.completed) {
          const nextCount = m.currentCount + 1;
          const isDone = nextCount >= m.targetCount;
          if (isDone) {
            updated = true;
          }
          return {
            ...m,
            currentCount: nextCount,
            completed: isDone,
          };
        }
        return m;
      });

      if (updated) {
        showNotification('🎯 Daily Mission Objective Fulfilled! Claim your bounty in Missions.');
      }
      return { ...prev, missions: nextMissions };
    });
  };

  // Claim Mission Bounty
  const handleClaimMission = (missionId: string) => {
    setProgress((prev) => {
      const mission = prev.missions.find((m) => m.id === missionId);
      if (!mission || mission.claimed || !mission.completed) return prev;

      const nextMissions = prev.missions.map((m) =>
        m.id === missionId ? { ...m, claimed: true } : m
      );

      showNotification(`⭐ Bounty Claimed: +${mission.xpReward} XP & +${mission.diamondsReward} Diamonds!`);

      return {
        ...prev,
        xp: prev.xp + mission.xpReward,
        diamonds: prev.diamonds + mission.diamondsReward,
        missions: nextMissions,
        claimedMissionIds: [...prev.claimedMissionIds, missionId],
      };
    });
  };

  // Mark chapter read/completed
  const handleCompleteChapter = (chapterId: string) => {
    setProgress((prev) => {
      if (prev.completedChapters.includes(chapterId)) return prev;

      const ch = CHAPTERS_DATA.find((c) => c.id === chapterId);
      const bonusXp = ch?.xpReward || 20;
      const bonusDiamonds = ch?.diamondsReward || 3;

      showNotification(`🏆 Chapter Mastered: +${bonusXp} XP & +${bonusDiamonds} Diamonds!`);

      // Check achievements
      const nextAchievements = prev.achievements.map((ach) => {
        if (ach.id === 'ach-2' && chapterId === 'ch-5') {
          return { ...ach, unlocked: true, unlockedDate: new Date().toISOString() };
        }
        return ach;
      });

      return {
        ...prev,
        xp: prev.xp + bonusXp,
        diamonds: prev.diamonds + bonusDiamonds,
        completedChapters: [...prev.completedChapters, chapterId],
        achievements: nextAchievements,
      };
    });
  };

  // Quiz completion handler
  const handleCompleteQuiz = (
    score: number,
    total: number,
    awardedXp: number,
    awardedDiamonds: number
  ) => {
    if (!activeQuizChapter) return;
    const chId = activeQuizChapter.id;
    const passed = score >= Math.ceil(total * 0.5);

    setProgress((prev) => {
      const wasClaimedBefore = prev.completedQuizzes[chId]?.rewardsClaimed || false;
      const willClaim = !wasClaimedBefore && awardedXp > 0;

      const newQuizzes = {
        ...prev.completedQuizzes,
        [chId]: {
          score,
          total,
          passed,
          rewardsClaimed: wasClaimedBefore || willClaim,
          completedAt: new Date().toISOString(),
        },
      };

      // Auto-unlock achievements if applicable
      const nextAchievements = prev.achievements.map((ach) => {
        if (ach.id === 'ach-1' && chId === 'ch-1' && passed) {
          return { ...ach, unlocked: true };
        }
        if (ach.id === 'ach-3' && chId === 'ch-7' && score === total) {
          return { ...ach, unlocked: true };
        }
        if (ach.id === 'ach-4' && chId === 'ch-8' && passed) {
          return { ...ach, unlocked: true };
        }
        return ach;
      });

      // Update quiz mission
      const nextMissions = prev.missions.map((m) => {
        if (m.actionKey === 'complete_quiz' && !m.completed && passed) {
          return { ...m, currentCount: m.currentCount + 1, completed: true };
        }
        return m;
      });

      if (willClaim) {
        showNotification(
          `⚔️ Quiz Concluded! First-attempt rewards: +${awardedXp} XP & +${awardedDiamonds} Diamonds!`
        );
      }

      return {
        ...prev,
        xp: prev.xp + awardedXp,
        diamonds: prev.diamonds + awardedDiamonds,
        completedQuizzes: newQuizzes,
        achievements: nextAchievements,
        missions: nextMissions,
        // Mark chapter completed if passed
        completedChapters: passed && !prev.completedChapters.includes(chId)
          ? [...prev.completedChapters, chId]
          : prev.completedChapters,
      };
    });
  };

  // Next Tactical Quote
  const handleCycleQuote = () => {
    soundEffects.playTacticalClick();
    setMentorQuoteIdx((prev) => (prev + 1) % MIKASA_TACTICAL_QUOTES.length);
    setShowMentorDialog(true);
  };

  const levelInfo = calculateLevel(progress.xp);

  return (
    <div className="min-h-screen bg-[#08090c] text-neutral-100 flex flex-col relative selection:bg-red-600 selection:text-white">
      {/* Background Animated Particle Canvas */}
      <BackgroundEmbers />

      {/* Subtle Tactical Grid Backdrop */}
      <div className="fixed inset-0 bg-tactical-grid pointer-events-none z-0" aria-hidden="true" />

      {/* Main Tactical Header HUD */}
      <HeaderNav
        progress={progress}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedChapter(null);
        }}
        onToggleSound={handleToggleSound}
        onOpenExport={() => setShowExportModal(true)}
      />

      {/* Floating Tactical Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300 max-w-sm bg-neutral-900 border border-amber-500/80 text-amber-200 px-4 py-3 rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center gap-3">
          <span className="text-xl">✨</span>
          <span className="text-xs font-mono-tech font-bold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* App Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Render Active View */}
        {selectedChapter ? (
          <ChapterDetailView
            chapter={selectedChapter}
            isCompleted={progress.completedChapters.includes(selectedChapter.id)}
            quizRecord={progress.completedQuizzes[selectedChapter.id]}
            onBack={() => setSelectedChapter(null)}
            onOpenQuiz={() => setActiveQuizChapter(selectedChapter)}
            onCompleteChapter={() => handleCompleteChapter(selectedChapter.id)}
            onActionTriggered={handleTacticalAction}
          />
        ) : activeTab === 'chapters' ? (
          <ChaptersDashboard
            chapters={CHAPTERS_DATA}
            progress={progress}
            onSelectChapter={(ch) => setSelectedChapter(ch)}
            onLaunchQuiz={(ch) => setActiveQuizChapter(ch)}
            onNavigateToMissions={() => setActiveTab('missions')}
          />
        ) : activeTab === 'chart' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono-tech text-red-400 uppercase tracking-widest block">
                  TACTICAL SURVEILLANCE
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Wall Maria Defensive Order Feed
                </h2>
              </div>
              <span className="text-xs font-mono-tech text-neutral-400">
                Interactive Candlestick Simulator
              </span>
            </div>
            <CandlestickChart />
          </div>
        ) : activeTab === 'anatomy' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono-tech text-red-400 uppercase tracking-widest block">
                  CANDLE DISSECTION UNIT
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Candle Anatomy &amp; Wick Rejection Lab
                </h2>
              </div>
              <span className="text-xs font-mono-tech text-neutral-400">
                Morph OHLC with Live Geometry
              </span>
            </div>
            <CandleAnatomyInteractive onExplore={() => handleTacticalAction('inspect_anatomy')} />
          </div>
        ) : activeTab === 'dojo' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono-tech text-red-400 uppercase tracking-widest block">
                  SCOUT COMBAT SIGNATURES
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  High-Probability Candlestick Patterns
                </h2>
              </div>
              <span className="text-xs font-mono-tech text-neutral-400">
                Reversals &amp; Invalidation Armor
              </span>
            </div>
            <InteractivePatternDojo onPatternInspected={() => handleTacticalAction('view_patterns')} />
          </div>
        ) : activeTab === 'risk' ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <div>
                <span className="text-xs font-mono-tech text-red-400 uppercase tracking-widest block">
                  IRON SHIELD DOCTRINE
                </span>
                <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
                  Tactical Position Sizing &amp; Risk Calculator
                </h2>
              </div>
              <span className="text-xs font-mono-tech text-neutral-400">
                1-2% Rule &amp; Asymmetric R:R
              </span>
            </div>
            <RiskManagementCalculator onCalculate={() => handleTacticalAction('calculate_risk')} />
          </div>
        ) : (
          <MissionsAndAchievements
            progress={progress}
            onClaimMission={handleClaimMission}
            onSimulateAction={(actionKey) => {
              if (actionKey === 'inspect_anatomy') setActiveTab('anatomy');
              else if (actionKey === 'view_patterns') setActiveTab('dojo');
              else if (actionKey === 'calculate_risk') setActiveTab('risk');
              else if (actionKey === 'complete_quiz') setActiveQuizChapter(CHAPTERS_DATA[0]);
            }}
          />
        )}
      </main>

      {/* Active Mikasa-style Quiz Modal */}
      {activeQuizChapter && (
        <QuizModal
          chapter={activeQuizChapter}
          alreadyClaimed={progress.completedQuizzes[activeQuizChapter.id]?.rewardsClaimed || false}
          onClose={() => setActiveQuizChapter(null)}
          onCompleteQuiz={handleCompleteQuiz}
        />
      )}

      {/* Standalone HTML Export Modal */}
      {showExportModal && (
        <ExportHtmlModal
          progress={progress}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Floating Tactical Mentor Quick-Insight Bubble (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {showMentorDialog && (
          <div className="mb-3 max-w-xs sm:max-w-sm bg-neutral-900/95 border border-red-800/80 p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-neutral-800">
              <span className="text-[11px] font-mono-tech text-red-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>⚔️</span>
                <span>Captain Mikoto</span>
              </span>
              <button
                onClick={() => setShowMentorDialog(false)}
                className="text-neutral-500 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-neutral-200 font-sans italic leading-relaxed">
              &ldquo;{MIKASA_TACTICAL_QUOTES[mentorQuoteIdx]}&rdquo;
            </p>
          </div>
        )}

        <button
          onClick={handleCycleQuote}
          className="p-3 bg-gradient-to-br from-red-600 to-red-950 hover:from-red-500 hover:to-red-900 border border-red-500/60 rounded-2xl shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-2.5 text-xs font-mono-tech font-bold uppercase tracking-wider text-white active:scale-95 transition-all cursor-pointer"
          title="Request Commander's Tactical Insight"
        >
          <span className="text-lg">🗡️</span>
          <span className="hidden sm:inline">Tactical Counsel</span>
        </button>
      </div>

      {/* Tactical Footer & Legal Disclaimers */}
      <footer className="relative z-10 border-t border-neutral-900 bg-neutral-950/80 text-neutral-500 py-6 px-4 sm:px-6 mt-12 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-red-500 font-bold font-heading text-sm">TITAN TRADER</span>
            <span>•</span>
            <span className="font-mono-tech">ACADEMY SIMULATOR // CADET VERSION 1.0</span>
          </div>

          <div className="text-center md:text-right max-w-xl text-[11px] text-neutral-500 leading-normal">
            <p className="text-neutral-400 font-semibold mb-1">
              EDUCATIONAL SIMULATION NOTICE &amp; DISCLAIMER:
            </p>
            <p>
              TITAN TRADER is a simulated learning game designed to teach candlestick chart reading and risk
              discipline with original anime characters. All market data, candles, and scenarios are synthetic
              cadet training feeds. This application does NOT offer real financial advice, guaranteed trading
              signals, or promises of profits. Never risk money you cannot afford to lose.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
