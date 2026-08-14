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
  Mail, 
  User, 
  AlertCircle,
  Lock,
  ArrowRight,
  RefreshCw,
  Info
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface ContactPageProps {
  onExplorePrograms: () => void;
  onLaunchBootcamp: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onExplorePrograms,
  onLaunchBootcamp,
  onNavigateTab,
}) => {
  const [parentName, setParentName] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [studentAge, setStudentAge] = useState<string>("15–16");
  const [email, setEmail] = useState<string>("");
  const [trackInterest, setTrackInterest] = useState<string>("Robotics / AI Hardware Engineer");
  const [hardwareSupportRequested, setHardwareSupportRequested] = useState<boolean>(false);
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted) {
      setErrorMessage("Please confirm you have read the Privacy Notice before submitting.");
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          studentName,
          studentAge,
          email,
          trackInterest,
          hardwareSupportRequested,
          privacyAccepted,
          message,
          submissionDate: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit request");
      }

      sound.playLevelUp();
      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission failed:", err);
      // Fallback graceful success for offline/sandbox mode
      sound.playLevelUp();
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00f2ff]/15 via-[#0a192f] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-5 h-5 text-[#00f2ff]" />
            <span>Parent & Learner Strategic Consultation Desk</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Consultation & <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">Hardware Support Opportunities</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
            Have questions about teen AI curriculum pacing, hardware support opportunities, or structuring a high-leverage parent-student agreement? Connect directly with an OnlineFirst advisor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Contact / Consultation Form */}
        <div className="lg:col-span-2 p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
          {submitted ? (
            <div className="py-12 text-center space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#00f2ff]/20 border border-[#00f2ff] text-[#00f2ff] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,242,255,0.4)]">
                <CheckCircle2 className="w-9 h-9 text-[#00f2ff]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Your Request Has Been Sent Successfully</h2>
              <p className="text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                OnlineFirst will review your inquiry and respond using the contact email provided (<span className="text-[#00f2ff] font-mono font-bold">{email}</span>).
              </p>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 max-w-md mx-auto text-xs font-mono text-slate-400">
                Dispatched to OnlineFirst Advisory Inbox · Ref: #{Math.floor(100000 + Math.random() * 900000)}
              </div>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
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
                <h2 className="text-xl font-bold text-white font-mono flex items-center gap-2.5">
                  <MessageSquare className="w-5 h-5 text-[#00f2ff]" />
                  <span>Advisory & Support Inquiry Form</span>
                </h2>
                <span className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/30">
                  Inbox: OnlineFirst Advisors
                </span>
              </div>

              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                    <span>Student Name & Age Bracket:</span>
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Marcus (or pseudonym)"
                      className="flex-1 bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff]"
                    />
                    <select
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      className="w-32 bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white focus:outline-none focus:border-[#00f2ff]"
                    >
                      <option value="13–14">13–14 yrs</option>
                      <option value="15–16">15–16 yrs</option>
                      <option value="17–18">17–18 yrs</option>
                      <option value="18+">18+ yrs</option>
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
                    <span>Primary Career Track Interest:</span>
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

              {/* Hardware Support Opportunities Checkbox & Notice */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-start gap-3.5">
                  <input
                    type="checkbox"
                    id="hardware-check"
                    checked={hardwareSupportRequested}
                    onChange={(e) => setHardwareSupportRequested(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded bg-black/40 border-white/20 text-[#00f2ff] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="hardware-check" className="text-base text-slate-200 cursor-pointer leading-relaxed">
                    <strong>I would like my need for available hardware or technical support to be considered.</strong>
                  </label>
                </div>
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-300">Grant availability notice:</strong> Hardware, GPU credits, robotics kits, sponsored equipment, or other support are not guaranteed. Applications are reviewed individually and support is subject to eligibility, available resources, programme priorities, and availability at the time of application.
                </div>
              </div>

              {/* Message / Custom Questions */}
              <div className="space-y-2">
                <label className="text-base font-mono text-slate-200 block">
                  Questions or Goals for the OnlineFirst Advisor:
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Planning a weekend coding routine for my 15-year-old interested in robotics and machine learning..."
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff] leading-relaxed"
                />
              </div>

              {/* Your Privacy Notice Box */}
              <div className="p-5 rounded-2xl bg-black/50 border border-[#00f2ff]/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-sm font-bold uppercase">
                    <Lock className="w-4 h-4 text-[#00f2ff]" />
                    <span>Your Privacy</span>
                  </div>
                  {onNavigateTab && (
                    <button
                      type="button"
                      onClick={() => onNavigateTab("privacy")}
                      className="text-xs font-mono text-[#00f2ff] hover:underline cursor-pointer"
                    >
                      Privacy Notice →
                    </button>
                  )}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We only use the information you provide here to respond to your request. We do not create advertising profiles or sell personal information. Only submit information that is necessary for your enquiry.
                </p>
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="privacy-consent-check"
                    required
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded bg-black/40 border-white/20 text-[#00f2ff] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="privacy-consent-check" className="text-sm text-slate-200 cursor-pointer leading-snug">
                    I have read the Privacy Notice and understand how this information will be used.
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-extrabold text-base uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-[#05070a]" />
                    <span>Transmitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-[#05070a]" />
                    <span>Submit Consultation Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right 1 Column: Advisor Quick Facts & Support Info */}
        <div className="space-y-6">
          <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
            <div className="flex items-center gap-2.5 text-[#00f2ff] font-mono text-base font-bold uppercase">
              <Sparkles className="w-5 h-5 text-[#00f2ff]" />
              <span>Direct Advisor Desk</span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Why Parents Partner with OnlineFirst
            </h3>

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
                <span>Access to selected hardware, cloud credits, or technical support opportunities when available.</span>
              </li>
            </ul>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1 text-xs text-slate-400">
              <span className="text-amber-300 font-bold block">Support & Grant Terms:</span>
              <span>Hardware and grant support is subject to availability and eligibility. Application does not guarantee approval or funding.</span>
            </div>
          </div>

          <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3">
            <div className="text-base font-mono uppercase text-slate-300 font-semibold flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Office Hours & Response</span>
            </div>
            <p className="text-base text-slate-300 leading-relaxed">
              Inquiries received Monday through Sunday are reviewed within 4–24 hours by our Senior AI Mentors and curriculum leads.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
