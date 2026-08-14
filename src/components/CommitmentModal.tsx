import React, { useState } from "react";
import confetti from "canvas-confetti";
import { 
  ShieldCheck, 
  X, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Flame, 
  Zap, 
  Target, 
  Share2,
  Lock
} from "lucide-react";
import { CareerTrack } from "../types";
import { sound } from "../utils/soundEffects";

interface CommitmentModalProps {
  career: CareerTrack | null;
  onClose: () => void;
  onConfirmCommit: (careerId: string, targetAge: number) => void;
}

export const CommitmentModal: React.FC<CommitmentModalProps> = ({
  career,
  onClose,
  onConfirmCommit,
}) => {
  const [targetAge, setTargetAge] = useState<number>(19);
  const [pledgeChecked, setPledgeChecked] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!career) return null;

  const handleExecuteCommit = () => {
    sound.playCommitFanfare();
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#06b6d4", "#3b82f6", "#a855f7", "#10b981", "#f59e0b"],
    });

    setIsSuccess(true);
    onConfirmCommit(career.id, targetAge);

    setTimeout(() => {
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] p-6 md:p-8 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#00f2ff] shadow-[0_0_15px_#00f2ff]" />
        
        {/* Close Button */}
        <button
          id="close-commitment-modal-btn"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          disabled={isSuccess}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 transition-colors z-20 cursor-pointer disabled:opacity-50 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="py-12 flex flex-col items-center text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-24 h-24 rounded-2xl bg-[#00f2ff] p-[2px] shadow-[0_0_40px_rgba(0,242,255,0.6)] animate-bounce">
              <div className="w-full h-full bg-[#05070a] rounded-[14px] flex items-center justify-center">
                <Award className="w-12 h-12 text-[#00f2ff]" />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-base font-bold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>COMMITMENT PROTOCOL ENGAGED // +500 XP REWARD</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-white">
              Target Locked: {career.shortTitle}
            </h3>

            <p className="text-slate-300 text-base md:text-lg max-w-lg leading-relaxed">
              Your personalized bootcamp track, telemetry dashboard, and AI mentor context have been updated. You are now on the official path to 6-figure mastery!
            </p>

            <div className="pt-2 font-mono text-base text-[#00f2ff]">
              Launching Training Environment...
            </div>
          </div>
        ) : (
          /* Form / Commitment Protocol */
          <div className="space-y-6">
            <div className="pr-8">
              <div className="inline-flex items-center gap-2 text-[#00f2ff] font-mono text-base font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-5 h-5 text-[#00f2ff]" />
                <span>The Commitment Protocol // Time & Focus Investment</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                Choose Path: <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">{career.title}</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg mt-1.5 leading-relaxed">
                <strong className="text-white">You're committing your time and curiosity — not money.</strong> Lock in your focus, build real projects, and bypass the traditional 4-year grind.
              </p>
            </div>

            {/* Target Details Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-mono">
                <div>
                  <span className="text-slate-400 block text-base uppercase mb-1">Expected Target Earnings:</span>
                  <span className="text-xl font-extrabold text-amber-400">{career.salaryRange}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-base uppercase mb-1">Specialization Alias:</span>
                  <span className="text-xl font-extrabold text-[#00f2ff]">{career.alias}</span>
                </div>
              </div>

              {/* Target Age Slider */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="flex items-center justify-between text-base">
                  <span className="font-semibold text-slate-200 flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#00f2ff]" />
                    Target Career Readiness Age:
                  </span>
                  <span className="font-mono font-bold text-[#00f2ff] bg-[#00f2ff]/15 px-3 py-1 rounded-lg border border-[#00f2ff]/30 text-base">
                    Age {targetAge} ({targetAge - 15} Year Runway)
                  </span>
                </div>
                <input
                  id="target-age-slider"
                  type="range"
                  min={17}
                  max={22}
                  value={targetAge}
                  onChange={(e) => setTargetAge(Number(e.target.value))}
                  className="w-full h-2.5 bg-black/50 rounded-lg appearance-none cursor-pointer accent-[#00f2ff]"
                />
                <div className="flex justify-between text-base text-slate-400 font-mono">
                  <span>Age 17 (Ultra Fast)</span>
                  <span>Age 19 (High School End)</span>
                  <span>Age 22 (Industry Titan)</span>
                </div>
              </div>
            </div>

            {/* 3-Point Pledge */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-3">
              <div className="text-base font-mono uppercase text-purple-400 font-bold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>The Project-First Teen Code of Honor:</span>
              </div>
              <label className="flex items-start gap-3.5 text-base text-slate-200 cursor-pointer select-none leading-relaxed">
                <input
                  type="checkbox"
                  checked={pledgeChecked}
                  onChange={(e) => setPledgeChecked(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded bg-black/40 border-white/20 text-[#00f2ff] focus:ring-0 cursor-pointer"
                />
                <span>
                  I pledge to <strong className="text-white">invest my time in building working projects</strong> rather than get stuck in tutorial hell. I will code bots, train models, and share my work publicly.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="py-3.5 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-base font-semibold transition-colors border border-white/10 cursor-pointer"
              >
                Cancel
              </button>

              <button
                id="btn-execute-commit"
                onClick={handleExecuteCommit}
                disabled={!pledgeChecked}
                className="flex-1 py-4 px-6 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-base tracking-wide uppercase transition-all shadow-[0_0_25px_rgba(0,242,255,0.35)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <ShieldCheck className="w-5 h-5 text-[#05070a]" />
                <span>Lock In This Path & Claim +500 XP</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
