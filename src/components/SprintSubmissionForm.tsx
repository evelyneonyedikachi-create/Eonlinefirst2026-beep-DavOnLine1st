import React, { useState } from "react";
import { 
  Send, 
  UploadCloud, 
  Link2, 
  Sparkles, 
  CheckCircle2, 
  Image as ImageIcon,
  AlertCircle,
  FileCheck,
  Shield,
  HardDrive,
  Download,
  Bot,
  Share2,
  Check,
  Info
} from "lucide-react";
import { SprintSubmissionData } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintSubmissionFormProps {
  sprintId: string;
  sprintNumber: number;
  sprintTitle?: string;
  skillsList?: string[];
  existingSubmission?: SprintSubmissionData;
  onSubmitSprint: (data: SprintSubmissionData) => void;
  onExportProgress?: () => void;
  onAskMentor?: (query: string) => void;
  onShareParent?: () => void;
}

export const SprintSubmissionForm: React.FC<SprintSubmissionFormProps> = ({
  sprintId,
  sprintNumber,
  sprintTitle,
  skillsList = [],
  existingSubmission,
  onSubmitSprint,
  onExportProgress,
  onAskMentor,
  onShareParent,
}) => {
  const [liveUrl, setLiveUrl] = useState<string>(existingSubmission?.liveUrl || "");
  const [description, setDescription] = useState<string>(existingSubmission?.description || "");
  const [customizationNote, setCustomizationNote] = useState<string>(existingSubmission?.customizationNote || "");
  const [screenshotName, setScreenshotName] = useState<string>(existingSubmission?.screenshotName || "");
  const [screenshotPreviewUrl, setScreenshotPreviewUrl] = useState<string>(existingSubmission?.screenshotPreviewUrl || "");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const processFile = (file: File) => {
    setScreenshotName(file.name);
    sound.playClick();
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setScreenshotPreviewUrl(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleCopySharePrompt = () => {
    sound.playClick();
    const text = `🚀 I'm working on Sprint ${sprintNumber}: ${sprintTitle || "AI Project"} at OnlineFirst! Here is my project link: ${liveUrl || "Building locally in Python"}. Note: ${customizationNote || "Customized features"}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveUrl.trim()) {
      setErrorMsg("Please provide your project code repository, Colab notebook, or live app URL.");
      sound.playClick();
      return;
    }

    setErrorMsg("");
    sound.playXpGain();

    const submissionData: SprintSubmissionData = {
      sprintId,
      sprintNumber,
      sprintTitle: sprintTitle || `Sprint ${sprintNumber} Project`,
      liveUrl: liveUrl.trim(),
      screenshotName: screenshotName || undefined,
      screenshotPreviewUrl: screenshotPreviewUrl || undefined,
      description: description.trim() || `Completed Sprint ${sprintNumber} project.`,
      customizationNote: customizationNote.trim() || "Customized parameters, models, and UI layout.",
      skillsDemonstrated: skillsList.length > 0 ? skillsList : ["Python", "Machine Learning", "Problem Solving"],
      technologiesUsed: ["Python", "Git", "AI API"],
      badgeEarned: `Sprint 0${sprintNumber} Architect`,
      xpEarned: 300,
      submittedAt: new Date().toISOString(),
    };

    onSubmitSprint(submissionData);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase tracking-wider">
            <Send className="w-4 h-4 text-[#00f2ff]" />
            <span>RECORD SPRINT COMPLETION // SPRINT 0{sprintNumber}</span>
          </div>
          <p className="text-base text-slate-200 font-medium mt-1">
            This records your project in your local OnlineFirst progress and unlocks your Sprint achievement.
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold self-start sm:self-auto shrink-0">
          +300 XP REWARD
        </span>
      </div>

      {/* 2. Privacy & Storage Notice: Where Is My Submission Saved? */}
      <div className="p-5 rounded-2xl bg-black/50 border border-white/15 space-y-3.5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5 text-[#00f2ff] font-mono text-sm font-bold uppercase">
            <HardDrive className="w-4 h-4 text-[#00f2ff]" />
            <span>Where Is My Submission Saved?</span>
          </div>

          {onExportProgress && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onExportProgress();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-slate-200 text-xs font-mono font-bold cursor-pointer transition-all self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5 text-[#00f2ff]" />
              <span>Backup My Progress</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300 leading-relaxed">
          <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white font-bold block">1. Private Local Record</span>
            <p>
              Your Sprint record is saved privately in this browser as part of your OnlineFirst progress. OnlineFirst does not receive or centrally store your project submission.
            </p>
          </div>

          <div className="space-y-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
            <span className="text-white font-bold block">2. External Hosting</span>
            <p>
              Your actual project remains wherever you published it, such as GitHub, Streamlit, Vercel or another external platform.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Device & Data Notice:</strong> If you clear this browser's data or change devices, your OnlineFirst record may be lost unless you export a progress backup.
          </span>
        </div>
      </div>

      {/* 3. Main Form */}
      <form onSubmit={handleSubmit} className="p-6 md:p-7 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md space-y-5 shadow-2xl">
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Project URL or Code Link */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-white uppercase font-mono tracking-wider">
            1. Project Code Repository or Live App URL <span className="text-[#00f2ff]">*</span>
          </label>
          <div className="relative">
            <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://github.com/your-username/ai-project or https://share.streamlit.io/..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-[#00f2ff] transition-all"
            />
          </div>
          <span className="text-[11px] text-slate-400 block">
            Paste your GitHub repository, Hugging Face Space, Streamlit URL, or Google Colab link.
          </span>
        </div>

        {/* 2. Optional Screenshot for Local Preview Only */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-white uppercase font-mono tracking-wider">
              2. Optional Screenshot <span className="text-slate-400 font-normal font-sans">(For local portfolio preview only)</span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">Optional</span>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`p-4 rounded-xl border border-dashed text-center transition-all cursor-pointer ${
              isDragging
                ? "border-[#00f2ff] bg-[#00f2ff]/10"
                : screenshotPreviewUrl || screenshotName
                ? "border-emerald-500/40 bg-emerald-500/[0.05]"
                : "border-white/20 bg-black/40 hover:border-white/40"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
              id="screenshot-upload"
            />
            <label htmlFor="screenshot-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-2">
              {screenshotPreviewUrl ? (
                <div className="space-y-2 w-full flex flex-col items-center">
                  <img
                    src={screenshotPreviewUrl}
                    alt="Project preview"
                    className="max-h-36 rounded-lg object-contain border border-white/20 shadow-md"
                  />
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono">
                    <FileCheck className="w-4 h-4" />
                    <span>{screenshotName || "Local preview image selected"}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Click to change preview image</span>
                </div>
              ) : screenshotName ? (
                <>
                  <FileCheck className="w-6 h-6 text-emerald-400" />
                  <span className="text-xs font-bold text-white">{screenshotName}</span>
                  <span className="text-[10px] text-slate-400">Click or drop another image to replace</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-6 h-6 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-200">
                    Drop screenshot here or <span className="text-[#00f2ff] underline">browse image files</span>
                  </span>
                  <span className="text-[10px] text-slate-500">PNG, JPG, WebP for your local achievement view</span>
                </>
              )}
            </label>
          </div>

          <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[#00f2ff] shrink-0" />
            <span>This image is used locally for your project preview and is not uploaded to OnlineFirst.</span>
          </div>
        </div>

        {/* 3. What Did You Customize */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-white uppercase font-mono tracking-wider">
            3. What Did You Customize or Make Unique? <span className="text-slate-400 font-normal font-sans">(1–2 sentences)</span>
          </label>
          <input
            type="text"
            value={customizationNote}
            onChange={(e) => setCustomizationNote(e.target.value)}
            placeholder="e.g. Added 50-day moving average, customized prompt persona, and added interactive dark-mode charts."
            className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00f2ff] transition-all"
          />
        </div>

        {/* 4. Short Project Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-white uppercase font-mono tracking-wider">
            4. Short Project Description <span className="text-slate-400 font-normal font-sans">(Optional summary for your report)</span>
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. A Python machine learning model that analyzes historical stock closing prices and plots next-day price projections."
            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-[#00f2ff] transition-all resize-none"
          />
        </div>

        {/* Action Controls */}
        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {onAskMentor && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onAskMentor(`I'm working on Sprint ${sprintNumber} (${sprintTitle || "AI Project"}). Here is my project link: ${liveUrl || "local repo"}. Can you give me constructive feedback and ideas to improve it?`);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono cursor-pointer transition-all"
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>Ask AI Mentor for Feedback</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopySharePrompt}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono cursor-pointer transition-all"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#00f2ff]" />
                  <span>Share with Parent/Mentor</span>
                </>
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-sm uppercase tracking-wide transition-all cursor-pointer shadow-[0_0_25px_rgba(0,242,255,0.4)] hover:scale-[1.02]"
          >
            <Send className="w-4 h-4" />
            <span>COMPLETE MY SPRINT</span>
          </button>
        </div>
      </form>
    </div>
  );
};
