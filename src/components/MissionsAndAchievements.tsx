import React from 'react';
import { DailyMission, Achievement, UserProgress } from '../types/academy';
import { calculateLevel } from '../utils/tradingAcademyLogic';
import { soundEffects } from '../utils/soundEffects';

interface MissionsProps {
  progress: UserProgress;
  onClaimMission: (missionId: string) => void;
  onSimulateAction: (actionKey: string) => void;
}

export const MissionsAndAchievements: React.FC<MissionsProps> = ({
  progress,
  onClaimMission,
  onSimulateAction,
}) => {
  const levelInfo = calculateLevel(progress.xp);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Cadet Dossier Banner */}
      <div className="bg-gradient-to-r from-neutral-950 via-[#181119] to-neutral-950 border border-red-900/40 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-3xl shadow-inner">
              {levelInfo.rankBadge}
            </div>
            <div>
              <div className="text-xs font-mono-tech text-red-400 uppercase tracking-widest">
                OFFICIAL CADET SERVICE RECORD
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-black text-white">
                {levelInfo.title}
              </h2>
              <div className="text-xs font-mono-tech text-neutral-400 mt-0.5">
                Total XP: <span className="text-white font-bold">{progress.xp}</span> • Diamonds:{' '}
                <span className="text-cyan-400 font-bold">{progress.diamonds} 💎</span> • Streak:{' '}
                <span className="text-orange-400 font-bold">{progress.streakDays} Days 🔥</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black/60 border border-neutral-800 p-3 rounded-xl text-center min-w-[110px]">
              <span className="text-[10px] font-mono-tech text-neutral-400 uppercase block">
                Chapters Mastered
              </span>
              <span className="text-lg font-mono-tech font-bold text-white">
                {progress.completedChapters.length} / 8
              </span>
            </div>

            <div className="bg-black/60 border border-neutral-800 p-3 rounded-xl text-center min-w-[110px]">
              <span className="text-[10px] font-mono-tech text-neutral-400 uppercase block">
                Badges Unlocked
              </span>
              <span className="text-lg font-mono-tech font-bold text-amber-400">
                {progress.achievements.filter((a) => a.unlocked).length} / {progress.achievements.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Tactical Missions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono-tech text-red-400 uppercase tracking-widest block">
              DAILY RECON PROTOCOLS
            </span>
            <h3 className="text-xl font-heading font-bold text-white">
              Tactical Daily Missions
            </h3>
          </div>
          <span className="text-xs font-mono-tech text-neutral-400">
            Resets every 24h of active duty
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {progress.missions.map((mission: DailyMission) => {
            const isCompleted = mission.completed;
            const isClaimed = mission.claimed;

            return (
              <div
                key={mission.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                  isClaimed
                    ? 'bg-neutral-950/50 border-neutral-800/60 opacity-60'
                    : isCompleted
                    ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                    : 'bg-neutral-900/80 border-neutral-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-heading font-bold text-sm text-white">{mission.title}</h4>
                    <span className="text-xs font-mono-tech text-amber-400">
                      +{mission.xpReward} XP / +{mission.diamondsReward} 💎
                    </span>
                  </div>

                  <p className="text-xs text-neutral-400 font-sans mb-3">{mission.description}</p>

                  {/* Progress bar */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-[11px] font-mono-tech text-neutral-400">
                      <span>PROGRESS:</span>
                      <span>
                        {mission.currentCount} / {mission.targetCount}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (mission.currentCount / mission.targetCount) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Claim / Action Button */}
                <div className="pt-2">
                  {isClaimed ? (
                    <div className="w-full py-2 bg-neutral-900 text-neutral-500 text-center rounded-xl text-xs font-mono-tech font-bold uppercase">
                      ✓ BOUNTY SECURED
                    </div>
                  ) : isCompleted ? (
                    <button
                      onClick={() => {
                        soundEffects.playDiamondCollect();
                        onClaimMission(mission.id);
                      }}
                      className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
                    >
                      ⭐ Claim Mission Bounty
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        soundEffects.playTacticalClick();
                        onSimulateAction(mission.actionKey);
                      }}
                      className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition cursor-pointer"
                    >
                      Quick Drill Target →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Military Achievements Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
          <div>
            <span className="text-xs font-mono-tech text-red-400 uppercase tracking-widest block">
              MEDALS OF VALOR
            </span>
            <h3 className="text-xl font-heading font-bold text-white">Cadet Achievements</h3>
          </div>
          <span className="text-xs font-mono-tech text-neutral-400">
            Permanent Wall Scout Accolades
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {progress.achievements.map((ach: Achievement) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border flex items-start gap-4 transition-all ${
                ach.unlocked
                  ? 'bg-neutral-900/90 border-amber-600/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'bg-neutral-950/50 border-neutral-800/60 opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                  ach.unlocked ? 'bg-amber-950/80 border border-amber-500' : 'bg-neutral-900 border border-neutral-800'
                }`}
              >
                {ach.badge}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading font-bold text-sm text-white">{ach.title}</h4>
                  {ach.unlocked && (
                    <span className="text-[10px] font-mono-tech text-amber-400 uppercase">
                      ✓ UNLOCKED
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-400 font-sans mt-0.5">{ach.description}</p>
                <div className="text-[10px] font-mono-tech text-neutral-500 mt-2">
                  REQ: {ach.requirement}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
