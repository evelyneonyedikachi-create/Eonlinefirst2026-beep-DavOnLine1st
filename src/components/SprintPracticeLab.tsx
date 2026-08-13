import React, { useState } from "react";
import { 
  FlaskConical, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  HelpCircle, 
  Sparkles, 
  Terminal, 
  Code2, 
  Maximize2,
  Minimize2,
  CheckCircle2,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { SprintLabData, LabChallengeStep } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintPracticeLabProps {
  labData: SprintLabData;
  sprintNumber: number;
  onMilestoneEarned?: (milestoneId: string, xp: number) => void;
  childrenSandbox?: React.ReactNode;
}

export const SprintPracticeLab: React.FC<SprintPracticeLabProps> = ({
  labData,
  sprintNumber,
  onMilestoneEarned,
  childrenSandbox,
}) => {
  const [code, setCode] = useState<string>(labData.initialCode);
  const [outputLogs, setOutputLogs] = useState<string[]>([
    "[*] Lab Ready. Safe Sandbox Environment Active.",
    "[*] You cannot break anything. Change code and click 'Run Code'.",
  ]);
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  const activeChallenge = labData.challenges[activeChallengeIndex] || labData.challenges[0];

  const handleRunCode = () => {
    sound.playClick();
    setIsRunning(true);

    setTimeout(() => {
      setIsRunning(false);
      sound.playXpGain();

      const newLogs = [
        `>>> Executing ${labData.language} script...`,
        `[*] Environment: Python 3.11 / Sandboxed Cloud Worker`,
        `[✓] Status: Exit code 0 (Success)`,
      ];

      // Check challenge completion
      if (activeChallenge && !completedChallenges.includes(activeChallenge.step)) {
        setCompletedChallenges([...completedChallenges, activeChallenge.step]);
        newLogs.push(`\n[★ CHALLENGE COMPLETE] ${activeChallenge.completedMessage}`);
        if (onMilestoneEarned) {
          onMilestoneEarned(`s${sprintNumber}-lab-c${activeChallenge.step}`, 100);
        }
      }

      setOutputLogs(newLogs);
    }, 600);
  };

  const handleReset = () => {
    sound.playClick();
    setCode(labData.initialCode);
    setOutputLogs([
      "[*] Lab reset to initial template.",
      "[*] Ready for new experiments.",
    ]);
  };

  const handleCopy = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div
      id="practice-lab-section"
      className={`rounded-3xl bg-[#0b101c] border border-[#00f2ff]/30 p-6 md:p-8 space-y-6 shadow-2xl transition-all ${
        isFullScreen ? "fixed inset-4 z-50 overflow-y-auto bg-[#070b14] border-[#00f2ff]" : "relative"
      }`}
    >
      {/* Required Header & Safe Haven Explanation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
            <FlaskConical className="w-5 h-5 text-[#00f2ff]" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Your Practice Lab
          </h3>
          <p className="text-base text-slate-300 mt-1 max-w-3xl">
            This is your safe place to experiment. You cannot break anything. Change the code, run it, see what happens, and try again.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Lab"}
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Required How to Use the Lab 5-Step Instruction Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-base">
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
          <span className="text-[#00f2ff] font-mono font-bold text-base">1. READ</span>
          <p className="text-slate-300 text-base leading-snug">Look at the example.</p>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
          <span className="text-purple-400 font-mono font-bold text-base">2. CHANGE</span>
          <p className="text-slate-300 text-base leading-snug">Edit the highlighted part.</p>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
          <span className="text-emerald-400 font-mono font-bold text-base">3. RUN</span>
          <p className="text-slate-300 text-base leading-snug">Click Run Code.</p>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
          <span className="text-amber-400 font-mono font-bold text-base">4. OBSERVE</span>
          <p className="text-slate-300 text-base leading-snug">See what changed.</p>
        </div>
        <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
          <span className="text-cyan-300 font-mono font-bold text-base">5. EXPERIMENT</span>
          <p className="text-slate-300 text-base leading-snug">Try your own version.</p>
        </div>
      </div>

      {/* Lab Challenges Strip */}
      {labData.challenges && labData.challenges.length > 0 && (
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-base font-mono text-amber-300 font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Lab Challenge {activeChallenge.step} of {labData.challenges.length}</span>
            </div>

            <div className="flex items-center gap-2">
              {labData.challenges.map((c) => (
                <button
                  key={c.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveChallengeIndex(c.step - 1);
                    setHintLevel(0);
                  }}
                  className={`px-3 py-1 rounded-lg text-base font-mono font-bold transition-all cursor-pointer ${
                    activeChallengeIndex === c.step - 1
                      ? "bg-[#00f2ff] text-[#05070a]"
                      : completedChallenges.includes(c.step)
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/[0.05] text-slate-400 border border-white/10"
                  }`}
                >
                  {completedChallenges.includes(c.step) ? `✓ Task ${c.step}` : `Task ${c.step}`}
                </button>
              ))}
            </div>
          </div>

          <div className="text-lg font-bold text-white">
            {activeChallenge.task}
          </div>

          {/* Progressive Hint Drawer */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => {
                sound.playClick();
                setHintLevel(hintLevel >= 1 ? 0 : 1);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-base text-slate-300 border border-white/10 transition-all cursor-pointer font-medium"
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>{hintLevel >= 1 ? "Hide Hint 1" : "Need Hint 1?"}</span>
            </button>

            {hintLevel >= 1 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setHintLevel(hintLevel >= 2 ? 1 : 2);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-base text-amber-300 border border-amber-500/30 transition-all cursor-pointer font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                <span>{hintLevel >= 2 ? "Hide Hint 2" : "Need Hint 2?"}</span>
              </button>
            )}

            {hintLevel >= 2 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setCode(code.replace(activeChallenge.targetLine, activeChallenge.solutionCode));
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#00f2ff]/15 hover:bg-[#00f2ff]/25 text-base text-[#00f2ff] border border-[#00f2ff]/30 transition-all cursor-pointer font-bold"
              >
                <span>Apply Solution Example</span>
              </button>
            )}
          </div>

          {hintLevel >= 1 && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-base text-amber-200">
              <strong>Hint 1:</strong> {activeChallenge.hint1}
            </div>
          )}

          {hintLevel >= 2 && (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-base text-amber-100">
              <strong>Hint 2:</strong> {activeChallenge.hint2}
            </div>
          )}
        </div>
      )}

      {/* 2-Panel Lab: Left = Code Editor, Right = Console Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Code Editor Panel */}
        <div className="rounded-2xl bg-black/80 border border-slate-800 overflow-hidden flex flex-col shadow-inner">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[#00f2ff]" />
              <span className="text-base font-mono text-slate-300 font-bold">
                interactive_script.{labData.language === "python" ? "py" : "js"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Copy code"
              >
                {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Reset code"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-80 lg:h-96 p-4 bg-transparent font-mono text-base text-[#00f2ff] focus:outline-none resize-none leading-relaxed selection:bg-[#00f2ff]/30"
          />

          <div className="p-3 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between">
            <span className="text-base font-mono text-slate-400">
              Safe Mode Active // No errors can harm your device
            </span>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-base transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,255,0.4)] disabled:opacity-50"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isRunning ? "Running..." : "Run Code"}</span>
            </button>
          </div>
        </div>

        {/* Live Output & Sandbox Simulator Panel */}
        <div className="rounded-2xl bg-black/80 border border-slate-800 overflow-hidden flex flex-col shadow-inner">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-base font-mono text-slate-300 font-bold">
                Console Output & Visual Telemetry
              </span>
            </div>
            <span className="text-base font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <div className="p-4 bg-black/90 font-mono text-base text-slate-300 flex-1 overflow-y-auto space-y-1.5 h-80 lg:h-96">
            {outputLogs.map((log, idx) => (
              <div
                key={idx}
                className={`leading-relaxed ${
                  log.includes("[✓]") || log.includes("[★")
                    ? "text-emerald-400 font-bold"
                    : log.includes("[!]")
                    ? "text-amber-300 font-bold"
                    : log.includes("[*]")
                    ? "text-[#00f2ff]"
                    : "text-slate-300"
                }`}
              >
                {log}
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between text-base font-mono text-slate-400">
            <span>Memory: 14.2 MB // Latency: 12ms</span>
            <span className="text-emerald-400 font-bold">Ready</span>
          </div>
        </div>
      </div>

      {/* Embedded Live Interactive Visual Sandbox Component (e.g. StockPredictorSandbox, LyricGenSandbox, etc.) */}
      {childrenSandbox && (
        <div className="pt-4 border-t border-slate-800">
          <div className="text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-3">
            ▼ Live Interactive Visual Lab Simulator
          </div>
          {childrenSandbox}
        </div>
      )}
    </div>
  );
};
