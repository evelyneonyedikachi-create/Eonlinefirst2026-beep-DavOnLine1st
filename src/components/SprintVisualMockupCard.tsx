import React, { useState } from "react";
import { 
  Sparkles, 
  Terminal, 
  Globe, 
  Eye, 
  Bot, 
  Shield, 
  Laptop, 
  CheckCircle2, 
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Code2,
  Cpu
} from "lucide-react";
import { SprintVisualMockup } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintVisualMockupCardProps {
  mockup: SprintVisualMockup;
  sprintNumber: number;
  onOpenLab?: () => void;
}

export const SprintVisualMockupCard: React.FC<SprintVisualMockupCardProps> = ({
  mockup,
  sprintNumber,
  onOpenLab,
}) => {
  const [showMoreDetails, setShowMoreDetails] = useState<boolean>(false);

  const getMockupIcon = (type: string) => {
    switch (sprintNumber) {
      case 1: return <Terminal className="w-5 h-5 text-amber-400" />;
      case 2: return <Globe className="w-5 h-5 text-purple-400" />;
      case 3: return <Eye className="w-5 h-5 text-cyan-400" />;
      case 4: return <Bot className="w-5 h-5 text-rose-400" />;
      case 5: return <Shield className="w-5 h-5 text-emerald-400" />;
      default: return <Laptop className="w-5 h-5 text-[#00f2ff]" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Compact Blueprint Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#00f2ff]" />
            <span>Project Blueprint // Preview Your Build</span>
          </div>
          <p className="text-sm text-slate-300 font-medium mt-0.5">
            Preview the architecture, UI layout, and key capabilities you will build.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 font-mono text-xs font-semibold self-start sm:self-auto">
          {mockup.type.toUpperCase()}
        </span>
      </div>

      {/* Main Blueprint Card */}
      <div className="rounded-2xl bg-black/60 border border-white/15 overflow-hidden shadow-2xl">
        {/* Terminal / Browser Window Header Bar */}
        <div className="bg-white/[0.05] px-4 py-2.5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 font-medium">
              {mockup.title} // Target Architecture
            </span>
          </div>

          <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {mockup.badge}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-5 md:p-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-white/[0.06] border border-white/10 shadow-lg shrink-0">
              {getMockupIcon(mockup.type)}
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-black text-white">
                {mockup.title}
              </h4>
              <p className="text-sm text-slate-300 mt-0.5 font-medium">
                {mockup.tagline}
              </p>
            </div>
          </div>

          {/* 3 Core Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {mockup.previewPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#00f2ff] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 font-medium leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Expandable "See More Details" section */}
          {showMoreDetails && (
            <div className="mt-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>Technical Specifications & Stack Components</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc marker:text-[#00f2ff]">
                <li>Zero hardcoded keys: all tokens protected via environment configuration.</li>
                <li>Modular structure: split into clean helper functions and test runner assertions.</li>
                <li>Ready for live deployment: containerized with instant preview compatibility.</li>
              </ul>
            </div>
          )}

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
              <p className="text-xs font-bold text-white">
                Yours will be unique:{" "}
                <span className="text-slate-400 font-normal">
                  Customize colors, datasets, prompts, and personal features.
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowMoreDetails(!showMoreDetails);
                }}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-slate-300 flex items-center gap-1 cursor-pointer transition-all"
              >
                <span>{showMoreDetails ? "Less Details" : "See More Details"}</span>
                {showMoreDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {onOpenLab && (
                <button
                  onClick={() => {
                    sound.playClick();
                    onOpenLab();
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-xs transition-all cursor-pointer shadow-[0_0_12px_rgba(0,242,255,0.25)] shrink-0"
                >
                  <span>Open Practice Lab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
