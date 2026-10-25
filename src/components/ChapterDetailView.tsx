import React, { useState } from 'react';
import { Chapter } from '../types/academy';
import { CandleAnatomyInteractive } from './CandleAnatomyInteractive';
import { CandlestickChart } from './CandlestickChart';
import { InteractivePatternDojo } from './InteractivePatternDojo';
import { RiskManagementCalculator } from './RiskManagementCalculator';
import { MentorAvatar } from './MentorAvatar';
import { soundEffects } from '../utils/soundEffects';

interface ChapterDetailProps {
  chapter: Chapter;
  isCompleted: boolean;
  quizRecord?: { score: number; total: number; passed: boolean; rewardsClaimed: boolean };
  onBack: () => void;
  onOpenQuiz: () => void;
  onCompleteChapter: () => void;
  onActionTriggered?: (actionKey: string) => void;
}

export const ChapterDetailView: React.FC<ChapterDetailProps> = ({
  chapter,
  isCompleted,
  quizRecord,
  onBack,
  onOpenQuiz,
  onCompleteChapter,
  onActionTriggered,
}) => {
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const lesson = chapter.lessons[activeLessonIdx] || chapter.lessons[0];

  const handleLessonChange = (idx: number) => {
    soundEffects.playTacticalClick();
    setActiveLessonIdx(idx);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-mono-tech text-neutral-300 hover:text-white hover:border-neutral-700 transition cursor-pointer"
        >
          <span>←</span>
          <span>Back to Strategic Academy</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono-tech text-neutral-400">
            CHAPTER {chapter.number} OF 8
          </div>
          {isCompleted && (
            <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-600/50 text-emerald-400 font-mono-tech text-xs font-bold flex items-center gap-1">
              <span>✓</span>
              <span>COMPLETED</span>
            </span>
          )}
        </div>
      </div>

      {/* Hero Chapter Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-neutral-950 via-[#15121b] to-neutral-950 border border-red-900/40 p-5 sm:p-7 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-full bg-red-600/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-red-400 uppercase tracking-widest">
              <span>{chapter.icon}</span>
              <span>TACTICAL BRIEFING // CHAPTER {chapter.number}</span>
              <span>•</span>
              <span className="text-neutral-400">{chapter.estimatedMinutes} MIN DRILL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-wide">
              {chapter.title}
            </h2>

            <p className="text-sm font-sans text-neutral-300 leading-relaxed">
              {chapter.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono-tech">
              <span className="px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-800 text-amber-400">
                Reward: +{chapter.xpReward} XP &amp; +{chapter.diamondsReward} 💎
              </span>
              {quizRecord && (
                <span className="px-2.5 py-1 rounded bg-neutral-900/80 border border-neutral-800 text-neutral-300">
                  Quiz Status: {quizRecord.score}/{quizRecord.total} Passed
                </span>
              )}
            </div>
          </div>

          {/* Commander Quiz Call-to-action button */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={() => {
                soundEffects.playBladeSlash();
                onOpenQuiz();
              }}
              className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(220,38,38,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>⚔️</span>
              <span>Take Commander Quiz Trial</span>
            </button>

            {!isCompleted && (
              <button
                onClick={() => {
                  soundEffects.playTacticalClick();
                  onCompleteChapter();
                }}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-xl text-xs font-mono-tech font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Mark Lessons Read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Navigation Tabs */}
      <div className="flex border-b border-neutral-800 space-x-2 overflow-x-auto pb-1">
        {chapter.lessons.map((lsn, idx) => {
          const isActive = idx === activeLessonIdx;
          return (
            <button
              key={lsn.id}
              onClick={() => handleLessonChange(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-mono-tech font-bold tracking-wider rounded-t-xl transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-800 text-white border-t-2 border-red-500'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
              }`}
            >
              SECTION {idx + 1}: {lsn.title}
            </button>
          );
        })}
      </div>

      {/* Active Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Detailed doctrine explanation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
              <span className="text-xs font-mono-tech text-red-400 uppercase tracking-wider">
                {lesson.badge || 'COMBAT DOCTRINE'}
              </span>
              <span className="text-xs font-mono-tech text-neutral-500">
                PART {activeLessonIdx + 1} OF {chapter.lessons.length}
              </span>
            </div>

            <h3 className="text-lg font-heading font-bold text-white">{lesson.title}</h3>

            <p className="text-sm font-sans text-neutral-300 leading-relaxed">
              {lesson.explanation}
            </p>

            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono-tech text-amber-400 uppercase tracking-wider block">
                KEY STRATEGIC TAKEAWAYS:
              </span>
              <ul className="space-y-2 text-xs font-sans text-neutral-300">
                {lesson.keyTakeaways.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2 bg-black/40 p-2.5 rounded-lg border border-neutral-800/80">
                    <span className="text-red-400 font-bold shrink-0">▸</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Commander Mikoto Tactical Advice Snippet */}
          <MentorAvatar
            compact
            expression="tactical"
            quote={`Remember, Cadet: ${lesson.keyTakeaways[0] || 'Observe before striking.'}`}
            subquote="Instructor Mikoto"
          />
        </div>

        {/* Right: Embedded Interactive Module based on Chapter */}
        <div className="lg:col-span-7 space-y-4">
          {chapter.number === 2 && (
            <CandleAnatomyInteractive
              onExplore={() => onActionTriggered?.('inspect_anatomy')}
            />
          )}

          {chapter.number === 3 && (
            <InteractivePatternDojo
              onPatternInspected={() => onActionTriggered?.('view_patterns')}
            />
          )}

          {chapter.number === 7 && (
            <RiskManagementCalculator
              onCalculate={() => onActionTriggered?.('calculate_risk')}
            />
          )}

          {(chapter.number === 1 ||
            chapter.number === 4 ||
            chapter.number === 5 ||
            chapter.number === 6 ||
            chapter.number === 8) && (
            <div className="space-y-3">
              <CandlestickChart />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
