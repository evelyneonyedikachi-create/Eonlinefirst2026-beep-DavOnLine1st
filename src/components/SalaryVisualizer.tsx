import React, { useState } from "react";
import { TrendingUp, DollarSign, Award, ArrowUpRight, Zap } from "lucide-react";
import { CAREER_TRACKS } from "../data/careersData";
import { sound } from "../utils/soundEffects";

interface SalaryVisualizerProps {
  onSelectCareer: (careerId: string) => void;
}

export const SalaryVisualizer: React.FC<SalaryVisualizerProps> = ({ onSelectCareer }) => {
  const [selectedBenchmark, setSelectedBenchmark] = useState<"all" | "no-degree">("all");

  const benchmarkComparisons = [
    { title: "Average U.S. Starting Graduate Salary", amount: 58000, color: "bg-slate-600" },
    { title: "General Web / App Developer", amount: 95000, color: "bg-blue-600" },
  ];

  const maxVal = 550000;

  return (
    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
      {/* Background ambient flare */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <DollarSign className="w-4 h-4" />
            <span>High-Yield Wealth Matrix // 6-Figure Earning Potential</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white">
            Future-Proof Earning Potential at Age 20–22
          </h3>
          <p className="text-[#94a3b8] text-xs md:text-sm mt-1 max-w-2xl">
            Starting at age 15 gives you a 4–7 year head start before the mainstream catches on. Here is what companies pay for specialized AI builders vs. generic degrees:
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 backdrop-blur-md self-start md:self-auto">
          <button
            id="salary-filter-all"
            onClick={() => {
              sound.playClick();
              setSelectedBenchmark("all");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedBenchmark === "all"
                ? "bg-[#00f2ff] text-[#05070a] font-extrabold shadow-[0_0_12px_rgba(0,242,255,0.35)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All 8 Tracks
          </button>
          <button
            id="salary-filter-nodegree"
            onClick={() => {
              sound.playClick();
              setSelectedBenchmark("no-degree");
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedBenchmark === "no-degree"
                ? "bg-emerald-400 text-[#05070a] font-extrabold shadow-[0_0_12px_rgba(52,211,153,0.35)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            No Degree Required
          </button>
        </div>
      </div>

      {/* Visualizer Bars */}
      <div className="space-y-3.5 relative z-10">
        {CAREER_TRACKS.map((career) => {
          const widthPercent = Math.min(100, Math.round((career.salaryMax / maxVal) * 100));
          const minPercent = Math.round((career.salaryMin / maxVal) * 100);

          return (
            <div
              key={career.id}
              onClick={() => {
                sound.playClick();
                onSelectCareer(career.id);
              }}
              className="group p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-[#00f2ff]/40 backdrop-blur-md transition-all cursor-pointer shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-white/[0.05] flex items-center justify-center font-mono font-bold text-[#00f2ff] text-[11px] border border-white/10">
                    {career.number}
                  </span>
                  <span className="font-bold text-[#e0e6ed] group-hover:text-[#00f2ff] transition-colors">
                    {career.title}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                    {career.degreeRequirement.includes("No") ? "No Degree Needed" : "Self-Taught Portfolio"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-amber-400 text-xs">
                    {career.salaryRange}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#00f2ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>

              {/* Progress Range Bar */}
              <div className="relative w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/[0.08]">
                {/* Min to Max Range highlight */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#00f2ff] to-[#38bdf8] opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_12px_rgba(0,242,255,0.4)]"
                  style={{
                    marginLeft: `${minPercent}%`,
                    width: `${widthPercent - minPercent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Traditional Job Benchmark Divider */}
        <div className="pt-3 border-t border-white/10 space-y-2">
          <div className="text-[11px] font-mono uppercase text-[#94a3b8] font-semibold">
            Traditional Job Baselines:
          </div>
          {benchmarkComparisons.map((bench, idx) => {
            const widthPct = Math.round((bench.amount / maxVal) * 100);
            return (
              <div key={idx} className="flex items-center gap-3 text-xs text-slate-400">
                <span className="w-48 truncate text-[11px]">{bench.title}:</span>
                <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden border border-white/[0.05]">
                  <div className={`h-full ${bench.color} rounded-full`} style={{ width: `${widthPct}%` }} />
                </div>
                <span className="font-mono text-slate-400 font-semibold w-16 text-right text-[11px]">
                  ${bench.amount.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
