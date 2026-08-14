import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  ArrowLeft,
  BookOpen, 
  FlaskConical, 
  Code2, 
  CheckSquare, 
  Upload, 
  Send,
  Sparkles,
  Zap
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
      case "learn": return <BookOpen className="w-5 h-5 text-blue-400" />;
      case "try": return <FlaskConical className="w-5 h-5 text-amber-400" />;
      case "build": return <Code2 className="w-5 h-5 text-purple-400" />;
      case "test": return <CheckSquare className="w-5 h-5 text-emerald-400" />;
      case "publish": return <Upload className="w-5 h-5 text-cyan-400" />;
      case "submit": return <Send className="w-5 h-5 text-rose-400" />;
      default: return <Clock className="w-5 h-5 text-[#00f2ff]" />;
    }
  };

  const activeStepIndex = steps.findIndex((s) => s.stepNumber === activeStepNum);
  const activeStep = steps[activeStepIndex] || steps[0];

  const handleNextStep = () => {
    if (activeStepIndex < steps.length - 1) {
      sound.playClick();
      setActiveStepNum(steps[activeStepIndex + 1].stepNumber);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      sound.playClick();
      setActiveStepNum(steps[activeStepIndex - 1].stepNumber);
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Roadmap Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-[#00f2ff]" />
            <span>Sprint Roadmap & Action Steps</span>
          </div>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Follow 6 rapid stages from concept to live deployment.
          </p>
        </div>

        {/* Compact Progress Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10">
          <div className="text-xs font-mono text-slate-300">
            <strong className="text-[#00f2ff] font-black">{completedCount}/{steps.length}</strong> Steps Done
          </div>
          <div className="w-20 bg-white/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#00f2ff] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_#00f2ff]"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="text-xs font-mono font-bold text-[#00f2ff]">{progressPct}%</span>
        </div>
      </div>

      {/* Compact Step Cards Row (Horizontal Step Selector Bar) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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
              className={`p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer relative overflow-hidden backdrop-blur-md flex flex-col justify-between ${
                isCurrent
                  ? "bg-[#00f2ff]/15 border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.2)] ring-1 ring-[#00f2ff]"
                  : isDone
                  ? "bg-emerald-500/[0.08] border-emerald-500/30 hover:border-emerald-500/50"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-xs font-mono font-bold ${isCurrent ? "text-[#00f2ff]" : "text-slate-400"}`}>
                  Step {step.stepNumber}
                </span>

                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className={`w-3.5 h-3.5 ${isCurrent ? "text-[#00f2ff]" : "text-slate-600"}`} />
                )}
              </div>

              <div>
                <h4 className="font-bold text-white text-xs truncate">
                  {step.name}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {step.duration}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Step Focused Details Workspace */}
      <div className="p-5 md:p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/10 shrink-0">
              {getStepIcon(activeStep.category)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
                  Step {activeStep.stepNumber} of {steps.length} // {activeStep.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-400">({activeStep.duration})</span>
              </div>
              <h4 className="text-lg md:text-xl font-black text-white mt-0.5">
                {activeStep.name}: {activeStep.description}
              </h4>
            </div>
          </div>

          <button
            onClick={() => {
              onToggleStep(activeStep.stepNumber);
            }}
            className={`px-4 py-2 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shrink-0 ${
              completedStepNumbers.includes(activeStep.stepNumber)
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 hover:border-[#00f2ff]/40"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {completedStepNumbers.includes(activeStep.stepNumber)
                ? "Step Done ✓"
                : "Mark Step Done"}
            </span>
          </button>
        </div>

        {/* Action Tip */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-slate-200 leading-relaxed font-medium">
          <strong className="text-[#00f2ff] font-mono mr-2">ACTION TIP:</strong>
          {activeStep.actionTip}
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <button
            onClick={handlePrevStep}
            disabled={activeStepIndex === 0}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeStepIndex === 0
                ? "text-slate-600 cursor-not-allowed"
                : "text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] cursor-pointer"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous Step</span>
          </button>

          <span className="text-xs font-mono text-slate-500">
            Step {activeStepIndex + 1} of {steps.length}
          </span>

          <button
            onClick={handleNextStep}
            disabled={activeStepIndex === steps.length - 1}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeStepIndex === steps.length - 1
                ? "text-slate-600 cursor-not-allowed"
                : "text-[#00f2ff] hover:text-white bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 cursor-pointer"
            }`}
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
