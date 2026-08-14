import React from "react";
import { 
  Building2, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Scale, 
  FileText, 
  ArrowLeft,
  ExternalLink,
  Info,
  Globe,
  HelpCircle
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface ImpressumPageProps {
  onBack?: () => void;
  onNavigateTab?: (tab: string) => void;
}

export const ImpressumPage: React.FC<ImpressumPageProps> = ({
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
          <Building2 className="w-4 h-4 text-[#00f2ff]" />
          <span>Legal Notice / Impressum (Austrian Law)</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Impressum & Legal Identification
        </h1>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
          Information in accordance with § 5 of the Austrian E-Commerce Act (ECG), § 24 and § 25 of the Austrian Media Act (Mediengesetz), and general statutory disclosure regulations.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
          <span>Last Updated: August 2026</span>
          <span>•</span>
          <span>Jurisdiction: Austria</span>
          <span>•</span>
          <span>Contact: onlinefirst2026@gmail.com</span>
        </div>
      </div>

      {/* Operator Identification Card */}
      <div className="p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Globe className="w-6 h-6 text-[#00f2ff]" />
          <span>1. Website Operator & Nature of Initiative</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm font-mono">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-slate-400 uppercase text-xs block">Operator / Initiative Name:</span>
            <span className="text-white font-bold text-base">OnlineFirst</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-slate-400 uppercase text-xs block">Legal Nature:</span>
            <span className="text-[#00f2ff] font-bold text-sm">Private, not-for-profit educational initiative</span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-slate-400 uppercase text-xs block">Location & Country of Operation:</span>
            <span className="text-white font-bold text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>Austria</span>
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-slate-400 uppercase text-xs block">Electronic Contact:</span>
            <a href="mailto:onlinefirst2026@gmail.com" className="text-[#00f2ff] font-bold text-sm hover:underline flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#00f2ff]" />
              <span>onlinefirst2026@gmail.com</span>
            </a>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          OnlineFirst is a private, not-for-profit educational initiative focused on helping teenagers explore future careers, develop practical technology and AI skills, and build real projects. It is an independent educational endeavor and does not operate for commercial profit.
        </p>
      </div>

      {/* Media Purpose & Basic Orientation (§ 25 Mediengesetz) */}
      <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <FileText className="w-6 h-6 text-purple-400" />
          <span>2. Purpose of this Media & Editorial Direction (§ 25 Mediengesetz)</span>
        </h2>
        <p className="text-base text-slate-300 leading-relaxed">
          This website serves to provide self-directed educational curricula, computational thinking resources, project guides, career orientation materials, and educational simulation tools in the field of artificial intelligence and software engineering for young learners aged 13–18 and their educators or parents.
        </p>
        <p className="text-base text-slate-300 leading-relaxed">
          The basic editorial direction is promoting digital literacy, ethical AI understanding, open-source technology exploration, and practical hands-on problem solving.
        </p>
      </div>

      {/* Liability for Content & Links */}
      <div className="space-y-6 text-slate-300">
        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Scale className="w-6 h-6 text-amber-400" />
            <span>3. Liability for Content</span>
          </h2>
          <p className="text-base leading-relaxed">
            As a content provider under applicable Austrian laws, we are responsible for our own content on these pages. However, curriculum materials, tutorials, and AI-assisted mentor responses are provided strictly for educational purposes and do not constitute formal professional, legal, medical, or accredited academic advice.
          </p>
          <p className="text-base leading-relaxed">
            We make every reasonable effort to keep curriculum materials current and technically accurate, but do not warrant uninterrupted availability or the absence of technical errors in user-created or simulated scripts.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ExternalLink className="w-6 h-6 text-emerald-400" />
            <span>4. Liability for External Links</span>
          </h2>
          <p className="text-base leading-relaxed">
            Our platform contains links to external websites of third parties (such as YouTube, freeCodeCamp, Code.org, GitHub, Kaggle, Hugging Face, Python.org, and documentation libraries). We have no control over the content of these external sites and accept no liability for their contents pursuant to § 17 of the Austrian E-Commerce Act (ECG).
          </p>
          <p className="text-base leading-relaxed">
            The respective provider or operator of external pages is always responsible for their contents, user accounts, and data protection practices. If we become aware of any legal infringements on linked third-party resources, we will remove such links promptly.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#00f2ff]" />
            <span>5. Copyright & Trademark Protection</span>
          </h2>
          <p className="text-base leading-relaxed">
            The contents and original works created by the operator on these pages are governed by Austrian copyright law. The reproduction, processing, distribution, and any form of commercial exploitation outside the limits of copyright law require prior written consent.
          </p>
          <p className="text-base leading-relaxed">
            Third-party trademarks and names mentioned throughout the platform belong to their respective registered holders and are used solely for descriptive educational reference.
          </p>
        </section>

        <section className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-pink-400" />
            <span>6. Questions, Feedback, or Concerns</span>
          </h2>
          <p className="text-base leading-relaxed">
            If you have questions regarding this Impressum, identify an error, or wish to report a copyright or safeguarding concern, please reach out directly:
          </p>
          <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-sm space-y-1">
            <span className="text-white font-bold block">OnlineFirst Contact Desk</span>
            <span className="text-slate-300">Email: <a href="mailto:onlinefirst2026@gmail.com" className="text-[#00f2ff] hover:underline">onlinefirst2026@gmail.com</a></span>
          </div>
        </section>
      </div>

      {/* Footer Navigation Links */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
        <div className="text-sm text-slate-400 font-mono">
          OnlineFirst — A private, not-for-profit educational initiative.
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
