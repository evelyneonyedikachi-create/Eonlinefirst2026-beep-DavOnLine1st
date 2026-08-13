import React, { useState } from "react";
import { 
  Send, 
  UploadCloud, 
  Link2, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Image as ImageIcon,
  AlertCircle,
  FileCheck
} from "lucide-react";
import { SprintSubmissionData } from "../types";
import { sound } from "../utils/soundEffects";

interface SprintSubmissionFormProps {
  sprintId: string;
  sprintNumber: number;
  existingSubmission?: SprintSubmissionData;
  onSubmitSprint: (data: SprintSubmissionData) => void;
}

export const SprintSubmissionForm: React.FC<SprintSubmissionFormProps> = ({
  sprintId,
  sprintNumber,
  existingSubmission,
  onSubmitSprint,
}) => {
  const [liveUrl, setLiveUrl] = useState<string>(existingSubmission?.liveUrl || "");
  const [description, setDescription] = useState<string>(existingSubmission?.description || "");
  const [customizationNote, setCustomizationNote] = useState<string>(existingSubmission?.customizationNote || "");
  const [screenshotName, setScreenshotName] = useState<string>(existingSubmission?.screenshotName || "");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setScreenshotName(file.name);
      sound.playClick();
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setScreenshotName(file.name);
      sound.playClick();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveUrl.trim() && !screenshotName) {
      setErrorMsg("Please provide either a project/code URL or upload a screenshot to submit.");
      sound.playClick();
      return;
    }

    setErrorMsg("");
    sound.playXpGain();

    const submissionData: SprintSubmissionData = {
      sprintId,
      liveUrl: liveUrl.trim(),
      screenshotName: screenshotName || "project_snapshot.png",
      description: description.trim() || `Completed Sprint ${sprintNumber} project.`,
      customizationNote: customizationNote.trim() || "Customized parameters and UI layout.",
      submittedAt: new Date().toISOString(),
    };

    onSubmitSprint(submissionData);
  };

  return (
    <div
      id="submit-sprint-section"
      className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl"
    >
      {/* Required Header */}
      <div className="border-b border-white/10 pb-5">
        <div className="flex items-center gap-2 text-base font-mono text-[#00f2ff] font-bold uppercase tracking-wider mb-1">
          <Send className="w-5 h-5 text-[#00f2ff]" />
          <span>Sprint Finalization</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-black text-white">
          How to Submit Your Sprint
        </h3>
        <p className="text-base text-slate-300 mt-1">
          Follow the 7 steps below to publish your proof of work and claim +300 XP.
        </p>
      </div>

      {/* Required Numbered Steps Strip */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
        <h4 className="text-base font-mono font-bold text-[#00f2ff] uppercase">
          7-Step Submission Protocol:
        </h4>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-base text-slate-300">
          <li className="flex items-start gap-2">
            <strong className="text-white font-mono">1.</strong> Finish your project in the lab or local code editor.
          </li>
          <li className="flex items-start gap-2">
            <strong className="text-white font-mono">2.</strong> Test that it runs cleanly without crashing.
          </li>
          <li className="flex items-start gap-2">
            <strong className="text-white font-mono">3.</strong> Copy your code repository or live web link.
          </li>
          <li className="flex items-start gap-2">
            <strong className="text-white font-mono">4.</strong> Take a crisp screenshot of your working output.
          </li>
          <li className="flex items-start gap-2">
            <strong className="text-white font-mono">5.</strong> Paste your link into the submission box below.
          </li>
          <li className="flex items-start gap-2">
            <strong className="text-white font-mono">6.</strong> Add a 1-sentence note on what you customized.
          </li>
          <li className="flex items-start gap-2 col-span-full font-bold text-[#00f2ff]">
            <strong className="text-white font-mono">7.</strong> Click "Submit My Sprint" to claim your badge & XP!
          </li>
        </ol>
      </div>

      {/* Submission Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-base flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* 1. Project URL or GitHub Link */}
        <div className="space-y-2">
          <label className="block text-base font-bold text-white">
            1. Project Code Link or Live URL <span className="text-[#00f2ff]">*</span>
          </label>
          <div className="relative">
            <Link2 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://github.com/your-username/my-ai-project or https://share.streamlit.io/..."
              className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/50 border border-white/15 text-white text-base font-mono placeholder:text-slate-500 focus:outline-none focus:border-[#00f2ff]"
            />
          </div>
        </div>

        {/* 2. Drag-and-Drop / File Upload Screenshot */}
        <div className="space-y-2">
          <label className="block text-base font-bold text-white">
            2. Screenshot of Your Project Working <span className="text-[#00f2ff]">*</span>
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center space-y-2 cursor-pointer ${
              isDragging
                ? "border-[#00f2ff] bg-[#00f2ff]/10"
                : screenshotName
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-white/20 bg-white/[0.02] hover:border-white/40 hover:bg-white/[0.04]"
            }`}
            onClick={() => document.getElementById(`file-upload-sprint-${sprintNumber}`)?.click()}
          >
            <input
              id={`file-upload-sprint-${sprintNumber}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />

            {screenshotName ? (
              <>
                <FileCheck className="w-8 h-8 text-emerald-400" />
                <span className="text-base font-bold text-white font-mono">
                  {screenshotName} (Attached)
                </span>
                <span className="text-base text-slate-400">Click to change screenshot</span>
              </>
            ) : (
              <>
                <UploadCloud className="w-8 h-8 text-slate-400" />
                <p className="text-base font-bold text-white">
                  Drag and drop your screenshot here, or <span className="text-[#00f2ff] underline">browse file</span>
                </p>
                <p className="text-base text-slate-400">PNG, JPG, or GIF up to 10MB</p>
              </>
            )}
          </div>
        </div>

        {/* 3. Short Description */}
        <div className="space-y-2">
          <label className="block text-base font-bold text-white">
            3. What did you create? (Short summary)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. A stock prediction bot that tracks NVIDIA and Bitcoin moving averages."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-base placeholder:text-slate-500 focus:outline-none focus:border-[#00f2ff]"
          />
        </div>

        {/* 4. One Custom Thing */}
        <div className="space-y-2">
          <label className="block text-base font-bold text-white">
            4. One thing you customized or changed yourself
          </label>
          <input
            type="text"
            value={customizationNote}
            onChange={(e) => setCustomizationNote(e.target.value)}
            placeholder="e.g. Added a 50-day moving average and changed the chart color to neon cyan."
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/15 text-white text-base placeholder:text-slate-500 focus:outline-none focus:border-[#00f2ff]"
          />
        </div>

        {/* Submit Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-base font-mono text-slate-400">
            Reward: <strong className="text-amber-400">+300 XP</strong> & Sprint Completion Badge
          </span>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-base transition-all cursor-pointer shadow-[0_0_25px_rgba(0,242,255,0.4)]"
          >
            <Send className="w-5 h-5 fill-current" />
            <span>Submit My Sprint</span>
          </button>
        </div>
      </form>
    </div>
  );
};
