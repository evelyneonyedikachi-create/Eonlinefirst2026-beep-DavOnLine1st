import React, { useState } from "react";
import { 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  Code2, 
  FlaskConical, 
  Award,
  ChevronRight,
  TrendingUp,
  Mic,
  Eye,
  Bot,
  Globe,
  Clock,
  Zap,
  CheckSquare,
  BookOpen,
  Send,
  Trophy,
  Shield
} from "lucide-react";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { UserProgressState, SprintSubmissionData, BootcampSprint } from "../types";
import { sound } from "../utils/soundEffects";
import { SprintMotivationHook } from "./SprintMotivationHook";
import { SprintVisualMockupCard } from "./SprintVisualMockupCard";
import { SprintTimeline } from "./SprintTimeline";
import { SprintDeliverables } from "./SprintDeliverables";
import { SprintLearningResources } from "./SprintLearningResources";
import { SprintPracticeLab } from "./SprintPracticeLab";
import { SprintSubmissionForm } from "./SprintSubmissionForm";
import { SprintCompletionModal } from "./SprintCompletionModal";
import { StockPredictorSandbox } from "./Sandboxes/StockPredictorSandbox";
import { LyricGenSandbox } from "./Sandboxes/LyricGenSandbox";
import { VisionQuestSandbox } from "./Sandboxes/VisionQuestSandbox";
import { AgentScraperSandbox } from "./Sandboxes/AgentScraperSandbox";
import { RedTeamPromptSandbox } from "./Sandboxes/RedTeamPromptSandbox";

interface BootcampSprintsProps {
  progress: UserProgressState;
  onToggleMilestone: (milestoneId: string, xp: number) => void;
  onToggleTimelineStep?: (sprintId: string, stepNumber: number) => void;
  onSubmitSprint?: (data: SprintSubmissionData) => void;
  activeSprintNum?: number;
  onNavigateTab?: (tab: string) => void;
}

