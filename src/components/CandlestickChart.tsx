import React, { useState } from 'react';
import { SAMPLE_CANDLE_FEED } from '../data/chaptersData';
import { CandleData } from '../types/academy';
import { soundEffects } from '../utils/soundEffects';

interface CandlestickChartProps {
  onCandleSelect?: (candle: CandleData) => void;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({ onCandleSelect }) => {
  const [candles, setCandles] = useState<CandleData[]>(SAMPLE_CANDLE_FEED);
  const [hoveredCandle, setHoveredCandle] = useState<CandleData | null>(candles[candles.length - 1]);
  const [showSupportResistance, setShowSupportResistance] = useState(true);
  const [showSMA, setShowSMA] = useState(true);
  const [showVolume, setShowVolume] = useState(true);
  const [activeTimeframe, setActiveTimeframe] = useState<'15M' | '1H' | '4H' | '1D'>('15M');

  // Chart Dimensions
  const width = 800;
  const height = 400;
  const chartPadding = { top: 30, right: 65, bottom: 60, left: 20 };
  const plotWidth = width - chartPadding.left - chartPadding.right;
  const plotHeight = height - chartPadding.top - chartPadding.bottom;

  // Price Extents
  const minPrice = Math.min(...candles.map((c) => c.low)) - 1.5;
  const maxPrice = Math.max(...candles.map((c) => c.high)) + 1.5;
  const priceRange = maxPrice - minPrice || 1;

  // Volume Extents
  const maxVolume = Math.max(...candles.map((c) => c.volume)) * 1.3 || 1;

  // Helpers
  const getY = (price: number) => {
    return chartPadding.top + plotHeight - ((price - minPrice) / priceRange) * plotHeight;
  };

  const candleSpacing = plotWidth / candles.length;
  const candleBodyWidth = Math.max(10, Math.min(24, candleSpacing * 0.65));

  // Compute 5-period Simple Moving Average (SMA)
  const smaPoints: { x: number; y: number }[] = [];
  const smaPeriod = 3;
  for (let i = 0; i < candles.length; i++) {
    if (i >= smaPeriod - 1) {
      let sum = 0;
      for (let j = 0; j < smaPeriod; j++) {
        sum += candles[i - j].close;
      }
      const avg = sum / smaPeriod;
      const x = chartPadding.left + i * candleSpacing + candleSpacing / 2;
      smaPoints.push({ x, y: getY(avg) });
    }
  }

  const smaPath = smaPoints.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // Simulate next candle on cadet command
  const handleSimulateNextStep = () => {
    soundEffects.playBladeSlash();
    const last = candles[candles.length - 1];
    const isBull = Math.random() > 0.45;
    const delta = (Math.random() * 2.5 + 0.5) * (isBull ? 1 : -1);
    const newOpen = last.close;
    const newClose = Number((newOpen + delta).toFixed(1));
    const newHigh = Number((Math.max(newOpen, newClose) + Math.random() * 1.8).toFixed(1));
    const newLow = Number((Math.min(newOpen, newClose) - Math.random() * 1.8).toFixed(1));
    const newVol = Math.floor(Math.random() * 25000 + 10000);

    const [hours, minutes] = last.time.split(':').map(Number);
    let nextMinutes = minutes + 15;
    let nextHours = hours;
    if (nextMinutes >= 60) {
      nextHours += 1;
      nextMinutes -= 60;
    }
    const timeStr = `${String(nextHours).padStart(2, '0')}:${String(nextMinutes).padStart(2, '0')}`;

    const newCandle: CandleData = {
      id: `c-${Date.now()}`,
      time: timeStr,
      open: newOpen,
      high: newHigh,
      low: newLow,
      close: newClose,
      volume: newVol,
      label: isBull ? 'Recon Advance' : 'Titan Pressure',
    };

    const nextList = [...candles.slice(1), newCandle];
    setCandles(nextList);
    setHoveredCandle(newCandle);
  };

  const handleResetFeed = () => {
    soundEffects.playTacticalClick();
    setCandles(SAMPLE_CANDLE_FEED);
    setHoveredCandle(SAMPLE_CANDLE_FEED[SAMPLE_CANDLE_FEED.length - 1]);
  };

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-6 backdrop-blur-md shadow-2xl relative">
      {/* Top Warning Banner / Non-financial advice disclaimer */}
      <div className="mb-4 bg-red-950/40 border border-red-800/40 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-red-400 font-bold text-sm">⚠️</span>
          <div>
            <span className="font-mono-tech font-bold text-red-300 uppercase tracking-wider">
              SIMULATED ACADEMY DRILL DATA
            </span>
            <span className="text-neutral-400 block sm:inline sm:ml-2">
              Wall Rose District Asset (Synthetic Data). Educational purposes only. No guaranteed signals or financial advice.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-mono-tech text-emerald-400 font-bold uppercase">
            FEED: ACTIVE SIM
          </span>
        </div>
      </div>

      {/* Chart Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-800">
        <div>
          <h3 className="text-base sm:text-lg font-heading font-bold text-white flex items-center gap-2">
            <span>Wall Maria Defensive Candlestick Feed</span>
            <span className="text-xs px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono-tech">
              WMA/USD
            </span>
          </h3>
          <p className="text-xs text-neutral-400 font-sans">
            Hover over candles to inspect Open, High, Low, Close, Volume, and identified reversal signatures.
          </p>
        </div>

        {/* Timeframes & Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-neutral-800/80 p-0.5 rounded-lg border border-neutral-700/60">
            {(['15M', '1H', '4H', '1D'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => {
                  soundEffects.playTacticalClick();
                  setActiveTimeframe(tf);
                }}
                className={`px-2.5 py-1 text-xs font-mono-tech rounded font-bold transition-all cursor-pointer ${
                  activeTimeframe === tf
                    ? 'bg-red-600 text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              soundEffects.playTacticalClick();
              setShowSupportResistance(!showSupportResistance);
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono-tech border transition-all cursor-pointer ${
              showSupportResistance
                ? 'bg-amber-950/60 border-amber-500/60 text-amber-300'
                : 'bg-neutral-800 border-neutral-700 text-neutral-400'
            }`}
            title="Toggle Support and Resistance Fortress Walls"
          >
            🏰 S/R Walls
          </button>

          <button
            onClick={() => {
              soundEffects.playTacticalClick();
              setShowSMA(!showSMA);
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono-tech border transition-all cursor-pointer ${
              showSMA
                ? 'bg-blue-950/60 border-blue-500/60 text-blue-300'
                : 'bg-neutral-800 border-neutral-700 text-neutral-400'
            }`}
            title="Toggle Tactical Trend SMA Line"
          >
            📈 SMA (3)
          </button>

          <button
            onClick={() => {
              soundEffects.playTacticalClick();
              setShowVolume(!showVolume);
            }}
            className={`px-2.5 py-1 rounded text-xs font-mono-tech border transition-all cursor-pointer ${
              showVolume
                ? 'bg-purple-950/60 border-purple-500/60 text-purple-300'
                : 'bg-neutral-800 border-neutral-700 text-neutral-400'
            }`}
          >
            📊 Volume
          </button>

          <button
            onClick={handleSimulateNextStep}
            className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white rounded text-xs font-mono-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>⚔️</span>
            <span>Advance Battle Step</span>
          </button>

          <button
            onClick={handleResetFeed}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition cursor-pointer"
            title="Reset feed"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Hovered Candlestick HUD Inspector */}
      {hoveredCandle && (
        <div className="bg-black/50 border border-neutral-800 rounded-xl p-3 mb-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
          <div className="flex items-center gap-4">
            <span className="text-neutral-400">
              TIME: <span className="text-white font-bold">{hoveredCandle.time}</span>
            </span>
            <span className="text-neutral-400">
              OPEN: <span className="text-blue-400 font-bold">${hoveredCandle.open.toFixed(1)}</span>
            </span>
            <span className="text-neutral-400">
              HIGH: <span className="text-amber-400 font-bold">${hoveredCandle.high.toFixed(1)}</span>
            </span>
            <span className="text-neutral-400">
              LOW: <span className="text-purple-400 font-bold">${hoveredCandle.low.toFixed(1)}</span>
            </span>
            <span className="text-neutral-400">
              CLOSE:{' '}
              <span
                className={`font-bold ${
                  hoveredCandle.close >= hoveredCandle.open ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                ${hoveredCandle.close.toFixed(1)}
              </span>
            </span>
            {showVolume && (
              <span className="text-neutral-400">
                VOL: <span className="text-neutral-200">{hoveredCandle.volume.toLocaleString()}</span>
              </span>
            )}
          </div>

          {hoveredCandle.pattern && (
            <div className="px-2.5 py-0.5 rounded-full bg-red-950/70 border border-red-500/50 text-red-300 font-bold text-[11px] flex items-center gap-1.5">
              <span>🎯 SIGNATURE:</span>
              <span>{hoveredCandle.pattern}</span>
            </div>
          )}
        </div>
      )}

      {/* SVG Canvas Candlestick Chart */}
      <div className="relative overflow-x-auto select-none bg-[#090b10] rounded-xl border border-neutral-800/80">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[640px]"
          style={{ maxHeight: '440px' }}
        >
          {/* Grid lines */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
            const price = minPrice + ratio * priceRange;
            const y = getY(price);
            return (
              <g key={ratio}>
                <line
                  x1={chartPadding.left}
                  y1={y}
                  x2={width - chartPadding.right}
                  y2={y}
                  stroke="#27272a"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={width - chartPadding.right + 8}
                  y={y + 4}
                  fill="#71717a"
                  fontSize="10"
                  fontFamily="Rajdhani"
                >
                  ${price.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Support Wall (111.5) */}
          {showSupportResistance && (
            <g>
              <line
                x1={chartPadding.left}
                y1={getY(111.5)}
                x2={width - chartPadding.right}
                y2={getY(111.5)}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <rect
                x={chartPadding.left + 5}
                y={getY(111.5) - 16}
                width="140"
                height="16"
                fill="#064e3b"
                rx="3"
                opacity="0.85"
              />
              <text
                x={chartPadding.left + 10}
                y={getY(111.5) - 4}
                fill="#6ee7b7"
                fontSize="9"
                fontFamily="Rajdhani"
                fontWeight="bold"
              >
                🏰 WALL ROSE SUPPORT ($111.5)
              </text>
            </g>
          )}

          {/* Resistance Wall (131.0) */}
          {showSupportResistance && (
            <g>
              <line
                x1={chartPadding.left}
                y1={getY(131.0)}
                x2={width - chartPadding.right}
                y2={getY(131.0)}
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <rect
                x={chartPadding.left + 5}
                y={getY(131.0) - 16}
                width="155"
                height="16"
                fill="#7f1d1d"
                rx="3"
                opacity="0.85"
              />
              <text
                x={chartPadding.left + 10}
                y={getY(131.0) - 4}
                fill="#fca5a5"
                fontSize="9"
                fontFamily="Rajdhani"
                fontWeight="bold"
              >
                ⚔️ WALL MARIA CEILING ($131.0)
              </text>
            </g>
          )}

          {/* Volume bars (in bottom 60px) */}
          {showVolume &&
            candles.map((c, i) => {
              const xCenter = chartPadding.left + i * candleSpacing + candleSpacing / 2;
              const volHeight = (c.volume / maxVolume) * 50;
              const yVol = height - chartPadding.bottom + 10;
              const isBull = c.close >= c.open;
              return (
                <rect
                  key={`vol-${c.id}`}
                  x={xCenter - candleBodyWidth / 2}
                  y={yVol - volHeight}
                  width={candleBodyWidth}
                  height={volHeight}
                  fill={isBull ? '#059669' : '#b91c1c'}
                  opacity={hoveredCandle?.id === c.id ? 0.9 : 0.4}
                />
              );
            })}

          {/* 3-period SMA line */}
          {showSMA && smaPath && (
            <path
              d={smaPath}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />
          )}

          {/* Candlesticks rendering */}
          {candles.map((c, i) => {
            const isBull = c.close >= c.open;
            const xCenter = chartPadding.left + i * candleSpacing + candleSpacing / 2;
            const yHigh = getY(c.high);
            const yLow = getY(c.low);
            const yOpen = getY(c.open);
            const yClose = getY(c.close);

            const bodyTop = Math.min(yOpen, yClose);
            const bodyBottom = Math.max(yOpen, yClose);
            const bodyHeight = Math.max(2, bodyBottom - bodyTop);

            const isHovered = hoveredCandle?.id === c.id;

            return (
              <g
                key={c.id}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => {
                  setHoveredCandle(c);
                  onCandleSelect?.(c);
                }}
                onClick={() => {
                  soundEffects.playTacticalClick();
                  setHoveredCandle(c);
                  onCandleSelect?.(c);
                }}
              >
                {/* Wick */}
                <line
                  x1={xCenter}
                  y1={yHigh}
                  x2={xCenter}
                  y2={yLow}
                  stroke={isBull ? '#10b981' : '#ef4444'}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                />

                {/* Candle Body */}
                <rect
                  x={xCenter - candleBodyWidth / 2}
                  y={bodyTop}
                  width={candleBodyWidth}
                  height={bodyHeight}
                  fill={isBull ? '#10b981' : '#dc2626'}
                  stroke={isBull ? '#059669' : '#991b1b'}
                  strokeWidth="1.2"
                  rx="1.5"
                  className={isHovered ? 'filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}
                />

                {/* Tactical pattern marker flag */}
                {c.pattern && (
                  <g>
                    <line
                      x1={xCenter}
                      y1={isBull ? yLow + 4 : yHigh - 4}
                      x2={xCenter}
                      y2={isBull ? yLow + 16 : yHigh - 16}
                      stroke="#f59e0b"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx={xCenter}
                      cy={isBull ? yLow + 18 : yHigh - 18}
                      r="3.5"
                      fill="#f59e0b"
                    />
                  </g>
                )}

                {/* Time axis label */}
                {i % 2 === 0 && (
                  <text
                    x={xCenter}
                    y={height - chartPadding.bottom + 26}
                    textAnchor="middle"
                    fill="#71717a"
                    fontSize="9"
                    fontFamily="Rajdhani"
                  >
                    {c.time}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Tactical legend */}
      <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-neutral-400 font-mono-tech gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-emerald-500 rounded-sm inline-block" /> Bullish (Buyers)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-red-600 rounded-sm inline-block" /> Bearish (Titan Breach)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-sky-400 inline-block" /> Tactical SMA
          </span>
        </div>
        <div className="text-neutral-500">
          Pro-tip: Combine wick rejection at Support Walls with high volume for maximum edge.
        </div>
      </div>
    </div>
  );
};
