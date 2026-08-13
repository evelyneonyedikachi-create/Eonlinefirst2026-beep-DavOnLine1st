import React, { useState, useEffect } from "react";
import { Sparkles, Trophy, Share2, Flame, CheckCircle2, ArrowRight } from "lucide-react";
import { sound } from "../utils/soundEffects";

interface SprintMotivationHookProps {
  bragPhrases: string[];
  sprintNumber: number;
  projectTitle: string;
  badge: string;
  onOpenShareModal?: () => void;
}

export const SprintMotivationHook: React.FC<SprintMotivationHookProps> = ({
  bragPhrases,
  sprintNumber,
  projectTitle,
  badge,
  onOpenShareModal,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Rotate through brag phrases every 3.2 seconds
  useEffect(() => {
    if (!bragPhrases || bragPhrases.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bragPhrases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [bragPhrases]);

  const currentPhrase = bragPhrases[currentIndex] || bragPhrases[0] || "I built my first real AI project.";

  const handleCopyBrag = () => {
    sound.playClick();
    const shareText = `🚀 ${currentPhrase} Built in Sprint ${sprintNumber} at ONLINEFIRST AI Studio! #AIEngineer #BuildTheFuture`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
    }
    setIsCopied(true);
    sound.playXpGain();
    setTimeout(() => setIsCopied(false), 2500);
    if (onOpenShareModal) onOpenShareModal();
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#0b101c] via-[#0d1629] to-[#080d1a] border border-[#00f2ff]/30 p-6 md:p-8 overflow-hidden shadow-[0_0_40px_rgba(0,242,255,0.15)]">
      {/* Dynamic ambient background glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#00f2ff]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-5">
        {/* Top Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-[#00f2ff]/40 text-[#00f2ff] font-mono text-base font-bold uppercase tracking-wider shadow-inner">
            <Flame className="w-5 h-5 text-[#00f2ff] animate-bounce" />
            <span>The Brag Factor // Emotional Engine</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-base font-mono text-slate-300">Shareable Milestone</span>
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-base font-mono font-bold">
              {badge}
            </span>
          </div>
        </div>

        {/* The Big Question / Promise */}
        <div>
          <h4 className="text-base md:text-lg font-mono uppercase font-bold text-slate-300 tracking-wider">
            By the end of this sprint, you can say…
          </h4>

          {/* Rotating Animated Statement */}
          <div className="mt-2 min-h-[72px] md:min-h-[84px] flex items-center">
            <div
              key={currentIndex}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight tracking-tight transition-all duration-500 transform animate-in fade-in slide-in-from-bottom-2"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8] drop-shadow-[0_2px_15px_rgba(0,242,255,0.4)]">
                "{currentPhrase}"
              </span>
            </div>
          </div>
        </div>

        {/* Phrase Selector Dots & One-Click Copy */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            {bragPhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sound.playClick();
                  setCurrentIndex(idx);
                }}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]"
                    : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
                title={phrase}
              />
            ))}
            <span className="text-base text-slate-400 font-mono ml-2">
              {currentIndex + 1} of {bragPhrases.length} Flex Goals
            </span>
          </div>

          <button
            onClick={handleCopyBrag}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-[#00f2ff]/40 hover:border-[#00f2ff] text-white text-base font-bold transition-all cursor-pointer shadow-md backdrop-blur-md self-start sm:self-auto group"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">Copied Flex Statement!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 text-[#00f2ff] group-hover:scale-110 transition-transform" />
                <span>Copy Flex Statement</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
