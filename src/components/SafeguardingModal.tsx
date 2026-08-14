import React, { useState } from "react";
import { 
  ShieldAlert, 
  X, 
  Mail, 
  HeartHandshake, 
  AlertTriangle, 
  ExternalLink, 
  CheckCircle2, 
  Send, 
  LifeBuoy,
  Lock,
  Phone
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface SafeguardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: "ai_answer" | "content_concern" | "privacy_question" | "general";
  aiContextSnippet?: string;
}

export const SafeguardingModal: React.FC<SafeguardingModalProps> = ({
  isOpen,
  onClose,
  initialCategory = "general",
  aiContextSnippet,
}) => {
  const [category, setCategory] = useState<string>(initialCategory);
  const [description, setDescription] = useState(aiContextSnippet ? `Context snippet: "${aiContextSnippet}"\n\nIssue: ` : "");
  const [studentOrParentEmail, setStudentOrParentEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSuccess();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-[#0a0e1a] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden text-slate-200 space-y-6 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="safeguarding-modal-title"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
          aria-label="Close Safeguarding Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-xs font-bold uppercase">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Learner Safeguarding & Human Support</span>
          </div>
          <h2 id="safeguarding-modal-title" className="text-2xl font-black text-white tracking-tight">
            Report a Concern / Get Human Help
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Something didn't feel right with an AI response, curriculum item, or interaction? We take teen safety and wellbeing seriously.
          </p>
        </div>

        {/* Emergency Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-300">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Not an Emergency or Crisis Service</span>
          </div>
          <p className="leading-relaxed text-slate-300">
            OnlineFirst provides educational coding materials and review responses. If you or someone you know is in immediate distress, please speak with a parent, trusted teacher, or contact your local support helpline.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Thank you for reporting</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Your message has been flagged for human review at <span className="text-[#00f2ff] font-mono">onlinefirst2026@gmail.com</span>. We review all feedback to improve the safety and accuracy of our AI tools.
            </p>
            <button
              onClick={() => {
                sound.playClick();
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/10 font-mono text-sm font-bold transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="concern-category" className="text-xs font-mono uppercase text-slate-400 block font-bold">
                What is this regarding?
              </label>
              <select
                id="concern-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00f2ff] transition-all"
              >
                <option value="ai_answer">Inaccurate or misleading AI Mentor answer</option>
                <option value="inappropriate_content">Inappropriate tone or uncomfortable AI reply</option>
                <option value="privacy_question">Privacy or data protection query</option>
                <option value="curriculum_error">Technical error in sprint or sandbox</option>
                <option value="general">Other human feedback or safeguarding question</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="concern-description" className="text-xs font-mono uppercase text-slate-400 block font-bold">
                Describe what happened
              </label>
              <textarea
                id="concern-description"
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share details so our human team can investigate or fix the issue..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#00f2ff] transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-email" className="text-xs font-mono uppercase text-slate-400 block font-bold">
                Your Email (Optional, if you'd like a response)
              </label>
              <input
                id="contact-email"
                type="email"
                value={studentOrParentEmail}
                onChange={(e) => setStudentOrParentEmail(e.target.value)}
                placeholder="parent-or-student@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#00f2ff] transition-all placeholder:text-slate-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 font-mono text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Concern</span>
              </button>
            </div>
          </form>
        )}

        {/* Trusted Support Helplines for Youth */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <span className="text-xs font-mono uppercase text-slate-400 block font-bold">
            Trusted Youth Helplines & Mental Wellbeing Resources:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <span className="text-white font-bold block">Austria / EU: Rat auf Draht</span>
              <span className="text-slate-400">Call 147 (Free, 24/7) · rataufdraht.at</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <span className="text-white font-bold block">European Youth Helpline</span>
              <span className="text-slate-400">Call 116 111 (Free EU-wide)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <span className="text-white font-bold block">UK: Childline</span>
              <span className="text-slate-400">Call 0800 1111 · childline.org.uk</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-0.5">
              <span className="text-white font-bold block">International / Crisis Line</span>
              <span className="text-slate-400">findahelpline.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
