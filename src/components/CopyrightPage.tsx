import React from "react";
import { 
  FileCheck2, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  ArrowLeft,
  Mail,
  Copyright
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface CopyrightPageProps {
  onBack?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const CopyrightPage: React.FC<CopyrightPageProps> = ({
  onBack,
  onNavigateTab,
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-sm font-mono transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#00f2ff]" />
          <span>Back</span>
        </button>
      )}

      {/* Header Banner */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 md:p-10 overflow-hidden shadow-2xl space-y-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-sm font-bold uppercase">
          <Copyright className="w-4 h-4 text-[#00f2ff]" />
          <span>Intellectual Property & Attribution</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Copyright & Trademark Notice
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          OnlineFirst is dedicated to open, hands-on computer science and AI education. Here is how intellectual property, third-party attributions, and open-source materials are managed across our studio.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>© 2026 OnlineFirst. All Rights Reserved.</span>
          <span>•</span>
          <span>Contact: onlinefirst2026@gmail.com</span>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-slate-200">
        {/* Section 1: OnlineFirst Content */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">01.</span>
            <span>OnlineFirst Curriculum & Original Materials</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            The structure of the 5-Sprint AI Bootcamp, career tracks taxonomy, interactive mission blueprints, UI design system, code challenges, and original written explanations created by OnlineFirst are protected by copyright.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Students and teachers are granted a non-exclusive, revocable license to view, use, download, and modify project code templates for their own individual, non-commercial educational study.
          </p>
        </section>

        {/* Section 2: Student Projects & Ownership */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-emerald-400 font-mono text-lg">02.</span>
            <span>Learner Work & Project Ownership</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            <strong>You own the code you build.</strong> When you write scripts, train models, customize dashboards, and deploy applications during your sprints, you retain 100% full copyright and ownership over your original creations, repository code, and portfolio deliverables.
          </p>
        </section>

        {/* Section 3: Third-Party Trademarks */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-amber-400 font-mono text-lg">03.</span>
            <span>Third-Party Trademarks & Fair Use Disclaimer</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            All brand names, product names, logos, and registered trademarks referenced throughout this site (such as Python, PyTorch, Scikit-Learn, Pandas, NVIDIA, Google, Anthropic, OpenAI, Meta, Microsoft, Hugging Face, Apple, freeCodeCamp, Streamlit, and YouTube) remain the exclusive property of their respective owners.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            References to external technologies, tools, and employers are made strictly for descriptive, informational, and educational purposes to help teenage students understand industry landscapes. Such references do not imply endorsement, sponsorship, or formal partnership by the respective trademark holders.
          </p>
        </section>

        {/* Section 4: Copyright Inquiries & DMCA */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-purple-400 font-mono text-lg">04.</span>
            <span>Inquiries & Take-Down Notices</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            If you are a copyright or trademark owner and believe any content hosted on or linked from OnlineFirst infringes your intellectual property rights, please contact our administrative team directly at:
          </p>
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-slate-200 font-mono text-sm">
            Email: <a href="mailto:onlinefirst2026@gmail.com" className="text-[#00f2ff] hover:underline">onlinefirst2026@gmail.com</a><br />
            Subject: Intellectual Property Inquiry / Notice
          </div>
          <p className="text-sm text-slate-400">
            We will promptly investigate and resolve all substantiated requests.
          </p>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="text-sm text-slate-400 font-mono">
          OnlineFirst · Private Non-Profit Educational Initiative
        </div>
        <div className="flex items-center gap-4 text-sm font-mono">
          {onNavigateTab && (
            <>
              <button 
                onClick={() => onNavigateTab("privacy")}
                className="text-slate-300 hover:text-[#00f2ff] transition-colors cursor-pointer"
              >
                Privacy Notice →
              </button>
              <button 
                onClick={() => onNavigateTab("terms")}
                className="text-slate-300 hover:text-[#00f2ff] transition-colors cursor-pointer"
              >
                Terms of Use →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
