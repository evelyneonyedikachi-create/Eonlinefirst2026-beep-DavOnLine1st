import React, { useState } from "react";
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  Share2, 
  ExternalLink, 
  ArrowRight, 
  X, 
  Copy, 
  Check, 
  Laptop,
  Flame
} from "lucide-react";
import { BootcampSprint, SprintSubmissionData } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintCompletionModalProps {
  sprint: BootcampSprint;
  submission: SprintSubmissionData;
  onClose: () => void;
  onStartNextSprint?: () => void;
  onReturnDashboard?: () => void;
}

export const SprintCompletionModal: React.FC<SprintCompletionModalProps> = ({
  sprint,
  submission,
  onClose,
  onStartNextSprint,
  onReturnDashboard,
}) => {
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const shareText = `🏆 I just built and published "${sprint.project.name}" in Sprint ${sprint.sprintNumber} at ONLINEFIRST AI Studio! Check out my work: ${submission.liveUrl || "https://onlinefirst.ai"}`;

  const handleCopyShare = () => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
    }
    setCopiedLink(true);
    sound.playXpGain();
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090d16] border border-[#00f2ff]/40 p-6 md:p-8 space-y-6 shadow-[0_0_60px_rgba(0,242,255,0.3)] my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Big Celebration Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-mono text-base font-bold uppercase tracking-wider">
            <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
            <span>Sprint {sprint.sprintNumber} Complete!</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            You built and published a real {sprint.title.replace("Build Your ", "")}.
          </h2>

          <p className="text-base text-slate-300">
            Sprint {sprint.sprintNumber} verified. +300 XP added to your AI Engineer Matrix.
          </p>
        </div>

        {/* Required Brag Factor Card: "I BUILT THIS." */}
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.04] to-black/60 border border-[#00f2ff]/30 p-5 md:p-6 space-y-4 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-400 font-mono font-bold text-base uppercase">
              <Flame className="w-5 h-5" />
              <span>I BUILT THIS // Public Portfolio Card</span>
            </div>
            <span className="text-base font-mono px-2.5 py-0.5 rounded-full bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30 font-bold">
              Level {sprint.sprintNumber} Artifact
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-black text-white">
              {sprint.project.name}
            </h3>
            <p className="text-base text-slate-300 font-medium">
              {submission.description || sprint.project.summary}
            </p>
          </div>

          {submission.customizationNote && (
            <div className="p-3 rounded-xl bg-black/50 border border-white/10 text-base text-slate-300">
              <strong className="text-[#00f2ff]">My Custom Feature:</strong> {submission.customizationNote}
            </div>
          )}

          {/* Project Link if provided */}
          {submission.liveUrl && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-white/10 text-base font-mono text-slate-300">
              <span className="truncate mr-2">{submission.liveUrl}</span>
              <a
                href={submission.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#00f2ff] hover:underline shrink-0 font-bold"
              >
                <span>View Live</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>

        {/* Required "What you can now do" Superpowers with Green Ticks */}
        <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <h4 className="text-base font-mono font-bold text-[#00f2ff] uppercase tracking-wider">
            What you can now do:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {sprint.whatYouCanNowDo.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-base text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handleCopyShare}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-[#00f2ff]/40 text-white font-bold text-base transition-all cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">Copied Achievement Card!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 text-[#00f2ff]" />
                <span>Share My Achievement</span>
              </>
            )}
          </button>

          <div className="w-full sm:w-auto flex items-center gap-2">
            {onReturnDashboard && (
              <button
                onClick={() => {
                  sound.playClick();
                  onReturnDashboard();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 text-base font-bold transition-all cursor-pointer"
              >
                Dashboard
              </button>
            )}

            {onStartNextSprint && sprint.sprintNumber < 5 && (
              <button
                onClick={() => {
                  sound.playClick();
                  onStartNextSprint();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-base transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,255,0.4)]"
              >
                <span>Start Sprint {sprint.sprintNumber + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
