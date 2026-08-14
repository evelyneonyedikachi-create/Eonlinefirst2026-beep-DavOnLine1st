import React from "react";
import { 
  FileText, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Scale, 
  ArrowLeft,
  ExternalLink,
  Laptop
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface TermsOfUsePageProps {
  onBack?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const TermsOfUsePage: React.FC<TermsOfUsePageProps> = ({
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
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-purple-500/30 text-purple-300 font-mono text-sm font-bold uppercase">
          <Scale className="w-4 h-4 text-purple-400" />
          <span>Terms of Use & Programme Disclaimers</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Terms of Use
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          Please read these terms carefully before exploring the OnlineFirst AI Studio. OnlineFirst is an open educational initiative focused on project-first machine learning and computational thinking for teenagers.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Effective Date: January 2026</span>
          <span>•</span>
          <span>Entity: OnlineFirst (Private Non-Profit)</span>
          <span>•</span>
          <span>Contact: onlinefirst2026@gmail.com</span>
        </div>
      </div>

      {/* Key Terms Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Educational Nature</span>
          </div>
          <h2 className="text-lg font-bold text-white">No Employment or Salary Guarantee</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            All compensation benchmarks, career titles, and industry projections presented across OnlineFirst are illustrative market estimates. Completing sprints does not guarantee university admission, job offers, or specific compensation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-sm font-bold uppercase">
            <Laptop className="w-4 h-4" />
            <span>Hardware Support Notice</span>
          </div>
          <h2 className="text-lg font-bold text-white">Opportunities Subject to Availability</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Hardware, GPU credits, and equipment support opportunities are offered on an eligibility and availability basis funded by non-profit grants. Application does not guarantee approval, grant allocation, or equipment delivery.
          </p>
        </div>
      </div>

      {/* Detailed Legal Clauses */}
      <div className="space-y-8 text-slate-200">
        {/* Clause 1 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">01.</span>
            <span>Educational & Exploratory Purpose</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            OnlineFirst provides self-guided curriculum, code challenges, interactive sandboxes, and AI-assisted feedback. The materials are provided free of charge or on a subsidized non-profit basis for personal, non-commercial educational enrichment.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Users are encouraged to learn by writing code, testing models, and collaborating responsibly. Nothing on the platform constitutes formal legal, financial, accredited degree-granting, or investment advice.
          </p>
        </section>

        {/* Clause 2 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">02.</span>
            <span>No Employment, Admission, or Compensation Guarantee</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            While our curriculum is modeled after modern engineering practices at top AI technology companies, OnlineFirst makes no representation, warranty, or guarantee that any participant will obtain employment, an internship, university admission, venture capital funding, or a specific salary level.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Salary estimates (e.g. $140,000–$320,000+) reflect publicly reported senior Silicon Valley and global industry market data for reference purposes to illustrate high-growth fields for teenage learners.
          </p>
        </section>

        {/* Clause 3 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">03.</span>
            <span>Hardware Support Opportunities Terms</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            OnlineFirst seeks to expand access for promising young technologists through subsidized hardware support opportunities (including microcontrollers, developer kits, or cloud compute credits).
          </p>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-300 pl-2">
            <li><strong>Availability Dependent:</strong> All hardware opportunities are subject to current donor funding, grant pool limits, and inventory availability.</li>
            <li><strong>Individual Evaluation:</strong> Expressions of interest submitted through the consultation form are reviewed on merit, educational motivation, and need.</li>
            <li><strong>No Legal Entitlement:</strong> Completing sprints, requesting hardware, or submitting a consultation creates no contractual obligation or financial claim against OnlineFirst.</li>
          </ul>
        </section>

        {/* Clause 4 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">04.</span>
            <span>AI Interaction & Content Accuracy (EU AI Act Transparency)</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            The AI Tech Leads (e.g., Tech Lead Alex, Cipher, Dr. Vance, Sarah) utilize large language model technology. In accordance with Article 50 of the EU Artificial Intelligence Act:
          </p>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-300 pl-2">
            <li>Outputs are generated by an artificial intelligence system and do not represent human advice.</li>
            <li>AI systems may produce inaccurate, incomplete, or out-of-date technical responses. Always test your code and verify facts.</li>
            <li>Users must exercise sound judgment and consult teachers, parents, or official documentation for critical decisions.</li>
          </ul>
        </section>

        {/* Clause 5 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">05.</span>
            <span>Prohibited Conduct</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Users agree not to use the OnlineFirst platform or its tools to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-base text-slate-300 pl-2">
            <li>Develop or distribute malware, ransomware, exploits, or malicious cyber tools.</li>
            <li>Harass, exploit, or endanger minors or other users.</li>
            <li>Attempt to reverse-engineer, overwhelm, or inject malicious prompts to exploit backend infrastructure.</li>
            <li>Violate applicable copyright, privacy, or trade secret laws.</li>
          </ul>
        </section>

        {/* Clause 6 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">06.</span>
            <span>Third-Party Links & External Platforms</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            OnlineFirst links to external resources, such as freeCodeCamp tutorials, YouTube instructional videos, Streamlit documentation, and Python libraries. We do not control and are not responsible for the content, privacy policies, or practices of third-party platforms.
          </p>
        </section>

        {/* Clause 7 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">07.</span>
            <span>Limitation of Liability</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            To the maximum extent permitted by applicable law, OnlineFirst, its volunteer mentors, organizers, and partners shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use this platform.
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
                onClick={() => onNavigateTab("copyright")}
                className="text-slate-300 hover:text-[#00f2ff] transition-colors cursor-pointer"
              >
                Copyright & IP →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
