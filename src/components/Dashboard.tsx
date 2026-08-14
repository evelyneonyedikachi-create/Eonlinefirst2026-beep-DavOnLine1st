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
  Lock,
  ArrowRight,
  Clock,
  Code2,
  FileCheck,
  Send
} from "lucide-react";
import { UserProgressState, CareerTrack } from "../types";
import { calculateLevel, LEVEL_TIERS } from "../utils/storage";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { sound } from "../utils/soundEffects";

interface DashboardProps {
  progress: UserProgressState;
  committedCareer: CareerTrack | null;
  onSaveNotes: (notes: Record<string, string>) => void;
  onSelectTab: (tab: string, sprintNum?: number) => void;
  onCheckIn?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  committedCareer,
  onSaveNotes,
  onSelectTab,
  onCheckIn,
}) => {
  const [parentPledgeReward, setParentPledgeReward] = useState<string>(
    progress.notes["reward_contract"] || "Reward on Sprint 3 completion: New Mechanical Gaming Keyboard or $150 Tech Bounty"
  );
  const [personalNotes, setPersonalNotes] = useState<string>(
    progress.notes["study_notes"] || "Goal: Code my first live trading bot before school semester starts!"
  );
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const today = new Date().toISOString().split("T")[0];
  const hasCheckedInToday = progress.lastCheckInDate === today && progress.streakDays > 0;

  const levelInfo = calculateLevel(progress.xp);

  // Calculate total milestones across all sprints
  const allMilestones = BOOTCAMP_SPRINTS.flatMap((s) => s.milestones);
  const completedTotal = allMilestones.filter((m) =>
    progress.completedMilestones.includes(m.id)
  ).length;
  const overallProgressPct = Math.round((completedTotal / allMilestones.length) * 100);

  // Find the next active or incomplete sprint
  const activeSprintIndex = BOOTCAMP_SPRINTS.findIndex((s) => {
    const isDone = progress.completedSprints.includes(s.id);
    const mDone = s.milestones.filter((m) => progress.completedMilestones.includes(m.id)).length;
    return !isDone && mDone < s.milestones.length;
  });
  const currentSprint = activeSprintIndex >= 0 ? BOOTCAMP_SPRINTS[activeSprintIndex] : BOOTCAMP_SPRINTS[0];

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
    <div className="space-y-8">
      {/* 1. Welcome Back & Telemetry Top Banner */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-bold uppercase">
              <LayoutDashboard className="w-5 h-5 text-[#00f2ff]" />
              <span>Welcome Back // Telemetry Cockpit</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Ready to build today? <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8]">{levelInfo.title}</span>
            </h2>

            <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
              You are currently on <strong className="text-white">Sprint {currentSprint.sprintNumber}: {currentSprint.title}</strong>. Complete your deliverables and level up your portfolio.
            </p>
          </div>

          {/* Quick CTA to Jump Back into Active Sprint */}
          <button
            onClick={() => {
              sound.playClick();
              onSelectTab("bootcamp", currentSprint.sprintNumber);
            }}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-lg transition-all cursor-pointer shadow-[0_0_30px_rgba(0,242,255,0.4)] shrink-0 self-start md:self-auto group"
          >
            <span>Continue Sprint {currentSprint.sprintNumber}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2. Key Telemetry Metrics Grid (XP, Level, Streak, Committed Career) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-base font-mono text-slate-400 font-bold uppercase">Total XP</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {progress.xp} <span className="text-base text-slate-400 font-normal">XP</span>
          </div>
          <p className="text-base text-slate-400">
            Next Level in: <strong className="text-white font-mono">{levelInfo.nextLevelXp - progress.xp} XP</strong>
          </p>
        </div>

        {/* Level & Rank */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-base font-mono text-slate-400 font-bold uppercase">Matrix Rank</span>
            <Award className="w-5 h-5 text-[#00f2ff]" />
          </div>
          <div className="text-3xl font-black text-white flex items-center gap-2">
            <span>{levelInfo.badge}</span>
            <span>Level {levelInfo.level}</span>
          </div>
          <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-[#00f2ff] h-full rounded-full transition-all"
              style={{ width: `${levelInfo.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Consistency Streak */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 shadow-lg flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-base font-mono text-slate-400 font-bold uppercase">Code Streak</span>
              <Flame className="w-5 h-5 text-rose-400 animate-pulse" />
            </div>
            <div className="text-3xl font-black text-white font-mono">
              {progress.streakDays} <span className="text-base text-slate-400 font-normal">Days Active</span>
            </div>
          </div>
          {onCheckIn && (
            <button
              onClick={() => {
                sound.playClick();
                onCheckIn();
              }}
              disabled={hasCheckedInToday}
              className={`w-full py-1.5 px-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                hasCheckedInToday
                  ? "bg-white/[0.04] border border-amber-500/40 text-amber-300 cursor-default"
                  : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#05070a] shadow-[0_0_12px_rgba(245,158,11,0.4)] font-bold animate-pulse"
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${hasCheckedInToday ? "text-amber-400" : "text-[#05070a]"}`} />
              <span>{hasCheckedInToday ? "Checked in today ✓" : "Claim Daily +50 XP"}</span>
            </button>
          )}
        </div>

        {/* Committed Career Goal */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-base font-mono text-slate-400 font-bold uppercase">Career Goal</span>
            <Target className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400 truncate">
            {committedCareer ? committedCareer.shortTitle : "Choose Track"}
          </div>
          <button
            onClick={() => onSelectTab("programs")}
            className="text-base text-[#00f2ff] hover:underline font-bold"
          >
            {committedCareer ? "View Career Roadmap →" : "Select Your Career →"}
          </button>
        </div>
      </div>

      {/* 3. Section 12 Required: 5 Visual Sprint Cards Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-0.5">
              <Layers className="w-4 h-4" />
              <span>Your Complete Curriculum Progress</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Continue Your Journey
            </h3>
          </div>

          <span className="text-base font-mono text-slate-300">
            Overall Completion: <strong className="text-[#00f2ff] font-bold">{overallProgressPct}%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BOOTCAMP_SPRINTS.map((sprint) => {
            const sprintMilestoneDone = sprint.milestones.filter((m) =>
              progress.completedMilestones.includes(m.id)
            ).length;
            const isFullySubmitted = progress.completedSprints.includes(sprint.id) || !!progress.submissions?.[sprint.id];
            const isDone = isFullySubmitted || sprintMilestoneDone === sprint.milestones.length;
            const isInProgress = !isDone && sprintMilestoneDone > 0;
            const pct = Math.round((sprintMilestoneDone / sprint.milestones.length) * 100);

            return (
              <div
                key={sprint.id}
                className={`p-6 rounded-3xl border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between space-y-4 group relative overflow-hidden ${
                  isDone
                    ? "bg-emerald-500/[0.04] border-emerald-500/30 hover:border-emerald-500/50"
                    : isInProgress
                    ? "bg-white/[0.04] border-[#00f2ff]/40 shadow-[0_0_20px_rgba(0,242,255,0.15)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="space-y-3">
                  {/* Top Bar: Sprint # & Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-white/[0.06] border border-white/10 font-mono text-base font-bold text-[#00f2ff]">
                      Sprint {sprint.sprintNumber}
                    </span>

                    {isDone ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-base font-mono font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30 text-base font-mono font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-ping" />
                        <span>In Progress</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-white/[0.04] text-slate-400 border border-white/10 text-base font-mono">
                        Not Started
                      </span>
                    )}
                  </div>

                  {/* Title & Time */}
                  <div>
                    <h4 className="text-xl font-black text-white group-hover:text-[#00f2ff] transition-colors leading-tight">
                      {sprint.title}
                    </h4>
                    <div className="flex items-center gap-3 text-base font-mono text-slate-400 mt-1.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00f2ff]" />
                        {sprint.estimatedTime}
                      </span>
                      <span>·</span>
                      <span className="text-amber-300 font-semibold">{sprint.difficulty}</span>
                    </div>
                  </div>

                  {/* Skills Learned Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {sprint.skillsList.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-lg bg-black/40 border border-white/10 text-slate-300 font-mono text-base"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Main Deliverable Snippet */}
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1">
                    <span className="text-base font-mono text-slate-400 block font-bold uppercase">
                      Deliverable:
                    </span>
                    <p className="text-base text-slate-200 font-medium line-clamp-2">
                      {sprint.project.deliverable}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-base font-mono">
                      <span className="text-slate-400">Milestones Done:</span>
                      <span className="text-[#00f2ff] font-bold">{sprintMilestoneDone}/{sprint.milestones.length} ({pct}%)</span>
                    </div>
                    <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="bg-[#00f2ff] h-full rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Button */}
                <button
                  onClick={() => {
                    sound.playClick();
                    onSelectTab("bootcamp", sprint.sprintNumber);
                  }}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-base transition-all cursor-pointer ${
                    isDone
                      ? "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
                      : "bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] shadow-[0_0_15px_rgba(0,242,255,0.25)]"
                  }`}
                >
                  <span>{isDone ? "Review Sprint →" : "Continue Sprint →"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Parent / Mentor Pledge Contract Section */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-5 h-5 text-[#00f2ff]" />
          <span>Accountability & Family Tech Bounty Deal</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white">
          Parent & Mentor Pledge Contract
        </h3>

        <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
          Commit to completing your sprints with your family or mentor. Set an agreed reward for hitting Sprint 3 or Sprint 5 milestones (like a tech gear upgrade, coding bounty, or pizza party).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-base font-bold text-white">
              Agreed Milestone Reward / Bounty:
            </label>
            <input
              type="text"
              value={parentPledgeReward}
              onChange={(e) => setParentPledgeReward(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-base focus:outline-none focus:border-[#00f2ff]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base font-bold text-white">
              Personal Ambition & Target Completion Date:
            </label>
            <input
              type="text"
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-base focus:outline-none focus:border-[#00f2ff]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saveSuccess ? (
            <span className="text-base text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Pledge Contract Saved to Matrix!
            </span>
          ) : (
            <span className="text-base text-slate-400 font-mono">
              Auto-saved locally in your browser storage
            </span>
          )}

          <button
            onClick={handleSaveContract}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-bold text-base transition-all cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#00f2ff]" />
            <span>Save Pledge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
