import React, { useState } from 'react';
import { Chapter, QuizQuestion, MentorExpression } from '../types/academy';
import { soundEffects } from '../utils/soundEffects';

interface QuizModalProps {
  chapter: Chapter;
  alreadyClaimed: boolean;
  onClose: () => void;
  onCompleteQuiz: (score: number, total: number, awardedXp: number, awardedDiamonds: number) => void;
}

const MIKASA_IMAGE_SRC = '/assets/aistudio/image_d4205720.png';

export const QuizModal: React.FC<QuizModalProps> = ({
  chapter,
  alreadyClaimed,
  onClose,
  onCompleteQuiz,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [mentorMood, setMentorMood] = useState<MentorExpression>('tactical');
  const [mentorSpeech, setMentorSpeech] = useState<string>(
    `Listen closely, Cadet. Chapter ${chapter.number} tests your readiness to face live market volatility. Keep your emotions in check.`
  );
  // Track first attempt rewards accumulated in this session
  const [accumulatedXp, setAccumulatedXp] = useState<number>(0);
  const [accumulatedDiamonds, setAccumulatedDiamonds] = useState<number>(0);

  const question: QuizQuestion = chapter.quiz[currentIdx];
  const isLastQuestion = currentIdx === chapter.quiz.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    soundEffects.playTacticalClick();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === question.correctIndex;

    if (isCorrect) {
      soundEffects.playCorrectChime();
      setCorrectCount((prev) => prev + 1);
      setMentorMood('proud');
      setMentorSpeech(question.mentorPraise);

      // Award 10 XP and 2 diamonds for correct on first attempt (if chapter quiz wasn't already fully claimed)
      if (!alreadyClaimed) {
        soundEffects.playDiamondCollect();
        setAccumulatedXp((prev) => prev + 10);
        setAccumulatedDiamonds((prev) => prev + 2);
      }
    } else {
      soundEffects.playWrongBuzzer();
      setMentorMood('scolding');
      setMentorSpeech(question.mentorScold);
    }
  };

  const handleNextQuestion = () => {
    soundEffects.playTacticalClick();
    if (isLastQuestion) {
      setIsFinished(true);
      onCompleteQuiz(correctCount, chapter.quiz.length, accumulatedXp, accumulatedDiamonds);
    } else {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setMentorMood('tactical');
      setMentorSpeech(`Question ${currentIdx + 2} of ${chapter.quiz.length}. Lock your eyes on the options.`);
    }
  };

  const handleRetryQuiz = () => {
    soundEffects.playTacticalClick();
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectCount(0);
    setIsFinished(false);
    setMentorMood('tactical');
    setMentorSpeech('Let us begin anew. Discard your hesitation, Cadet.');
  };

  const isProud = mentorMood === 'proud';
  const isScolding = mentorMood === 'scolding';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-neutral-900/95 border border-neutral-700/80 rounded-2xl p-4 sm:p-6 shadow-[0_0_50px_rgba(220,38,38,0.25)] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">{chapter.icon}</span>
            <div>
              <span className="text-[10px] font-mono-tech text-red-400 uppercase tracking-widest block">
                COMMANDER TRIAL // CHAPTER {chapter.number}
              </span>
              <h3 className="text-base sm:text-lg font-heading font-bold text-white">
                {chapter.title} Quiz
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!alreadyClaimed && (
              <span className="text-xs font-mono-tech text-amber-400 bg-amber-950/60 border border-amber-600/50 px-2 py-0.5 rounded">
                +10 XP &amp; +2 💎 Per First-Attempt Hit
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition cursor-pointer"
              aria-label="Close trial"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {!isFinished ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* MIKASA ACKERMAN MENTOR FRAME (Left Column on Desktop, Top/Side on Mobile) */}
            <div className="md:col-span-4 flex flex-col justify-between">
              {/* Responsive Portrait Frame */}
              <div
                className={`relative rounded-2xl p-2.5 sm:p-3 border transition-all duration-300 flex flex-col items-center justify-between overflow-hidden ${
                  isProud
                    ? 'bg-gradient-to-b from-amber-950/40 via-neutral-900 to-black border-emerald-500 shadow-[0_0_25px_rgba(16,185,129,0.4)]'
                    : isScolding
                    ? 'bg-gradient-to-b from-red-950/50 via-neutral-900 to-black border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.5)]'
                    : 'bg-gradient-to-b from-neutral-800/40 via-neutral-900 to-black border-neutral-700/80 shadow-[0_0_15px_rgba(0,0,0,0.6)]'
                }`}
              >
                {/* Tactical Header Badge */}
                <div className="w-full flex items-center justify-between pb-1.5 mb-1 border-b border-white/10 text-[10px] font-mono-tech">
                  <span className="text-red-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span>⚔️</span>
                    <span>MIKASA ACKERMAN</span>
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-widest text-[9px] ${
                      isProud
                        ? 'bg-emerald-500 text-black animate-pulse'
                        : isScolding
                        ? 'bg-red-600 text-white animate-bounce'
                        : 'bg-neutral-800 text-neutral-300'
                    }`}
                  >
                    {isProud ? 'PRAISE' : isScolding ? 'SCOLDING' : 'INSTRUCTOR'}
                  </span>
                </div>

                {/* Mikasa Character Portrait Container */}
                <div className="relative w-full h-44 sm:h-56 md:h-72 flex items-center justify-center overflow-hidden rounded-xl bg-neutral-950/60 p-1">
                  <img
                    src={MIKASA_IMAGE_SRC}
                    alt="Mikasa Ackerman — Academy Mentor"
                    className={`h-full w-full object-contain object-top transition-transform duration-300 select-none ${
                      isScolding ? 'scale-[1.03] filter contrast-125' : isProud ? 'scale-100' : 'scale-100'
                    }`}
                    loading="eager"
                  />

                  {/* Scolding / Praise visual overlay flare */}
                  {isScolding && (
                    <div className="absolute top-2 right-2 text-red-500 text-lg font-bold font-mono-tech animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,1)]">
                      💢
                    </div>
                  )}
                  {isProud && (
                    <div className="absolute top-2 right-2 text-amber-400 text-lg font-bold font-mono-tech animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,1)]">
                      ✨
                    </div>
                  )}
                </div>

                {/* Subtitle / Rank */}
                <div className="w-full pt-2 mt-1 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-tech text-neutral-400">
                  <span>SURVEY CORPS ELITE</span>
                  <span className="text-neutral-500">TACTICAL DRILL</span>
                </div>
              </div>

              {/* Mobile-only mentor dialogue preview when on small screens */}
              <div className="md:hidden mt-3">
                <div
                  className={`p-3 rounded-xl border text-xs leading-relaxed font-sans ${
                    isProud
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                      : isScolding
                      ? 'bg-red-950/50 border-red-600/70 text-red-100'
                      : 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
                  }`}
                >
                  <span className="text-[10px] font-mono-tech text-red-400 font-bold uppercase tracking-wider block mb-1">
                    MENTOR FEEDBACK:
                  </span>
                  &ldquo;{mentorSpeech}&rdquo;
                </div>
              </div>
            </div>

            {/* QUIZ CONTENT & MENTOR FEEDBACK (Right Column on Desktop) */}
            <div className="md:col-span-8 flex flex-col justify-between space-y-4">
              <div>
                {/* Desktop Mentor Speech Bubble */}
                <div className="hidden md:block mb-4">
                  <div
                    className={`p-3.5 rounded-xl border transition-all ${
                      isProud
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-100 shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
                        : isScolding
                        ? 'bg-red-950/40 border-red-600/60 text-red-100 shadow-[0_4px_20px_rgba(220,38,38,0.2)]'
                        : 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1 pb-1 border-b border-white/5">
                      <span className="text-xs font-heading font-bold text-red-400 tracking-wider flex items-center gap-1.5">
                        <span>⚔️</span>
                        <span>Mikasa Ackerman • Feedback</span>
                      </span>
                      <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest">
                        TACTICAL EVALUATION
                      </span>
                    </div>
                    <p className="text-sm font-sans text-neutral-200 font-medium leading-relaxed">
                      &ldquo;{mentorSpeech}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="flex items-center justify-between text-xs font-mono-tech text-neutral-400 mb-2">
                  <span>
                    QUESTION {currentIdx + 1} OF {chapter.quiz.length}
                  </span>
                  <span>
                    SCORE: {correctCount}/{currentIdx + (isAnswerSubmitted ? 1 : 0)}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-neutral-800 h-1.5 rounded-full mb-4 overflow-hidden">
                  <div
                    className="bg-red-600 h-full transition-all duration-300"
                    style={{ width: `${((currentIdx + 1) / chapter.quiz.length) * 100}%` }}
                  />
                </div>

                {/* Question Text */}
                <h4 className="text-base sm:text-lg font-sans font-bold text-white mb-4 leading-snug">
                  {question.question}
                </h4>

                {/* 4 Multiple-Choice Options */}
                <div className="space-y-2 mb-4">
                  {question.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === question.correctIndex;
                    let optionStyle =
                      'bg-black/40 border-neutral-800 hover:bg-neutral-800/60 text-neutral-200';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-red-950/60 border-red-500 text-red-200 line-through';
                      } else {
                        optionStyle = 'bg-black/30 border-neutral-800 text-neutral-500 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-red-950/40 border-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.3)]';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isAnswerSubmitted}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full p-2.5 sm:p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 cursor-pointer ${optionStyle}`}
                      >
                        <span
                          className={`w-6 h-6 rounded-md flex items-center justify-center font-mono-tech text-xs shrink-0 border ${
                            isSelected
                              ? 'border-red-400 bg-red-600 text-white'
                              : 'border-neutral-700 bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="pt-0.5 leading-relaxed">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Detailed Explanation Reveal */}
                {isAnswerSubmitted && (
                  <div className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 animate-in fade-in duration-300">
                    <span className="text-[11px] font-mono-tech text-neutral-400 uppercase tracking-wider block mb-1">
                      TACTICAL DEBRIEFING &amp; EXPLANATION:
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons: Submit / Next */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                {!isAnswerSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedOption !== null
                        ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] active:scale-95'
                        : 'bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700'
                    }`}
                  >
                    Confirm Tactical Strike
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-5 py-2 bg-neutral-100 hover:bg-white text-black rounded-xl text-xs sm:text-sm font-mono-tech font-bold uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>{isLastQuestion ? 'Complete Evaluation' : 'Advance Next Question'}</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div className="flex flex-col md:flex-row items-center gap-6 py-4">
            {/* Mikasa Portrait on Finished Screen */}
            <div className="w-36 h-48 sm:w-44 sm:h-60 shrink-0 rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950/80 p-2 shadow-2xl flex items-center justify-center">
              <img
                src={MIKASA_IMAGE_SRC}
                alt="Mikasa Ackerman — Academy Mentor"
                className="h-full w-full object-contain object-top"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-block p-3 rounded-2xl bg-neutral-800/80 border border-neutral-700">
                <span className="text-3xl">
                  {correctCount === chapter.quiz.length ? '👑' : correctCount >= 2 ? '🎖️' : '⚠️'}
                </span>
              </div>

              <h4 className="text-xl sm:text-2xl font-heading font-bold text-white">
                Trial Debriefing Concluded
              </h4>

              <p className="text-sm text-neutral-300 font-sans leading-relaxed">
                Mikasa has evaluated your combat readiness. You correctly resolved{' '}
                <span className="text-red-400 font-bold">{correctCount}</span> out of{' '}
                <span className="text-white font-bold">{chapter.quiz.length}</span> battle scenarios.
              </p>

              {/* First Attempt Reward summary */}
              {!alreadyClaimed && accumulatedXp > 0 && (
                <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-amber-950/50 border border-amber-600/50 text-amber-300 font-mono-tech text-xs">
                  <span>⭐ +{accumulatedXp} XP Awarded</span>
                  <span>💎 +{accumulatedDiamonds} Diamonds Secured</span>
                </div>
              )}

              {alreadyClaimed && (
                <div className="text-xs text-neutral-400 font-mono-tech">
                  (First-attempt rewards were already collected for this chapter. Drill mode active.)
                </div>
              )}

              <div className="flex items-center justify-center md:justify-start gap-3 pt-3">
                <button
                  onClick={handleRetryQuiz}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-mono-tech uppercase font-bold border border-neutral-700 transition cursor-pointer"
                >
                  Re-drill Scenario
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-mono-tech uppercase font-bold shadow-[0_0_15px_rgba(220,38,38,0.4)] transition cursor-pointer"
                >
                  Return to Academy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
