import React, { useState } from "react";
import { 
  CheckSquare, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  FileCode, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Circle
} from "lucide-react";
import { SprintDeliverable } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintDeliverablesProps {
  deliverables: SprintDeliverable[];
  sprintNumber: number;
  onNavigateSubmit?: () => void;
}

export const SprintDeliverables: React.FC<SprintDeliverablesProps> = ({
  deliverables,
  sprintNumber,
  onNavigateSubmit,
}) => {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggle = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playClick();
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
      sound.playXpGain();
    }
  };

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedId(expandedId === id ? null : id);
  };

  const totalRequired = deliverables.filter((d) => d.required).length;
  const checkedRequired = deliverables.filter((d) => d.required && checkedIds.includes(d.id)).length;
  const isReadyToSubmit = checkedRequired === totalRequired;

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
            <CheckSquare className="w-4 h-4 text-[#00f2ff]" />
            <span>Deliverables Checklist // What to Submit</span>
          </div>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Check off each requirement to verify your project is complete and ready to submit.
          </p>
        </div>

        <div className="p-2.5 px-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono self-start sm:self-auto flex items-center gap-2">
          <span className="text-slate-400">Submission Status:</span>
          <span className={`font-bold ${isReadyToSubmit ? "text-emerald-400" : "text-[#00f2ff]"}`}>
            {checkedRequired}/{totalRequired} Required Ready
          </span>
        </div>
      </div>

      {/* Compact Interactive Checklist Items */}
      <div className="space-y-2">
        {deliverables.map((item, idx) => {
          const isChecked = checkedIds.includes(item.id);
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-150 backdrop-blur-md overflow-hidden ${
                isChecked
                  ? "bg-emerald-500/[0.06] border-emerald-500/30"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => handleToggle(item.id, e)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                      isChecked
                        ? "bg-emerald-400 text-[#05070a] font-black text-xs shadow-[0_0_8px_#34d399]"
                        : "border border-white/25 bg-white/[0.04] text-transparent hover:border-[#00f2ff]"
                    }`}
                  >
                    ✓
                  </button>

                  <div className="min-w-0">
                    <span className={`text-sm font-bold truncate block ${isChecked ? "text-white line-through opacity-80" : "text-[#e0e6ed]"}`}>
                      {idx + 1}. {item.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {item.required ? (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30">
                      REQUIRED
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/10">
                      OPTIONAL
                    </span>
                  )}

                  <button
                    type="button"
                    className="text-slate-400 hover:text-white p-1"
                    title={isExpanded ? "Collapse" : "Expand details"}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable details */}
              {isExpanded && (
                <div className="px-4 pb-3.5 pt-1 text-xs text-slate-300 border-t border-white/5 space-y-2 bg-black/20">
                  <p className="leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between text-slate-400 pt-1">
                    <span className="font-mono text-[11px] text-[#00f2ff]">
                      {isChecked ? "✓ Marked ready for submission" : "Click the checkbox to mark completed"}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleToggle(item.id, e)}
                      className="text-xs font-bold text-slate-200 hover:text-white underline cursor-pointer"
                    >
                      {isChecked ? "Uncheck" : "Mark as Done"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Complete all required items to claim your sprint badge and XP.</span>
        </div>

        {onNavigateSubmit && (
          <button
            onClick={() => {
              sound.playClick();
              onNavigateSubmit();
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-xs transition-all cursor-pointer shadow-[0_0_10px_rgba(0,242,255,0.2)] self-start sm:self-auto shrink-0"
          >
            <span>Proceed to Submit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
