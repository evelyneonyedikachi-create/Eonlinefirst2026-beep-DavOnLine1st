import React from "react";
import { Sparkles, ArrowRight, Play, Volume2, VolumeX, ShieldCheck, Zap } from "lucide-react";
import { HeroVideoPlayer } from "./HeroVideoPlayer";
import { sound } from "../utils/soundEffects";

interface IntroVideoPageProps {
  onEnterApp: (careerId?: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const IntroVideoPage: React.FC<IntroVideoPageProps> = ({
  onEnterApp,
  soundEnabled,
  onToggleSound,
}) => {
  return (
    <div className="relative min-h-screen w-full bg-[#05070a] text-[#e0e6ed] flex flex-col justify-between overflow-x-hidden selection:bg-[#00f2ff]/30 selection:text-[#00f2ff]">
      {/* 1. Minimal Header (Logo + Direct Skip Link) */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
        <div 
          onClick={() => onEnterApp()}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-white/[0.05] border border-[#00f2ff]/40 p-[1.5px] shadow-[0_0_20px_rgba(0,242,255,0.3)] group-hover:shadow-[0_0_30px_rgba(0,242,255,0.6)] transition-all">
            <div className="w-full h-full bg-[#05070a] rounded-[13px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00f2ff] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-white text-xl">
              ONLINEFIRST
            </span>
            <span className="text-sm px-2 py-0.5 rounded-md bg-[#00f2ff]/15 text-[#00f2ff] font-mono font-bold uppercase border border-[#00f2ff]/30">
              AI STUDIO
            </span>
          </div>
        </div>

        {/* Skip to Main Site */}
        <button
          onClick={() => {
            sound.playClick();
            onEnterApp();
          }}
          className="inline-flex items-center gap-2 text-base font-mono text-slate-400 hover:text-white transition-colors cursor-pointer px-4 py-2 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/10"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-4 h-4 text-[#00f2ff]" />
        </button>
      </header>

      {/* 2. Main Cinematic Intro Stage */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col items-center justify-center text-center space-y-8 flex-1">
        
        {/* Stage Headline & Subhead */}
        <div className="max-w-3xl space-y-4 animate-in fade-in slide-in-from-bottom-3 duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(0,242,255,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-ping" />
            <span>Interactive AI Cinematic</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Discover What You Can Build With AI
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            Watch the short introduction and see where your first project could take you.
          </p>
        </div>

        {/* 3. The Video / Interactive Cinematic Focal Point (~65-75% width on desktop) */}
        <div className="w-full max-w-5xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] rounded-3xl border border-white/15 overflow-hidden transition-all">
          <HeroVideoPlayer
            onEnterAiWorld={(careerId) => {
              sound.playLevelUp();
              onEnterApp(careerId);
            }}
            soundEnabled={soundEnabled}
            onToggleSound={onToggleSound}
          />
        </div>

        {/* 4. Large Prominent Unmistakable Enter CTA */}
        <div className="pt-2 flex flex-col items-center space-y-4 max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          <button
            id="enter-onlinefirst-btn"
            onClick={() => {
              sound.playLevelUp();
              onEnterApp();
            }}
            className="w-full sm:w-auto min-w-[320px] py-5 px-10 rounded-2xl bg-[#00f2ff] hover:bg-[#38f6ff] text-[#05070a] font-black text-xl tracking-wide uppercase font-mono shadow-[0_0_40px_rgba(0,242,255,0.5)] hover:shadow-[0_0_60px_rgba(0,242,255,0.8)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>ENTER ONLINEFIRST</span>
            <ArrowRight className="w-6 h-6 text-[#05070a] group-hover:translate-x-1.5 transition-transform" />
          </button>

          <p className="text-sm font-mono text-slate-400">
            No prior coding experience required · 5 practical build sprints · Free curriculum
          </p>
        </div>
      </main>

      {/* 5. Minimal Discreet Footer */}
      <footer className="relative z-10 py-6 px-4 text-center text-sm font-mono text-slate-300">
        <span>ONLINEFIRST AI STUDIO // For High School & Teen AI Creators (Ages 13–18)</span>
      </footer>
    </div>
  );
};
