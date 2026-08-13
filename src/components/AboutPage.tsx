import React, { useState } from "react";
import { 
  Sparkles, 
  Flame, 
  GraduationCap, 
  DollarSign, 
  ShieldCheck, 
  BookOpen, 
  Terminal, 
  Award, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Zap,
  Target
} from "lucide-react";
import { sound } from "../utils/soundEffects";

interface AboutPageProps {
  onExplorePrograms: () => void;
  onLaunchBootcamp: () => void;
  onContactUs: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExplorePrograms,
  onLaunchBootcamp,
  onContactUs,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    sound.playClick();
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: "Does a 15-year-old really need a 4-year computer science degree to earn $150K+ in AI?",
      a: "No. Top AI labs, algorithmic trading firms, and robotics startups prioritize verifiable GitHub repositories, deployed working models, and benchmark proof over university degrees. A 15-year-old who spends 2–3 years building real bots and hardware has an insurmountable portfolio advantage over a 22-year-old college grad with zero real-world code deliverables."
    },
    {
      q: "How does the ONLINEFIRST AI Studio keep teenagers motivated without forcing boring theory?",
      a: "Every single sprint is project-first and social. Instead of abstract math equations, teens build things they can immediately brag about: algorithmic trading bots that scan real market data, vision cameras that detect objects, custom rap lyric generators, and autonomous agents."
    },
    {
      q: "What hardware or computer does a teen need to start?",
      a: "Any modern laptop with internet access. We use cloud compute, GPU sandboxes, and modern web environments. For robotics or edge AI tracks, basic starter microcontrollers (like Raspberry Pi or Arduino) can be earned via the Parent Accountability Contract."
    },
    {
      q: "How can parents get involved without micromanaging?",
      a: "Use our Parent-Teen Accountability Contract in Mission Control. Parents set concrete milestones (e.g. completing Sprint 2) paired with tangible rewards (a new mechanical keyboard, GPU, or tech fund), giving teens autonomy while keeping progress measurable."
    }
  ];

  return (
    <div className="space-y-12">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00f2ff]/15 via-[#0a192f] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-semibold uppercase tracking-wider">
            <BookOpen className="w-5 h-5 text-[#00f2ff]" />
            <span>The ONLINEFIRST AI Philosophy & Blueprint</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Why Starting at 15 is an <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">
              Unfair Career Superpower
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
            In 2026 and beyond, the traditional academic conveyor belt is too slow for exponential technology. By learning hands-on AI engineering at age 15, you build a 4-year lead over everyone else.
          </p>
        </div>
      </div>

      {/* 3 Core Pillars of the 15-Year-Old Advantage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 flex items-center justify-center">
            <Zap className="w-7 h-7 text-[#00f2ff]" />
          </div>
          <h3 className="text-xl font-bold text-white">Peak Neuroplasticity</h3>
          <p className="text-base text-slate-300 leading-relaxed">
            At 15, your brain adapts to neural network architectures and multi-agent systems faster than adults unlearning 20-year-old programming paradigms.
          </p>
        </div>

        <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Target className="w-7 h-7 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white">4-Year Runway with Zero Debt</h3>
          <p className="text-base text-slate-300 leading-relaxed">
            While high school peers stress over standardized tests, you can build 10 deployed machine learning projects, open-source libraries, and autonomous bots with zero student debt.
          </p>
        </div>

        <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <Award className="w-7 h-7 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Proof &gt; Pedigree</h3>
          <p className="text-base text-slate-300 leading-relaxed">
            Top tech compensation is awarded to engineers who can diagnose live model bugs and deploy autonomous agents—not people holding framed pieces of paper.
          </p>
        </div>
      </div>

      {/* The Manifesto Statement Card */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-white/[0.04] backdrop-blur-xl border border-white/15 space-y-5">
        <div className="flex items-center gap-2.5 text-[#00f2ff] font-mono text-base font-bold uppercase">
          <Terminal className="w-5 h-5 text-[#00f2ff]" />
          <span>The ONLINEFIRST AI Studio Manifesto</span>
        </div>
        <blockquote className="text-lg md:text-2xl text-white font-medium italic leading-relaxed">
          "We reject dry computer science lectures and 500-page textbooks that teach 1990s syntax. We build what works in the live market: autonomous trading algorithms, computer vision models, robotic actuators, and generative agents. You learn by deploying."
        </blockquote>
        <div className="pt-2 flex items-center gap-4 text-base font-mono text-slate-300">
          <span className="text-[#00f2ff] font-bold">— Alex Chen</span>
          <span>Lead AI Architect & Mentor, ONLINEFIRST AI Studio</span>
        </div>
      </div>

      {/* Parent-Teen Strategic Alignment */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-base font-bold uppercase">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span>Parent-Teen Collaboration System</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Turning Screen Time into High-Earning Mastery
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-base">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <span className="font-mono text-[#00f2ff] font-bold block uppercase text-base">For the Student:</span>
            <p className="text-slate-300 leading-relaxed">
              You get complete creative freedom to build real projects, earn XP, unlock achievements, and build algorithms you're genuinely proud to show friends.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <span className="font-mono text-amber-400 font-bold block uppercase text-base">For the Parent:</span>
            <p className="text-slate-300 leading-relaxed">
              You gain clear milestone tracking, telemetry data, and an agreed-upon incentive structure that replaces nagging with shared celebration.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white font-mono flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-[#00f2ff]" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-base md:text-lg text-white">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-6 h-6 text-[#00f2ff]" /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-base text-slate-300 leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer Call to Action */}
      <div className="p-8 md:p-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 text-center space-y-5">
        <h3 className="text-3xl font-black text-white">Ready to Start Your 4-Year Head Start?</h3>
        <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Explore all 9 high-earning career tracks or launch Sprint 1 right inside your browser.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onExplorePrograms}
            className="py-3.5 px-7 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-bold text-base uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(0,242,255,0.4)] cursor-pointer"
          >
            Explore 9 Career Programs
          </button>
          <button
            onClick={onLaunchBootcamp}
            className="py-3.5 px-7 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-base uppercase font-mono tracking-wider border border-white/10 cursor-pointer"
          >
            Launch Bootcamp Sprints
          </button>
          <button
            onClick={onContactUs}
            className="py-3.5 px-7 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white font-bold text-base uppercase font-mono tracking-wider border border-white/10 cursor-pointer"
          >
            Parent Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
