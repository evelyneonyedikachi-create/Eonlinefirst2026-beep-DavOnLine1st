import React, { useState, useRef } from "react";
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
  Send,
  Download,
  Upload,
  RefreshCw,
  Printer,
  X,
  AlertTriangle,
  HardDrive,
  ExternalLink,
  FolderGit2,
  GraduationCap,
  Trophy
} from "lucide-react";
import { UserProgressState, CareerTrack, SprintSubmissionData } from "../types";
import { calculateLevel, LEVEL_TIERS, exportProgressJson, importProgressFromJson, resetLocalProgress } from "../utils/storage";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { sound } from "../utils/soundEffects";

interface DashboardProps {
  progress: UserProgressState;
  committedCareer: CareerTrack | null;
  onSaveNotes: (notes: Record<string, string>) => void;
  onSelectTab: (tab: string, sprintNum?: number) => void;
  onCheckIn?: () => void;
  onUpdateProgress?: (newProgress: UserProgressState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  committedCareer,
  onSaveNotes,
  onSelectTab,
  onCheckIn,
  onUpdateProgress,
}) => {
  const [parentPledgeReward, setParentPledgeReward] = useState<string>(
    progress.notes["reward_contract"] || "Reward on Sprint 3 completion: New Mechanical Gaming Keyboard or $150 Tech Bounty"
  );
  const [personalNotes, setPersonalNotes] = useState<string>(
    progress.notes["study_notes"] || "Goal: Code my first live trading bot before school semester starts!"
  );
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);
  const [importFeedback, setImportFeedback] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const completedSprintsList = BOOTCAMP_SPRINTS.filter((s) => 
    progress.completedSprints.includes(s.id) || !!progress.submissions?.[s.id]
  );
  const isGraduated = progress.completedSprints.length >= 5;

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

  const handleExport = () => {
    sound.playClick();
    exportProgressJson(progress);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      const imported = importProgressFromJson(content);
      if (imported) {
        sound.playLevelUp();
        setImportFeedback("Progress successfully imported!");
        onUpdateProgress?.(imported);
      } else {
        setImportFeedback("Error: Invalid progress file format.");
      }
      setTimeout(() => setImportFeedback(null), 3500);
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleConfirmReset = () => {
    sound.playClick();
    const clean = resetLocalProgress();
    onUpdateProgress?.(clean);
    setShowResetModal(false);
  };

  return (
    <div className="space-y-10">
      {/* 1. Top Telemetry Banner */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-sm font-bold uppercase">
              <LayoutDashboard className="w-4 h-4 text-[#00f2ff]" />
              <span>Mission Control // Progress Dashboard</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Ready to build today? <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8]">{levelInfo.title}</span>
            </h2>

            <p className="text-slate-300 text-base leading-relaxed font-medium">
              You are currently on <strong className="text-white">Sprint {currentSprint.sprintNumber}: {currentSprint.title}</strong>. Complete your project record to build your verified portfolio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {isGraduated && (
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab("graduation");
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#05070a] font-black text-base transition-all cursor-pointer shadow-[0_0_30px_rgba(251,191,36,0.4)]"
              >
                <GraduationCap className="w-5 h-5" />
                <span>Mission Complete Page</span>
              </button>
            )}

            <button
              onClick={() => {
                sound.playClick();
                onSelectTab("bootcamp", currentSprint.sprintNumber);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-base transition-all cursor-pointer shadow-[0_0_30px_rgba(0,242,255,0.4)] group"
            >
              <span>Continue Sprint {currentSprint.sprintNumber}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Telemetry Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total XP Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-1.5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Total XP Earned</span>
            <Sparkles className="w-4 h-4 text-[#00f2ff]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">{progress.xp.toLocaleString()}</div>
          <div className="text-xs text-slate-400 font-mono">
            {levelInfo.nextLevelXp - progress.xp} XP to next level
          </div>
        </div>

        {/* Builder Level Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-1.5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Rank Tier</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono flex items-center gap-2">
            <span>{levelInfo.badge}</span>
            <span>Lvl {levelInfo.level}</span>
          </div>
          <div className="text-xs text-slate-400 font-mono truncate">{levelInfo.title.split(":")[1] || levelInfo.title}</div>
        </div>

        {/* Streak Days Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-1.5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Coding Streak</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-3xl font-black text-orange-400 font-mono flex items-center gap-2">
            <span>🔥</span>
            <span>{progress.streakDays} Days</span>
          </div>
          <div className="text-xs font-mono">
            {hasCheckedInToday ? (
              <span className="text-emerald-400">Checked in today ✓</span>
            ) : (
              <button
                onClick={onCheckIn}
                className="text-[#00f2ff] hover:underline font-bold cursor-pointer"
              >
                + Check In (+25 XP)
              </button>
            )}
          </div>
        </div>

        {/* Committed Career Track */}
        <div className="p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-1.5 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Committed Track</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-base font-black text-white truncate">
            {committedCareer ? committedCareer.shortTitle : "Exploring All"}
          </div>
          <div className="text-xs font-mono text-purple-300">
            {committedCareer ? committedCareer.salaryRange : "Choose in Careers tab"}
          </div>
        </div>
      </div>

      {/* 3. MY PROJECTS // PERSONAL PORTFOLIO SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
              <FolderGit2 className="w-4 h-4 text-[#00f2ff]" />
              <span>Personal Project Record</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              My Projects ({completedSprintsList.length} / 5)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {isGraduated ? (
              <button
                onClick={() => {
                  sound.playClick();
                  onSelectTab("graduation");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f2ff] to-emerald-400 text-[#05070a] font-black text-xs uppercase font-mono tracking-wide cursor-pointer shadow-lg"
              >
                <Trophy className="w-4 h-4" />
                <span>View Full Graduation Page</span>
              </button>
            ) : (
              <span className="text-xs font-mono text-slate-400 bg-white/[0.04] px-3.5 py-2 rounded-xl border border-white/10">
                Complete all 5 to unlock Graduation
              </span>
            )}
          </div>
        </div>

        {completedSprintsList.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-dashed border-white/15 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] text-slate-400 flex items-center justify-center mx-auto text-2xl">
              💻
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white">No Completed Projects Recorded Yet</h4>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Finish Sprint 1 to record your first machine learning market predictor and start building your personal project portfolio.
              </p>
            </div>
            <button
              onClick={() => onSelectTab("bootcamp", 1)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-bold text-xs transition-all cursor-pointer"
            >
              <span>Start Sprint 1 Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedSprintsList.map((sprint) => {
              const sub = progress.submissions?.[sprint.id];
              const dateStr = sub?.submittedAt ? new Date(sub.submittedAt).toLocaleDateString(undefined, { month: "short", year: "numeric" }) : "Recently Completed";

              return (
                <div
                  key={sprint.id}
                  className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 hover:border-[#00f2ff]/40 transition-all flex flex-col justify-between space-y-5 shadow-xl group"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-lg bg-white/[0.06] border border-white/10 font-mono text-xs font-bold text-[#00f2ff]">
                        SPRINT 0{sprint.sprintNumber}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {dateStr}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-lg font-black text-white group-hover:text-[#00f2ff] transition-colors leading-tight">
                        {sprint.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {sub?.description || sprint.project.summary}
                      </p>
                    </div>

                    {/* Screenshot preview if available */}
                    {sub?.screenshotPreviewUrl && (
                      <div className="rounded-xl overflow-hidden border border-white/10 max-h-28">
                        <img
                          src={sub.screenshotPreviewUrl}
                          alt={sprint.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Customization */}
                    {sub?.customizationNote && (
                      <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 space-y-0.5">
                        <span className="font-mono text-[10px] text-[#00f2ff] font-bold uppercase block">
                          What I Changed:
                        </span>
                        <p className="italic text-slate-200">
                          "{sub.customizationNote}"
                        </p>
                      </div>
                    )}

                    {/* Skills Demonstrated */}
                    <div className="space-y-1">
                      <span className="font-mono text-[10px] text-slate-400 uppercase font-bold block">
                        Skills Demonstrated:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {sprint.skillsList.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded-md bg-black/50 border border-white/10 text-[11px] font-mono text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                    {sub?.liveUrl ? (
                      <a
                        href={sub.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2ff] hover:underline font-bold"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-slate-500">Local Project</span>
                    )}

                    <button
                      onClick={() => onSelectTab("bootcamp", sprint.sprintNumber)}
                      className="text-xs font-mono text-slate-300 hover:text-white hover:underline cursor-pointer"
                    >
                      Workspace →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. LOCAL LEARNING PROGRESS STORAGE & BACKUP CONTROLS CARD */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-base font-bold uppercase">
              <HardDrive className="w-5 h-5 text-[#00f2ff]" />
              <span>Where Is My Progress Saved?</span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white">
              Local Browser Storage & Data Portability
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/15 text-sm font-mono font-bold transition-all cursor-pointer"
              title="Download local JSON backup"
            >
              <Download className="w-4 h-4 text-[#00f2ff]" />
              <span>Export Progress</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 hover:text-white border border-white/15 text-sm font-mono font-bold transition-all cursor-pointer"
              title="Upload JSON backup"
            >
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Import Progress</span>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImportFile}
              accept=".json,application/json"
              className="hidden"
            />

            <button
              onClick={() => {
                sound.playClick();
                setShowShareModal(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00f2ff]/15 hover:bg-[#00f2ff]/25 text-[#00f2ff] border border-[#00f2ff]/30 text-sm font-mono font-bold transition-all cursor-pointer"
              title="Print or share summary"
            >
              <Share2 className="w-4 h-4" />
              <span>Share / Print Report</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
            <span className="text-white font-bold text-sm block">1. No Account Required</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your OnlineFirst learning progress is saved on this device in your browser. OnlineFirst does not maintain a central learner profile database for this progress.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1.5">
            <span className="text-amber-300 font-bold text-sm block">2. Device & Cache Notice</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clearing your browser cache or switching to another device may reset your view unless you export your JSON progress file.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-slate-300 font-bold text-sm block">3. Reset Progress</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Permanently erase local records from this browser.
              </p>
            </div>
            <button
              onClick={() => setShowResetModal(true)}
              className="text-xs font-mono text-red-400 hover:text-red-300 hover:underline text-left cursor-pointer pt-1"
            >
              Reset My Local Progress →
            </button>
          </div>
        </div>

        {importFeedback && (
          <div className="p-3.5 rounded-xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] text-sm font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{importFeedback}</span>
          </div>
        )}
      </div>

      {/* 5. Sprint Milestones Roadmap Grid (5 Sprints) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-1">
            <div className="text-sm font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
              Curriculum Progression
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              The 5 AI Bootcamp Sprints
            </h3>
          </div>

          <div className="text-sm font-mono text-slate-300 bg-white/[0.04] px-4 py-2 rounded-xl border border-white/10">
            Overall Completion: <strong className="text-[#00f2ff]">{overallProgressPct}%</strong> ({completedTotal}/{allMilestones.length} Milestones)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOTCAMP_SPRINTS.map((sprint) => {
            const isDone = progress.completedSprints.includes(sprint.id);
            const sprintMilestoneDone = sprint.milestones.filter((m) =>
              progress.completedMilestones.includes(m.id)
            ).length;
            const pct = Math.round((sprintMilestoneDone / sprint.milestones.length) * 100);
            const isInProgress = sprintMilestoneDone > 0 && !isDone;

            return (
              <div
                key={sprint.id}
                className={`p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between space-y-6 group ${
                  isDone
                    ? "border-emerald-500/40 bg-emerald-950/10"
                    : isInProgress
                    ? "border-[#00f2ff]/40 shadow-[0_0_20px_rgba(0,242,255,0.15)]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div className="space-y-4">
                  {/* Top Status & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs font-bold text-[#00f2ff]">
                      SPRINT 0{sprint.sprintNumber}
                    </span>

                    {isDone ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : isInProgress ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30 text-xs font-mono font-bold">
                        <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-ping" />
                        <span>In Progress</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl bg-white/[0.04] text-slate-400 border border-white/10 text-xs font-mono">
                        Not Started
                      </span>
                    )}
                  </div>

                  {/* Title & Time */}
                  <div>
                    <h4 className="text-xl font-black text-white group-hover:text-[#00f2ff] transition-colors leading-tight">
                      {sprint.title}
                    </h4>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1.5">
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
                        className="px-2.5 py-0.5 rounded-lg bg-black/40 border border-white/10 text-slate-300 font-mono text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Main Deliverable Snippet */}
                  <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">
                      Deliverable:
                    </span>
                    <p className="text-xs text-slate-200 font-medium line-clamp-2">
                      {sprint.project.deliverable}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-xs font-mono">
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
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
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

      {/* 6. Parent / Mentor Pledge Contract Section */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4 text-[#00f2ff]" />
          <span>Accountability & Family Tech Bounty Deal</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-black text-white">
          Parent & Mentor Pledge Contract
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Commit to completing your sprints with your family or mentor. Set an agreed reward for hitting Sprint 3 or Sprint 5 milestones (like a tech gear upgrade, coding bounty, or pizza party).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase font-mono tracking-wider block">
              Agreed Milestone Reward / Bounty:
            </label>
            <input
              type="text"
              value={parentPledgeReward}
              onChange={(e) => setParentPledgeReward(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f2ff]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-white uppercase font-mono tracking-wider block">
              Personal Ambition & Target Completion Date:
            </label>
            <input
              type="text"
              value={personalNotes}
              onChange={(e) => setPersonalNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-xs focus:outline-none focus:border-[#00f2ff]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {saveSuccess ? (
            <span className="text-xs text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Pledge Contract Saved to Matrix!
            </span>
          ) : (
            <span className="text-xs text-slate-400 font-mono">
              Auto-saved locally in your browser storage
            </span>
          )}

          <button
            onClick={handleSaveContract}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-bold text-xs transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5 text-[#00f2ff]" />
            <span>Save Pledge</span>
          </button>
        </div>
      </div>

      {/* SHARE / PRINT PROGRESS REPORT MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#080d14] border border-white/20 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00f2ff]/20 text-[#00f2ff] flex items-center justify-center font-bold">
                ⚡
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">OnlineFirst Learner Report</h3>
                <p className="text-xs font-mono text-slate-400">Generated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4 text-slate-200">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-xs text-slate-400 uppercase font-mono block">Level</span>
                  <span className="text-xl font-bold text-amber-400 font-mono">Lvl {levelInfo.level}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-xs text-slate-400 uppercase font-mono block">XP</span>
                  <span className="text-xl font-bold text-[#00f2ff] font-mono">{progress.xp}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-xs text-slate-400 uppercase font-mono block">Streak</span>
                  <span className="text-xl font-bold text-orange-400 font-mono">{progress.streakDays}d</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                  <span className="text-xs text-slate-400 uppercase font-mono block">Milestones</span>
                  <span className="text-xl font-bold text-emerald-400 font-mono">{completedTotal}/{allMilestones.length}</span>
                </div>
              </div>

              <div className="space-y-1 border-t border-white/10 pt-3">
                <span className="text-xs text-slate-400 font-mono uppercase block">Specialization Track:</span>
                <span className="text-white font-bold text-sm">{committedCareer ? committedCareer.title : "General AI & Python Exploration"}</span>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 font-mono uppercase block">Completed Projects:</span>
                <p className="text-xs text-slate-300 font-mono">
                  {completedSprintsList.length > 0 ? completedSprintsList.map(s => `Sprint ${s.sprintNumber}: ${s.title}`).join(" · ") : "Sprint 1 in progress"}
                </p>
              </div>

              {/* MANDATORY EDUCATIONAL DISCLAIMER */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed">
                <strong>Disclaimer:</strong> OnlineFirst is a private, not-for-profit educational initiative. This completion record documents participation and project work and is not an accredited academic qualification.
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono cursor-pointer border border-white/10"
              >
                <Download className="w-4 h-4" />
                <span>Save JSON Backup</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00f2ff] hover:bg-[#38f6ff] text-[#05070a] font-bold text-xs font-mono uppercase tracking-wide cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.3)]"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET CONFIRMATION MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#080d14] border border-red-500/40 rounded-3xl p-6 space-y-5 shadow-2xl text-slate-200">
            <div className="flex items-center gap-3 text-red-400 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>Reset Local Progress?</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This will permanently remove your OnlineFirst learning progress (XP, streak, milestones, projects, and notes) stored in this browser. This cannot be undone unless you have exported a JSON backup.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono cursor-pointer"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
