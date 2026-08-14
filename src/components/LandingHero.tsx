import React from "react";
import { 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Bot, 
  Award, 
  Clock, 
  Code2, 
  Play,
  CheckCircle2,
  Terminal,
  Eye,
  Globe,
  Mic,
  Zap,
  Lock
} from "lucide-react";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { sound } from "../utils/soundEffects";

interface LandingHeroProps {
  onNavigateTab: (tabId: string, param?: string | number) => void;
  onWatchIntro?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onNavigateTab,
  onWatchIntro,
}) => {
  return (
    <div className="space-y-24 md:space-y-32 py-4">
      {/* 1. SIMPLIFIED, AMBITIOUS MAIN HERO */}
      <section className="relative text-center max-w-4xl mx-auto space-y-6 pt-4">
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-bold">
          <Sparkles className="w-4 h-4 text-[#00f2ff]" />
          <span>ONLINEFIRST AI STUDIO // AGES 13–18</span>
        </div>

        {/* Clear Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.12]">
          Build Real AI Skills. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8]">
            Create Things Worth Showing.
          </span>
        </h1>

        {/* Short Supporting Sentence */}
        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
          Learn by building real projects, exploring high-growth careers, and completing five practical AI sprints.
        </p>

        {/* Primary and Secondary Action CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            id="hero-start-sprint1-btn"
            onClick={() => {
              sound.playClick();
              onNavigateTab("bootcamp", 1);
            }}
            className="py-4 px-8 rounded-2xl bg-[#00f2ff] hover:bg-[#38f6ff] text-[#05070a] font-extrabold text-lg uppercase font-mono tracking-wider shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:shadow-[0_0_35px_rgba(0,242,255,0.6)] transition-all cursor-pointer flex items-center gap-3"
          >
            <span>Start Sprint 1</span>
            <ArrowRight className="w-5 h-5 text-[#05070a]" />
          </button>

          <button
            id="hero-explore-careers-btn"
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs");
            }}
            className="py-4 px-8 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-lg border border-white/15 hover:border-white/30 transition-all cursor-pointer"
          >
            <span>Explore Careers</span>
          </button>

          {onWatchIntro && (
            <button
              onClick={() => {
                sound.playClick();
                onWatchIntro();
              }}
              className="py-4 px-6 rounded-2xl bg-transparent hover:bg-white/[0.04] text-slate-400 hover:text-white font-mono text-base transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-[#00f2ff]" />
              <span>Watch Intro Video</span>
            </button>
          )}
        </div>
      </section>

      {/* 2. CAREER TRACKS SECTION (3 Featured initially + Link to all 9) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="text-base font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
              Career Possibilities
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Explore High-Growth AI Careers
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Discover what AI engineers actually build every day and find the path that excites you.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs");
            }}
            className="inline-flex items-center gap-2 text-base font-mono font-bold text-[#00f2ff] hover:text-[#38f6ff] transition-colors cursor-pointer self-start sm:self-auto group"
          >
            <span>View All 9 Careers</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Career 1: Robotics */}
          <div 
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs", "robotics-ai-hardware-engineer");
            }}
            className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00f2ff]/40 transition-all cursor-pointer group space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30">
                  <Cpu className="w-7 h-7" />
                </div>
                <span className="text-base font-mono font-bold text-amber-400">$160K–$320K+</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-[#00f2ff] transition-colors">
                  Robotics & Hardware Engineer
                </h3>
                <p className="text-base text-slate-300 mt-2 leading-relaxed">
                  Wire optical sensors, configure microcontrollers, and program robot arms to bring AI into the physical world.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Python
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  ROS2 & OpenCV
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Hardware IO
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-base text-[#00f2ff] font-mono font-bold">
              <span>Explore Career</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Career 2: Quant */}
          <div 
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs", "algorithmic-quant-trader");
            }}
            className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <span className="text-base font-mono font-bold text-amber-400">$200K–$500K+</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-amber-400 transition-colors">
                  Algorithmic Quant Trader
                </h3>
                <p className="text-base text-slate-300 mt-2 leading-relaxed">
                  Design autonomous machine learning models that trade market anomalies, statistical arbitrage, and live order books.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Time-Series ML
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Pandas / NumPy
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Backtesting
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-base text-amber-400 font-mono font-bold">
              <span>Explore Career</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Career 3: AI Security Red Teamer */}
          <div 
            onClick={() => {
              sound.playClick();
              onNavigateTab("programs", "ai-security-specialist");
            }}
            className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-rose-500/40 transition-all cursor-pointer group space-y-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/30">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-base font-mono font-bold text-amber-400">$150K–$300K+</span>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white group-hover:text-rose-400 transition-colors">
                  AI Security Specialist
                </h3>
                <p className="text-base text-slate-300 mt-2 leading-relaxed">
                  Red-team neural architectures against prompt injection, model jailbreaks, and synthetic manipulation attacks.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Prompt Injection
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Model Extraction
                </span>
                <span className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-slate-300 font-mono text-sm">
                  Semantic Guardrails
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-base text-rose-400 font-mono font-bold">
              <span>Explore Career</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU WILL BUILD PREVIEW SECTION */}
      <section className="space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-base font-mono text-[#00f2ff] uppercase font-bold">
            <Layers className="w-4 h-4" />
            <span>Tangible Portfolio Output</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            You Won't Just Learn AI. You'll Build With It.
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Every sprint produces a working, shareable project you can show to universities, employers, and your family.
          </p>
        </div>

        {/* 5 Project Preview Mockup Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 font-mono text-sm font-bold">
                Sprint 01 Project
              </span>
              <TrendingUp className="w-5 h-5 text-[#00f2ff]" />
            </div>
            <div className="h-28 rounded-2xl bg-black/50 border border-white/10 p-3 flex flex-col justify-between font-mono text-xs text-slate-400">
              <div className="flex justify-between text-emerald-400">
                <span>[ALGO-ENGINE] ACTIVE</span>
                <span>ROI: +24.8%</span>
              </div>
              <div className="flex items-end gap-1.5 h-12">
                {[30, 45, 38, 55, 62, 58, 80, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#00f2ff]/60 rounded-t" style={{ height: `${h}%` }} />
                ))}
              </div>
              <span className="text-slate-300 truncate">BTC/USD · EMA Cross Strategy</span>
            </div>
            <h4 className="text-xl font-bold text-white">Live Market Predictor</h4>
            <p className="text-base text-slate-300 leading-relaxed">
              An interactive algorithm analyzing historical stock or crypto trends to predict future price moves.
            </p>
          </div>

          {/* Project 2 */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 font-mono text-sm font-bold">
                Sprint 02 Project
              </span>
              <Mic className="w-5 h-5 text-purple-400" />
            </div>
            <div className="h-28 rounded-2xl bg-black/50 border border-white/10 p-3 flex flex-col justify-between font-mono text-xs text-slate-400">
              <div className="text-purple-400">[VOICE-LLM] TUNED</div>
              <div className="space-y-1">
                <div className="h-1.5 w-full bg-purple-500/40 rounded-full animate-pulse" />
                <div className="h-1.5 w-3/4 bg-purple-500/30 rounded-full" />
              </div>
              <span className="text-slate-300">Style: Cyberpunk Lo-Fi · 128 BPM</span>
            </div>
            <h4 className="text-xl font-bold text-white">Neural Lyric & Voice Generator</h4>
            <p className="text-base text-slate-300 leading-relaxed">
              A creative AI workstation generating original song lyrics and realistic spoken vocal tracks.
            </p>
          </div>

          {/* Project 3 */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-sm font-bold">
                Sprint 03 Project
              </span>
              <Eye className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="h-28 rounded-2xl bg-black/50 border border-white/10 p-3 flex flex-col justify-between font-mono text-xs text-slate-400 relative overflow-hidden">
              <div className="flex justify-between text-emerald-400">
                <span>[YOLO-SENTINEL]</span>
                <span>CONF: 98.4%</span>
              </div>
              <div className="border border-emerald-400/60 rounded p-1 text-[10px] text-emerald-300 w-24">
                Target: CyberBot
              </div>
              <span className="text-slate-300">Bounding Box Engine Active</span>
            </div>
            <h4 className="text-xl font-bold text-white">Computer Vision Sentinel</h4>
            <p className="text-base text-slate-300 leading-relaxed">
              Real-time object detection camera tracking objects, postures, and gestures at 60 FPS.
            </p>
          </div>

          {/* Project 4 */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 font-mono text-sm font-bold">
                Sprint 04 Project
              </span>
              <Globe className="w-5 h-5 text-blue-400" />
            </div>
            <div className="h-28 rounded-2xl bg-black/50 border border-white/10 p-3 flex flex-col justify-between font-mono text-xs text-slate-400">
              <div className="text-blue-400">[AGENT-SWARM] DISPATCHED</div>
              <div className="text-[11px] text-slate-300">
                &gt; Scraped 42 sources<br />
                &gt; Synthesizing dossier...
              </div>
              <span className="text-slate-300">Autonomous Web Agent</span>
            </div>
            <h4 className="text-xl font-bold text-white">Autonomous Research Agent</h4>
            <p className="text-base text-slate-300 leading-relaxed">
              Multi-step web scraping agent that researches any topic, analyzes data, and builds reports.
            </p>
          </div>

          {/* Project 5 */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono text-sm font-bold">
                Sprint 05 Project
              </span>
              <Lock className="w-5 h-5 text-rose-400" />
            </div>
            <div className="h-28 rounded-2xl bg-black/50 border border-white/10 p-3 flex flex-col justify-between font-mono text-xs text-slate-400">
              <div className="flex justify-between text-rose-400">
                <span>[RED-TEAM] ARENA</span>
                <span>ATTACKS: BLOCKED</span>
              </div>
              <div className="text-[11px] text-rose-300">
                Semantic Firewall: 100% Defense
              </div>
              <span className="text-slate-300">Jailbreak Exploit Defense</span>
            </div>
            <h4 className="text-xl font-bold text-white">Red Team Prompt Defense</h4>
            <p className="text-base text-slate-300 leading-relaxed">
              A hardened chatbot challenge arena designed to withstand prompt injection and model extraction.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 5 BUILD SPRINTS SECTION (Substantial visual importance & large cards) */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="text-base font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
              Step-by-Step Curriculum
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              5 Build Sprints. Zero Fluff.
            </h2>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              No textbooks, no exams. Each sprint gives you the code, interactive sandbox, and live deploy steps.
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("bootcamp", 1);
            }}
            className="py-3 px-6 rounded-xl bg-[#00f2ff] hover:bg-[#38f6ff] text-[#05070a] font-extrabold text-base uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(0,242,255,0.3)] cursor-pointer self-start sm:self-auto"
          >
            Open Sprints Lab
          </button>
        </div>

        {/* 5 Large Sprint Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOTCAMP_SPRINTS.map((sprint) => {
            return (
              <div
                key={sprint.id}
                className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#00f2ff]/40 transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Top Bar: Sprint # & Time */}
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1.5 rounded-xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 font-mono text-base font-bold text-[#00f2ff]">
                      SPRINT 0{sprint.sprintNumber}
                    </span>
                    <span className="flex items-center gap-1.5 text-base font-mono text-slate-300">
                      <Clock className="w-4 h-4 text-[#00f2ff]" />
                      {sprint.estimatedTime}
                    </span>
                  </div>

                  {/* Project Title & One-Line Outcome */}
                  <div>
                    <h3 className="text-2xl font-black text-white group-hover:text-[#00f2ff] transition-colors leading-snug">
                      {sprint.title.replace("Build Your ", "").replace("Deploy Your ", "")}
                    </h3>
                    <p className="text-base text-slate-300 mt-2 leading-relaxed font-medium">
                      {sprint.goal}
                    </p>
                  </div>

                  {/* Key Skills */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-sm font-mono text-slate-400 uppercase font-bold block">
                      Skills Learned:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sprint.skillsList.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-slate-300 font-mono text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Final Deliverable */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-xs font-mono text-slate-400 block font-bold uppercase">
                      Final Deliverable:
                    </span>
                    <p className="text-sm text-slate-200 font-medium">
                      {sprint.project.deliverable}
                    </p>
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onNavigateTab("bootcamp", sprint.sprintNumber);
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl bg-white/[0.06] hover:bg-[#00f2ff] hover:text-[#05070a] border border-white/10 hover:border-[#00f2ff] text-white font-mono font-bold text-base transition-all cursor-pointer flex items-center justify-center gap-2 group/btn shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                >
                  <span>VIEW SPRINT</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHY THIS MATTERS FOR TEENS / AI MENTORS & THE 15YO ADVANTAGE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Mentor Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-purple-400 font-mono text-base font-bold uppercase">
              <Bot className="w-6 h-6 text-purple-400" />
              <span>24/7 Senior AI Tech Lead</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Instant Feedback on Every Line of Code
            </h3>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              Never get stuck on an error. Our AI Tech Leads provide immediate, constructive code reviews and architectural advice whenever you build.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("mentor");
            }}
            className="inline-flex items-center gap-2 text-base font-mono font-bold text-[#00f2ff] hover:text-[#38f6ff] cursor-pointer pt-2"
          >
            <span>Chat with AI Mentors →</span>
          </button>
        </div>

        {/* 15yo Advantage Card */}
        <div className="p-8 md:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-base font-bold uppercase">
              <Award className="w-6 h-6 text-emerald-400" />
              <span>The 15-Year-Old Advantage</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              A 4-Year Head Start Over University Graduates
            </h3>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              By the time others start computer science classes, you will already have a portfolio of shipped machine learning applications and real systems.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateTab("about");
            }}
            className="inline-flex items-center gap-2 text-base font-mono font-bold text-[#00f2ff] hover:text-[#38f6ff] cursor-pointer pt-2"
          >
            <span>Read Our Philosophy →</span>
          </button>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION BANNER */}
      <section className="relative rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 p-8 md:p-12 overflow-hidden shadow-2xl text-center space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Ready to Build Your First Project?
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Jump directly into Sprint 1. Code a working price prediction algorithm in under four hours.
          </p>
          
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab("bootcamp", 1);
              }}
              className="py-4 px-8 rounded-2xl bg-[#00f2ff] hover:bg-[#38f6ff] text-[#05070a] font-extrabold text-lg uppercase font-mono tracking-wider shadow-[0_0_25px_rgba(0,242,255,0.4)] cursor-pointer"
            >
              Launch Sprint 1 Now
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab("dashboard");
              }}
              className="py-4 px-6 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-lg border border-white/10 cursor-pointer"
            >
              Open Mission Control
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
