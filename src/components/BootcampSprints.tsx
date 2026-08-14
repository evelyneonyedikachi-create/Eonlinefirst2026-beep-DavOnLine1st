import React, { useState } from "react";
import { 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  ArrowRight, 
  ArrowLeft,
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
  Shield,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Compass,
  Terminal
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
  onNavigateTab?: (tab: string, param?: string | number) => void;
  onExportProgress?: () => void;
  onAskMentor?: (query: string) => void;
}

type SectionKey = 
  | "mission"
  | "blueprint"
  | "roadmap"
  | "milestones"
  | "deliverables"
  | "resources"
  | "lab"
  | "submit";

interface SectionMeta {
  key: SectionKey;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  description: string;
}

const SPRINT_SECTIONS: SectionMeta[] = [
  { 
    key: "mission", 
    label: "Mission & Hook", 
    shortLabel: "Mission",
    icon: Flame, 
    description: "Core sprint objective and the shareable brag statement." 
  },
  { 
    key: "blueprint", 
    label: "Project Blueprint", 
    shortLabel: "Blueprint",
    icon: Terminal, 
    description: "Preview the architecture, UI layout, and key capabilities." 
  },
  { 
    key: "roadmap", 
    label: "Sprint Roadmap", 
    shortLabel: "Roadmap",
    icon: Clock, 
    description: "Step-by-step guidance from concept to live deployment." 
  },
  { 
    key: "milestones", 
    label: "Milestones & XP", 
    shortLabel: "Milestones",
    icon: Trophy, 
    description: "Achievement checkpoints with XP rewards." 
  },
  { 
    key: "deliverables", 
    label: "Deliverables", 
    shortLabel: "Deliverables",
    icon: CheckSquare, 
    description: "Checklist of what you must build and deliver." 
  },
  { 
    key: "resources", 
    label: "Skills & Resources", 
    shortLabel: "Resources",
    icon: BookOpen, 
    description: "Curated tutorials, docs, and cheat sheets." 
  },
  { 
    key: "lab", 
    label: "Practice Lab", 
    shortLabel: "Lab",
    icon: FlaskConical, 
    description: "Interactive code sandbox & live telemetry." 
  },
  { 
    key: "submit", 
    label: "Submit Sprint", 
    shortLabel: "Submit",
    icon: Send, 
    description: "Final submit action to claim your badge & +300 XP." 
  },
];

