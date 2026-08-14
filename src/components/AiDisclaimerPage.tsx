import React from "react";
import { 
  Bot, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Lock,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface AiDisclaimerPageProps {
  onBack?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const AiDisclaimerPage: React.FC<AiDisclaimerPageProps> = ({
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
          <Bot className="w-4 h-4 text-[#00f2ff]" />
          <span>EU AI Act Article 50 Transparency Notice</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          AI Transparency & Safety Notice
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          OnlineFirst integrates artificial intelligence to provide interactive code reviews, technical explanations, and sprint mentorship. We want every teenager and parent to understand exactly how our AI works, its limitations, and how to stay safe.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Standards: EU Artificial Intelligence Act (Art. 50)</span>
          <span>•</span>
          <span>Contact: onlinefirst2026@gmail.com</span>
        </div>
      </div>

      {/* 3 Core Rules for Teens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">1. AI Can Make Mistakes</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            AI is a powerful coding assistant, but it can write bugs or provide incomplete syntax. Always test your scripts and review the output logic carefully.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">2. Guard Your Privacy</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Never input your full real name, home address, school name, phone number, passwords, or personal secrets into the AI chat interface.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 flex items-center justify-center text-[#00f2ff]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">3. Ask a Trusted Adult</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            For real-life guidance, schooling decisions, health, or personal matters, always talk with a parent, guardian, or teacher rather than an AI.
          </p>
        </div>
      </div>

      {/* Main Breakdown */}
      <div className="space-y-8 text-slate-200">
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">01.</span>
            <span>How the AI Mentors Work</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            When you chat with our persona leads (like Tech Lead Alex, Cipher, Dr. Vance, or Sarah) or request code evaluations, your input prompt is forwarded to Google's Gemini generative AI service via a secure server endpoint.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            The AI acts as an interactive simulator to help you think through programming problems, understand syntax, and discover career possibilities. The personas are AI simulations, not human mentors.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-purple-400 font-mono text-lg">02.</span>
            <span>Technical Accuracy & Validation</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            While we prompt our AI leads with high standards of coding best practices, machine learning algorithms can occasionally generate non-functional code, hallucinated libraries, or outdated dependencies.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            We intentionally use this as a learning opportunity: great AI engineers know how to critically evaluate, debug, and verify AI-generated answers.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-emerald-400 font-mono text-lg">03.</span>
            <span>Parent & Guardian Oversight</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            We encourage parents to explore the bootcamp sprints alongside their teens. We provide the "Parent / Mentor Pledge Contract" inside the Mission Control dashboard to encourage real-world accountability and family engagement.
          </p>
        </section>
      </div>

      {/* Action to Jump to Mentor Chat */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="text-sm text-slate-400 font-mono">
          Ready to code with the AI Tech Leads?
        </div>
        <div className="flex items-center gap-4 text-sm font-mono">
          {onNavigateTab && (
            <button 
              onClick={() => onNavigateTab("mentor")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00f2ff] text-[#05070a] font-bold hover:bg-[#38f6ff] transition-all cursor-pointer shadow-[0_0_15px_rgba(0,242,255,0.3)]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Open AI Mentor Chat →</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
