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
  Laptop
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
          <span>Privacy-by-Design & GDPR Notice</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Privacy Notice & Data Protection
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          OnlineFirst is a private non-profit educational initiative. We believe in protecting young builders by collecting as little personal data as possible, storing learning progress locally on your device, and keeping our privacy terms simple and transparent.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Last Updated: January 2026</span>
          <span>•</span>
          <span>Applicable Law: EU GDPR & UK Data Protection Act</span>
          <span>•</span>
          <span>Contact: onlinefirst2026@gmail.com</span>
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
            Your XP, badges, and completed sprints live in your browser's local storage. We do not require accounts or store your learning progress in a central database.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">No Ads or Selling Data</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We never sell, rent, or trade your personal information. We do not build commercial ad profiles or track you across the internet.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 backdrop-blur-md">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <UserCheck className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-white">Teen Privacy Shield</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            We encourage age bands (e.g. 15–16) rather than exact birthdates, and we ask learners never to submit sensitive personal data into the AI tools.
          </p>
        </div>
      </div>

      {/* Main Detailed Sections */}
      <div className="space-y-8 text-slate-200">
        {/* Section 1 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-[#00f2ff] font-mono text-sm font-bold uppercase">
            <Database className="w-5 h-5" />
            <span>1. Who We Are & Controller Details</span>
          </div>
          <h2 className="text-2xl font-bold text-white">The Data Controller</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            <strong>OnlineFirst</strong> is a private non-profit educational initiative providing free and subsidized project-based AI curriculum and resources for students aged 13 to 18.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            If you have questions about this privacy notice, how your data is handled, or wish to exercise your data protection rights, you can contact our privacy point of contact directly at: <a href="mailto:onlinefirst2026@gmail.com" className="text-[#00f2ff] hover:underline font-mono">onlinefirst2026@gmail.com</a>.
          </p>
        </section>

        {/* Section 2 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm font-bold uppercase">
            <Lock className="w-5 h-5" />
            <span>2. What Information We Collect & Why</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Data Minimisation in Practice</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            We strictly limit the data we collect to what is genuinely required to provide learning assistance or answer questions:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-base">A. Learning & Sprint Progress (Stored Locally on Your Device)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you tick off milestone steps, earn XP, or write practice code, this information is stored locally in your browser (via HTML5 LocalStorage). <strong>OnlineFirst does not keep a central user profile database</strong>. You can export a backup of this file at any time from your Mission Control dashboard or reset it directly.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-base">B. Consultation & Hardware Support Inquiries</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                If you or your parent/guardian submit our consultation form, we collect:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-300 space-y-1 pl-2">
                <li>Parent / Guardian Name</li>
                <li>Student First Name or Chosen Pseudonym</li>
                <li>Student Age Bracket (e.g. 13–14, 15–16, 17–18)</li>
                <li>Contact Email Address</li>
                <li>Selected AI Career Interest & Project Goals</li>
                <li>Whether consideration for available hardware/grant support is requested</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <h3 className="font-bold text-white text-base">C. AI Mentor Interactions</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                When you ask our AI tech leads for code reviews or debugging help, your prompts are processed securely via the Google Gemini API to generate responses. We do not use your questions to train public AI models.
              </p>
              <p className="text-sm text-amber-300 font-mono">
                ⚠️ Safety Notice: Never type full names, physical addresses, phone numbers, passwords, or personal secrets into the AI chat.
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
          <h2 className="text-2xl font-bold text-white">Our Lawful Bases</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Under Article 6 of the General Data Protection Regulation (GDPR), we process data under the following legal bases:
          </p>
          <ul className="space-y-3 text-base text-slate-300">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00f2ff] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Consent (Art. 6(1)(a)):</strong> When you voluntarily submit an enquiry or consultation request through our form after reviewing our privacy notice.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00f2ff] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Legitimate Interests (Art. 6(1)(f)):</strong> To maintain site security, prevent malicious spam, and deliver educational responses requested by prospective learners.
              </div>
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-purple-400 font-mono text-sm font-bold uppercase">
            <Eye className="w-5 h-5" />
            <span>4. Data Retention & Deletion</span>
          </div>
          <h2 className="text-2xl font-bold text-white">How Long We Keep Information</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            We retain contact inquiries only as long as reasonably necessary to answer your questions, coordinate guidance, or review support eligibility (typically up to 12 months after the enquiry concludes, or until you request deletion). We do not retain contact data indefinitely.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Because learning progress is stored on your device, you have complete control: clearing your browser data or using the "Reset Progress" tool in Mission Control erases your local records instantly.
          </p>
        </section>

        {/* Section 5 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-[#00f2ff] font-mono text-sm font-bold uppercase">
            <ShieldCheck className="w-5 h-5" />
            <span>5. Your Rights Under Data Protection Law</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Your Individual Rights</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            As a user in the European Union or United Kingdom, you have guaranteed statutory rights:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Access (Art. 15)</span>
              <span className="text-sm text-slate-300">Request confirmation of any personal data we hold about you.</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Erasure (Art. 17)</span>
              <span className="text-sm text-slate-300">Ask us to delete your consultation communications and emails.</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Rectification (Art. 16)</span>
              <span className="text-sm text-slate-300">Update or correct inaccurate contact information.</span>
            </div>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-white font-bold text-base block">Right to Lodge a Complaint</span>
              <span className="text-sm text-slate-300">You may lodge a complaint with your local Data Protection Authority.</span>
            </div>
          </div>
          <p className="text-sm text-slate-400 pt-2">
            To exercise any of these rights, email us at <a href="mailto:onlinefirst2026@gmail.com" className="text-[#00f2ff] font-mono hover:underline">onlinefirst2026@gmail.com</a>. We will respond within 30 days without charge.
          </p>
        </section>

        {/* Section 6 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <div className="flex items-center gap-3 text-red-400 font-mono text-sm font-bold uppercase">
            <AlertCircle className="w-5 h-5" />
            <span>6. Hardware Support & Grant Availability Disclaimers</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Support Opportunities Notice</h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Selected opportunities for subsidized hardware (such as single-board computers, robotics starter kits, or cloud GPU credits) are subject to resource availability, non-profit funding grants, individual eligibility criteria, and regional logistics. Submitting an enquiry or expressing interest does not constitute a guarantee of grant funding, equipment delivery, or financial awards.
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
