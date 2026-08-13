import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  FlaskConical, 
  Code2, 
  CheckSquare, 
  Upload, 
  Send,
  Sparkles
} from "lucide-react";
import { SprintTimelineStep } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintTimelineProps {
  steps: SprintTimelineStep[];
  sprintId: string;
  completedStepNumbers: number[];
  onToggleStep: (stepNumber: number) => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const SprintTimeline: React.FC<SprintTimelineProps> = ({
  steps,
  sprintId,
  completedStepNumbers = [],
  onToggleStep,
  onNavigateSection,
}) => {
  const [activeStepNum, setActiveStepNum] = useState<number>(
    steps.find((s) => !completedStepNumbers.includes(s.stepNumber))?.stepNumber || 1
  );

  const completedCount = completedStepNumbers.length;
  const progressPct = Math.round((completedCount / steps.length) * 100);

  const getStepIcon = (category: string) => {
    switch (category) {
      case "learn": return <BookOpen className="w-5 h-5" />;
      case "try": return <FlaskConical className="w-5 h-5" />;
      case "build": return <Code2 className="w-5 h-5" />;
      case "test": return <CheckSquare className="w-5 h-5" />;
      case "publish": return <Upload className="w-5 h-5" />;
      case "submit": return <Send className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const activeStep = steps.find((s) => s.stepNumber === activeStepNum) || steps[0];

  return (
    <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
      {/* Roadmap Header & Progress Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
            <Clock className="w-5 h-5" />
            <span>Structured Sprint Roadmap</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Your Sprint Roadmap
          </h3>
        </div>

        {/* Progress Tracker Pill */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md min-w-[220px]">
          <div className="flex justify-between items-center text-base font-mono mb-2">
            <span className="text-slate-300 font-semibold">
              <strong className="text-[#00f2ff] font-black">{completedCount} of {steps.length}</strong> completed
            </span>
            <span className="text-[#00f2ff] font-bold">{progressPct}%</span>
          </div>
          <div className="w-full bg-black/60 h-3 rounded-full overflow-hidden border border-white/10">
            <div
              className="bg-gradient-to-r from-[#00f2ff] to-[#38bdf8] h-full rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(0,242,255,0.4)]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal / Step Pills Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((step) => {
          const isDone = completedStepNumbers.includes(step.stepNumber);
          const isCurrent = step.stepNumber === activeStepNum;

          return (
            <button
              key={step.stepNumber}
              onClick={() => {
                sound.playClick();
                setActiveStepNum(step.stepNumber);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden backdrop-blur-md flex flex-col justify-between ${
                isCurrent
                  ? "bg-[#00f2ff]/15 border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.25)] ring-1 ring-[#00f2ff]"
                  : isDone
                  ? "bg-emerald-500/[0.08] border-emerald-500/30 hover:border-emerald-500/50"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-mono font-bold text-slate-400">
                  Step {step.stepNumber}
                </span>

                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Circle className={`w-4 h-4 ${isCurrent ? "text-[#00f2ff]" : "text-slate-500"}`} />
                )}
              </div>

              <div>
                <h4 className="font-extrabold text-white text-base truncate">
                  {step.name}
                </h4>
                <p className="text-base font-mono text-[#00f2ff] mt-0.5">
                  {step.duration}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Detailed Card */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10 text-[#00f2ff] shadow-inner">
              {getStepIcon(activeStep.category)}
            </div>
            <div>
              <div className="text-base font-mono text-[#00f2ff] font-bold uppercase">
                Step {activeStep.stepNumber} — {activeStep.name} ({activeStep.duration})
              </div>
              <h4 className="text-xl font-extrabold text-white mt-0.5">
                {activeStep.description}
              </h4>
            </div>
          </div>

          <button
            onClick={() => {
              onToggleStep(activeStep.stepNumber);
            }}
            className={`px-5 py-2.5 rounded-xl font-bold text-base transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto ${
              completedStepNumbers.includes(activeStep.stepNumber)
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10"
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>
              {completedStepNumbers.includes(activeStep.stepNumber)
                ? "Step Completed ✓"
                : "Mark Step Done"}
            </span>
          </button>
        </div>

        {/* Action Tip */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-base text-slate-200 leading-relaxed font-medium">
          <strong className="text-[#00f2ff] font-mono mr-2">PRO TIP:</strong>
          {activeStep.actionTip}
        </div>
      </div>
    </div>
  );
};