export const BootcampSprints: React.FC<BootcampSprintsProps> = ({
  progress,
  onToggleMilestone,
  onToggleTimelineStep,
  onSubmitSprint,
  activeSprintNum = 1,
  onNavigateTab,
  onExportProgress,
  onAskMentor,
}) => {
  const [selectedSprintId, setSelectedSprintId] = useState<string>(
    `sprint-${activeSprintNum}`
  );
  const [activeSection, setActiveSection] = useState<SectionKey>("mission");
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [completionModalSprint, setCompletionModalSprint] = useState<BootcampSprint | null>(null);
  const [activeSubmission, setActiveSubmission] = useState<SprintSubmissionData | null>(null);

  const activeSprint =
    BOOTCAMP_SPRINTS.find((s) => s.id === selectedSprintId) ||
    BOOTCAMP_SPRINTS[0];

  const getSprintIcon = (sprintNum: number) => {
    switch (sprintNum) {
      case 1: return <TrendingUp className="w-4 h-4" />;
      case 2: return <Mic className="w-4 h-4" />;
      case 3: return <Eye className="w-4 h-4" />;
      case 4: return <Bot className="w-4 h-4" />;
      case 5: return <Globe className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
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
      setActiveSection("mission");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Section index calculations for previous / next buttons
  const currentSectionIndex = SPRINT_SECTIONS.findIndex((s) => s.key === activeSection);
  const prevSection = currentSectionIndex > 0 ? SPRINT_SECTIONS[currentSectionIndex - 1] : null;
  const nextSection = currentSectionIndex < SPRINT_SECTIONS.length - 1 ? SPRINT_SECTIONS[currentSectionIndex + 1] : null;

  const navigateToSection = (key: SectionKey) => {
    sound.playClick();
    setActiveSection(key);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="relative rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-5 md:p-6 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-xs font-bold uppercase">
              <Layers className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span>5-Sprint Action Workspace</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Build Real AI Projects. <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8]">One Focused Module at a Time.</span>
            </h2>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-medium">
              Select your sprint and navigate using the workspace sidebar. Zero endless vertical scrolling.
            </p>
          </div>

          {/* Quick Sprint Overview Tag */}
          <div className="flex items-center gap-3 bg-black/40 px-4 py-2.5 rounded-xl border border-white/10 shrink-0 self-start md:self-auto">
            <div className="p-2 rounded-lg bg-[#00f2ff]/15 text-[#00f2ff]">
              {getSprintIcon(activeSprint.sprintNumber)}
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Active Sprint</div>
              <div className="text-sm font-bold text-white">
                Sprint {activeSprint.sprintNumber}: {activeSprint.codename}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Top Sprint Selector (Sprint 1 to 5) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
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
                // Keep the active section focused
              }}
              className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer relative overflow-hidden flex flex-col justify-between backdrop-blur-md ${
                isSelected
                  ? "bg-[#00f2ff]/15 border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.25)] ring-1 ring-[#00f2ff]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                  isSelected ? "bg-[#00f2ff] text-[#05070a]" : "bg-white/[0.05] border border-white/10 text-[#00f2ff]"
                }`}>
                  S{sprint.sprintNumber}
                </span>

                {isFullyComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-xs font-mono text-slate-400">
                    {sprintDoneCount}/{sprint.milestones.length}
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-white text-xs leading-snug truncate">
                  {sprint.title.replace("Build Your ", "").replace("Deploy Your ", "")}
                </h4>
                <p className="text-[11px] text-slate-400 font-mono">{sprint.estimatedTime}</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-black/40 h-1.5 rounded-full mt-2 overflow-hidden border border-white/[0.05]">
                <div
                  className="bg-[#00f2ff] h-full rounded-full transition-all"
                  style={{
                    width: `${Math.round((sprintDoneCount / sprint.milestones.length) * 100)}%`,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Mobile Navigation Header (Shown on Small Screens) */}
      <div className="lg:hidden">
        <div className="p-3 rounded-xl bg-[#070b14] border border-white/15 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#00f2ff] font-bold uppercase">Sprint {activeSprint.sprintNumber} Workspace:</span>
            <span className="text-xs font-bold text-white">
              {SPRINT_SECTIONS.find((s) => s.key === activeSection)?.label}
            </span>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-3.5 h-3.5 text-[#00f2ff]" /> : <Menu className="w-3.5 h-3.5 text-[#00f2ff]" />}
            <span>Menu</span>
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="mt-2 p-2 rounded-xl bg-[#090e1c] border border-white/15 shadow-2xl space-y-1 animate-in fade-in duration-150">
            {SPRINT_SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.key;

              return (
                <button
                  key={section.key}
                  onClick={() => navigateToSection(section.key)}
                  className={`w-full p-2.5 rounded-lg flex items-center justify-between text-left text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#00f2ff] text-[#05070a] shadow-md font-extrabold"
                      : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{section.label}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "text-[#05070a]" : "text-slate-500"}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Main 2-Column Desktop Layout (Sticky Left Sidebar + Single Active Content Workspace) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sticky Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-20 space-y-3">
          <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-4 shadow-xl space-y-3">
            {/* Sidebar Title */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[11px] font-mono font-bold text-[#00f2ff] uppercase tracking-wider block">
                  Sprint {activeSprint.sprintNumber} Menu
                </span>
                <span className="text-sm font-black text-white truncate block">
                  {activeSprint.codename}
                </span>
              </div>

              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                {sprintProgressPct}%
              </span>
            </div>

            {/* Vertical Menu Buttons */}
            <nav className="space-y-1">
              {SPRINT_SECTIONS.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.key;

                return (
                  <button
                    key={section.key}
                    onClick={() => navigateToSection(section.key)}
                    className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left transition-all duration-150 cursor-pointer group ${
                      isActive
                        ? "bg-[#00f2ff] text-[#05070a] shadow-[0_0_15px_rgba(0,242,255,0.3)] font-black"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#05070a]" : "text-[#00f2ff] group-hover:scale-110 transition-transform"}`} />
                      <span className="text-xs tracking-tight truncate">
                        {section.label}
                      </span>
                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? "text-[#05070a] translate-x-0.5" : "text-slate-600 group-hover:text-slate-400"}`} />
                  </button>
                );
              })}
            </nav>

            {/* Sidebar Sprint Progress & XP Summary */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Checkpoints Done:</span>
                <span className="text-white font-bold">{completedMilestoneCount} / {activeSprint.milestones.length}</span>
              </div>
              <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="bg-[#00f2ff] h-full rounded-full transition-all duration-300 shadow-[0_0_6px_#00f2ff]"
                  style={{ width: `${sprintProgressPct}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-[11px] font-mono text-amber-300 font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>+300 XP on Submit</span>
                </div>

                <button
                  onClick={() => navigateToSection("submit")}
                  className="text-[11px] font-mono text-[#00f2ff] hover:underline font-bold cursor-pointer"
                >
                  Submit →
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Active Content Workspace (Only ONE section open at a time) */}
        <main className="lg:col-span-8 xl:col-span-9 space-y-4">
          <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/5 rounded-full blur-3xl pointer-events-none" />

            {/* A. MISSION & HOOK SECTION */}
            {activeSection === "mission" && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10 text-[#00f2ff]">
                      {getSprintIcon(activeSprint.sprintNumber)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30 font-mono text-xs font-bold uppercase">
                          Sprint {activeSprint.sprintNumber} // {activeSprint.codename}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">({activeSprint.duration})</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                        {activeSprint.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => navigateToSection("roadmap")}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.3)] self-start sm:self-auto shrink-0"
                  >
                    <span>Start with Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 4 Stats Pills */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-[#00f2ff]" />
                      <span>Estimated Time</span>
                    </div>
                    <div className="text-sm font-black text-white font-mono">
                      {activeSprint.estimatedTime}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Difficulty</span>
                    </div>
                    <div className="text-sm font-black text-white">
                      {activeSprint.difficulty}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Code2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Core Skill</span>
                    </div>
                    <div className="text-sm font-black text-white truncate" title={activeSprint.skillsList.join(", ")}>
                      {activeSprint.skillsList[0]}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Final Output</span>
                    </div>
                    <div className="text-sm font-black text-white truncate">
                      {activeSprint.finalOutput}
                    </div>
                  </div>
                </div>

                {/* Primary Sprint Mission Goal */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono uppercase text-[#00f2ff] font-bold">
                      Primary Sprint Objective
                    </div>
                    <p className="text-sm md:text-base text-slate-200 font-semibold mt-0.5 leading-relaxed">
                      {activeSprint.goal}
                    </p>
                  </div>
                </div>

                {/* The Brag Factor Component */}
                <SprintMotivationHook
                  bragPhrases={activeSprint.bragPhrases}
                  sprintNumber={activeSprint.sprintNumber}
                  projectTitle={activeSprint.project.name}
                  badge={`Sprint ${activeSprint.sprintNumber} Flex`}
                />
              </div>
            )}

            {/* B. PROJECT BLUEPRINT SECTION */}
            {activeSection === "blueprint" && (
              <div className="animate-in fade-in duration-200">
                <SprintVisualMockupCard
                  mockup={activeSprint.visualMockup}
                  sprintNumber={activeSprint.sprintNumber}
                  onOpenLab={() => navigateToSection("lab")}
                />
              </div>
            )}

            {/* C. SPRINT ROADMAP SECTION */}
            {activeSection === "roadmap" && (
              <div className="animate-in fade-in duration-200">
                <SprintTimeline
                  steps={activeSprint.timelineSteps}
                  sprintId={activeSprint.id}
                  completedStepNumbers={completedTimelineSteps}
                  onToggleStep={handleStepToggle}
                />
              </div>
            )}

            {/* D. MILESTONES & XP SECTION (Expandable Checklist Groups) */}
            {activeSection === "milestones" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
                      <Trophy className="w-4 h-4 text-[#00f2ff]" />
                      <span>Milestones & Achievement Checkpoints</span>
                    </div>
                    <p className="text-sm text-slate-300 font-medium mt-0.5">
                      Check off milestones to earn XP and level up your Matrix Rank.
                    </p>
                  </div>

                  <div className="p-2.5 px-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono self-start sm:self-auto flex items-center gap-2">
                    <span className="text-slate-400">Progress:</span>
                    <span className="text-[#00f2ff] font-bold">
                      {completedMilestoneCount}/{activeSprint.milestones.length} Done ({sprintProgressPct}%)
                    </span>
                  </div>
                </div>

                {/* Compact Expandable Checklist Groups */}
                <div className="space-y-2">
                  {activeSprint.milestones.map((milestone, idx) => {
                    const isCompleted = progress.completedMilestones.includes(milestone.id);
                    const isExpanded = expandedMilestoneId === milestone.id;

                    return (
                      <div
                        key={milestone.id}
                        className={`rounded-xl border transition-all duration-150 backdrop-blur-md overflow-hidden ${
                          isCompleted
                            ? "bg-emerald-500/[0.06] border-emerald-500/30"
                            : "bg-white/[0.02] border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div
                          onClick={() => {
                            sound.playClick();
                            setExpandedMilestoneId(isExpanded ? null : milestone.id);
                          }}
                          className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleMilestone(milestone.id, milestone.xp);
                              }}
                              className={`w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                                isCompleted
                                  ? "bg-emerald-400 text-[#05070a] font-black text-xs shadow-[0_0_8px_#34d399]"
                                  : "border border-white/25 bg-white/[0.04] text-transparent hover:border-[#00f2ff]"
                              }`}
                            >
                              ✓
                            </button>

                            <div className="min-w-0">
                              <span className={`text-sm font-bold truncate block ${isCompleted ? "text-white line-through opacity-80" : "text-[#e0e6ed]"}`}>
                                {idx + 1}. {milestone.title}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-mono font-bold">
                              +{milestone.xp} XP
                            </span>

                            <button
                              type="button"
                              className="text-slate-400 hover:text-white p-1"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="px-4 pb-3.5 pt-1 text-xs text-slate-300 border-t border-white/5 space-y-2 bg-black/20">
                            <p className="leading-relaxed">{milestone.description}</p>
                            <div className="flex items-center justify-between text-slate-400 pt-1">
                              <span className="font-mono text-[11px] text-[#00f2ff]">
                                {isCompleted ? "✓ Completed & XP Awarded" : "Check box to claim +" + milestone.xp + " XP"}
                              </span>
                              <button
                                type="button"
                                onClick={() => onToggleMilestone(milestone.id, milestone.xp)}
                                className="text-xs font-bold text-slate-200 hover:text-white underline cursor-pointer"
                              >
                                {isCompleted ? "Mark Incomplete" : "Mark Done (+XP)"}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* E. DELIVERABLES SECTION */}
            {activeSection === "deliverables" && (
              <div className="animate-in fade-in duration-200">
                <SprintDeliverables
                  deliverables={activeSprint.deliverables}
                  sprintNumber={activeSprint.sprintNumber}
                  onNavigateSubmit={() => navigateToSection("submit")}
                />
              </div>
            )}

            {/* F. SKILLS & RESOURCES SECTION */}
            {activeSection === "resources" && (
              <div className="animate-in fade-in duration-200">
                <SprintLearningResources
                  resources={activeSprint.learningResources}
                  skillsList={activeSprint.skillsList}
                />
              </div>
            )}

            {/* G. PRACTICE LAB SECTION */}
            {activeSection === "lab" && (
              <div className="animate-in fade-in duration-200">
                <SprintPracticeLab
                  labData={activeSprint.labData}
                  sprintNumber={activeSprint.sprintNumber}
                  onMilestoneEarned={(id, xp) => onToggleMilestone(id, xp)}
                  childrenSandbox={renderSandbox(activeSprint.sandboxType)}
                />
              </div>
            )}

            {/* H. SUBMIT SPRINT SECTION */}
            {activeSection === "submit" && (
              <div className="animate-in fade-in duration-200">
                <SprintSubmissionForm
                  sprintId={activeSprint.id}
                  sprintNumber={activeSprint.sprintNumber}
                  sprintTitle={activeSprint.title}
                  skillsList={activeSprint.skillsList}
                  existingSubmission={progress.submissions?.[activeSprint.id]}
                  onSubmitSprint={handleFormSubmit}
                  onExportProgress={onExportProgress}
                  onAskMentor={onAskMentor}
                />
              </div>
            )}

            {/* Quick Section Switching Controls (Previous / Next) */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              {prevSection ? (
                <button
                  onClick={() => navigateToSection(prevSection.key)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#00f2ff]" />
                  <span>← {prevSection.label}</span>
                </button>
              ) : (
                <div />
              )}

              {nextSection ? (
                <button
                  onClick={() => navigateToSection(nextSection.key)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00f2ff]/15 hover:bg-[#00f2ff]/25 border border-[#00f2ff]/30 text-[#00f2ff] hover:text-white text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  <span>Next: {nextSection.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Completion Modal */}
      {completionModalSprint && (
        <SprintCompletionModal
          sprint={completionModalSprint}
          submission={activeSubmission || progress.submissions?.[completionModalSprint.id] || {
            sprintId: completionModalSprint.id,
            sprintNumber: completionModalSprint.sprintNumber,
            sprintTitle: completionModalSprint.title,
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
          onViewGraduation={() => {
            setCompletionModalSprint(null);
            if (onNavigateTab) onNavigateTab("graduation");
          }}
          onExportProgress={onExportProgress}
        />
      )}
    </div>
  );
};
