import React, { useState } from "react";
import { BookOpen, Video, Code2, HelpCircle, ExternalLink, Sparkles, Compass, Bookmark } from "lucide-react";
import { SprintLearningResource } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintLearningResourcesProps {
  resources: SprintLearningResource[];
  skillsList: string[];
}

export const SprintLearningResources: React.FC<SprintLearningResourcesProps> = ({
  resources,
  skillsList,
}) => {
  const [activeTab, setActiveTab] = useState<string>("start");

  const categories = [
    { id: "start", label: "Start Here", icon: BookOpen },
    { id: "watch", label: "Watch", icon: Video },
    { id: "practise", label: "Practice", icon: Code2 },
    { id: "stuck", label: "Reference", icon: HelpCircle },
    { id: "all", label: "All Links", icon: Compass },
  ];

  const filteredResources = activeTab === "all"
    ? resources
    : resources.filter((r) => r.category === activeTab);

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case "start": return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "watch": return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "practise": return "bg-[#00f2ff]/15 text-[#00f2ff] border-[#00f2ff]/30";
      case "stuck": return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      default: return "bg-white/10 text-white border-white/20";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#00f2ff]" />
            <span>Curated Skills & Learning Hub</span>
          </div>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Zero fluff tutorials, interactive sandboxes, and documentation.
          </p>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {skillsList.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-0.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 font-mono text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Internal Mini-Tabs: Start Here | Watch | Practice | Reference | All */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-black/40 rounded-xl border border-white/10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          const count = cat.id === "all" ? resources.length : resources.filter((r) => r.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(cat.id);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00f2ff] text-[#05070a] shadow-[0_0_10px_rgba(0,242,255,0.3)] font-extrabold"
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? "bg-black/20 text-[#05070a]" : "bg-white/10 text-slate-400"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Compact Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredResources.length === 0 ? (
          <div className="col-span-full p-6 rounded-xl bg-white/[0.02] border border-white/10 text-center text-xs text-slate-400">
            No specific resources in this category for this sprint. Check "All Links" for all tools.
          </div>
        ) : (
          filteredResources.map((res, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all backdrop-blur-md flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold border ${getCategoryBadgeColor(res.category)}`}>
                    {res.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {res.platform}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-[#00f2ff] transition-colors leading-snug">
                  {res.title}
                </h4>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1 text-xs">
                  <div className="text-slate-300">
                    <strong className="text-white">Teaches:</strong> {res.whatItTeaches}
                  </div>
                  <div className="text-slate-400">
                    <strong className="text-[#00f2ff]">When:</strong> {res.whenToUse}
                  </div>
                </div>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="inline-flex items-center justify-between w-full px-3.5 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-[#00f2ff]/40 text-white font-bold text-xs transition-all"
              >
                <span>{res.buttonLabel}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#00f2ff]" />
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
