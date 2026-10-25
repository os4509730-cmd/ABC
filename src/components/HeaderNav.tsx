import React from 'react';
import { UserProgress } from '../types/academy';
import { calculateLevel } from '../utils/tradingAcademyLogic';
import { soundEffects } from '../utils/soundEffects';

interface HeaderNavProps {
  progress: UserProgress;
  activeTab: 'chapters' | 'chart' | 'anatomy' | 'dojo' | 'risk' | 'missions' | 'achievements';
  onSelectTab: (tab: 'chapters' | 'chart' | 'anatomy' | 'dojo' | 'risk' | 'missions' | 'achievements') => void;
  onToggleSound: () => void;
  onOpenExport: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  progress,
  activeTab,
  onSelectTab,
  onToggleSound,
  onOpenExport,
}) => {
  const levelInfo = calculateLevel(progress.xp);

  const navItems = [
    { key: 'chapters', label: 'Academy Chapters', icon: '📖' },
    { key: 'chart', label: 'Tactical Chart', icon: '📊' },
    { key: 'anatomy', label: 'Candle Lab', icon: '🗡️' },
    { key: 'dojo', label: 'Pattern Dojo', icon: '⚡' },
    { key: 'risk', label: 'Risk Fortress', icon: '🛡️' },
    { key: 'missions', label: 'Missions', icon: '🎯' },
    { key: 'achievements', label: 'Dossier', icon: '🎖️' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 border-b border-red-950/50 backdrop-blur-md">
      {/* Top Tactical Stat HUD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Military Title */}
        <div
          onClick={() => {
            soundEffects.playTacticalClick();
            onSelectTab('chapters');
          }}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-neutral-950 border border-red-500/60 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(220,38,38,0.5)] group-hover:scale-105 transition-transform">
            ⚔️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-heading font-black tracking-wider text-white">
                TITAN TRADER
              </h1>
              <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-red-950 border border-red-800 text-red-400 font-bold uppercase tracking-wider">
                Vanguard ACADEMY
              </span>
            </div>
            <div className="text-[11px] font-mono-tech text-neutral-400">
              CANDLESTICK TACTICAL COMBAT SYSTEM
            </div>
          </div>
        </div>

        {/* User HUD Stats: Level, XP Bar, Diamonds, Streak, Export HTML */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono-tech">
          {/* Level & Rank Badge */}
          <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-xl shadow-inner">
            <span className="text-base">{levelInfo.rankBadge}</span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-white font-bold">LVL {levelInfo.level}</span>
                <span className="text-neutral-400 font-sans">•</span>
                <span className="text-red-400 font-bold">{levelInfo.title}</span>
              </div>
              {/* XP Progress Bar */}
              <div className="w-20 sm:w-28 bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-gradient-to-r from-red-600 to-amber-500 h-full transition-all duration-300"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Virtual Diamonds */}
          <div
            className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-2.5 sm:px-3 py-1.5 rounded-xl"
            title="Virtual Academy Diamonds earned from drills and first attempt quizzes"
          >
            <span className="text-cyan-400 text-sm">💎</span>
            <span className="text-white font-bold">{progress.diamonds}</span>
            <span className="hidden sm:inline text-neutral-400 text-[10px] uppercase">Gems</span>
          </div>

          {/* Daily Streak */}
          <div
            className="flex items-center gap-1.5 bg-neutral-900/90 border border-neutral-800 px-2.5 sm:px-3 py-1.5 rounded-xl"
            title="Active daily training streak"
          >
            <span className="text-orange-500 text-sm">🔥</span>
            <span className="text-orange-400 font-bold">{progress.streakDays}</span>
            <span className="hidden sm:inline text-neutral-400 text-[10px] uppercase">Streak</span>
          </div>

          {/* Export HTML Button */}
          <button
            onClick={() => {
              soundEffects.playTacticalClick();
              onOpenExport();
            }}
            className="px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 border border-red-700/60 text-red-300 hover:text-white font-bold flex items-center gap-1.5 shadow-[0_0_10px_rgba(220,38,38,0.25)] transition-all active:scale-95 cursor-pointer"
            title="Export Standalone HTML Dossier & Field Manual"
          >
            <span>📄</span>
            <span className="tracking-wider">EXPORT HTML</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundEffects.playTacticalClick();
              onToggleSound();
            }}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              progress.soundEnabled
                ? 'bg-neutral-800 border-neutral-700 text-white'
                : 'bg-neutral-900 border-neutral-800 text-neutral-500'
            }`}
            title={progress.soundEnabled ? 'Mute Anime Sound Effects' : 'Enable Anime Sound Effects'}
            aria-label="Toggle Sound"
          >
            {progress.soundEnabled ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      {/* Navigation Bar Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 overflow-x-auto">
        <nav className="flex space-x-1 sm:space-x-2 py-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  soundEffects.playTacticalClick();
                  onSelectTab(item.key);
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