export const BootcampSprints: React.FC<BootcampSprintsProps> = ({
  progress,
  onToggleMilestone,
  onToggleTimelineStep,
  onSubmitSprint,
  activeSprintNum = 1,
  onNavigateTab,
}) => {
  const [selectedSprintId, setSelectedSprintId] = useState<string>(
    `sprint-${activeSprintNum}`
  );
  const [activeSectionTab, setActiveSectionTab] = useState<string>("all");
  const [completionModalSprint, setCompletionModalSprint] = useState<BootcampSprint | null>(null);
  const [activeSubmission, setActiveSubmission] = useState<SprintSubmissionData | null>(null);

  const activeSprint =
    BOOTCAMP_SPRINTS.find((s) => s.id === selectedSprintId) ||
    BOOTCAMP_SPRINTS[0];

  const getSprintIcon = (sprintNum: number) => {
    switch (sprintNum) {
      case 1: return <TrendingUp className="w-5 h-5" />;
      case 2: return <Mic className="w-5 h-5" />;
      case 3: return <Eye className="w-5 h-5" />;
      case 4: return <Bot className="w-5 h-5" />;
      case 5: return <Globe className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const renderSandbox = (type: string) => {
    switch (type) {
      case "stock": return <StockPredictorSandbox />;
      case "nlp": return <LyricGenSandbox />;
      case "vision": return <VisionQuestSandbox />;
      case "agent": return <AgentScraperSandbox />;
      case "portfolio": return <RedTeamPromptSandbox />;
      default: return <StockPredictorSandbox />;
    }
  };

  const completedMilestoneCount = activeSprint.milestones.filter((m) =>
    progress.completedMilestones.includes(m.id)
  ).length;
  const sprintProgressPct = Math.round(
    (completedMilestoneCount / activeSprint.milestones.length) * 100
  );

  const completedTimelineSteps = progress.completedTimelineSteps?.[activeSprint.id] || [];

  const handleStepToggle = (stepNumber: number) => {
    sound.playClick();
    if (onToggleTimelineStep) {
      onToggleTimelineStep(activeSprint.id, stepNumber);
    }
  };

  const handleFormSubmit = (data: SprintSubmissionData) => {
    if (onSubmitSprint) {
      onSubmitSprint(data);
    }
    setActiveSubmission(data);
    setCompletionModalSprint(activeSprint);
  };

  const handleStartNextSprint = () => {
    setCompletionModalSprint(null);
    if (activeSprint.sprintNumber < 5) {
      const nextId = `sprint-${activeSprint.sprintNumber + 1}`;
      setSelectedSprintId(nextId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Banner & High-Energy Sprint Philosophy */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-bold uppercase">
            <Layers className="w-5 h-5 text-[#00f2ff]" />
            <span>OnlineFirst // 5-Sprint Action Curriculum</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Build Real AI Projects. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8]">No Textbooks.</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
            Action first, explanation second. Every sprint gives you the code, the practice lab, and the live deploy steps to build something impressive you can show anyone.
          </p>
        </div>
      </div>

      {/* 2. 5-Sprint Navigation Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {BOOTCAMP_SPRINTS.map((sprint) => {
          const isSelected = sprint.id === selectedSprintId;
          const sprintDoneCount = sprint.milestones.filter((m) =>
            progress.completedMilestones.includes(m.id)
          ).length;
          const isFullyComplete = progress.completedSprints.includes(sprint.id) || sprintDoneCount === sprint.milestones.length;

          return (
            <button
              key={sprint.id}
              onClick={() => {
                sound.playClick();
                setSelectedSprintId(sprint.id);
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between backdrop-blur-md ${
                isSelected
                  ? "bg-[#00f2ff]/15 border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.25)] ring-1 ring-[#00f2ff]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`w-8 h-8 rounded-xl font-mono font-bold text-base flex items-center justify-center ${
                  isSelected ? "bg-[#00f2ff] text-[#05070a] shadow-[0_0_8px_#00f2ff]" : "bg-white/[0.05] border border-white/10 text-[#00f2ff]"
                }`}>
                  S{sprint.sprintNumber}
                </span>

                {isFullyComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <span className="text-base font-mono text-slate-400">
                    {sprintDoneCount}/{sprint.milestones.length}
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base leading-snug mb-1 truncate">
                  {sprint.title.replace("Build Your ", "").replace("Deploy Your ", "")}
                </h4>
                <p className="text-base text-slate-400 font-mono">{sprint.estimatedTime}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-black/40 h-2 rounded-full mt-3 overflow-hidden border border-white/[0.05]">
                <div
                  className="bg-[#00f2ff] h-full rounded-full transition-all shadow-[0_0_6px_#00f2ff]"
                  style={{
                    width: `${Math.round((sprintDoneCount / sprint.milestones.length) * 100)}%`,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Persistent Sticky Internal Sprint Navigation Bar */}
      <div className="sticky top-20 z-30 p-2 rounded-2xl bg-[#05070a]/90 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        <span className="px-3 py-1 text-xs font-mono font-bold uppercase text-[#00f2ff] whitespace-nowrap">
          Sprint {activeSprint.sprintNumber} Menu:
        </span>
        {[
          { id: "sprint-overview", label: "Mission & Hook" },
          { id: "sprint-blueprint", label: "Blueprint Mockup" },
          { id: "sprint-roadmap", label: "Step-by-Step Roadmap" },
          { id: "sprint-milestones", label: "Milestones (+XP)" },
          { id: "sprint-deliverables", label: "Deliverables Checklist" },
          { id: "sprint-resources", label: "Skills & Resources" },
          { id: "practice-lab-section", label: "Practice Lab Simulator" },
          { id: "submit-sprint-section", label: "Submit & Proof" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sound.playClick();
              scrollToSection(item.id);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap bg-white/[0.04] hover:bg-[#00f2ff]/20 text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 3. SPRINT HERO SECTION */}
      <div id="sprint-overview" className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 text-[#00f2ff] font-black shadow-lg">
              {getSprintIcon(activeSprint.sprintNumber)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30 font-mono text-base font-bold uppercase tracking-wider">
                  Sprint {activeSprint.sprintNumber} // {activeSprint.codename}
                </span>
                <span className="text-base text-slate-400 font-mono">({activeSprint.duration})</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                {activeSprint.title}
              </h2>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <button
              onClick={() => scrollToSection("practice-lab-section")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-base transition-all cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.3)]"
            >
              <FlaskConical className="w-4 h-4 fill-current" />
              <span>Jump to Lab</span>
            </button>
            <button
              onClick={() => scrollToSection("submit-sprint-section")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-bold text-base transition-all cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#00f2ff]" />
              <span>Submit</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Pills: Estimated Time · Difficulty · Skills Learned · Final Output */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1">
            <div className="flex items-center gap-2 text-base font-mono text-slate-400">
              <Clock className="w-4 h-4 text-[#00f2ff]" />
              <span>Estimated Time</span>
            </div>
            <div className="text-lg font-black text-white font-mono">
              {activeSprint.estimatedTime}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1">
            <div className="flex items-center gap-2 text-base font-mono text-slate-400">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Difficulty Level</span>
            </div>
            <div className="text-lg font-black text-white">
              {activeSprint.difficulty}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1">
            <div className="flex items-center gap-2 text-base font-mono text-slate-400">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Skills Learned</span>
            </div>
            <div className="text-lg font-black text-white truncate" title={activeSprint.skillsList.join(", ")}>
              {activeSprint.skillsList[0]} + {activeSprint.skillsList.length - 1} more
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md space-y-1">
            <div className="flex items-center gap-2 text-base font-mono text-slate-400">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Final Output</span>
            </div>
            <div className="text-lg font-black text-white">
              {activeSprint.finalOutput}
            </div>
          </div>
        </div>

        {/* Primary Sprint Mission Goal */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-mono uppercase text-[#00f2ff] font-bold">
              Primary Sprint Mission
            </div>
            <p className="text-base md:text-lg text-slate-200 font-semibold mt-0.5 leading-relaxed">
              {activeSprint.goal}
            </p>
          </div>
        </div>
      </div>

      {/* 4. THE BRAG FACTOR // EMOTIONAL ENGINE */}
      <SprintMotivationHook
        bragPhrases={activeSprint.bragPhrases}
        sprintNumber={activeSprint.sprintNumber}
        projectTitle={activeSprint.project.name}
        badge={`Sprint ${activeSprint.sprintNumber} Flex`}
      />

      {/* 5. VISUAL PROJECT BLUEPRINT ("You are building this" + "Yours will be unique") */}
      <SprintVisualMockupCard
        mockup={activeSprint.visualMockup}
        sprintNumber={activeSprint.sprintNumber}
        onOpenLab={() => scrollToSection("practice-lab-section")}
      />

      {/* 6. SPRINT ROADMAP / TIMELINE (6 Steps) */}
      <SprintTimeline
        steps={activeSprint.timelineSteps}
        sprintId={activeSprint.id}
        completedStepNumbers={completedTimelineSteps}
        onToggleStep={handleStepToggle}
      />

      {/* 7. SPRINT MILESTONES & XP CHECKPOINTS */}
      <div id="sprint-milestones" className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-5 h-5" />
              <span>Achievement Checkpoints</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Milestones & XP Checkpoints
            </h3>
            <p className="text-base text-slate-300 mt-1">
              Check off milestones as you build to earn XP and level up your Matrix Rank.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-base font-mono self-start sm:self-auto">
            <span className="text-slate-400">Sprint Progress: </span>
            <span className="text-[#00f2ff] font-bold">
              {completedMilestoneCount}/{activeSprint.milestones.length} Done ({sprintProgressPct}%)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {activeSprint.milestones.map((milestone) => {
            const isCompleted = progress.completedMilestones.includes(milestone.id);

            return (
              <div
                key={milestone.id}
                onClick={() => onToggleMilestone(milestone.id, milestone.xp)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer select-none backdrop-blur-md flex items-start gap-4 ${
                  isCompleted
                    ? "bg-emerald-500/[0.08] border-emerald-500/40 text-slate-200"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300"
                }`}
              >
                <div
                  className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                    isCompleted
                      ? "bg-emerald-400 text-[#05070a] font-bold shadow-[0_0_8px_#34d399]"
                      : "border border-white/25 bg-white/[0.04] text-transparent"
                  }`}
                >
                  ✓
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-base font-bold ${isCompleted ? "text-white line-through opacity-80" : "text-[#e0e6ed]"}`}>
                      {milestone.title}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-base font-mono font-bold shrink-0">
                      +{milestone.xp} XP
                    </span>
                  </div>
                  <p className="text-base text-slate-400 leading-relaxed font-normal">
                    {milestone.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. EXACT DELIVERABLES CHECKLIST */}
      <SprintDeliverables
        deliverables={activeSprint.deliverables}
        sprintNumber={activeSprint.sprintNumber}
        onNavigateSubmit={() => scrollToSection("submit-sprint-section")}
      />

      {/* 9. CURATED LEARNING RESOURCES ("Need Help? Learn It Here") */}
      <SprintLearningResources
        resources={activeSprint.learningResources}
        skillsList={activeSprint.skillsList}
      />

      {/* 10. INTERACTIVE PRACTICE LAB & LIVE SIMULATOR */}
      <SprintPracticeLab
        labData={activeSprint.labData}
        sprintNumber={activeSprint.sprintNumber}
        onMilestoneEarned={(id, xp) => onToggleMilestone(id, xp)}
        childrenSandbox={renderSandbox(activeSprint.sandboxType)}
      />

      {/* 11. SPRINT SUBMISSION PROTOCOL & FORM */}
      <SprintSubmissionForm
        sprintId={activeSprint.id}
        sprintNumber={activeSprint.sprintNumber}
        existingSubmission={progress.submissions?.[activeSprint.id]}
        onSubmitSprint={handleFormSubmit}
      />

      {/* 12. COMPLETION CELEBRATION MODAL */}
      {completionModalSprint && (
        <SprintCompletionModal
          sprint={completionModalSprint}
          submission={activeSubmission || progress.submissions?.[completionModalSprint.id] || {
            sprintId: completionModalSprint.id,
            liveUrl: "https://github.com",
            description: "Completed project",
            customizationNote: "Customized parameters",
            submittedAt: new Date().toISOString(),
          }}
          onClose={() => setCompletionModalSprint(null)}
          onStartNextSprint={handleStartNextSprint}
          onReturnDashboard={() => {
            setCompletionModalSprint(null);
            if (onNavigateTab) onNavigateTab("dashboard");
          }}
        />
      )}
    </div>
  );
};
