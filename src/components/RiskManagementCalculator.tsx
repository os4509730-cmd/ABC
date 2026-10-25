import React, { useState } from 'react';
import { calculatePositionSize } from '../utils/tradingAcademyLogic';
import { soundEffects } from '../utils/soundEffects';

interface RiskCalculatorProps {
  onCalculate?: () => void;
}

export const RiskManagementCalculator: React.FC<RiskCalculatorProps> = ({ onCalculate }) => {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [entryPrice, setEntryPrice] = useState<number>(120);
  const [stopLossPrice, setStopLossPrice] = useState<number>(115);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(132);

  const calc = calculatePositionSize(
    accountBalance,
    riskPercent,
    entryPrice,
    stopLossPrice,
    takeProfitPrice
  );

  const handleApplyStrategy = (risk: number, rr: number) => {
    soundEffects.playTacticalClick();
    setRiskPercent(risk);
    const stopDistance = 5;
    setStopLossPrice(entryPrice - stopDistance);
    setTakeProfitPrice(entryPrice + stopDistance * rr);
    onCalculate?.();
  };

  const isGoodRR = calc.riskRewardRatio >= 2.0;

  return (
    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 sm:p-6 backdrop-blur-md shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-neutral-800">
        <div>
          <span className="text-xs font-mono-tech text-red-400 tracking-wider uppercase">
            THE 1% DOCTRINE // RISK FORTRESS
          </span>
          <h3 className="text-lg sm:text-xl font-heading font-bold text-white flex items-center gap-2">
            <span>Tactical Position Sizing &amp; R:R Calculator</span>
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-tech text-neutral-400">Quick Presets:</span>
          <button
            onClick={() => handleApplyStrategy(1.0, 2.0)}
            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs font-mono-tech text-neutral-300 border border-neutral-700 cursor-pointer"
          >
            Conservative (1% / 1:2)
          </button>
          <button
            onClick={() => handleApplyStrategy(2.0, 3.0)}
            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs font-mono-tech text-neutral-300 border border-neutral-700 cursor-pointer"
          >
            Vanguard (2% / 1:3)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Parameters */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-black/50 p-4 rounded-xl border border-neutral-800 space-y-3.5">
            <div>
              <label className="block text-xs font-mono-tech text-neutral-300 uppercase mb-1">
                Total Army Capital (Account Balance in USD):
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-500 font-mono-tech">$</span>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => {
                    setAccountBalance(Number(e.target.value));
                    onCalculate?.();
                  }}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 pl-8 pr-3 text-white text-sm font-mono-tech focus:border-red-500 focus:outline-none"
                  min="100"
                  step="500"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-mono-tech text-neutral-300 uppercase">
                  Risk Per Battle (% of Account):
                </label>
                <span className="text-xs font-mono-tech font-bold text-red-400">
                  {riskPercent}% (${((accountBalance * riskPercent) / 100).toFixed(0)})
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.25"
                value={riskPercent}
                onChange={(e) => {
                  setRiskPercent(Number(e.target.value));
                  onCalculate?.();
                }}
                className="w-full accent-red-500 h-1.5 bg-neutral-700 rounded cursor-pointer"
                aria-label="Risk Percent"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono-tech mt-1">
                <span>0.5% (Scout Iron Armor)</span>
                <span className="text-amber-400">2% (Max Recommended)</span>
                <span className="text-red-500">5% (Extreme Peril)</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono-tech text-neutral-400 uppercase mb-1">
                  Entry ($)
                </label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => {
                    setEntryPrice(Number(e.target.value));
                    onCalculate?.();
                  }}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-1.5 px-2.5 text-white text-sm font-mono-tech focus:border-blue-500 focus:outline-none"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-red-400 uppercase mb-1">
                  Stop Loss ($)
                </label>
                <input
                  type="number"
                  value={stopLossPrice}
                  onChange={(e) => {
                    setStopLossPrice(Number(e.target.value));
                    onCalculate?.();
                  }}
                  className="w-full bg-neutral-900 border border-red-900/60 rounded-lg py-1.5 px-2.5 text-white text-sm font-mono-tech focus:border-red-500 focus:outline-none"
                  step="0.5"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono-tech text-emerald-400 uppercase mb-1">
                  Take Profit ($)
                </label>
                <input
                  type="number"
                  value={takeProfitPrice}
                  onChange={(e) => {
                    setTakeProfitPrice(Number(e.target.value));
                    onCalculate?.();
                  }}
                  className="w-full bg-neutral-900 border border-emerald-900/60 rounded-lg py-1.5 px-2.5 text-white text-sm font-mono-tech focus:border-emerald-500 focus:outline-none"
                  step="0.5"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Calculated Military Deployment Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-black/60 p-4 rounded-xl border border-neutral-800 space-y-3">
            <div className="text-xs font-mono-tech text-neutral-400 uppercase tracking-wider flex items-center justify-between">
              <span>AUTHORIZED ORDER SPECIFICATIONS</span>
              <span
                className={`font-bold ${
                  calc.isInvalid ? 'text-red-400' : isGoodRR ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {calc.isInvalid ? 'INVALID PARAMETERS' : isGoodRR ? 'EXCELLENT ASYMMETRY' : 'LOW ASYMMETRY'}
              </span>
            </div>

            {calc.isInvalid ? (
              <div className="p-3 bg-red-950/40 border border-red-800/60 text-red-300 text-xs rounded-lg font-mono-tech">
                {calc.errorMessage}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-neutral-900/90 p-3 rounded-lg border border-neutral-800">
                    <span className="text-[10px] font-mono-tech text-neutral-400 uppercase block">
                      Max Dollar Risk
                    </span>
                    <span className="text-lg font-mono-tech font-bold text-red-400">
                      ${calc.dollarRisk.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      ({calc.riskPercent}% of account)
                    </span>
                  </div>

                  <div className="bg-neutral-900/90 p-3 rounded-lg border border-neutral-800">
                    <span className="text-[10px] font-mono-tech text-neutral-400 uppercase block">
                      Risk Per Unit (Spread)
                    </span>
                    <span className="text-lg font-mono-tech font-bold text-amber-300">
                      ${calc.riskPerUnit.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      |Entry - Stop Loss|
                    </span>
                  </div>

                  <div className="bg-neutral-900/90 p-3 rounded-lg border border-neutral-800">
                    <span className="text-[10px] font-mono-tech text-neutral-400 uppercase block">
                      Allowed Position Size
                    </span>
                    <span className="text-lg font-mono-tech font-bold text-white">
                      {calc.positionSizeUnits} Units
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      Total Cost: ${calc.totalPositionCost.toLocaleString()}
                    </span>
                  </div>

                  <div className="bg-neutral-900/90 p-3 rounded-lg border border-neutral-800">
                    <span className="text-[10px] font-mono-tech text-neutral-400 uppercase block">
                      Risk-to-Reward Ratio
                    </span>
                    <span
                      className={`text-lg font-mono-tech font-bold ${
                        isGoodRR ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      1 : {calc.riskRewardRatio}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      Target: 1:2 or higher
                    </span>
                  </div>
                </div>

                {/* Commander Mikoto Verdict */}
                <div
                  className={`p-3 rounded-xl border flex items-start gap-3 ${
                    isGoodRR
                      ? 'bg-emerald-950/30 border-emerald-700/50 text-emerald-200'
                      : 'bg-amber-950/30 border-amber-700/50 text-amber-200'
                  }`}
                >
                  <span className="text-lg">{isGoodRR ? '🗡️' : '⚠️'}</span>
                  <div className="text-xs space-y-1">
                    <p className="font-heading font-bold tracking-wide">
                      {isGoodRR
                        ? 'COMMANDER VERDICT: DISCIPLINED BLUEPRINT'
                        : 'COMMANDER VERDICT: UNFAVORABLE ENGAGEMENT'}
                    </p>
                    <p className="font-sans text-neutral-300">
                      {isGoodRR
                        ? `A 1:${calc.riskRewardRatio} ratio means even if you win only 40% of trades, you will emerge victorious. Your risk is strictly capped at $${calc.dollarRisk}. Execute with conviction!`
                        : 'Your potential gain is too narrow compared to what you are risking. Never send soldiers into an open field where the reward does not justify the casualty rate! Widen your target or tighten your invalidation.'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
