import React, { useState } from "react";
import { 
  MessageSquare, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Cpu, 
  Layers, 
  Clock, 
  DollarSign, 
  Mail, 
  User, 
  Building2,
  HelpCircle
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface ContactPageProps {
  onExplorePrograms: () => void;
  onLaunchBootcamp: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onExplorePrograms,
  onLaunchBootcamp,
}) => {
  const [parentName, setParentName] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [studentAge, setStudentAge] = useState<string>("15");
  const [email, setEmail] = useState<string>("");
  const [trackInterest, setTrackInterest] = useState<string>("Robotics / AI Hardware Engineer");
  const [hardwareGrantRequested, setHardwareGrantRequested] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playLevelUp();
    setSubmitted(true);
  };

  return (
    <div className="space-y-12">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00f2ff]/15 via-[#0a192f] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 text-[#00f2ff]" />
            <span>Parent-Teen Strategy & Consultation Office</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Consultation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">Hardware Grants</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
            Have questions about teen AI curriculum pacing, hardware grants for GPUs/Robotics kits, or structuring a high-leverage parent-student agreement? Connect with an AI Education Advisor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Contact / Consultation Form */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
          {submitted ? (
            <div className="py-12 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-18 h-18 rounded-2xl bg-[#00f2ff]/20 border border-[#00f2ff] text-[#00f2ff] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)]">
                <CheckCircle2 className="w-10 h-10 text-[#00f2ff]" />
              </div>
              <h3 className="text-3xl font-bold text-white">Consultation Request Dispatched!</h3>
              <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you, {parentName || "Parent"}! Our senior AI education architect will review {studentName || "your student"}'s track preference ({trackInterest}) and follow up via email at <span className="text-[#00f2ff] font-mono font-bold">{email || "your email"}</span> within 24 hours.
              </p>
              <div className="pt-4 flex items-center justify-center gap-4">
                <button
                  onClick={onLaunchBootcamp}
                  className="py-3 px-6 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-bold text-base uppercase font-mono tracking-wider cursor-pointer"
                >
                  Explore Bootcamp Sprints
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="py-3 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 text-base font-semibold border border-white/10 cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-[#00f2ff]" />
                  <span>Direct Advisor Consultation Form</span>
                </h3>
                <span className="text-base font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                  Avg Reply: &lt; 4 Hours
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-base font-mono text-slate-200 flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00f2ff]" />
                    <span>Parent / Guardian Name:</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    placeholder="e.g. David Chen"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base font-mono text-slate-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#00f2ff]" />
                    <span>Student Name & Age:</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Marcus Chen"
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff]"
                    />
                    <select
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      className="w-28 bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white focus:outline-none focus:border-[#00f2ff]"
                    >
                      <option value="14">Age 14</option>
                      <option value="15">Age 15</option>
                      <option value="16">Age 16</option>
                      <option value="17">Age 17</option>
                      <option value="18+">Age 18+</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-base font-mono text-slate-200 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#00f2ff]" />
                    <span>Contact Email Address:</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-base font-mono text-slate-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00f2ff]" />
                    <span>Primary Career Track:</span>
                  </label>
                  <select
                    value={trackInterest}
                    onChange={(e) => setTrackInterest(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white focus:outline-none focus:border-[#00f2ff]"
                  >
                    <option value="Robotics / AI Hardware Engineer">Robotics / AI Hardware Engineer</option>
                    <option value="Algorithmic Quant Trader">Algorithmic Quant Trader</option>
                    <option value="AI-Assisted Drug Discovery & Biohacker">AI Drug Discovery & Biohacker</option>
                    <option value="AI Security Specialist (Red Teamer)">AI Security Specialist (Red Teamer)</option>
                    <option value="Autonomous Vehicle Simulation">Autonomous Vehicle Simulation</option>
                    <option value="LLM Personality Designer">LLM Personality Designer</option>
                    <option value="Geospatial Satellite AI">Geospatial Satellite AI</option>
                    <option value="AI Systems Reliability Engineer">AI Systems Reliability Engineer</option>
                    <option value="Undecided / Exploring All">Undecided / Exploring All Tracks</option>
                  </select>
                </div>
              </div>

              {/* Hardware Grant Checkbox */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3.5">
                <input
                  type="checkbox"
                  id="grant-check"
                  checked={hardwareGrantRequested}
                  onChange={(e) => setHardwareGrantRequested(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded bg-black/40 border-white/20 text-[#00f2ff] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="grant-check" className="text-base text-slate-300 cursor-pointer leading-relaxed">
                  <strong className="text-white">Apply for Hardware & GPU Grant:</strong> Check this if the student requires starter hardware (Raspberry Pi/Robotics starter kit, GPU cloud credits, or sponsored tech gear) upon milestone completion.
                </label>
              </div>

              {/* Message / Custom Questions */}
              <div className="space-y-2">
                <label className="text-base font-mono text-slate-200 block">
                  Custom Questions or Goals for the Advisor:
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Looking to set up a weekend coding routine for my 15-year-old interested in robotics and trading bots..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff] leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-base uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Send className="w-5 h-5 text-[#05070a]" />
                <span>Submit Strategy Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Right 1 Column: Advisor Quick Facts & Info */}
        <div className="space-y-6">
          <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5 text-[#00f2ff] font-mono text-base font-bold uppercase">
              <Sparkles className="w-5 h-5 text-[#00f2ff]" />
              <span>Direct Advisor Desk</span>
            </div>

            <h4 className="text-xl font-bold text-white">
              Why Parents Partner with ONLINEFIRST AI Studio
            </h4>

            <ul className="space-y-3.5 text-base text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Transparent telemetry tracking & real-time XP progress dashboard.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero legacy lecture fluff—100% project deliverables and portfolio building.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hardware grants & cloud GPU credits for dedicated learners.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3">
            <div className="text-base font-mono uppercase text-slate-300 font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Office Hours & Response</span>
            </div>
            <p className="text-base text-slate-300 leading-relaxed">
              Inquiries received Monday through Sunday are reviewed within 4 hours by our Senior AI Mentors and curriculum leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
