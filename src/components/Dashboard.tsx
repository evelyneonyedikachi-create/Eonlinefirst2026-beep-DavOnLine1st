import React, { useState } from "react";
import { 
  LayoutDashboard, 
  Flame, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Save, 
  Share2,
  Calendar,
  Layers,
  Zap,
  Lock
} from "lucide-react";
import { UserProgressState, CareerTrack } from "../types";
import { calculateLevel, LEVEL_TIERS } from "../utils/storage";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { sound } from "../utils/soundEffects";

interface DashboardProps {
  progress: UserProgressState;
  committedCareer: CareerTrack | null;
  onSaveNotes: (notes: Record<string, string>) => void;
  onSelectTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  committedCareer,
  onSaveNotes,
  onSelectTab,
}) => {
  const [parentPledgeReward, setParentPledgeReward] = useState<string>(
    progress.notes["reward_contract"] || "Reward on Sprint 3 completion: New Mechanical Gaming Keyboard or $150 Tech Bounty"
  );
  const [personalNotes, setPersonalNotes] = useState<string>(
    progress.notes["study_notes"] || "Goal: Code my first live trading bot before school semester starts!"
  );
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const levelInfo = calculateLevel(progress.xp);

  // Calculate total milestones across all sprints
  const allMilestones = BOOTCAMP_SPRINTS.flatMap((s) => s.milestones);
  const completedTotal = allMilestones.filter((m) =>
    progress.completedMilestones.includes(m.id)
  ).length;
  const overallProgressPct = Math.round((completedTotal / allMilestones.length) * 100);

  const skillsMatrix = [
    { name: "Python Architecture & Data Structures", val: Math.min(100, 30 + progress.xp * 0.05), color: "bg-cyan-400" },
    { name: "Scikit-Learn & Machine Learning", val: Math.min(100, 20 + progress.xp * 0.04), color: "bg-blue-400" },
    { name: "Prompt Engineering & LLM Framing", val: Math.min(100, 25 + progress.xp * 0.045), color: "bg-purple-400" },
    { name: "Computer Vision & YOLO Inference", val: Math.min(100, 15 + progress.xp * 0.035), color: "bg-emerald-400" },
    { name: "Autonomous Agents & Tool Calling", val: Math.min(100, 10 + progress.xp * 0.03), color: "bg-rose-400" },
  ];

  const handleSaveContract = () => {
    sound.playClick();
    onSaveNotes({
      reward_contract: parentPledgeReward,
      study_notes: personalNotes,
    });
    setSaveSuccess(true);
    sound.playXpGain();
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Top Banner in Frosted Glass */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-bold uppercase">
              <LayoutDashboard className="w-5 h-5 text-[#00f2ff]" />
              <span>Real-Time Telemetry & Achievement Cockpit</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Mission Control <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">Dashboard</span>
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              Live tracking of your XP, streak consistency, committed 6-figure career trajectory, and parent deal contract.
            </p>
          </div>

          {/* Committed Career Pill Box */}
          {committedCareer ? (
            <div className="p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/40 min-w-[280px] shadow-[0_0_25px_rgba(0,242,255,0.2)]">
              <div className="text-base uppercase font-mono text-slate-300 font-semibold flex items-center justify-between">
                <span>Committed Track</span>
                <span className="text-[#00f2ff] font-bold">AGE {progress.targetAge} GOAL</span>
              </div>
              <div className="text-lg font-extrabold text-white mt-1">{committedCareer.title}</div>
              <div className="text-base text-amber-400 font-mono font-bold">{committedCareer.salaryRange}</div>
            </div>
          ) : (
            <button
              onClick={() => onSelectTab("careers")}
              className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-purple-500/40 min-w-[260px] text-left hover:border-purple-400 transition-all cursor-pointer group"
            >
              <span className="text-base uppercase font-mono text-purple-400 font-semibold block">
                No Track Locked Yet
              </span>
              <span className="text-base font-bold text-white group-hover:text-[#00f2ff] transition-colors flex items-center justify-between mt-1">
                <span>Choose & Commit Now</span>
                <Sparkles className="w-5 h-5 text-purple-400" />
              </span>
              <span className="text-base text-slate-400 block mt-1">Unlock +500 XP Career Protocol</span>
            </button>
          )}
        </div>
      </div>

      {/* Top 4 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total XP */}
        <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-300 text-base font-mono">
            <span>Total Experience</span>
            <Sparkles className="w-5 h-5 text-[#00f2ff]" />
          </div>
          <div className="text-3xl md:text-4xl font-black text-white font-mono">{progress.xp} XP</div>
          <div className="text-base text-[#00f2ff] font-mono font-semibold">{levelInfo.title}</div>
        </div>

        {/* Metric 2: Daily Streak */}
        <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-300 text-base font-mono">
            <span>Active Streak</span>
            <Flame className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl md:text-4xl font-black text-amber-400 font-mono">
            {progress.streakDays} Days
          </div>
          <div className="text-base text-emerald-400 font-mono">Consistent builder bonus active</div>
        </div>

        {/* Metric 3: Overall Bootcamp Progress */}
        <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-300 text-base font-mono">
            <span>Milestones Mastered</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl md:text-4xl font-black text-white font-mono">
            {completedTotal}/{allMilestones.length}
          </div>
          <div className="text-base text-slate-300 font-mono">{overallProgressPct}% Total Curriculum</div>
        </div>

        {/* Metric 4: Career Target Age */}
        <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-300 text-base font-mono">
            <span>Target Readiness</span>
            <Target className="w-5 h-5 text-purple-400" />
          </div>
          <div className="text-3xl md:text-4xl font-black text-purple-300 font-mono">
            Age {progress.targetAge}
          </div>
          <div className="text-base text-slate-300 font-mono">4-Year Head Start Advantage</div>
        </div>
      </div>

      {/* Two Column Grid: Level Roadmap & Skills Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Roadmap Progression */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-mono uppercase font-bold text-[#00f2ff] flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span>Developer Tier Roadmap</span>
            </h3>
            <span className="text-base font-mono text-slate-300">Current: {levelInfo.badge}</span>
          </div>

          <div className="space-y-3.5">
            {LEVEL_TIERS.map((tier) => {
              const isCurrent = tier.level === levelInfo.level;
              const isUnlocked = progress.xp >= tier.minXp;

              return (
                <div
                  key={tier.level}
                  className={`p-4 rounded-2xl border transition-all flex items-center justify-between backdrop-blur-md ${
                    isCurrent
                      ? "bg-[#00f2ff]/15 border-[#00f2ff] text-white shadow-md"
                      : isUnlocked
                      ? "bg-white/[0.02] border-white/10 text-slate-200"
                      : "bg-white/[0.01] border-white/[0.05] text-slate-500 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="text-2xl">{tier.badge}</span>
                    <div>
                      <span className="font-bold text-base block">{tier.title}</span>
                      <span className="text-base font-mono text-slate-400">
                        {tier.minXp} – {tier.maxXp} XP
                      </span>
                    </div>
                  </div>

                  {isCurrent ? (
                    <span className="text-base font-mono px-3 py-1 rounded-full bg-[#00f2ff]/20 text-[#00f2ff] font-bold border border-[#00f2ff]/30">
                      CURRENT RANK
                    </span>
                  ) : isUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Lock className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills Radar Matrix */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-mono uppercase font-bold text-purple-400 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>AI Skills Mastery Matrix</span>
            </h3>
            <span className="text-base font-mono text-slate-300">Based on Projects Built</span>
          </div>

          <div className="space-y-4 pt-1">
            {skillsMatrix.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-base font-mono">
                  <span className="text-slate-200 font-medium">{skill.name}</span>
                  <span className="text-[#00f2ff] font-bold">{Math.round(skill.val)}%</span>
                </div>
                <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/10">
                  <div
                    className={`h-full rounded-full ${skill.color} transition-all duration-500 shadow-[0_0_8px_currentColor]`}
                    style={{ width: `${skill.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parent-Teen Accountability Contract & Rewards Section */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-amber-500/30 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-base font-bold uppercase mb-1">
              <ShieldCheck className="w-5 h-5" />
              <span>Accountability Engine // The Parent-Teen Deal Blueprint</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              The Motivation Contract & Milestone Rewards
            </h3>
          </div>

          <button
            onClick={handleSaveContract}
            className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base uppercase font-mono tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer self-start sm:self-auto"
          >
            <Save className="w-5 h-5 text-slate-950" />
            <span>{saveSuccess ? "Contract Saved!" : "Save Contract Agreement"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
          {/* Parent Milestone Reward */}
          <div className="space-y-2">
            <label className="text-base uppercase font-mono text-slate-300 font-semibold flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Parent-Agreed Reward for Completing Sprints:</span>
            </label>
            <textarea
              rows={3}
              value={parentPledgeReward}
              onChange={(e) => setParentPledgeReward(e.target.value)}
              placeholder="e.g. When Sprint 3 is finished, parents fund a new GPU, mechanical keyboard, or $150 tech reward."
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white font-mono focus:outline-none focus:border-amber-400 backdrop-blur-md leading-relaxed"
            />
          </div>

          {/* Teen Project Goal */}
          <div className="space-y-2">
            <label className="text-base uppercase font-mono text-slate-300 font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#00f2ff]" />
              <span>Teen Master Goal & Project Vision:</span>
            </label>
            <textarea
              rows={3}
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              placeholder="e.g. Build an autonomous sneaker sniper bot and submit my first Kaggle model."
              className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white font-mono focus:outline-none focus:border-[#00f2ff] backdrop-blur-md leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
