import React, { useState } from 'react';
import { classifyCandle } from '../utils/tradingAcademyLogic';
import { soundEffects } from '../utils/soundEffects';

interface Preset {
  name: string;
  open: number;
  high: number;
  low: number;
  close: number;
  icon: string;
}

const ANATOMY_PRESETS: Preset[] = [
  { name: 'Hammer (Reversal)', open: 100, high: 102, low: 84, close: 103, icon: '🔨' },
  { name: 'Shooting Star (Rejection)', open: 100, high: 116, low: 99, close: 98, icon: '☄️' },
  { name: 'Bullish Marubozu (Rout)', open: 90, high: 110, low: 90, close: 110, icon: '🟢' },
  { name: 'Bearish Marubozu (Breach)', open: 110, high: 110, low: 90, close: 90, icon: '🔴' },
  { name: 'Long-Legged Doji (Standoff)', open: 100, high: 114, low: 86, close: 100.2, icon: '⚖️' },
];

export const CandleAnatomyInteractive: React.FC<{ onExplore?: () => void }> = ({ onExplore }) => {
  const [open, setOpen] = useState(100);
  const [high, setHigh] = useState(115);
  const [low, setLow] = useState(85);
  const [close, setClose] = useState(108);

  const applyPreset = (preset: Preset) => {
    soundEffects.playTacticalClick();
    setOpen(preset.open);
    setHigh(preset.high);
    setLow(preset.low);
    setClose(preset.close);
    onExplore?.();
  };

  const handleOpenChange = (val: number) => {
    setOpen(val);
    if (val > high) setHigh(val);
    if (val < low) setLow(val);
  };

  const handleCloseChange = (val: number) => {
    setClose(val);
    if (val > high) setHigh(val);
    if (val < low) setLow(val);
  };

  const classification = classifyCandle(open, high, low, close);
  const isBullish = close > open;
  const isBearish = close < open;
  const isDoji = classification.type === 'doji';

  // SVG rendering geometry within 360px height
  const minVal = Math.min(low, 80);
  const maxVal = Math.max(high, 120);
  const valRange = maxVal - minVal || 1;

  const getY = (val: number) => {
    const padding = 30;
    const height = 300;
    const ratio = (val - minVal) / valRange;
    return height - padding - ratio * (height - 2 * padding);
  };

  const yHigh = getY(high);
  const yLow = getY(low);
  const yOpen = getY(open);
  const yClose = getY(close);

  const bodyTopY = Math.min(yOpen, yClose);
  const bodyBottomY = Math.max(yOpen, yClose);
  const bodyHeight = Math.max(3, bodyBottomY - bodyTopY);

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono-tech text-red-400 tracking-wider uppercase">
            CADET DRILL STATION // ANATOMY LAB
          </span>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
            <span>Interactive Candle Morphing Lab</span>
          </h3>
        </div>

        {/* Live Detected Pattern Badge */}
        <div className="flex items-center gap-2">
          <div
            className={`px-3 py-1.5 rounded-lg border font-mono-tech text-xs uppercase tracking-wider font-bold flex items-center gap-2 ${
              isBullish
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                : isBearish
                ? 'bg-red-950/60 border-red-500/50 text-red-400'
                : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
            }`}
          >
            <span className="w-2 h-2 rounded-full animate-ping bg-current" />
            <span>Detected: {classification.recognizedPattern}</span>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="mb-6">
        <label className="text-xs font-mono-tech text-neutral-400 uppercase tracking-wider mb-2 block">
          Tactical Formations Quick Presets:
        </label>
        <div className="flex flex-wrap gap-2">
          {ANATOMY_PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 hover:text-white border border-neutral-700/60 text-xs font-mono-tech tracking-wide text-neutral-300 transition-colors flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <span>{p.icon}</span>
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Interactive Canvas & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Visual Interactive SVG Diagram */}
        <div className="lg:col-span-6 bg-black/60 rounded-xl p-4 border border-neutral-800/80 flex flex-col items-center justify-center relative">
          <div className="absolute top-3 left-3 text-[10px] font-mono-tech text-neutral-400 uppercase tracking-widest bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
            DYNAMIC OHLC VISUALIZER
          </div>

          <svg viewBox="0 0 320 320" className="w-full max-w-[320px] h-72">
            {/* Grid guides */}
            <line x1="20" y1={yHigh} x2="300" y2={yHigh} stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <line x1="20" y1={yLow} x2="300" y2={yLow} stroke="#52525b" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

            {/* Price labels on right */}
            <text x="260" y={yHigh - 4} fill="#a1a1aa" fontSize="10" fontFamily="Rajdhani" fontWeight="bold">
              High: ${high.toFixed(1)}
            </text>
            <text x="260" y={yLow + 12} fill="#a1a1aa" fontSize="10" fontFamily="Rajdhani" fontWeight="bold">
              Low: ${low.toFixed(1)}
            </text>

            {/* Upper Wick */}
            <line
              x1="160"
              y1={yHigh}
              x2="160"
              y2={bodyTopY}
              stroke={isBullish ? '#10b981' : isBearish ? '#ef4444' : '#eab308'}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Lower Wick */}
            <line
              x1="160"
              y1={bodyBottomY}
              x2="160"
              y2={yLow}
              stroke={isBullish ? '#10b981' : isBearish ? '#ef4444' : '#eab308'}
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Real Body Rect */}
            <rect
              x="130"
              y={bodyTopY}
              width="60"
              height={bodyHeight}
              fill={isBullish ? '#10b981' : isBearish ? '#dc2626' : '#ca8a04'}
              stroke={isBullish ? '#059669' : isBearish ? '#991b1b' : '#a16207'}
              strokeWidth="2"
              rx="2"
              className="transition-all duration-150"
            />

            {/* Annotation arrows & labels */}
            {/* Upper Shadow label */}
            <path d={`M 175 ${(yHigh + bodyTopY) / 2} L 210 ${(yHigh + bodyTopY) / 2}`} stroke="#ef4444" strokeWidth="1.5" markerEnd="url(#arrow)" />
            <text x="215" y={(yHigh + bodyTopY) / 2 + 4} fill="#fca5a5" fontSize="10" fontFamily="Rajdhani">
              Upper Shadow ({classification.upperShadow})
            </text>

            {/* Real Body label */}
            <path d={`M 120 ${(bodyTopY + bodyBottomY) / 2} L 60 ${(bodyTopY + bodyBottomY) / 2}`} stroke="#60a5fa" strokeWidth="1.5" />
            <text x="15" y={(bodyTopY + bodyBottomY) / 2 + 4} fill="#93c5fd" fontSize="10" fontFamily="Rajdhani">
              Body ({classification.bodySize})
            </text>

            {/* Open / Close indicator tags */}
            <text x="195" y={yOpen + 4} fill="#e2e8f0" fontSize="10" fontFamily="Rajdhani">
              Open: ${open.toFixed(1)}
            </text>
            <text x="195" y={yClose + 4} fill={isBullish ? '#4ade80' : '#f87171'} fontSize="10" fontFamily="Rajdhani" fontWeight="bold">
              Close: ${close.toFixed(1)}
            </text>

            {/* Lower Shadow label */}
            <path d={`M 175 ${(bodyBottomY + yLow) / 2} L 210 ${(bodyBottomY + yLow) / 2}`} stroke="#38bdf8" strokeWidth="1.5" />
            <text x="215" y={(bodyBottomY + yLow) / 2 + 4} fill="#7dd3fc" fontSize="10" fontFamily="Rajdhani">
              Lower Shadow ({classification.lowerShadow})
            </text>
          </svg>

          {/* Morphing description */}
          <div className="w-full mt-2 text-center text-xs text-neutral-300 font-sans italic bg-neutral-900/60 p-2 rounded border border-neutral-800">
            {classification.description}
          </div>
        </div>

        {/* Right: Sliders & Proportions Metrics */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-black/40 rounded-xl p-4 border border-neutral-800/80 space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono-tech mb-1">
                <span className="text-neutral-400">HIGH (Maximum Reached):</span>
                <span className="text-amber-400 font-bold">${high.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="90"
                max="140"
                step="0.5"
                value={high}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHigh(Math.max(val, Math.max(open, close)));
                }}
                className="w-full accent-amber-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                aria-label="High Price"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono-tech mb-1">
                <span className="text-neutral-400">OPEN (Starting Price):</span>
                <span className="text-blue-400 font-bold">${open.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="80"
                max="130"
                step="0.5"
                value={open}
                onChange={(e) => handleOpenChange(Number(e.target.value))}
                className="w-full accent-blue-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                aria-label="Open Price"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono-tech mb-1">
                <span className="text-neutral-400">CLOSE (Final Settled Price):</span>
                <span className={isBullish ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  ${close.toFixed(1)} ({isBullish ? '+Bullish' : isBearish ? '-Bearish' : 'Neutral'})
                </span>
              </div>
              <input
                type="range"
                min="80"
                max="130"
                step="0.5"
                value={close}
                onChange={(e) => handleCloseChange(Number(e.target.value))}
                className={`w-full h-1.5 bg-neutral-700 rounded-lg cursor-pointer ${
                  isBullish ? 'accent-emerald-500' : 'accent-red-500'
                }`}
                aria-label="Close Price"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono-tech mb-1">
                <span className="text-neutral-400">LOW (Deepest Dip):</span>
                <span className="text-purple-400 font-bold">${low.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="70"
                max="110"
                step="0.5"
                value={low}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setLow(Math.min(val, Math.min(open, close)));
                }}
                className="w-full accent-purple-500 h-1.5 bg-neutral-700 rounded-lg cursor-pointer"
                aria-label="Low Price"
              />
            </div>
          </div>

          {/* Metrics breakdown card */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-neutral-800/40 p-2.5 rounded-lg border border-neutral-700/50">
              <div className="text-[10px] font-mono-tech text-neutral-400 uppercase">Upper Wick Ratio</div>
              <div className="text-sm font-mono-tech font-bold text-red-300">
                {(classification.upperShadowRatio * 100).toFixed(0)}%
              </div>
            </div>
            <div className="bg-neutral-800/40 p-2.5 rounded-lg border border-neutral-700/50">
              <div className="text-[10px] font-mono-tech text-neutral-400 uppercase">Body Dominance</div>
              <div className="text-sm font-mono-tech font-bold text-white">
                {(classification.bodyRatio * 100).toFixed(0)}%
              </div>
            </div>
            <div className="bg-neutral-800/40 p-2.5 rounded-lg border border-neutral-700/50">
              <div className="text-[10px] font-mono-tech text-neutral-400 uppercase">Lower Wick Ratio</div>
              <div className="text-sm font-mono-tech font-bold text-emerald-300">
                {(classification.lowerShadowRatio * 100).toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
