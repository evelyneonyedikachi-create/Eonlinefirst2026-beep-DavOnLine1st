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
  Laptop,
  Award,
  DollarSign,
  Building2,
  MapPin
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
          <span>Terms of Use & Educational Disclaimers</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Terms of Use
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          OnlineFirst is a private, not-for-profit educational initiative focused on helping teenagers explore future careers, develop practical technology and AI skills, and build real projects.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Last Updated: August 2026</span>
          <span>•</span>
          <span>Operator: OnlineFirst (Private, Not-For-Profit Initiative)</span>
          <span>•</span>
          <span>Location: Austria</span>
          <span>•</span>
          <span>Contact: onlinefirst2026@gmail.com</span>
        </div>
      </div>

      {/* Key Terms Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-sm font-bold uppercase">
            <DollarSign className="w-4 h-4" />
            <span>Salary Benchmarks</span>
          </div>
          <h2 className="text-lg font-bold text-white">Illustrative Market Data</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            All compensation benchmarks represent aggregated senior industry market estimates. Completing sprints does not guarantee jobs, internships, or specific compensation.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-sm font-bold uppercase">
            <Laptop className="w-4 h-4" />
            <span>Hardware Support</span>
          </div>
          <h2 className="text-lg font-bold text-white">Need & Resource Based</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Support opportunities are reviewed based on educational need, project relevance, donor funds, and regional logistics. XP does not guarantee hardware entitlement.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm font-bold uppercase">
            <Award className="w-4 h-4" />
            <span>Certificates</span>
          </div>
          <h2 className="text-lg font-bold text-white">Educational Completion</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Certificates issued by OnlineFirst are self-directed completion credentials for personal portfolios, not accredited university degrees or state licenses.
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
            OnlineFirst provides self-guided curriculum, code challenges, interactive sandboxes, and AI-assisted feedback for young learners aged 13–18. The materials are provided free of charge on a not-for-profit educational basis.
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            Nothing on the platform constitutes formal legal, medical, accredited academic qualification, or financial investment advice.
          </p>
        </section>

        {/* Clause 2 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">02.</span>
            <span>Career Projections & Salary Sourcing Methodology</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Salary estimates displayed throughout the platform reflect publicly available tech compensation benchmarks (including US Bureau of Labor Statistics, Levels.fyi senior compensation data, and global tech reports from 2024–2026).
          </p>
          <p className="text-base text-slate-300 leading-relaxed">
            These figures illustrate long-term career trajectories in high-growth engineering domains. They do not represent guaranteed entry-level earnings or promise financial outcomes from completing sprints.
          </p>
        </section>

        {/* Clause 3 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">03.</span>
            <span>Hardware Support & Grant Policy</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            OnlineFirst offers hardware support opportunities (such as single-board starter kits or GPU cloud credits) to expand access for promising students.
          </p>
          <ul className="list-disc list-inside space-y-2 text-base text-slate-300 pl-2">
            <li><strong>Evaluation Criteria:</strong> Inquiries are considered based on student project commitment, demonstrated educational need, donor resource pools, and geographical logistics.</li>
            <li><strong>No Automatic Entitlement:</strong> Accumulating XP or completing sprints is an educational milestone and does not automatically entitle a learner to physical hardware.</li>
            <li><strong>Parental Supervision:</strong> Any physical hardware delivered requires parent or guardian confirmation and safe handling oversight.</li>
          </ul>
        </section>

        {/* Clause 4 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">04.</span>
            <span>AI Interaction & EU AI Act Transparency</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            In compliance with Article 50 of the EU AI Act (Regulation (EU) 2024/1689), users are informed that responses in the AI Mentor tool are generated by artificial intelligence models. AI models may occasionally produce incorrect, outdated, or incomplete technical information. Users must critically verify outputs and consult parents or teachers for real-world decisions.
          </p>
        </section>

        {/* Clause 5 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">05.</span>
            <span>External Links & Third-Party Platforms</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            OnlineFirst references and links to third-party learning resources, including YouTube, freeCodeCamp, Code.org, GitHub, Kaggle, Hugging Face, and Streamlit. When you click an external link, you leave OnlineFirst and are subject to the respective external platform's privacy policy, terms, and community guidelines.
          </p>
        </section>

        {/* Clause 6 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">06.</span>
            <span>Prohibited Conduct</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Users agree not to use the OnlineFirst platform or its tools to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-base text-slate-300 pl-2">
            <li>Develop or distribute malware, cyber exploits, or offensive automated scripts.</li>
            <li>Harass, bully, or compromise the safety of minors or other participants.</li>
            <li>Attempt prompt injection or abuse against backend AI infrastructure.</li>
            <li>Infringe copyright or intellectual property rights.</li>
          </ul>
        </section>

        {/* Clause 7 */}
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="text-[#00f2ff] font-mono text-lg">07.</span>
            <span>Limitation of Liability</span>
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            To the maximum extent permitted by applicable Austrian and EU law, OnlineFirst, its volunteer facilitators, and partners shall not be liable for any indirect, incidental, or consequential damages arising from the use of this free educational platform.
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
