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
    <div className="rounded-2xl bg-[#0b101c] border border-rose-500/30 p-6 md:p-7 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-rose-400 font-mono text-base font-bold uppercase tracking-wider mb-1.5">
            <Bot className="w-5 h-5" />
            <span>Sprint 4 Simulator // Autonomous Agent ReAct Loop & Tool Calling</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            The Jarvis Autonomous Web Scraper & Deal Hunter
          </h3>
          <p className="text-base text-slate-300 mt-1">
            Watch an autonomous AI agent execute multi-step tool calls, control headless browsers, and dispatch alerts.
          </p>
        </div>

        <div className="text-base font-mono text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/30">
          Playwright + Tool Calling ReAct Engine
        </div>
      </div>

      {/* Query Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={productQuery}
          onChange={(e) => setProductQuery(e.target.value)}
          placeholder="Enter item to hunt (e.g. RTX 4090, PS5 Pro, Yeezy Slide)..."
          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-rose-400 font-mono"
        />
        <button
          onClick={handleRunAgent}
          disabled={isRunning}
          className="py-3 px-6 rounded-xl bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 hover:from-rose-400 hover:to-emerald-400 text-slate-950 font-black text-base uppercase font-mono tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all cursor-pointer disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
              <span>Agent Executing...</span>
            </>
          ) : (
            <>
              <Play className="w-5 h-5 text-slate-950 fill-current" />
              <span>Launch Jarvis Mission</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Step Timeline */}
      <div className="p-5 md:p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-4 font-mono">
        <div className="flex items-center justify-between text-base text-slate-300 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Terminal className="w-4 h-4" />
            <span>Agent ReAct Execution Trace</span>
          </div>
          <span>Autonomous Loop: {currentStep}/4 Steps</span>
        </div>

        <div className="space-y-3 text-base">
          {steps.map((s) => {
            const isDone = currentStep >= s.num;
            const isCurrent = currentStep === s.num && isRunning;

            return (
              <div
                key={s.num}
                className={`p-4 rounded-xl border transition-all ${
                  isDone
                    ? "bg-slate-900/90 border-cyan-500/40 text-slate-200"
                    : "bg-slate-950/50 border-slate-800/60 text-slate-500"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-full text-base font-bold flex items-center justify-center ${
                      isDone ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-500"
                    }`}>
                      {s.num}
                    </span>
                    <span className={`font-bold ${isDone ? "text-white" : "text-slate-500"}`}>
                      {s.title}
                    </span>
                  </div>

                  {isDone && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                  {isCurrent && <RefreshCw className="w-5 h-5 text-amber-400 animate-spin flex-shrink-0" />}
                </div>

                {isDone && (
                  <p className="text-base text-slate-300 pl-8 mt-1.5 font-mono leading-relaxed">
                    {s.log}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Discord Mock Alert Result */}
        {currentStep >= 4 && (
          <div className="mt-4 p-5 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/40 text-base font-sans animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-2 font-mono text-[#5865F2] font-bold text-base mb-2.5">
              <Zap className="w-4 h-4" />
              <span>Simulated Discord Bot Alert Received:</span>
            </div>
            <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-1.5">
              <div className="font-bold text-white text-lg">🎯 DEAL ALERT: {productQuery}</div>
              <div className="text-emerald-400 font-bold font-mono text-base">Best Price: $949.99 (Save $250 - 20.8% Off)</div>
              <div className="text-slate-300 text-base">Merchant: Best Buy Official • In Stock: Yes (Ships in 24h)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
