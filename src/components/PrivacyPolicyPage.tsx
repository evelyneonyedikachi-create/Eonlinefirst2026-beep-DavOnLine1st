import React from "react";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  Mail, 
  UserCheck, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft,
  Sparkles,
  Laptop,
  MapPin,
  Building2,
  Trash2
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface PrivacyPolicyPageProps {
  onBack?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
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
          <ShieldCheck className="w-4 h-4 text-[#00f2ff]" />
          <span>Privacy-by-Design & GDPR Notice (Ages 13–18)</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Privacy Policy & Data Protection
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          OnlineFirst is a private, not-for-profit educational initiative focused on helping teenagers explore future careers, develop practical technology and AI skills, and build real projects. We protect young builders by collecting minimal personal data, storing progress locally on your device, and keeping our terms transparent.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Last Updated: August 2026</span>
          <span>•</span>
          <span>Location: Austria</span>
          <span>•</span>
          <span>Applicable Law: EU GDPR</span>
          <span>•</span>
          <span>Contact: onlinefirst2026@gmail.com</span>
        </div>
      </div>

      {/* Identity & Operator Disclosure Card */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-sm font-bold uppercase">
          <Building2 className="w-4 h-4" />
          <span>Operator Identification (Austrian Disclosure)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono pt-1">
          <div>
            <span className="text-slate-400 block">Operator:</span>
            <span className="text-white font-bold">OnlineFirst</span>
          </div>
          <div>
            <span className="text-slate-400 block">Nature:</span>
            <span className="text-[#00f2ff] font-bold">Private, not-for-profit initiative</span>
          </div>
          <div>
            <span className="text-slate-400 block">Location:</span>
            <span className="text-white font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400" />
              <span>Austria</span>
            </span>
          </div>
          <div>
            <span className="text-slate-400 block">Contact:</span>
            <span className="text-slate-200 font-bold">onlinefirst2026@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Quick Summary Highlights for Teens & Parents */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 flex items-center justify-center text-[#00f2ff]">
            <Laptop className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Local-First Storage</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Your XP, badges, code challenges, and completed sprints live exclusively in your browser's local storage. We do not require accounts or store progress in a central database.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Zero Advertising Cookies</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We do not use advertising trackers, commercial telemetry networks, or behavioral data profiling. We never sell or rent user data.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Data Minimisation for Minors</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Designed specifically for learners aged 13–18. Contact forms ask only for a first name/pseudonym and an age band (e.g. 15–16), omitting surnames and sensitive details.
          </p>
        </div>
      </div>

      {/* Main Detailed Sections */}
      <div className="space-y-8 text-slate-200">
        {/* Section 1 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-[#00f2ff] font-mono text-sm font-bold uppercase">
            <Database className="w-5 h-5" />
            <span>1. Controller Details & Age Scope</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Who We Are & Target Audience</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            <strong>OnlineFirst</strong> is a private, not-for-profit educational initiative operating from Austria. The platform is designed for teenagers aged 13 to 18 exploring artificial intelligence, software engineering, and computational thinking. Users under 13 must participate only under direct supervision of a parent or guardian.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Contact regarding data privacy: <a href="mailto:onlinefirst2026@gmail.com" className="text-[#00f2ff] hover:underline font-mono">onlinefirst2026@gmail.com</a>.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm font-bold uppercase">
            <Lock className="w-5 h-5" />
            <span>2. What We Collect & Storage Architecture</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Data Minimisation in Practice</h2>
          
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-base">A. Learning & Sprint Progress (Saved on Your Device)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you check off milestones, earn XP, or write practice scripts, this information is stored locally in your web browser (via HTML5 LocalStorage). <strong>OnlineFirst does not operate a central user profile database</strong>. You can export a JSON backup or a printable progress report at any time, or click "Delete My Local Data" to erase all records.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-base">B. Consultation & Support Enquiries</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you or your parent/guardian contact us via our consultation form, we collect only:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pl-2">
                <li>Parent / Guardian Name (if applicable)</li>
                <li>Student First Name or Chosen Pseudonym (no surname requested)</li>
                <li>Student Age Bracket (e.g. 13–14, 15–16, 17–18, 18+)</li>
                <li>Contact Email Address</li>
                <li>Track Interest & Educational Message</li>
                <li>Whether consideration for available hardware support is requested</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-base">C. AI Mentor Interactions</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you chat with our AI leads or request code debugging, your question is processed dynamically via Google's Gemini API through our secure server. We do not maintain a permanent database of chat transcripts or link chats to real-world identities.
              </p>
              <p className="text-xs text-amber-300 font-mono">
                ⚠️ Safeguarding Rule: Never enter full names, street addresses, phone numbers, passwords, or personal secrets into the AI chat.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-mono text-sm font-bold uppercase">
            <FileText className="w-5 h-5" />
            <span>3. Legal Basis for Processing (GDPR Art. 6)</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Lawful Bases</h2>
          <ul className="space-y-3 text-base text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00f2ff] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Consent (Art. 6(1)(a)):</strong> When you voluntarily submit an enquiry or question through our contact form.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00f2ff] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Legitimate Interests (Art. 6(1)(f)):</strong> To maintain site security, prevent spam, and deliver educational responses requested by prospective learners.
              </div>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-purple-400 font-mono text-sm font-bold uppercase">
            <Eye className="w-5 h-5" />
            <span>4. Retention, Email Security & Deletion</span>
          </div>
          <h2 className="text-2xl font-bold text-white">How Long Data is Kept</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Inbound email inquiries sent to <code className="text-[#00f2ff]">onlinefirst2026@gmail.com</code> are accessed exclusively by authorized volunteers via two-factor authenticated (2FA) accounts. Inquiries are retained for up to 12 months for ongoing communication and are deleted thereafter or upon your request.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Local browser data can be erased immediately at any time by clicking "Reset Local Progress / Delete Data" in your Mission Control dashboard or clearing browser storage.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-[#00f2ff] font-mono text-sm font-bold uppercase">
            <ShieldCheck className="w-5 h-5" />
            <span>5. Your Rights Under EU GDPR</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Individual Rights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Access (Art. 15)</span>
              <span className="text-sm text-slate-300">Request copies of any personal correspondence we hold.</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Erasure (Art. 17)</span>
              <span className="text-sm text-slate-300">Ask us to permanently delete your email correspondence.</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Rectification (Art. 16)</span>
              <span className="text-sm text-slate-300">Correct inaccurate contact information.</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Lodge a Complaint</span>
              <span className="text-sm text-slate-300">Contact the Austrian Data Protection Authority (DSB) or your national regulator.</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 pt-2">
            To exercise your rights, email: <a href="mailto:onlinefirst2026@gmail.com" className="text-[#00f2ff] font-mono hover:underline">onlinefirst2026@gmail.com</a>.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-amber-400 font-mono text-sm font-bold uppercase">
            <AlertCircle className="w-5 h-5" />
            <span>6. Hardware Support & Grant Criteria</span>
          </div>
          <h2 className="text-2xl font-bold text-white">How Hardware Requests are Evaluated</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Hardware support opportunities (e.g., developer kits, GPU cloud credits) are evaluated based on demonstrated educational need, relevance to project learning, donor resource availability, regional logistics, and student commitment.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Earning platform XP or completing sprints does not create an automatic entitlement or legal guarantee to receive hardware. Hardware provided for physical builds requires parental acknowledgement and is subject to safe-use guidelines.
          </p>
        </section>
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="text-sm text-slate-400 font-mono">
          OnlineFirst — A private, not-for-profit educational initiative.
        </div>
        <div className="flex items-center gap-4 text-sm font-mono">
          {onNavigateTab && (
            <>
              <button 
                onClick={() => onNavigateTab("impressum")}
                className="text-slate-300 hover:text-[#00f2ff] transition-colors cursor-pointer"
              >
                Impressum →
              </button>
              <button 
                onClick={() => onNavigateTab("terms")}
                className="text-slate-300 hover:text-[#00f2ff] transition-colors cursor-pointer"
              >
                Terms of Use →
              </button>
              <button 
                onClick={() => onNavigateTab("contact")}
                className="text-slate-300 hover:text-[#00f2ff] transition-colors cursor-pointer"
              >
                Contact & Support →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
