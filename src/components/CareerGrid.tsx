import React from "react";
import { 
  Wrench, 
  Dna, 
  TrendingUp, 
  Sparkles, 
  Car, 
  ShieldAlert, 
  Globe, 
  Scale, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  GraduationCap, 
  Award,
  Zap
} from "lucide-react";
import { CAREER_TRACKS } from "../data/careersData";
import { sound } from "../utils/soundEffects";

interface CareerGridProps {
  onSelectCareer: (careerId: string) => void;
  onCommitCareer: (careerId: string) => void;
  committedCareerId: string | null;
}

export const CareerGrid: React.FC<CareerGridProps> = ({
  onSelectCareer,
  onCommitCareer,
  committedCareerId,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Wrench": return <Wrench className="w-5 h-5 text-[#00f2ff]" />;
      case "Dna": return <Dna className="w-5 h-5 text-emerald-400" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "Car": return <Car className="w-5 h-5 text-blue-400" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case "Globe": return <Globe className="w-5 h-5 text-teal-400" />;
      case "Scale": return <Scale className="w-5 h-5 text-indigo-400" />;
      default: return <Sparkles className="w-5 h-5 text-[#00f2ff]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Intro section in Frosted Glass */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
        {/* Decorative Grid and Lighting */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00f2ff]/15 via-[#0a192f] to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <Flame className="w-4 h-4 text-[#00f2ff]" />
            <span>The Reality Check: Build The Future, Don't Memorize Textbooks</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            8 Future-Proof, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#38bdf8] to-[#a855f7]">6-Figure+ AI Careers</span>
          </h2>

          <p className="mt-4 text-[#94a3b8] text-sm md:text-base leading-relaxed">
            An "AI Expert" is <strong className="text-[#00f2ff]">rarely just a programmer sitting in a dark room</strong>. The highest-paid, most secure people in the future will be those who use AI to solve problems in specific, high-stakes industries.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-200">
              <GraduationCap className="w-4 h-4 text-purple-400" />
              <span>Many require <strong className="text-emerald-400">No 4-Year Degree</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-200">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Earning: <strong className="text-amber-300">$120k – $500k+</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-200">
              <Zap className="w-4 h-4 text-[#00f2ff]" />
              <span>Under-the-radar now, massive by age 22</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 8 Career Cards Grid in Frosted Glass */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAREER_TRACKS.map((career) => {
          const isCommitted = committedCareerId === career.id;

          return (
            <div
              key={career.id}
              className={`group relative rounded-2xl backdrop-blur-md transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                isCommitted
                  ? "bg-[#00f2ff]/10 border border-[#00f2ff] shadow-[0_0_25px_rgba(0,242,255,0.25)] ring-1 ring-[#00f2ff]"
                  : "bg-white/[0.03] border border-white/10 hover:border-[#00f2ff]/40 hover:bg-white/[0.06] hover:shadow-[0_8px_32px_rgba(0,242,255,0.12)]"
              }`}
            >
              {/* Top Accent Gradient Header */}
              <div className={`h-1 w-full ${isCommitted ? "bg-[#00f2ff]" : "bg-gradient-to-r from-transparent via-[#00f2ff]/40 to-transparent"}`} />

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Top Badge & Number */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#00f2ff] shadow-inner">
                      #{career.number}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-amber-300 border border-amber-500/30 flex items-center gap-1 font-semibold">
                        <Flame className="w-3 h-3 text-amber-400" />
                        {career.coolFactorScore}/10
                      </span>

                      {isCommitted && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#00f2ff]" />
                          COMMITTED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 group-hover:scale-105 transition-transform shadow-md">
                      {getIcon(career.iconName)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-white text-base leading-tight group-hover:text-[#00f2ff] transition-colors">
                        {career.title}
                      </h3>
                      <p className="text-xs text-[#00f2ff] font-mono font-medium">{career.alias}</p>
                    </div>
                  </div>

                  {/* Salary Callout */}
                  <div className="my-3 p-3 rounded-xl bg-black/40 border border-white/[0.08] backdrop-blur-sm">
                    <div className="text-[10px] uppercase font-mono text-[#94a3b8] font-semibold">Earning Potential:</div>
                    <div className="text-sm font-black text-[#00f2ff] font-mono tracking-tight">{career.salaryRange}</div>
                    <div className="text-[10px] text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{career.degreeRequirement}</span>
                    </div>
                  </div>

                  {/* Teen Hook & Description */}
                  <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-3 mb-4">
                    {career.tagline}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-3 border-t border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <button
                      id={`btn-explore-${career.id}`}
                      onClick={() => {
                        sound.playClick();
                        onSelectCareer(career.id);
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#e0e6ed] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-white/10 hover:border-[#00f2ff]/40 cursor-pointer backdrop-blur-md"
                    >
                      <span>Deep Dive</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      id={`btn-commit-${career.id}`}
                      onClick={() => {
                        onCommitCareer(career.id);
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isCommitted
                          ? "bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40"
                          : "bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] shadow-[0_2px_15px_rgba(0,242,255,0.3)] font-extrabold"
                      }`}
                      title={isCommitted ? "You have committed to this career track!" : "Commit to this career track"}
                    >
                      {isCommitted ? "Committed" : "Commit"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
