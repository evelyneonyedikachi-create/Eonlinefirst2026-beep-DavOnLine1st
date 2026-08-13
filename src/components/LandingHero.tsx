import React from "react";
import { 
  Sparkles, 
  Flame, 
  ArrowRight, 
  DollarSign, 
  Compass, 
  Terminal, 
  Zap, 
  Layers, 
  ShieldCheck, 
  GraduationCap,
  Play
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface LandingHeroProps {
  onExploreCareers: () => void;
  onLaunchBootcamp: () => void;
  onMeetMentors: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onExploreCareers,
  onLaunchBootcamp,
  onMeetMentors,
}) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#00f2ff]/15 via-[#0a192f] to-transparent blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/40 shadow-[0_0_20px_rgba(0,242,255,0.2)] text-[#00f2ff] font-mono text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff] animate-pulse" />
          <span>ONLINEFIRST AI STUDIO // FOR 15-YEAR-OLD FUTURE ARCHITECTS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
          Stop Memorizing Boring Theory. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#00f2ff] to-[#94a3b8]">
            Build 6-Figure AI Superpowers.
          </span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="text-[#94a3b8] text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-normal leading-relaxed">
          The future of high-earning tech isn't generic programmers sitting in a dark room. It's 15-year-olds who know how to deploy AI agents, automate trading, reverse-engineer models, and solve complex real-world problems.
        </p>

        {/* The Core Truth Quote Card - Frosted Glass */}
        <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 max-w-3xl mx-auto text-left shadow-2xl">
          <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-xs font-bold mb-1.5">
            <Terminal className="w-4 h-4 text-[#00f2ff]" />
            <span>THE 2026+ INDUSTRY REALITY</span>
          </div>
          <p className="text-xs sm:text-sm text-[#e0e6ed] italic leading-relaxed">
            "An 'AI Expert' is rarely just a programmer. The highest-paid, most future-proof people are those who use AI to solve problems in specific, high-leverage industries—biohacking, quantitative trading, robotics, and cyber defense—with or without a 4-year degree."
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="hero-explore-careers-btn"
            onClick={() => {
              sound.playClick();
              onExploreCareers();
            }}
            className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-xs uppercase font-mono tracking-wider shadow-[0_4px_30px_rgba(0,242,255,0.4)] hover:shadow-[0_4px_40px_rgba(0,242,255,0.6)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#05070a]" />
            <span>Explore 8 Future-Proof Careers</span>
          </button>

          <button
            id="hero-bootcamp-btn"
            onClick={() => {
              sound.playClick();
              onLaunchBootcamp();
            }}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#e0e6ed] font-bold text-xs uppercase font-mono tracking-wider border border-white/10 hover:border-[#00f2ff]/40 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <Layers className="w-4 h-4 text-[#00f2ff]" />
            <span>Launch Bootcamp Sprints</span>
          </button>

          <button
            id="hero-mentors-btn"
            onClick={() => {
              sound.playClick();
              onMeetMentors();
            }}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#94a3b8] hover:text-[#e0e6ed] font-bold text-xs uppercase font-mono tracking-wider border border-white/10 hover:border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Talk to AI Tech Leads</span>
          </button>
        </div>

        {/* 4 Feature Badges in Frosted Glass */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto">
          <div className="p-3.5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-left space-y-0.5 hover:border-[#00f2ff]/30 transition-colors">
            <span className="text-amber-400 font-mono font-bold text-sm flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> $150K–$500K+
            </span>
            <span className="text-[11px] text-[#94a3b8] block font-medium">Target Compensation Range</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-left space-y-0.5 hover:border-[#00f2ff]/30 transition-colors">
            <span className="text-[#00f2ff] font-mono font-bold text-sm flex items-center gap-1">
              <GraduationCap className="w-4 h-4" /> Degree Optional
            </span>
            <span className="text-[11px] text-[#94a3b8] block font-medium">Portfolio & Code &gt; Diplomas</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-left space-y-0.5 hover:border-[#00f2ff]/30 transition-colors">
            <span className="text-purple-400 font-mono font-bold text-sm flex items-center gap-1">
              <Flame className="w-4 h-4" /> 5 Build Sprints
            </span>
            <span className="text-[11px] text-[#94a3b8] block font-medium">Trading bots, CV cams & LLMs</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-left space-y-0.5 hover:border-[#00f2ff]/30 transition-colors">
            <span className="text-emerald-400 font-mono font-bold text-sm flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Real AI Feedback
            </span>
            <span className="text-[11px] text-[#94a3b8] block font-medium">Gemini 3.7 Flash Mentorship</span>
          </div>
        </div>
      </div>
    </section>
  );
};
