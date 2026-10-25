import React from 'react';
import { Chapter, UserProgress } from '../types/academy';
import { calculateLevel } from '../utils/tradingAcademyLogic';
import { soundEffects } from '../utils/soundEffects';

interface ChaptersDashboardProps {
  chapters: Chapter[];
  progress: UserProgress;
  onSelectChapter: (chapter: Chapter) => void;
  onLaunchQuiz: (chapter: Chapter) => void;
  onNavigateToMissions: () => void;
}

export const ChaptersDashboard: React.FC<ChaptersDashboardProps> = ({
  chapters,
  progress,
  onSelectChapter,
  onLaunchQuiz,
  onNavigateToMissions,
}) => {
  const levelInfo = calculateLevel(progress.xp);
  const completedCount = progress.completedChapters.length;
  const progressPercent = Math.round((completedCount / chapters.length) * 100);

  const pendingMissionsCount = progress.missions.filter((m) => m.completed && !m.claimed).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Academy Overview Banner with Commander Mikoto briefing */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-950 via-[#1b1015] to-neutral-950 border border-red-900/50 p-6 sm:p-8 shadow-2xl">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-400 text-xs font-mono-tech tracking-wider uppercase font-bold">
              <span>⚔️</span>
              <span>VANGUARD CADET HEADQUARTERS</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wide">
              Wall Defense: Candlestick Mastery
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 font-sans leading-relaxed">
              Welcome to the training grounds, Cadet. The order book is a ruthless battleground where
              undisciplined scouts get liquidated by titans. Master candlestick anatomy, spot high-probability
              reversals, and guard your capital with the sacred 1% doctrine.
            </p>

            {/* Overall Progress Bar */}
            <div className="pt-2 max-w-md">
              <div className="flex items-center justify-between text-xs font-mono-tech mb-1.5">
                <span className="text-neutral-400 uppercase">ACADEMY GRADUATION PROGRESS:</span>
                <span className="text-red-400 font-bold">{progressPercent}% ({completedCount}/8 Chapters)</span>
              </div>
              <div className="w-full bg-neutral-900 h-2.5 rounded-full overflow-hidden border border-neutral-800">
                <div
                  className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick Mission Dispatcher Box */}
          <div className="shrink-0 bg-black/60 border border-neutral-800 p-5 rounded-2xl flex flex-col gap-3 min-w-[240px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-tech text-neutral-400 uppercase">DAILY DRILLS</span>
              {pendingMissionsCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white font-mono-tech text-[10px] font-bold animate-pulse">
                  {pendingMissionsCount} CLAIMABLE!
                </span>
              )}
            </div>

            <div className="text-sm font-heading font-bold text-white">
              {progress.missions.filter((m) => m.claimed).length} of {progress.missions.length} Missions Claimed
            </div>

            <button
              onClick={() => {
                soundEffects.playTacticalClick();
                onNavigateToMissions();
              }}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Open Missions &amp; Bounties →
            </button>
          </div>
        </div>
      </div>

      {/* Chapters Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono-tech text-red-400 uppercase tracking-widest block">
            THE 8 CADET CHAPTERS
          </span>
          <h3 className="text-xl font-heading font-bold text-white">
            Curriculum of the Vanguard Scout
          </h3>
        </div>

        <div className="text-xs font-mono-tech text-neutral-400">
          Rank Requirement: LVL {levelInfo.level} ({levelInfo.title})
        </div>
      </div>

      {/* 8 Chapters Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {chapters.map((ch) => {
          const isCompleted = progress.completedChapters.includes(ch.id);
          const quizRecord = progress.completedQuizzes[ch.id];
          const isLocked = levelInfo.level < ch.unlockedLevel;

          return (
            <div
              key={ch.id}
              className={`group relative rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                isLocked
                  ? 'bg-neutral-950/60 border-neutral-800/60 opacity-60'
                  : isCompleted
                  ? 'bg-neutral-900/90 border-emerald-900/50 hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                  : 'bg-neutral-900/90 border-neutral-800 hover:border-red-600/70 hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]'
              }`}
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div className="flex items-center gap-1.5">
                    {isCompleted ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-600/50 text-emerald-400 text-[10px] font-mono-tech font-bold uppercase">
                        ✓ MASTERED
                      </span>
                    ) : isLocked ? (
                      <span className="px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 text-[10px] font-mono-tech font-bold uppercase">
                        🔒 LVL {ch.unlockedLevel} REQ
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-red-950 border border-red-700/50 text-red-400 text-[10px] font-mono-tech font-bold uppercase">
                        ACTIVE DRILL
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-[11px] font-mono-tech text-neutral-400 uppercase mb-1">
                  CHAPTER {ch.number} • {ch.estimatedMinutes} MINS
                </div>

                <h4 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                  {ch.title}
                </h4>

                <p className="text-xs text-neutral-400 font-sans line-clamp-3 mb-4 leading-relaxed">
                  {ch.description}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono-tech text-amber-400/90 mb-2">
                  <span>BOUNTY:</span>
                  <span>+{ch.xpReward} XP / +{ch.diamondsReward} 💎</span>
                </div>

                {isLocked ? (
                  <div className="w-full py-2 bg-neutral-900 text-neutral-500 text-center rounded-xl text-xs font-mono-tech uppercase font-bold">
                    Locked: Reach Level {ch.unlockedLevel}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundEffects.playTacticalClick();
                        onSelectChapter(ch);
                      }}
                      className="flex-1 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition-colors shadow active:scale-95 cursor-pointer"
                    >
                      {isCompleted ? 'Review' : 'Enter Drill'}
                    </button>

                    <button
                      onClick={() => {
                        soundEffects.playBladeSlash();
                        onLaunchQuiz(ch);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider border transition cursor-pointer ${
                        quizRecord?.passed
                          ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                          : 'bg-amber-950/50 border-amber-500/60 text-amber-300 hover:bg-amber-900/60'
                      }`}
                      title="Launch Mikasa Quiz Trial"
                    >
                      ⚔️ Quiz
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
