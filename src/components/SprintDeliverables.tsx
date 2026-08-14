import React, { useState } from "react";
import { CheckSquare, CheckCircle2, ShieldCheck, Sparkles, FileCode, ArrowRight } from "lucide-react";
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

  const handleToggle = (id: string) => {
    sound.playClick();
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((item) => item !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
      sound.playXpGain();
    }
  };

  const totalRequired = deliverables.filter((d) => d.required).length;
  const checkedRequired = deliverables.filter((d) => d.required && checkedIds.includes(d.id)).length;

  return (
    <div id="sprint-deliverables" className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
            <CheckSquare className="w-5 h-5" />
            <span>Sprint Completion Checklist</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            What You Must Deliver
          </h3>
          <p className="text-base text-slate-300 mt-1">
            Check off each requirement as you build. When all required items are ready, submit your sprint.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 text-base font-mono self-start sm:self-auto">
          <span className="text-slate-400">Ready to Submit: </span>
          <span className={`font-bold ${checkedRequired === totalRequired ? "text-emerald-400" : "text-[#00f2ff]"}`}>
            {checkedRequired}/{totalRequired} Required
          </span>
        </div>
      </div>

      {/* Deliverable Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliverables.map((item) => {
          const isChecked = checkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              onClick={() => handleToggle(item.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer select-none backdrop-blur-md flex items-start gap-4 ${
                isChecked
                  ? "bg-emerald-500/[0.08] border-emerald-500/40 text-slate-200"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300"
              }`}
            >
              <div
                className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                  isChecked
                    ? "bg-emerald-400 text-[#05070a] font-bold shadow-[0_0_8px_#34d399]"
                    : "border border-white/25 bg-white/[0.04] text-transparent"
                }`}
              >
                ✓
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-base font-bold ${isChecked ? "text-white line-through opacity-80" : "text-[#e0e6ed]"}`}>
                    {item.title}
                  </h4>
                  {item.required ? (
                    <span className="text-base font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30">
                      REQUIRED
                    </span>
                  ) : (
                    <span className="text-base font-mono px-2 py-0.5 rounded-md bg-white/[0.05] text-slate-400 border border-white/10">
                      OPTIONAL
                    </span>
                  )}
                </div>
                <p className="text-base text-slate-400 leading-relaxed font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom helper */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-base text-slate-300 font-medium">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>The teen must never wonder what counts as completing the sprint.</span>
        </div>

        {onNavigateSubmit && (
          <button
            onClick={() => {
              sound.playClick();
              onNavigateSubmit();
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-bold text-base transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>Jump to Submission</span>
            <ArrowRight className="w-4 h-4 text-[#00f2ff]" />
          </button>
        )}
      </div>
    </div>
  );
};
