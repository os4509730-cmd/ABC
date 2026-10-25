import React from 'react';
import { MentorExpression } from '../types/academy';

interface MentorAvatarProps {
  expression?: MentorExpression;
  quote?: string;
  subquote?: string;
  compact?: boolean;
  onInteract?: () => void;
}

export const MentorAvatar: React.FC<MentorAvatarProps> = ({
  expression = 'neutral',
  quote,
  subquote = 'Captain Mikoto — Vanguard Academy Commander',
  compact = false,
  onInteract,
}) => {
  // Expression nuances
  const isProud = expression === 'proud';
  const isScolding = expression === 'scolding';
  const isTactical = expression === 'tactical';
  const isIntense = expression === 'intense';

  return (
    <div className={`relative flex items-center ${compact ? 'gap-3' : 'flex-col sm:flex-row gap-5'} transition-all`}>
      {/* Anime Mentor Character Card / Bust */}
      <div
        onClick={onInteract}
        className={`relative group cursor-pointer select-none shrink-0 rounded-2xl p-1 bg-gradient-to-b ${
          isScolding
            ? 'from-red-600 via-red-950 to-neutral-900 shadow-[0_0_25px_rgba(220,38,38,0.5)]'
            : isProud
            ? 'from-amber-400 via-amber-950 to-neutral-900 shadow-[0_0_25px_rgba(245,158,11,0.4)]'
            : isIntense
            ? 'from-red-500 via-neutral-900 to-black shadow-[0_0_30px_rgba(239,68,68,0.6)]'
            : 'from-neutral-700 via-neutral-900 to-neutral-950 border border-red-900/40'
        } transition-transform duration-300 active:scale-95`}
        title="Captain Mikoto — Click to request tactical battle advice"
      >
        {/* Glow Ring Behind */}
        <div
          className={`absolute -inset-1 rounded-2xl filter blur-sm opacity-50 ${
            isScolding ? 'bg-red-600 animate-pulse' : isProud ? 'bg-amber-400' : 'bg-red-800/20'
          }`}
        />

        {/* Tactical Bust SVG */}
        <div
          className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-neutral-900 to-[#0c0d12] border border-neutral-800 flex items-center justify-center ${
            compact ? 'w-14 h-14' : 'w-24 h-24 sm:w-28 sm:h-28'
          }`}
        >
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full object-cover"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fde047" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#ffedd5" />
                <stop offset="100%" stopColor="#fed7aa" />
              </linearGradient>
              <linearGradient id="hairGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#262626" />
                <stop offset="50%" stopColor="#171717" />
                <stop offset="100%" stopColor="#0a0a0a" />
              </linearGradient>
              <linearGradient id="scarfGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b91c1c" />
                <stop offset="50%" stopColor="#991b1b" />
                <stop offset="100%" stopColor="#7f1d1d" />
              </linearGradient>
              <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="50%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#291204" />
              </linearGradient>
            </defs>

            {/* Background Aura */}
            <circle cx="60" cy="60" r="54" fill="#12141c" />
            <path
              d="M10 110 Q60 85 110 110"
              stroke={isScolding ? '#ef4444' : '#b91c1c'}
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Tactical Scout Jacket Shoulders */}
            <path
              d="M15 120 L25 88 L45 84 L60 92 L75 84 L95 88 L105 120 Z"
              fill="url(#coatGrad)"
              stroke="#92400e"
              strokeWidth="1.5"
            />

            {/* Leather harness straps & buckles */}
            <path d="M30 90 L50 120" stroke="#1c1917" strokeWidth="3" />
            <path d="M90 90 L70 120" stroke="#1c1917" strokeWidth="3" />
            <rect x="47" y="102" width="6" height="4" fill="#ca8a04" rx="1" />
            <rect x="67" y="102" width="6" height="4" fill="#ca8a04" rx="1" />

            {/* Neck & Chin */}
            <path d="M48 68 L72 68 L70 82 L50 82 Z" fill="#fed7aa" />
            <path d="M45 45 C45 70 75 70 75 45 Z" fill="url(#skinGrad)" />

            {/* Signature Crimson Scarf wrapped around neck and chin */}
            <path
              d="M34 68 C34 60 48 58 60 58 C72 58 86 60 86 68 C86 76 76 84 60 84 C44 84 34 76 34 68 Z"
              fill="url(#scarfGrad)"
              stroke="#450a0a"
              strokeWidth="1.2"
            />
            {/* Scarf fold folds and trailing knot */}
            <path
              d="M44 72 C48 76 54 80 58 86 C58 96 52 104 50 110"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M48 74 C54 80 62 82 72 74"
              stroke="#7f1d1d"
              strokeWidth="1.5"
            />

            {/* Ears */}
            <ellipse cx="42" cy="48" rx="3.5" ry="5.5" fill="#fed7aa" />
            <ellipse cx="78" cy="48" rx="3.5" ry="5.5" fill="#fed7aa" />

            {/* Eyes & Eyebrows */}
            {isScolding ? (
              // Fierce scolding eyes (angled down, intense anime sweat / anger mark)
              <>
                <path d="M46 38 L57 42" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M74 38 L63 42" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
                <ellipse cx="51" cy="45" rx="3.5" ry="2.5" fill="#0f172a" />
                <ellipse cx="69" cy="45" rx="3.5" ry="2.5" fill="#0f172a" />
                <circle cx="50" cy="44" r="1.2" fill="#ef4444" />
                <circle cx="68" cy="44" r="1.2" fill="#ef4444" />
                {/* Scolding vein cross mark */}
                <path d="M82 25 L92 25 M87 20 L87 30" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                <path d="M57 56 Q60 53 63 56" stroke="#450a0a" strokeWidth="1.8" fill="none" />
              </>
            ) : isProud ? (
              // Proud approving eyes (curved gentle smile, glint)
              <>
                <path d="M46 37 Q52 35 58 39" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
                <path d="M74 37 Q68 35 62 39" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
                <path d="M47 45 Q52 41 57 45" stroke="#0f172a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M63 45 Q68 41 73 45" stroke="#0f172a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                {/* Proud blush cheeks */}
                <ellipse cx="44" cy="50" rx="4" ry="1.5" fill="#f87171" opacity="0.4" />
                <ellipse cx="76" cy="50" rx="4" ry="1.5" fill="#f87171" opacity="0.4" />
                {/* Gentle mouth smile above scarf */}
                <path d="M56 54 Q60 57 64 54" stroke="#450a0a" strokeWidth="1.8" fill="none" />
              </>
            ) : (
              // Sharp tactical / disciplined neutral eyes
              <>
                <path d="M46 37 L58 40" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
                <path d="M74 37 L62 40" stroke="#171717" strokeWidth="2" strokeLinecap="round" />
                {/* Steely grey irises */}
                <ellipse cx="52" cy="45" rx="4.5" ry="4" fill="#334155" />
                <ellipse cx="68" cy="45" rx="4.5" ry="4" fill="#334155" />
                <circle cx="52" cy="45" r="2.2" fill="#090d16" />
                <circle cx="68" cy="45" r="2.2" fill="#090d16" />
                {/* Eye reflections */}
                <circle cx="50.5" cy="43.5" r="1.2" fill="#ffffff" />
                <circle cx="66.5" cy="43.5" r="1.2" fill="#ffffff" />
                {/* Firm mouth line */}
                <path d="M57 55 L63 55" stroke="#450a0a" strokeWidth="1.6" strokeLinecap="round" />
              </>
            )}

            {/* Nose bridge */}
            <path d="M60 44 L59 49" stroke="#d97706" strokeWidth="1" strokeLinecap="round" />

            {/* Jet-Black Short Anime Bob Hair with side-swept bangs */}
            {/* Top crown hair */}
            <path
              d="M34 42 C34 18 52 14 60 14 C72 14 86 20 86 42 C88 56 86 64 82 70 C80 62 82 52 79 46 C75 32 68 28 60 28 C50 28 42 34 39 48 C36 56 38 64 36 70 C34 62 33 54 34 42 Z"
              fill="url(#hairGrad)"
            />
            {/* Front Bangs & Side locks framing cheeks */}
            <path
              d="M36 44 L43 56 L47 44 L54 60 L60 42 L66 61 L72 45 L78 57 L84 44 C82 32 76 22 60 22 C44 22 38 32 36 44 Z"
              fill="#171717"
            />
            {/* Distinctive center-left side fringe (Mikasa signature bang) */}
            <path
              d="M54 26 C54 38 48 50 45 56 C50 50 56 42 58 34 Z"
              fill="#262626"
            />

            {/* Crest on Coat (Wings of the Academy) */}
            <path
              d="M24 100 L30 106 L28 114 L22 108 Z"
              fill="#e2e8f0"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
            <path
              d="M96 100 L90 106 L92 114 L98 108 Z"
              fill="#38bdf8"
              stroke="#0f172a"
              strokeWidth="0.8"
            />
          </svg>

          {/* Expression status badge on bottom right */}
          <div
            className={`absolute bottom-1 right-1 text-[10px] px-1.5 py-0.5 rounded-full font-mono-tech uppercase font-bold tracking-wider ${
              isScolding
                ? 'bg-red-600 text-white animate-bounce'
                : isProud
                ? 'bg-amber-500 text-black'
                : isIntense
                ? 'bg-red-700 text-white'
                : 'bg-neutral-800 text-neutral-300'
            }`}
          >
            {expression}
          </div>
        </div>
      </div>

      {/* Dynamic Dialogue Box / Speech Bubble */}
      {quote && (
        <div className="flex-1 w-full relative">
          <div
            className={`relative p-3.5 sm:p-4 rounded-xl border ${
              isScolding
                ? 'bg-red-950/40 border-red-700/60 text-red-100 shadow-[0_4px_20px_rgba(220,38,38,0.2)]'
                : isProud
                ? 'bg-amber-950/30 border-amber-500/50 text-amber-100 shadow-[0_4px_20px_rgba(245,158,11,0.15)]'
                : 'bg-neutral-900/90 border-neutral-800 text-neutral-200'
            } backdrop-blur-md`}
          >
            {/* Header label with small sword badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-white/5">
              <span className="text-xs font-heading font-bold text-red-400 tracking-wider flex items-center gap-1.5">
                <span>⚔️</span>
                <span>{subquote}</span>
              </span>
              <span className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest">
                TACTICAL MENTOR
              </span>
            </div>

            {/* Quote dialogue text */}
            <p className="text-sm sm:text-base leading-relaxed font-sans text-neutral-200 font-medium">
              &ldquo;{quote}&rdquo;
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
