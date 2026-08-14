import React, { useState } from "react";
import { BookOpen, Video, Code2, HelpCircle, ExternalLink, Sparkles, Compass } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Resources", icon: Compass },
    { id: "start", label: "Start Here", icon: BookOpen },
    { id: "watch", label: "Watch", icon: Video },
    { id: "practise", label: "Practise", icon: Code2 },
    { id: "stuck", label: "Stuck?", icon: HelpCircle },
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
    <div id="sprint-resources" className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-5 h-5" />
            <span>Curated Learning Hub</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Need Help? Learn It Here
          </h3>
          <p className="text-base text-slate-300 mt-1">
            No textbooks. Pick the right tool for where you are in the sprint.
          </p>
        </div>

        {/* Skills Tags */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {skillsList.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 font-mono text-base font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(cat.id);
              }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-base font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#00f2ff] text-[#05070a] shadow-[0_0_15px_rgba(0,242,255,0.3)] font-extrabold"
                  : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all backdrop-blur-md flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-lg text-base font-mono font-bold border ${getCategoryBadgeColor(res.category)}`}>
                  {res.badge}
                </span>
                <span className="text-base font-mono text-slate-400">
                  {res.platform}
                </span>
              </div>

              <h4 className="text-xl font-black text-white group-hover:text-[#00f2ff] transition-colors">
                {res.title}
              </h4>

              {/* What this helps you learn */}
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5 text-base">
                <div className="text-slate-300 font-semibold">
                  <strong className="text-white">What this teaches:</strong> {res.whatItTeaches}
                </div>
                <div className="text-slate-400 font-medium">
                  <strong className="text-[#00f2ff]">When to use:</strong> {res.whenToUse}
                </div>
              </div>
            </div>

            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="inline-flex items-center justify-between w-full px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-[#00f2ff]/50 text-white font-bold text-base transition-all group-hover:shadow-[0_0_15px_rgba(0,242,255,0.15)]"
            >
              <span>{res.buttonLabel}</span>
              <ExternalLink className="w-4 h-4 text-[#00f2ff]" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
