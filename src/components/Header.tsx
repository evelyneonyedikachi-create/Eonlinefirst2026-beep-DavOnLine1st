import React, { useState } from "react";
import { 
  Sparkles, 
  Menu, 
  X, 
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
  Flame,
  LayoutDashboard
} from "lucide-react";
import { sound } from "../utils/soundEffects";

export interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onWatchIntro?: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  streakDays?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onWatchIntro,
  soundEnabled = true,
  onToggleSound,
  streakDays = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Clean, focused navigation as specified: Home | Careers | Sprints | AI Mentors | About
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "programs", label: "Careers" },
    { id: "bootcamp", label: "Sprints" },
    { id: "mentor", label: "AI Mentors" },
    { id: "about", label: "About" },
  ];

  const handleNavClick = (tabId: string) => {
    sound.playTab();
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#05070a]/90 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Brand / Logo */}
        <div 
          id="nav-logo-btn"
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-2xl bg-white/[0.04] border border-[#00f2ff]/40 p-[1.5px] shadow-[0_0_15px_rgba(0,242,255,0.25)] group-hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all">
            <div className="w-full h-full bg-[#05070a] rounded-[13px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#00f2ff] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold tracking-tight text-white text-lg sm:text-xl leading-tight group-hover:text-[#00f2ff] transition-colors">
              ONLINEFIRST
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#00f2ff]/15 text-[#00f2ff] font-mono font-bold uppercase border border-[#00f2ff]/30">
              AI STUDIO
            </span>
          </div>
        </div>

        {/* Center: Simplified Desktop Navigation: Home | Careers | Sprints | AI Mentors | About */}
        <nav className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                id={`nav-link-${link.id}`}
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-xl text-base font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-[#00f2ff] bg-[#00f2ff]/15 border border-[#00f2ff]/40 shadow-[0_0_12px_rgba(0,242,255,0.2)]"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Intro Video Link + One Primary CTA: MY MISSION */}
        <div className="flex items-center gap-3">
          {/* Subtle Watch Intro Video button */}
          {onWatchIntro && (
            <button
              onClick={() => {
                sound.playClick();
                onWatchIntro();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-mono text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer border border-transparent hover:border-white/10"
              title="Watch Intro Video"
            >
              <Play className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span>Intro Video</span>
            </button>
          )}

          {/* Sound Toggle */}
          {onToggleSound && (
            <button
              id="sound-toggle-btn"
              onClick={onToggleSound}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors border border-white/10 cursor-pointer"
              title={soundEnabled ? "Mute audio" : "Enable audio"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#00f2ff]" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>
          )}

          {/* Primary Action Button: MY MISSION */}
          <button
            id="nav-my-mission-btn"
            onClick={() => handleNavClick("dashboard")}
            className={`py-2 px-5 rounded-xl font-bold text-base font-mono tracking-wide shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-[#00f2ff] text-[#05070a]"
                : "bg-[#00f2ff] hover:bg-[#38f6ff] text-[#05070a]"
            }`}
          >
            <span>MY MISSION</span>
            <ArrowRight className="w-4 h-4 text-[#05070a]" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/[0.04] text-white border border-white/10 hover:border-[#00f2ff]/40 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#00f2ff]" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#05070a]/98 backdrop-blur-2xl border-b border-white/15 p-5 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full p-3.5 rounded-2xl text-left text-base font-semibold flex items-center justify-between cursor-pointer border ${
                    isActive
                      ? "bg-[#00f2ff]/15 border-[#00f2ff] text-[#00f2ff]"
                      : "bg-white/[0.03] border-white/10 text-slate-200 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}

            {onWatchIntro && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onWatchIntro();
                }}
                className="w-full p-3.5 rounded-2xl text-left text-base font-semibold flex items-center justify-between cursor-pointer bg-white/[0.03] border border-white/10 text-slate-300"
              >
                <span>Watch Intro Video</span>
                <Play className="w-4 h-4 text-[#00f2ff]" />
              </button>
            )}
          </div>

          <button
            onClick={() => handleNavClick("dashboard")}
            className="w-full py-3.5 rounded-2xl bg-[#00f2ff] text-[#05070a] font-extrabold text-base uppercase font-mono tracking-wider shadow-[0_0_15px_rgba(0,242,255,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-3"
          >
            <span>MY MISSION</span>
            <ArrowRight className="w-4 h-4 text-[#05070a]" />
          </button>
        </div>
      )}
    </header>
  );
};
