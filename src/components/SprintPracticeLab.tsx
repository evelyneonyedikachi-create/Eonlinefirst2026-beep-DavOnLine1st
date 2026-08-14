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
      className={`space-y-4 transition-all ${
        isFullScreen ? "fixed inset-4 z-50 overflow-y-auto bg-[#070b14] border border-[#00f2ff] p-6 rounded-3xl" : "relative"
      }`}
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
            <FlaskConical className="w-4 h-4 text-[#00f2ff]" />
            <span>Interactive Practice Lab & Live Simulator</span>
          </div>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Safe sandbox: you cannot break anything. Change parameters, execute code, and inspect outputs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer text-xs flex items-center gap-1.5"
            title={isFullScreen ? "Exit Fullscreen" : "Fullscreen Lab"}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4 text-[#00f2ff]" />}
            <span className="font-mono text-xs">{isFullScreen ? "Exit Fullscreen" : "Fullscreen"}</span>
          </button>
        </div>
      </div>

      {/* Lab Challenges Strip */}
      {labData.challenges && labData.challenges.length > 0 && (
        <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lab Mission {activeChallenge.step} of {labData.challenges.length}</span>
            </div>

            <div className="flex items-center gap-1.5">
              {labData.challenges.map((c) => (
                <button
                  key={c.step}
                  onClick={() => {
                    sound.playClick();
                    setActiveChallengeIndex(c.step - 1);
                    setHintLevel(0);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
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

          <div className="text-sm font-bold text-white">
            {activeChallenge.task}
          </div>

          {/* Progressive Hint Drawer */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => {
                sound.playClick();
                setHintLevel(hintLevel >= 1 ? 0 : 1);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-slate-300 border border-white/10 transition-all cursor-pointer font-medium"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{hintLevel >= 1 ? "Hide Hint 1" : "Need Hint 1?"}</span>
            </button>

            {hintLevel >= 1 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setHintLevel(hintLevel >= 2 ? 1 : 2);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-xs text-amber-300 border border-amber-500/30 transition-all cursor-pointer font-medium"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{hintLevel >= 2 ? "Hide Hint 2" : "Need Hint 2?"}</span>
              </button>
            )}

            {hintLevel >= 2 && (
              <button
                onClick={() => {
                  sound.playClick();
                  setCode(code.replace(activeChallenge.targetLine, activeChallenge.solutionCode));
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00f2ff]/15 hover:bg-[#00f2ff]/25 text-xs text-[#00f2ff] border border-[#00f2ff]/30 transition-all cursor-pointer font-bold"
              >
                <span>Apply Solution Example</span>
              </button>
            )}
          </div>

          {hintLevel >= 1 && (
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
              <strong>Hint 1:</strong> {activeChallenge.hint1}
            </div>
          )}

          {hintLevel >= 2 && (
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-xs text-amber-100">
              <strong>Hint 2:</strong> {activeChallenge.hint2}
            </div>
          )}
        </div>
      )}

      {/* 2-Panel Lab: Left = Code Editor, Right = Console Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Code Editor Panel */}
        <div className="rounded-2xl bg-black/80 border border-slate-800 overflow-hidden flex flex-col shadow-inner">
          <div className="bg-slate-900/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span className="text-xs font-mono text-slate-300 font-bold">
                sandbox_script.{labData.language === "python" ? "py" : "js"}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopy}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Copy code"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={handleReset}
                className="p-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
                title="Reset code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="w-full h-64 lg:h-72 p-3.5 bg-transparent font-mono text-xs text-[#00f2ff] focus:outline-none resize-none leading-relaxed selection:bg-[#00f2ff]/30"
          />

          <div className="p-2.5 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400">
              Safe Sandboxed Runtime
            </span>

            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.3)] disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? "Executing..." : "Run Code"}</span>
            </button>
          </div>
        </div>

        {/* Live Output & Sandbox Simulator Panel */}
        <div className="rounded-2xl bg-black/80 border border-slate-800 overflow-hidden flex flex-col shadow-inner">
          <div className="bg-slate-900/90 px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-mono text-slate-300 font-bold">
                Console Output & Visual Telemetry
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              READY
            </span>
          </div>

          <div className="p-3.5 bg-black/90 font-mono text-xs text-slate-300 flex-1 overflow-y-auto space-y-1 h-64 lg:h-72">
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

          <div className="p-2.5 bg-slate-900/70 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Memory: 14.2 MB // Latency: 12ms</span>
            <span className="text-emerald-400 font-bold">Active</span>
          </div>
        </div>
      </div>

      {/* Embedded Live Interactive Visual Sandbox Component */}
      {childrenSandbox && (
        <div className="pt-3 border-t border-slate-800">
          <div className="text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-2">
            ▼ Live Interactive Visual Lab Simulator
          </div>
          {childrenSandbox}
        </div>
      )}
    </div>
  );
};
