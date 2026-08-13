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
  Globe
} from "lucide-react";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { UserProgressState } from "../types";
import { sound } from "../utils/soundEffects";
import { StockPredictorSandbox } from "./Sandboxes/StockPredictorSandbox";
import { LyricGenSandbox } from "./Sandboxes/LyricGenSandbox";
import { VisionQuestSandbox } from "./Sandboxes/VisionQuestSandbox";
import { AgentScraperSandbox } from "./Sandboxes/AgentScraperSandbox";
import { RedTeamPromptSandbox } from "./Sandboxes/RedTeamPromptSandbox";

interface BootcampSprintsProps {
  progress: UserProgressState;
  onToggleMilestone: (milestoneId: string, xp: number) => void;
  activeSprintNum?: number;
}

export const BootcampSprints: React.FC<BootcampSprintsProps> = ({
  progress,
  onToggleMilestone,
  activeSprintNum = 1,
}) => {
  const [selectedSprintId, setSelectedSprintId] = useState<string>(
    `sprint-${activeSprintNum}`
  );
  const [showSandbox, setShowSandbox] = useState<boolean>(true);

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

  const completedCount = activeSprint.milestones.filter((m) =>
    progress.completedMilestones.includes(m.id)
  ).length;
  const sprintProgressPct = Math.round(
    (completedCount / activeSprint.milestones.length) * 100
  );

  return (
    <div className="space-y-6">
      {/* Sprint Philosophy Hero in Frosted Glass */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-xs font-bold uppercase">
            <Layers className="w-4 h-4 text-[#00f2ff]" />
            <span>The Project-First Teen Learning Engine</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            5 Action-Packed <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">Bootcamp Sprints</span>
          </h2>

          <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed">
            Instead of saying <em>"Let's study Python theory,"</em> we say:{" "}
            <strong className="text-[#00f2ff]">"We are building a Wall Street stock trading bot in 30 days."</strong> You learn Python and AI as a side effect of building insane, shareable projects.
          </p>
        </div>
      </div>

      {/* Horizontal Sprint Selector Cards in Frosted Glass */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {BOOTCAMP_SPRINTS.map((sprint) => {
          const isSelected = sprint.id === selectedSprintId;
          const sprintDoneCount = sprint.milestones.filter((m) =>
            progress.completedMilestones.includes(m.id)
          ).length;
          const isFullyComplete = sprintDoneCount === sprint.milestones.length;

          return (
            <button
              key={sprint.id}
              onClick={() => {
                sound.playClick();
                setSelectedSprintId(sprint.id);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between backdrop-blur-md ${
                isSelected
                  ? "bg-[#00f2ff]/15 border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.25)] ring-1 ring-[#00f2ff]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                  isSelected ? "bg-[#00f2ff] text-[#05070a] shadow-[0_0_8px_#00f2ff]" : "bg-white/[0.05] border border-white/10 text-[#00f2ff]"
                }`}>
                  S{sprint.sprintNumber}
                </span>

                {isFullyComplete ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono text-[#94a3b8]">
                    {sprintDoneCount}/{sprint.milestones.length}
                  </span>
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-white text-xs leading-tight mb-1 truncate">
                  {sprint.title.replace("The ", "")}
                </h4>
                <p className="text-[10px] text-[#94a3b8] font-mono">{sprint.duration}</p>
              </div>

              {/* Mini progress indicator */}
              <div className="w-full bg-black/40 h-1 rounded-full mt-2.5 overflow-hidden border border-white/[0.05]">
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

      {/* Active Sprint Detail Board in Frosted Glass */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        {/* Header of Active Sprint */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 text-[#00f2ff] font-black shadow-lg">
              {getSprintIcon(activeSprint.sprintNumber)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#00f2ff] uppercase tracking-wider">
                  Sprint {activeSprint.sprintNumber} // {activeSprint.codename}
                </span>
                <span className="text-xs text-[#94a3b8] font-mono">({activeSprint.duration})</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                {activeSprint.title}
              </h3>
            </div>
          </div>

          {/* Progress Tracker Pill */}
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md min-w-[200px]">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-[#94a3b8]">Sprint Mastery:</span>
              <span className="text-[#00f2ff] font-bold">{sprintProgressPct}%</span>
            </div>
            <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden border border-white/[0.05]">
              <div
                className="bg-[#00f2ff] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#00f2ff]"
                style={{ width: `${sprintProgressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* The Sprint Mission & Motivation Hook */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <div className="text-[11px] font-mono uppercase text-[#00f2ff] font-bold mb-1">
              Primary Sprint Mission Goal:
            </div>
            <p className="text-xs md:text-sm text-slate-200 font-medium leading-relaxed">
              {activeSprint.goal}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/[0.08] border border-amber-500/30 backdrop-blur-md">
            <div className="text-[11px] font-mono uppercase text-amber-400 font-bold mb-1 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>The Teen Motivation Hook:</span>
            </div>
            <p className="text-xs md:text-sm text-amber-200/90 font-medium leading-relaxed">
              "{activeSprint.motivationHook}"
            </p>
          </div>
        </div>

        {/* Hands-On Deliverable Card in Frosted Glass */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#00f2ff] font-bold uppercase">
              <Code2 className="w-4 h-4 text-[#00f2ff]" />
              <span>Capstone Project: {activeSprint.project.name}</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30">
              REAL CODE DELIVERABLE
            </span>
          </div>

          <p className="text-xs text-[#94a3b8] mb-3">{activeSprint.project.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2 border-t border-white/10">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Exact Deliverable:</span>
              <span className="text-[#00f2ff] font-semibold">{activeSprint.project.deliverable}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Brag Factor:</span>
              <span className="text-amber-300 font-semibold">{activeSprint.project.bragFactor}</span>
            </div>
          </div>
        </div>

        {/* Two-Column: Interactive Checklist & Curriculum Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Milestone XP Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase text-[#00f2ff] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00f2ff]" />
                <span>Sprint Milestones & XP Checkpoints</span>
              </h4>
              <span className="text-xs text-[#94a3b8] font-mono">
                Click checkmark to earn XP!
              </span>
            </div>

            <div className="space-y-2.5">
              {activeSprint.milestones.map((m) => {
                const isCompleted = progress.completedMilestones.includes(m.id);

                return (
                  <div
                    key={m.id}
                    onClick={() => {
                      onToggleMilestone(m.id, m.xp);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none backdrop-blur-md ${
                      isCompleted
                        ? "bg-[#00f2ff]/10 border-[#00f2ff]/40 text-slate-200"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 text-[#94a3b8]"
                    }`}
                  >
                    <div
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-[#00f2ff] text-[#05070a] font-bold shadow-[0_0_8px_#00f2ff]"
                          : "border border-white/20 bg-white/[0.04] text-transparent"
                      }`}
                    >
                      ✓
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${isCompleted ? "text-white line-through opacity-80" : "text-[#e0e6ed]"}`}>
                          {m.title}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/20">
                          +{m.xp} XP
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94a3b8] mt-0.5">{m.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Curriculum Modules in Frosted Glass */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase text-[#00f2ff] font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Sprint Curriculum Modules</span>
            </h4>

            <div className="space-y-2.5">
              {activeSprint.curriculum.map((mod, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-1.5">
                  <div className="font-bold text-white text-xs">{mod.module}</div>
                  <p className="text-[11px] text-[#94a3b8] leading-relaxed">{mod.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {mod.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 text-[10px] font-mono border border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Embedded Interactive Sandbox Simulator for this Sprint */}
        <div className="pt-4 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-[#00f2ff]" />
              <h4 className="text-sm font-bold text-white">
                Live Interactive Lab Simulator for Sprint {activeSprint.sprintNumber}
              </h4>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                setShowSandbox(!showSandbox);
              }}
              className="text-xs font-mono text-[#00f2ff] hover:text-[#33f5ff] underline cursor-pointer"
            >
              {showSandbox ? "Hide Lab" : "Open Lab Simulator"}
            </button>
          </div>

          {showSandbox && renderSandbox(activeSprint.sandboxType)}
        </div>
      </div>
    </div>
  );
};
