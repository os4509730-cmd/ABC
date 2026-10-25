import React, { useState } from 'react';
import { soundEffects } from '../utils/soundEffects';

interface PatternDetail {
  id: string;
  name: string;
  category: 'Bullish Reversal' | 'Bearish Reversal' | 'Indecision' | 'Momentum Continuation';
  badgeColor: string;
  icon: string;
  reliability: 'High' | 'Extreme' | 'Moderate';
  description: string;
  contextRule: string;
  invalidationLevel: string;
  candles: { open: number; high: number; low: number; close: number; color: 'green' | 'red' | 'gray' }[];
}

const DOJO_PATTERNS: PatternDetail[] = [
  {
    id: 'hammer',
    name: 'Hammer',
    category: 'Bullish Reversal',
    badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
    icon: '🔨',
    reliability: 'High',
    description: 'Forms after a downtrend. The long lower wick (at least 2x the body length) shows aggressive buyer defense at support.',
    contextRule: 'Must appear after a downward move. Wait for the next candle to close above the Hammer body for confirmation.',
    invalidationLevel: 'Set stop-loss 1-2 ticks beneath the lowest wick tip.',
    candles: [
      { open: 110, high: 112, low: 104, close: 105, color: 'red' },
      { open: 105, high: 106, low: 96, close: 104, color: 'green' }, // Hammer
      { open: 104, high: 114, low: 103, close: 112, color: 'green' }, // Confirmation
    ],
  },
  {
    id: 'shooting-star',
    name: 'Shooting Star',
    category: 'Bearish Reversal',
    badgeColor: 'border-red-500 text-red-400 bg-red-950/40',
    icon: '☄️',
    reliability: 'High',
    description: 'Forms at the peak of an uptrend. The long upper wick (2x body) shows buyers were ambushed and thrown back down.',
    contextRule: 'Valid only at resistance or overbought conditions. Bearish confirmation candle required next.',
    invalidationLevel: 'Set stop-loss immediately above the high of the upper shadow.',
    candles: [
      { open: 98, high: 108, low: 97, close: 107, color: 'green' },
      { open: 107, high: 120, low: 106, close: 108, color: 'red' }, // Shooting Star
      { open: 108, high: 109, low: 99, close: 101, color: 'red' }, // Confirmation
    ],
  },
  {
    id: 'bullish-engulfing',
    name: 'Bullish Engulfing',
    category: 'Bullish Reversal',
    badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
    icon: '🛡️',
    reliability: 'Extreme',
    description: 'A large green candle body completely overtakes and closes above the prior red candle body, signaling a total shift in dominance.',
    contextRule: 'Best when the green body swallows multiple prior candles at support with heavy volume surge.',
    invalidationLevel: 'Place stop-loss below the low of the large green engulfing candle.',
    candles: [
      { open: 105, high: 106, low: 99, close: 100, color: 'red' },
      { open: 98, high: 112, low: 97, close: 111, color: 'green' }, // Engulfing
    ],
  },
  {
    id: 'bearish-engulfing',
    name: 'Bearish Engulfing',
    category: 'Bearish Reversal',
    badgeColor: 'border-red-500 text-red-400 bg-red-950/40',
    icon: '🩸',
    reliability: 'Extreme',
    description: 'A crushing red candle swallows the previous green candle body. The defense forces were overrun by titan sellers.',
    contextRule: 'Must form at a swing high or overhead resistance ceiling.',
    invalidationLevel: 'Stop-loss belongs just above the peak of the red engulfing bar.',
    candles: [
      { open: 100, high: 108, low: 99, close: 107, color: 'green' },
      { open: 108, high: 110, low: 95, close: 96, color: 'red' }, // Engulfing
    ],
  },
  {
    id: 'doji',
    name: 'Long-Legged Doji',
    category: 'Indecision',
    badgeColor: 'border-amber-500 text-amber-300 bg-amber-950/40',
    icon: '⚖️',
    reliability: 'Moderate',
    description: 'Equal open and close prices with long shadows in both directions. Both bulls and bears fought violently with zero progress.',
    contextRule: 'Do not trade directly on a Doji alone. Treat it as a warning that trend momentum has stalled.',
    invalidationLevel: 'Wait for the breakout above or below the Doji extremes before entering.',
    candles: [
      { open: 95, high: 106, low: 94, close: 105, color: 'green' },
      { open: 105, high: 116, low: 94, close: 105.1, color: 'gray' }, // Doji
      { open: 105, high: 106, low: 96, close: 97, color: 'red' },
    ],
  },
  {
    id: 'marubozu',
    name: 'Bullish Marubozu',
    category: 'Momentum Continuation',
    badgeColor: 'border-emerald-500 text-emerald-400 bg-emerald-950/40',
    icon: '⚔️',
    reliability: 'High',
    description: 'A tall green candle with virtually zero wicks. Buyers opened at the low and closed at the absolute peak without hesitating.',
    contextRule: 'Confirms aggressive trend continuation or decisive breakout through resistance.',
    invalidationLevel: 'Place stop-loss below the halfway point of the Marubozu body.',
    candles: [
      { open: 100, high: 101, low: 98, close: 100, color: 'gray' },
      { open: 100, high: 118, low: 100, close: 118, color: 'green' }, // Marubozu
    ],
  },
];

