import React from "react";
import { 
  X, 
  Flame, 
  GraduationCap, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Zap, 
  TrendingUp,
  Clock,
  Terminal,
  ShieldCheck
} from "lucide-react";
import { CareerTrack } from "../types";
import { sound } from "../utils/soundEffects";

interface CareerDetailModalProps {
  career: CareerTrack | null;
  onClose: () => void;
  onCommit: (careerId: string) => void;
  isCommitted: boolean;
  onJumpToSprint?: (sprintNum: number) => void;
}

export const CareerDetailModal: React.FC<CareerDetailModalProps> = ({
  career,
  onClose,
  onCommit,
  isCommitted,
  onJumpToSprint,
}) => {
  if (!career) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] p-6 md:p-8 scrollbar-thin scrollbar-thumb-white/10">
        {/* Background glow header */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-[#00f2ff] shadow-[0_0_15px_#00f2ff]`} />
        
        {/* Close Button */}
        <button
          id="close-career-modal-btn"
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 transition-colors z-20 cursor-pointer backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pr-10">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              <span className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-[#00f2ff] font-mono font-bold text-base">
                Career Track #{career.number}
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-semibold text-base flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-400" />
                Cool Factor: {career.coolFactorScore}/10
              </span>
              <span className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono text-base font-semibold">
                {career.growthProjection}
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {career.title}
            </h2>
            <p className="text-base md:text-lg text-[#00f2ff] font-mono mt-1.5 font-semibold">
              Alias: {career.alias}
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 self-start md:self-auto min-w-[260px]">
            <div className="text-base font-mono uppercase text-slate-300 font-semibold">Target Compensation</div>
            <div className="text-2xl font-black text-amber-400 font-mono">{career.salaryRange}</div>
            <div className="text-base text-emerald-400 font-medium flex items-center gap-1.5 mt-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>{career.degreeRequirement}</span>
            </div>
          </div>
        </div>

        {/* The Teen Hook Banner */}
        <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-[#00f2ff]/30 mb-6">
          <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-base font-bold uppercase tracking-wider mb-1.5">
            <Zap className="w-5 h-5 text-[#00f2ff]" />
            <span>Why This Is Insanely Cool for a 15-Year-Old</span>
          </div>
          <p className="text-base md:text-lg text-slate-200 leading-relaxed font-medium">
            "{career.teenHook}"
          </p>
        </div>

        {/* Two-Column Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column: What it is & Day in the Life */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-2">
              <h4 className="text-base font-mono uppercase text-[#00f2ff] font-bold flex items-center gap-2">
                <Terminal className="w-5 h-5 text-[#00f2ff]" />
                <span>The Mission & Role Breakdown</span>
              </h4>
              <p className="text-base text-slate-300 leading-relaxed">
                {career.whatItIs}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-3">
              <h4 className="text-base font-mono uppercase text-purple-400 font-bold flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>A Day in the Life at Top AI Labs</span>
              </h4>
              <ul className="space-y-3 text-base text-slate-300">
                {career.dayInTheLife.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Superpowers, Tools, and Companies */}
          <div className="space-y-6">
            {/* Superpowers */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-3">
              <h4 className="text-base font-mono uppercase text-emerald-400 font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>Your Unfair AI Superpowers</span>
              </h4>
              <ul className="space-y-2.5 text-base text-slate-300">
                {career.superpowers.map((power, idx) => (
                  <li key={idx} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>{power}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Tools & Hiring Companies */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-4">
              <div>
                <h4 className="text-base font-mono uppercase text-slate-300 font-semibold mb-2">
                  Weapon of Choice (Key Tools):
                </h4>
                <div className="flex flex-wrap gap-2">
                  {career.keyTools.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-black/40 text-[#00f2ff] border border-white/10 text-base font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-base font-mono uppercase text-slate-300 font-semibold mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-300" />
                  <span>Top Employers & Ecosystems:</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {career.hiringCompanies.map((comp, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-md bg-white/[0.05] border border-white/10 text-slate-200 text-base">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Bootcamp Sprints */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4 className="text-base font-mono uppercase text-amber-400 font-bold flex items-center gap-2">
              <Layers className="w-5 h-5" />
              <span>Recommended Bootcamp Sprints to Master This Track</span>
            </h4>
            <span className="text-base text-slate-300 font-mono">Project-First Curriculum</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {career.recommendedSprints.map((sprintNum) => (
              <button
                key={sprintNum}
                onClick={() => {
                  sound.playClick();
                  onClose();
                  onJumpToSprint?.(sprintNum);
                }}
                className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/10 hover:border-[#00f2ff]/40 text-base font-semibold flex items-center gap-2.5 transition-all cursor-pointer backdrop-blur-md"
              >
                <span className="w-6 h-6 rounded-full bg-[#00f2ff]/20 text-[#00f2ff] font-mono text-base flex items-center justify-center font-bold">
                  S{sprintNum}
                </span>
                <span>Sprint {sprintNum}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-base text-slate-300 font-mono">
            {isCommitted ? (
              <span className="text-[#00f2ff] font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                This is your actively committed career specialization!
              </span>
            ) : (
              <span>Commit now to unlock your custom roadmap & +500 XP bonus.</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="py-3 px-5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-base font-semibold transition-all border border-white/10 cursor-pointer"
            >
              Close
            </button>

            <button
              id="modal-commit-track-btn"
              onClick={() => {
                onCommit(career.id);
              }}
              className={`py-3 px-6 rounded-xl text-base font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                isCommitted
                  ? "bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40"
                  : "bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black shadow-[0_0_20px_rgba(0,242,255,0.4)]"
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>{isCommitted ? "Committed Track (Active)" : "Choose & Commit to Track (+500 XP)"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
