import React, { useState } from "react";
import { TrendingUp, Play, Sparkles, RefreshCw, BarChart2, DollarSign, ArrowUpRight, ArrowDownRight, CheckCircle2 } from "lucide-react";
import { sound } from "../../utils/soundEffects";

export const StockPredictorSandbox: React.FC = () => {
  const [ticker, setTicker] = useState<string>("NVDA");
  const [windowDays, setWindowDays] = useState<number>(20);
  const [modelType, setModelType] = useState<string>("linear");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState<boolean>(false);

  // Simulated historical data based on parameters
  const tickersData: Record<string, { basePrice: number; name: string; trend: number; volatility: number }> = {
    NVDA: { basePrice: 128.5, name: "NVIDIA Corp (AI Chipmaker)", trend: 1.8, volatility: 3.2 },
    AAPL: { basePrice: 224.3, name: "Apple Inc.", trend: 0.9, volatility: 1.5 },
    TSLA: { basePrice: 245.0, name: "Tesla Inc. (Autonomous AI)", trend: 2.1, volatility: 4.8 },
    BTC: { basePrice: 64200.0, name: "Bitcoin / USD", trend: 3.5, volatility: 5.5 },
  };

  const current = tickersData[ticker] || tickersData.NVDA;

  // Generate 14 simulated points
  const points = Array.from({ length: 14 }).map((_, i) => {
    const day = i + 1;
    const noise = Math.sin(i * 1.3) * current.volatility + (i * current.trend * 0.4);
    const price = Number((current.basePrice + noise).toFixed(2));
    return { day: `Day ${day}`, price };
  });

  const lastPrice = points[points.length - 1].price;
  const predictedChange = modelType === "linear" ? (current.trend * 1.15) : (current.trend * 0.7);
  const predictedNextPrice = Number((lastPrice + predictedChange).toFixed(2));
  const isBullish = predictedNextPrice >= lastPrice;
  const confidenceScore = Math.min(94, Math.round(76 + (windowDays * 0.6)));

  const handleRunModel = () => {
    sound.playClick();
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      sound.playXpGain();
    }, 800);
  };

  return (
    <div className="rounded-2xl bg-[#0b101c] border border-cyan-500/30 p-6 md:p-7 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-base font-bold uppercase tracking-wider mb-1.5">
            <TrendingUp className="w-5 h-5" />
            <span>Sprint 1 Simulator // Python & Scikit-Learn Regression Lab</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            The Wall Street Prediction Algorithm Sandbox
          </h3>
          <p className="text-base text-slate-300 mt-1">
            Simulate pulling Yahoo Finance historical prices and running Linear Regression to predict tomorrow's close.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {["NVDA", "AAPL", "TSLA", "BTC"].map((sym) => (
            <button
              key={sym}
              onClick={() => {
                sound.playClick();
                setTicker(sym);
                setHasRun(false);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-base font-mono font-bold transition-all ${
                ticker === sym
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700"
              }`}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Control Panels & Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base">
        {/* Param 1: Moving Average Window */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between font-mono">
            <span className="text-slate-300 uppercase text-base">Pandas Window:</span>
            <span className="text-cyan-300 font-bold text-base">{windowDays} Days</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            value={windowDays}
            onChange={(e) => setWindowDays(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Param 2: Algorithm Type */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <span className="text-slate-300 uppercase text-base block font-mono">Model Pipeline:</span>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-2.5 text-base font-mono focus:outline-none focus:border-cyan-500"
          >
            <option value="linear">Scikit-Learn LinearRegression()</option>
            <option value="momentum">7-Day Exponential Moving Avg</option>
            <option value="polynomial">2nd Degree Polynomial Regressor</option>
          </select>
        </div>

        {/* Run Button */}
        <div className="flex items-end">
          <button
            onClick={handleRunModel}
            disabled={isRunning}
            className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-black text-base uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                <span>Training Weights...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 text-slate-950 fill-current" />
                <span>Train Model & Predict</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visual Chart & Telemetry Display */}
      <div className="p-5 md:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold text-white text-lg">{ticker}</span>
            <span className="text-slate-300">({current.name})</span>
          </div>

          <div className="font-mono text-base text-slate-200">
            Latest Close: <strong className="text-white">${lastPrice.toLocaleString()}</strong>
          </div>
        </div>

        {/* Simulated Bar / Line Graph Visualizer */}
        <div className="h-40 flex items-end gap-2 pt-4 pb-2 px-3 bg-[#080c16] rounded-xl border border-slate-900 relative overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between opacity-10 pointer-events-none p-2">
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
          </div>

          {points.map((p, idx) => {
            const minP = Math.min(...points.map((pt) => pt.price)) * 0.98;
            const maxP = Math.max(...points.map((pt) => pt.price)) * 1.02;
            const heightPct = Math.max(15, Math.min(95, Math.round(((p.price - minP) / (maxP - minP)) * 100)));
            const isLast = idx === points.length - 1;

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative z-10">
                <div
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isLast ? "bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.6)]" : "bg-slate-700 group-hover:bg-slate-500"
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
                <span className="text-base font-mono text-slate-400 truncate w-full text-center">
                  D{idx + 1}
                </span>

                {/* Tooltip on hover */}
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-cyan-300 text-base font-mono px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                  ${p.price}
                </div>
              </div>
            );
          })}

          {/* Tomorrow Predicted Bar */}
          {hasRun && (
            <div className="flex-1 flex flex-col items-center gap-1 relative z-10 animate-in fade-in zoom-in duration-300">
              <div
                className={`w-full rounded-t-md border-2 border-dashed ${
                  isBullish
                    ? "bg-emerald-500/40 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                    : "bg-rose-500/40 border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                }`}
                style={{ height: "75%" }}
              />
              <span className="text-base font-mono text-amber-400 font-bold">PRED</span>
            </div>
          )}
        </div>

        {/* Prediction Results Banner */}
        {hasRun && (
          <div className="p-5 rounded-xl bg-gradient-to-r from-slate-900 to-[#0e1628] border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-2 duration-300">
            <div>
              <div className="text-base uppercase font-mono text-slate-300 font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Model Output (Confidence: {confidenceScore}%)</span>
              </div>
              <div className="text-xl font-black text-white flex flex-wrap items-center gap-2.5 mt-1">
                <span>Predicted Target:</span>
                <span className="font-mono text-cyan-300 font-black">${predictedNextPrice.toLocaleString()}</span>
                <span className={`text-base px-3 py-0.5 rounded-full font-mono font-bold flex items-center gap-1 ${
                  isBullish ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                }`}>
                  {isBullish ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {isBullish ? "BULLISH (+1.8%)" : "BEARISH (-0.9%)"}
                </span>
              </div>
            </div>

            <div className="font-mono text-base text-slate-300 bg-slate-950 px-4 py-2 rounded-lg border border-slate-800">
              MSE: <strong className="text-cyan-400">0.0412</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
