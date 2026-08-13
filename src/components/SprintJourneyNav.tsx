import React from "react";
import { CheckCircle2, Circle, Clock, LayoutDashboard, ArrowRight, Sparkles } from "lucide-react";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { sound } from "../utils/soundEffects";

interface SprintJourneyNavProps {
  currentSprintId: string;
  completedSprintIds: string[];
  onSelectSprint: (sprintId: string) => void;
  onReturnDashboard: () => void;
}

export const SprintJourneyNav: React.FC<SprintJourneyNavProps> = ({
  currentSprintId,
  completedSprintIds = [],
  onSelectSprint,
  onReturnDashboard,
}) => {
  const totalSprints = BOOTCAMP_SPRINTS.length;
  const completedCount = completedSprintIds.length;
  const progressPct = Math.round((completedCount / totalSprints) * 100);

  return (
    <div className="w-full rounded-2xl bg-[#090d16]/90 backdrop-blur-xl border border-white/10 p-4 shadow-xl">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Journey Title & Progress Percent */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base font-mono font-bold text-white flex items-center gap-2">
              <span>Your AI Engineering Journey</span>
              <span className="px-2 py-0.5 rounded-md bg-white/[0.06] text-[#00f2ff] text-base border border-white/10">
                {progressPct}% Completed
              </span>
            </div>
            <p className="text-base text-slate-400">
              5 Practical Sprints to Production AI Mastery
            </p>
          </div>
        </div>

        {/* Middle: Interactive Sprint Breadcrumbs / Badges */}
        <div className="flex flex-wrap items-center gap-2">
          {BOOTCAMP_SPRINTS.map((s) => {
            const isCompleted = completedSprintIds.includes(s.id);
            const isCurrent = s.id === currentSprintId;

            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playClick();
                  onSelectSprint(s.id);
                }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-base font-mono font-bold transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-[#00f2ff] text-[#05070a] shadow-[0_0_15px_rgba(0,242,255,0.4)]"
                    : isCompleted
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/25"
                    : "bg-white/[0.04] text-slate-400 border border-white/10 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-[#05070a] animate-ping" />
                ) : (
                  <Circle className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>Sprint {s.sprintNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Action to Dashboard */}
        <button
          onClick={() => {
            sound.playClick();
            onReturnDashboard();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-slate-200 text-base font-bold transition-all cursor-pointer self-start lg:self-auto"
        >
          <LayoutDashboard className="w-4 h-4 text-[#00f2ff]" />
          <span>Dashboard</span>
        </button>
      </div>
    </div>
  );
};
