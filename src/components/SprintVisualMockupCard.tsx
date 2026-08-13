import React from "react";
import { Sparkles, Terminal, Globe, Eye, Bot, Shield, Laptop, CheckCircle2, ArrowRight } from "lucide-react";
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
    <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-5 shadow-2xl relative overflow-hidden">
      {/* Glow backdrop */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Required Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-[#00f2ff]" />
            <span>Visual Project Blueprint</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            You are building this
          </h3>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-slate-300 font-mono text-base font-semibold self-start sm:self-auto">
          {mockup.type}
        </span>
      </div>

      {/* Visual Mockup Container (Realistic Terminal / Web Frame / HUD) */}
      <div className="rounded-2xl bg-black/60 border border-white/15 overflow-hidden shadow-2xl">
        {/* Browser / Terminal Window Header */}
        <div className="bg-white/[0.05] px-4 py-3 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-base font-mono text-slate-400 ml-2 font-medium">
              {mockup.title} // Live Preview
            </span>
          </div>

          <span className="text-base font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {mockup.badge}
          </span>
        </div>

        {/* Mockup Screen Area */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-white/[0.06] border border-white/10 shadow-lg shrink-0">
              {getMockupIcon(mockup.type)}
            </div>
            <div>
              <h4 className="text-xl md:text-2xl font-black text-white">
                {mockup.title}
              </h4>
              <p className="text-base text-slate-300 mt-1 font-medium">
                {mockup.tagline}
              </p>
            </div>
          </div>

          {/* Feature Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {mockup.previewPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#00f2ff] shrink-0 mt-0.5" />
                <span className="text-base text-slate-200 font-medium leading-snug">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Required Creativity Reinforcement Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
          <p className="text-base font-bold text-white tracking-wide">
            Yours will be unique.{" "}
            <span className="text-slate-300 font-normal">
              You choose your own datasets, colors, personas, target objects, and custom logic.
            </span>
          </p>
        </div>

        {onOpenLab && (
          <button
            onClick={() => {
              sound.playClick();
              onOpenLab();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-base transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,255,0.3)] shrink-0 self-start sm:self-auto"
          >
            <span>Open Practice Lab</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