export const InteractivePatternDojo: React.FC<{ onPatternInspected?: () => void }> = ({
  onPatternInspected,
}) => {
  const [activePatternId, setActivePatternId] = useState<string>('hammer');
  const activePattern = DOJO_PATTERNS.find((p) => p.id === activePatternId) || DOJO_PATTERNS[0];

  const handleSelect = (id: string) => {
    soundEffects.playTacticalClick();
    setActivePatternId(id);
    onPatternInspected?.();
  };

  // Helper to render candles inside SVG
  const svgHeight = 220;
  const svgWidth = 320;
  const minVal = Math.min(...activePattern.candles.map((c) => c.low)) - 4;
  const maxVal = Math.max(...activePattern.candles.map((c) => c.high)) + 4;
  const range = maxVal - minVal || 1;

  const getY = (val: number) => {
    const pad = 24;
    return svgHeight - pad - ((val - minVal) / range) * (svgHeight - 2 * pad);
  };

  const candleW = 34;
  const spacing = svgWidth / (activePattern.candles.length + 1);

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono-tech text-red-400 tracking-wider uppercase">
            SCOUT COMBAT DRILLS // PATTERN DOJO
          </span>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
            <span>High-Probability Candlestick Signatures</span>
          </h3>
        </div>

        <div className="text-xs font-mono-tech text-neutral-400">
          Click any pattern to inspect tactical execution parameters.
        </div>
      </div>

      {/* Pattern Selector Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-6">
        {DOJO_PATTERNS.map((p) => {
          const isActive = p.id === activePatternId;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-neutral-800 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)] scale-[1.02]'
                  : 'bg-black/40 border-neutral-800 hover:bg-neutral-800/60 hover:border-neutral-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-lg">{p.icon}</span>
                <span className="text-[10px] font-mono-tech text-neutral-400 uppercase">
                  {p.reliability}
                </span>
              </div>
              <div className="font-heading font-bold text-xs text-white truncate">{p.name}</div>
              <div className="text-[10px] text-neutral-400 font-mono-tech truncate mt-0.5">
                {p.category}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pattern Detailed Briefing */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-black/50 p-5 rounded-2xl border border-neutral-800">
        {/* Left: Interactive Multi-Candle Formation Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-neutral-950 rounded-xl p-4 border border-neutral-800/80">
          <div className="text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest mb-2">
            FORMATION VISUAL RECON
          </div>

          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[280px] h-52">
            {activePattern.candles.map((c, idx) => {
              const x = (idx + 1) * spacing;
              const yHigh = getY(c.high);
              const yLow = getY(c.low);
              const yOpen = getY(c.open);
              const yClose = getY(c.close);

              const bodyTop = Math.min(yOpen, yClose);
              const bodyBottom = Math.max(yOpen, yClose);
              const bodyH = Math.max(3, bodyBottom - bodyTop);

              const colorFill =
                c.color === 'green' ? '#10b981' : c.color === 'red' ? '#dc2626' : '#eab308';
              const strokeColor =
                c.color === 'green' ? '#059669' : c.color === 'red' ? '#991b1b' : '#ca8a04';

              return (
                <g key={idx}>
                  {/* Wick */}
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={colorFill}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Body */}
                  <rect
                    x={x - candleW / 2}
                    y={bodyTop}
                    width={candleW}
                    height={bodyH}
                    fill={colorFill}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    rx="2"
                  />
                  {/* Step label */}
                  <text
                    x={x}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fill="#71717a"
                    fontSize="9"
                    fontFamily="Rajdhani"
                  >
                    Bar {idx + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="text-[11px] font-mono-tech text-neutral-400 mt-2 text-center">
            Reliability Rating:{' '}
            <span className="text-amber-400 font-bold">{activePattern.reliability} Conviction</span>
          </div>
        </div>

        {/* Right: Tactical Rules & Execution Doctrine */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full border text-xs font-mono-tech font-bold uppercase ${activePattern.badgeColor}`}>
              {activePattern.category}
            </span>
            <h4 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <span>{activePattern.name}</span>
            </h4>
          </div>

          <p className="text-sm font-sans text-neutral-200 leading-relaxed">
            {activePattern.description}
          </p>

          <div className="space-y-2.5">
            <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
              <span className="text-[11px] font-mono-tech text-red-400 uppercase font-bold block mb-1">
                ⚔️ COMMANDER&apos;S CONTEXT CRITERIA:
              </span>
              <p className="text-xs text-neutral-300 font-sans">{activePattern.contextRule}</p>
            </div>

            <div className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-800">
              <span className="text-[11px] font-mono-tech text-amber-400 uppercase font-bold block mb-1">
                🛡️ INVALIDATION &amp; STOP-LOSS WALL:
              </span>
              <p className="text-xs text-neutral-300 font-sans">
                {activePattern.invalidationLevel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
