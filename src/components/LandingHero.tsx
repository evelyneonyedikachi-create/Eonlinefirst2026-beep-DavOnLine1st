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
  Play,
  Cpu,
  Bot,
  TrendingUp,
  Award,
  BookOpen
} from "lucide-react";
import { HeroVideoPlayer } from "./HeroVideoPlayer";
import { sound } from "../utils/soundEffects";

interface LandingHeroProps {
  onNavigateTab: (tabId: string, careerId?: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigateTab,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="space-y-16">
      {/* 1. Primary Hero Section with ~50% Viewport Video Experience */}
      <section className="relative space-y-8 pt-2">
        {/* Concise Header: Headline + 1 short supporting line */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/40 text-[#00f2ff] font-mono text-base font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff] animate-pulse" />
            <span>ONLINEFIRST AI STUDIO // FOR 15-YEAR-OLD FUTURE ARCHITECTS</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Build 6-Figure AI Superpowers. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">
              Skip the Boring Theory.
            </span>
          </h1>

          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Master high-earning AI engineering through hands-on code deliverables, robotics, and live market algorithms.
          </p>
        </div>

        {/* Dominant Visual: Hero Video (~50% Viewport Height) */}
        <div className="w-full">
          <HeroVideoPlayer
            onEnterAiWorld={(careerId) => {
              onNavigateTab("programs", careerId);
            }}
            soundEnabled={soundEnabled}
            onToggleSound={onToggleSound}
          />
        </div>
      </section>

      {/* 2. Programs Teaser (Headline + 1 short line + Teaser Cards) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">9 High-Earning Career Tracks</h2>
            <p className="text-base text-slate-300 mt-1 leading-relaxed">
              Explore specialized paths paying $150,000 to $500,000+ with zero degree required.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs");
            }}
            className="inline-flex items-center gap-2 text-base font-mono font-bold text-[#00f2ff] hover:text-[#33f5ff] transition-colors cursor-pointer group"
          >
            <span>View All 9 Programs</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Career Teaser Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Robotics / AI Hardware Engineer */}
          <div 
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs", "robotics-ai-hardware-engineer");
            }}
            className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00f2ff]/40 transition-all cursor-pointer group space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-base font-mono font-bold text-amber-400">$160K–$320K+</span>
            </div>
            <div>
              <span className="text-base font-mono text-[#00f2ff] uppercase font-bold block mb-1">Featured Track</span>
              <h3 className="text-lg font-bold text-white group-hover:text-[#00f2ff] transition-colors">
                Robotics / AI Hardware Engineer
              </h3>
            </div>
            <p className="text-base text-slate-300 line-clamp-2 leading-relaxed">
              Wire optical sensors and program 6-axis robot arms to bring AI into the physical world.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-base text-[#00f2ff] font-mono font-semibold">
              <span>Explore Robotics Track</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Quant Trader */}
          <div 
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs", "algorithmic-quant-trader");
            }}
            className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-base font-mono font-bold text-amber-400">$200K–$500K+</span>
            </div>
            <div>
              <span className="text-base font-mono text-amber-400 uppercase font-bold block mb-1">High-Alpha</span>
              <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                Algorithmic Quant Trader
              </h3>
            </div>
            <p className="text-base text-slate-300 line-clamp-2 leading-relaxed">
              Deploy autonomous machine learning models that trade live market anomalies and statistical price action.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-base text-amber-400 font-mono font-semibold">
              <span>Explore Quant Track</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: AI Security (Red Teamer) */}
          <div 
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs", "ai-security-specialist");
            }}
            className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-rose-500/40 transition-all cursor-pointer group space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-base font-mono font-bold text-amber-400">$150K–$300K+</span>
            </div>
            <div>
              <span className="text-base font-mono text-rose-400 uppercase font-bold block mb-1">Cyber Defense</span>
              <h3 className="text-lg font-bold text-white group-hover:text-rose-400 transition-colors">
                AI Security Specialist
              </h3>
            </div>
            <p className="text-base text-slate-300 line-clamp-2 leading-relaxed">
              Red-team neural architectures against prompt injection, jailbreaks, and synthetic data attacks.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-base text-rose-400 font-mono font-semibold">
              <span>Explore Security Track</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bootcamp Teaser (Headline + 1 short line + Teaser Content) */}
      <section className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-base font-mono text-[#00f2ff] uppercase font-bold mb-1">
              <Layers className="w-4 h-4" />
              <span>Project-First Curriculum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">5 Build Sprints. Zero Fluff.</h2>
            <p className="text-base text-slate-300 mt-1">
              Code real trading bots, computer vision cameras, and autonomous agents for your portfolio.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("bootcamp");
            }}
            className="py-3.5 px-7 rounded-2xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-base uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(0,242,255,0.4)] cursor-pointer whitespace-nowrap"
          >
            Launch Sprint 1
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pt-2">
          {[
            { num: "01", title: "Money Maker Algo", tool: "Python + ML" },
            { num: "02", title: "YouTube Brain NLP", tool: "LLMs & Voice" },
            { num: "03", title: "AI Vision Sentinel", tool: "YOLO + OpenCV" },
            { num: "04", title: "Autonomous Swarms", tool: "Agents & Scraping" },
            { num: "05", title: "Red Team Cyber", tool: "Exploit Defense" },
          ].map((sprint, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
              <span className="font-mono text-base text-[#00f2ff] font-bold">SPRINT {sprint.num}</span>
              <h4 className="text-base font-bold text-white truncate">{sprint.title}</h4>
              <span className="text-base text-slate-300 font-mono block">{sprint.tool}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. AI Mentors & The 15yo Advantage 2-Column Teaser */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mentors Teaser */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-base font-bold uppercase">
              <Bot className="w-5 h-5 text-purple-400" />
              <span>24/7 AI Tech Lead</span>
            </div>
            <h3 className="text-2xl font-bold text-white">Live Code Reviews & Mentorship</h3>
            <p className="text-base text-slate-300 leading-relaxed">
              Get instant, constructive feedback on your scripts from senior AI personas powered by Gemini.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("mentor");
            }}
            className="pt-4 inline-flex items-center gap-2 text-base font-mono font-bold text-[#00f2ff] hover:text-[#33f5ff] cursor-pointer"
          >
            <span>Chat with AI Mentors →</span>
          </button>
        </div>

        {/* 15yo Advantage Teaser */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-base font-bold uppercase">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>The 15-Year-Old Advantage</span>
            </div>
            <h3 className="text-2xl font-bold text-white">A 4-Year Head Start Before College</h3>
            <p className="text-base text-slate-300 leading-relaxed">
              Why building real open-source AI projects at 15 crushes traditional university diplomas.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("about");
            }}
            className="pt-4 inline-flex items-center gap-2 text-base font-mono font-bold text-[#00f2ff] hover:text-[#33f5ff] cursor-pointer"
          >
            <span>Read the Manifesto →</span>
          </button>
        </div>
      </section>
    </div>
  );
};
