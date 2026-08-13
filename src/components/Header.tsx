import React, { useState } from "react";
import { 
  Sparkles, 
  Flame, 
  Terminal, 
  Volume2, 
  VolumeX, 
  Compass, 
  Layers, 
  FlaskConical, 
  LayoutDashboard, 
  Bot, 
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import { UserProgressState } from "../types";
import { calculateLevel } from "../utils/storage";
import { sound } from "../utils/soundEffects";

export interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  progress: UserProgressState;
  onCheckIn: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  committedCareerTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  progress,
  onCheckIn,
  soundEnabled,
  onToggleSound,
  committedCareerTitle,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const levelInfo = calculateLevel(progress.xp);

  const today = new Date().toISOString().split("T")[0];
  const hasCheckedInToday = progress.lastCheckInDate === today && progress.streakDays > 0;

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "programs", label: "Programs", badge: "9 Tracks" },
    { id: "bootcamp", label: "Bootcamp", badge: "5 Sprints" },
    { id: "mentor", label: "AI Mentors" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact & Grants" },
    { id: "dashboard", label: "Mission Control" },
  ];

  const handleNavClick = (tabId: string) => {
    sound.playTab();
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#05070a]/90 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      {/* Top Telemetry Ticker Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-base border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00f2ff]"></span>
            </span>
            <span className="font-mono text-[#00f2ff] tracking-wider font-semibold text-base uppercase">
              ONLINEFIRST OS v4.8 // ONLINE
            </span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          <div className="hidden sm:flex items-center gap-2 text-slate-300 font-mono text-base">
            <Terminal className="w-4 h-4 text-[#00f2ff]" />
            <span>Target: 15yo High-Earning AI Pioneers</span>
          </div>
        </div>

        {/* User XP & Streak Widget */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Committed Track Pill */}
          {committedCareerTitle && (
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] font-medium text-base backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#00f2ff] animate-pulse" />
              <span className="truncate max-w-[180px]">{committedCareerTitle}</span>
            </div>
          )}

          {/* Daily Streak */}
          <button
            id="streak-checkin-btn"
            onClick={() => {
              sound.playClick();
              onCheckIn();
            }}
            disabled={hasCheckedInToday}
            className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-base font-semibold transition-all duration-200 backdrop-blur-md ${
              hasCheckedInToday
                ? "bg-white/[0.04] border border-amber-500/40 text-amber-300 cursor-default"
                : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#05070a] shadow-[0_0_12px_rgba(245,158,11,0.4)] cursor-pointer animate-pulse font-bold"
            }`}
            title={hasCheckedInToday ? "Streak active today!" : "Click to claim daily +50 XP!"}
          >
            <Flame className={`w-4 h-4 ${hasCheckedInToday ? "text-amber-400" : "text-[#05070a]"}`} />
            <span>{progress.streakDays}d Streak</span>
            {!hasCheckedInToday && <span className="font-mono font-bold">+50XP</span>}
            {hasCheckedInToday && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
          </button>

          {/* XP & Level Status */}
          <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-white/10 px-3.5 py-1 rounded-full">
            <span className="text-base leading-none">{levelInfo.badge}</span>
            <span className="font-mono text-[#00f2ff] font-bold text-base">{progress.xp} XP</span>
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors border border-white/10 cursor-pointer"
            title={soundEnabled ? "Mute audio" : "Enable audio"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#00f2ff]" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Main Persistent Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Logo / Wordmark (Links to Home) */}
        <div 
          id="nav-logo-btn"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-white/[0.04] border border-[#00f2ff]/40 p-[1.5px] shadow-[0_0_15px_rgba(0,242,255,0.25)] group-hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all">
            <div className="w-full h-full bg-[#05070a] rounded-[13px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00f2ff] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold tracking-tight text-[#e0e6ed] text-lg sm:text-xl leading-tight group-hover:text-[#00f2ff] transition-colors">
                ONLINEFIRST <span className="text-[#00f2ff]">AI STUDIO</span>
              </h1>
              <span className="text-base px-2 py-0.5 rounded-lg bg-[#00f2ff]/15 text-[#00f2ff] font-mono font-bold uppercase border border-[#00f2ff]/30">
                PRO
              </span>
            </div>
            <p className="text-base text-[#94a3b8] font-medium hidden sm:block">Future-Proof AI Careers for 15yo Pioneers</p>
          </div>
        </div>

        {/* Center/Right: Persistent Page Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-2 rounded-xl text-base font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "text-[#00f2ff] bg-[#00f2ff]/15 border border-[#00f2ff]/50 shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                    : "text-slate-200 hover:text-white hover:bg-white/[0.06] border border-transparent"
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-base px-2 py-0.5 rounded-full font-mono uppercase font-bold ${
                    isActive ? "bg-[#00f2ff]/20 text-[#00f2ff]" : "bg-white/[0.08] text-slate-300"
                  }`}>
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Far Right: Primary CTA Button (Desktop) & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="nav-primary-cta-btn"
            onClick={() => handleNavClick("programs")}
            className="hidden sm:flex items-center gap-2 py-2.5 px-5 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-base uppercase font-mono tracking-wider shadow-[0_0_15px_rgba(0,242,255,0.4)] hover:shadow-[0_0_25px_rgba(0,242,255,0.6)] transition-all cursor-pointer"
          >
            <span>Enter AI World</span>
            <ArrowRight className="w-4 h-4 text-[#05070a]" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/[0.04] text-white border border-white/10 hover:border-[#00f2ff]/40 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00f2ff]" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#05070a]/95 backdrop-blur-2xl border-b border-white/15 p-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`p-3.5 rounded-2xl text-left text-base font-semibold flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? "bg-[#00f2ff]/15 border-[#00f2ff] text-[#00f2ff]"
                      : "bg-white/[0.03] border-white/10 text-slate-200 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-base px-2 py-0.5 rounded-md font-mono bg-white/10 text-slate-300">
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handleNavClick("programs")}
            className="w-full py-3.5 rounded-2xl bg-[#00f2ff] text-[#05070a] font-extrabold text-base uppercase font-mono tracking-wider shadow-[0_0_15px_rgba(0,242,255,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-3"
          >
            <span>Enter the AI World</span>
            <ArrowRight className="w-5 h-5 text-[#05070a]" />
          </button>
        </div>
      )}
    </header>
  );
};
