import React, { useState } from "react";
import { 
  Bot, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Lock,
  ExternalLink,
  MessageSquare,
  ShieldAlert,
  HeartHandshake,
  UserX,
  FileCheck2,
  Stethoscope,
  Scale
} from "lucide-react";
import { sound } from "../utils/soundEffects";
import { SafeguardingModal } from "./SafeguardingModal";

interface AiDisclaimerPageProps {
  onBack?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const AiDisclaimerPage: React.FC<AiDisclaimerPageProps> = ({
  onBack,
  onNavigateTab,
}) => {
  const [showSafeguardModal, setShowSafeguardModal] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-6">
      {/* Safeguarding Modal */}
      <SafeguardingModal
        isOpen={showSafeguardModal}
        onClose={() => setShowSafeguardModal(false)}
        initialCategory="ai_answer"
      />

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
          <span>EU AI Act Article 50 Transparency & Safety</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          AI Transparency, Boundaries & Safety Notice
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          OnlineFirst is a private, not-for-profit educational initiative focused on helping teenagers explore future careers, develop practical technology and AI skills, and build real projects. We prioritize teen safeguarding, clear AI boundaries, and full transparency.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Last Updated: August 2026</span>
          <span>•</span>
          <span>Compliance: EU AI Act (Regulation (EU) 2024/1689 Art. 50)</span>
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
            AI is a coding tool, but it can write bugs, invent packages, or provide outdated syntax. Always test your scripts and verify technical facts.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">2. Guard Your Privacy</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Never type your full real name, home address, school, phone number, passwords, or personal secrets into the AI chat interface.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 flex items-center justify-center text-[#00f2ff]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">3. Ask a Trusted Adult</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            For real-life guidance, emotional well-being, schooling choices, health, or family decisions, always talk with a parent, guardian, or teacher.
          </p>
        </div>
      </div>

      {/* Explicit AI Mentor Boundaries Section */}
      <section className="p-8 rounded-3xl bg-red-500/[0.03] border border-red-500/20 space-y-6">
        <div className="flex items-center gap-3 text-red-400 font-mono text-sm font-bold uppercase">
          <UserX className="w-5 h-5" />
          <span>Strict AI Mentor Boundaries & Non-Capabilities</span>
        </div>

        <h2 className="text-2xl font-bold text-white">
          What the AI Mentor Will NOT Do
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed">
          In alignment with European Union AI safety guidelines and child protection requirements, our simulated persona leads operate within strict behavioral guardrails:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-red-400 font-bold">
              <Stethoscope className="w-4 h-4" />
              <span>No Medical or Mental Health Advice</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              The AI cannot diagnose illnesses, provide therapy, or offer clinical mental health advice. For personal distress, learners are directed to parents or trusted helplines.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Scale className="w-4 h-4" />
              <span>No Legal or Financial Advice</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              The AI cannot provide binding legal, contract, tax, or investment advice. Career numbers are illustrative aggregate estimates, not financial guarantees.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Lock className="w-4 h-4" />
              <span>No Requests for Private Credentials</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              The AI will never request passwords, credit card numbers, home addresses, or private photos. Any prompt attempting to solicit private data is blocked.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[#00f2ff] font-bold">
              <Bot className="w-4 h-4" />
              <span>No Pretence of Being Human</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              The mentor personas (Alex, Cipher, Dr. Vance, Sarah) are fictional algorithmic simulations. They will never pretend to be real human beings.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-white font-bold text-sm block">Encountered an incorrect answer or uncomfortable response?</span>
            <span className="text-xs text-slate-400">Use our safeguarding pathway to report it for human review.</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              setShowSafeguardModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Report a Concern / Get Human Help</span>
          </button>
        </div>
      </section>

      {/* Main Breakdown */}
      <div className="space-y-8 text-slate-200">
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">01.</span>
            <span>How the AI Mentors Work</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            When you chat with our persona leads or request code evaluations, your input prompt is forwarded to Google's Gemini generative AI service via a secure server endpoint.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            The AI acts as an interactive coach to help you think through programming problems, understand syntax, and explore technical concepts.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-purple-400 font-mono text-lg">02.</span>
            <span>Data Handling & Chat Retention</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            We do not maintain a permanent centralized database of your chat logs or link prompts to real-world identities. Chat sessions reside in your browser session memory.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            We do not sell chat data or use your questions to create commercial behavioral profiles.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-emerald-400 font-mono text-lg">03.</span>
            <span>Parent & Guardian Partnership</span>
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
