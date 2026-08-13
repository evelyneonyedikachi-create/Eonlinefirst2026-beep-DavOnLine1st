import React, { useState } from "react";
import { Bot, Play, CheckCircle2, ArrowRight, Terminal, RefreshCw, Sparkles, ExternalLink, Zap } from "lucide-react";
import { sound } from "../../utils/soundEffects";

export const AgentScraperSandbox: React.FC = () => {
  const [productQuery, setProductQuery] = useState<string>("NVIDIA RTX 4080 Super OR Nike Air Jordan 1 Low");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const steps = [
    {
      num: 1,
      title: "Tool: browser_navigate(target='retailer_apis')",
      log: "[JARVIS] Launching headless Chromium via Playwright... Connected to 4 retail endpoints (Amazon, Best Buy, StockX, MicroCenter).",
      status: "complete",
    },
    {
      num: 2,
      title: "Tool: extract_price_matrices(query)",
      log: "[JARVIS] Parsed 24 active listings. Filtered out scalper listings (>15% above MSRP). Normalized currency to USD.",
      status: "complete",
    },
    {
      num: 3,
      title: "Tool: calculate_arbitrage_discount()",
      log: "[JARVIS] Found lowest match at Best Buy ($949.99, down from $1,199.99). Net discount: 20.8% ($250 Savings).",
      status: "complete",
    },
    {
      num: 4,
      title: "Tool: dispatch_discord_webhook(channel='daily_deals')",
      log: "[JARVIS] Rich embed dispatched to Discord server #sniper-alerts. Notification sent to mobile device.",
      status: "complete",
    },
  ];

  const handleRunAgent = () => {
    sound.playClick();
    setIsRunning(true);
    setCurrentStep(1);

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsRunning(false);
          sound.playXpGain();
          return 4;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <div className="rounded-2xl bg-[#0b101c] border border-rose-500/30 p-5 md:p-6 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Bot className="w-4 h-4" />
            <span>Sprint 4 Simulator // Autonomous Agent ReAct Loop & Tool Calling</span>
          </div>
          <h3 className="text-xl font-black text-white">
            The Jarvis Autonomous Web Scraper & Deal Hunter
          </h3>
          <p className="text-xs text-slate-400">
            Watch an autonomous AI agent execute multi-step tool calls, control headless browsers, and dispatch alerts.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
          Playwright + Tool Calling ReAct Engine
        </div>
      </div>

      {/* Query Bar */}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={productQuery}
          onChange={(e) => setProductQuery(e.target.value)}
          placeholder="Enter item to hunt (e.g. RTX 4090, PS5 Pro, Yeezy Slide)..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
        />
        <button
          onClick={handleRunAgent}
          disabled={isRunning}
          className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 hover:from-rose-400 hover:to-emerald-400 text-slate-950 font-black text-xs uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
              <span>Agent Executing...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-slate-950 fill-current" />
              <span>Launch Jarvis Mission</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Step Timeline */}
      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3 font-mono">
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
            <span>Agent ReAct Execution Trace</span>
          </div>
          <span>Autonomous Loop: {currentStep}/4 Steps</span>
        </div>

        <div className="space-y-2.5 text-xs">
          {steps.map((s) => {
            const isDone = currentStep >= s.num;
            const isCurrent = currentStep === s.num && isRunning;

            return (
              <div
                key={s.num}
                className={`p-3 rounded-xl border transition-all ${
                  isDone
                    ? "bg-slate-900/90 border-cyan-500/40 text-slate-200"
                    : "bg-slate-950/50 border-slate-800/60 text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isDone ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-500"
                    }`}>
                      {s.num}
                    </span>
                    <span className={`font-bold ${isDone ? "text-white" : "text-slate-500"}`}>
                      {s.title}
                    </span>
                  </div>

                  {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  {isCurrent && <RefreshCw className="w-4 h-4 text-amber-400 animate-spin flex-shrink-0" />}
                </div>

                {isDone && (
                  <p className="text-[11px] text-slate-400 pl-7 mt-1 font-mono">
                    {s.log}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Discord Mock Alert Result */}
        {currentStep >= 4 && (
          <div className="mt-4 p-4 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/40 text-xs font-sans animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 font-mono text-[#5865F2] font-bold text-[11px] mb-2">
              <Zap className="w-4 h-4" />
              <span>Simulated Discord Bot Alert Received:</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-white text-sm">🎯 DEAL ALERT: {productQuery}</div>
              <div className="text-emerald-400 font-bold font-mono">Best Price: $949.99 (Save $250 - 20.8% Off)</div>
              <div className="text-slate-400 text-[11px]">Merchant: Best Buy Official • In Stock: Yes (Ships in 24h)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
