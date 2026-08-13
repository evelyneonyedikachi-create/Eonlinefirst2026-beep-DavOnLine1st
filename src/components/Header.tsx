import React from "react";
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
  CheckCircle2
} from "lucide-react";
import { UserProgressState } from "../types";
import { calculateLevel } from "../utils/storage";
import { sound } from "../utils/soundEffects";

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  progress: UserProgressState;
  onCheckIn: () => void;
  onToggleSound: () => void;
  committedCareerTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  progress,
  onCheckIn,
  onToggleSound,
  committedCareerTitle,
}) => {
  const levelInfo = calculateLevel(progress.xp);

  const today = new Date().toISOString().split("T")[0];
  const hasCheckedInToday = progress.lastCheckInDate === today && progress.streakDays > 0;

  const navItems = [
    { id: "careers", label: "8 Future Careers", icon: Compass, badge: "6-Figure" },
    { id: "bootcamp", label: "Bootcamp Sprints", icon: Layers, badge: "5 Sprints" },
    { id: "sandboxes", label: "Interactive Labs", icon: FlaskConical, badge: "Live" },
    { id: "dashboard", label: "Mission Control", icon: LayoutDashboard, badge: "XP & Goal" },
    { id: "mentor", label: "AI Cyber Mentor", icon: Bot, badge: "AI Live" },
    { id: "blueprint", label: "Parent Blueprint", icon: ShieldCheck, badge: "Strategy" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#05070a]/80 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      {/* Top telemetry bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f2ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f2ff]"></span>
            </span>
            <span className="font-mono text-[#00f2ff] tracking-wider font-semibold uppercase">
              ONLINEFIRST OS v4.8 // ONLINE
            </span>
          </div>

          <span className="hidden sm:inline text-white/20">|</span>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#00f2ff]" />
            <span>Target: Teen High-Earning AI Pioneer</span>
          </div>
        </div>

        {/* User XP & Streak Widget */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Committed Track Pill */}
          {committedCareerTitle && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] font-medium text-xs backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-[#00f2ff] animate-pulse" />
              <span className="truncate max-w-[150px]">{committedCareerTitle}</span>
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
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 backdrop-blur-md ${
              hasCheckedInToday
                ? "bg-white/[0.04] border border-amber-500/40 text-amber-300 cursor-default"
                : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#05070a] shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer animate-bounce font-bold"
            }`}
            title={hasCheckedInToday ? "Streak active today!" : "Click to claim daily +50 XP!"}
          >
            <Flame className={`w-3.5 h-3.5 ${hasCheckedInToday ? "text-amber-400" : "text-[#05070a]"}`} />
            <span>{progress.streakDays} Day Streak</span>
            {!hasCheckedInToday && <span className="text-[10px] font-mono font-bold">+50 XP</span>}
            {hasCheckedInToday && <CheckCircle2 className="w-3 h-3 text-amber-400 ml-0.5" />}
          </button>

          {/* XP & Level Status */}
          <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-md border border-white/10 px-3 py-1 rounded-full">
            <span className="text-base leading-none">{levelInfo.badge}</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-bold text-[#e0e6ed] text-xs">{levelInfo.title.split(":")[0]}</span>
                <span className="font-mono text-[#00f2ff] font-semibold text-xs">{progress.xp} XP</span>
              </div>
              <div className="w-20 bg-white/[0.08] rounded-full h-1 mt-1 overflow-hidden">
                <div 
                  className="bg-[#00f2ff] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_#00f2ff]"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={() => {
              onToggleSound();
            }}
            className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition-colors border border-white/10 backdrop-blur-md cursor-pointer"
            title={progress.soundEnabled ? "Mute sound effects" : "Enable sound effects"}
          >
            {progress.soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-[#00f2ff]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-500" />
            )}
          </button>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div 
          onClick={() => {
            sound.playTab();
            onTabChange("careers");
          }}
          className="flex items-center gap-2.5 cursor-pointer group select-none self-start md:self-auto"
        >
          <div className="relative w-9 h-9 rounded-xl bg-white/[0.04] border border-[#00f2ff]/40 p-[1.5px] shadow-[0_0_15px_rgba(0,242,255,0.25)] group-hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] transition-all backdrop-blur-md">
            <div className="w-full h-full bg-[#05070a]/90 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00f2ff] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold tracking-tight text-[#e0e6ed] text-lg leading-tight group-hover:text-[#00f2ff] transition-colors">
                ONLINEFIRST AI <span className="text-[#00f2ff]">STUDIO</span>
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#00f2ff]/10 text-[#00f2ff] font-mono font-bold uppercase border border-[#00f2ff]/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-[#94a3b8] font-medium">Future-Proof AI Careers & Bootcamp for 15yo Pioneers</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                id={`nav-tab-${item.id}`}
                key={item.id}
                onClick={() => {
                  sound.playTab();
                  onTabChange(item.id);
                }}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer backdrop-blur-md ${
                  isActive
                    ? "text-[#00f2ff] bg-[#00f2ff]/15 border border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.2)]"
                    : "text-[#94a3b8] hover:text-[#e0e6ed] hover:bg-white/[0.05] border border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#00f2ff]" : "text-[#94a3b8]"}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono uppercase font-bold ${
                    isActive ? "bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/30" : "bg-white/[0.05] text-slate-400 border border-white/10"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
