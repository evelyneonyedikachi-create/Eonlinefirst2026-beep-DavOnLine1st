import React, { useState } from "react";
import { 
  Sparkles, 
  Flame, 
  GraduationCap, 
  ShieldCheck, 
  BookOpen, 
  Terminal, 
  Award, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Zap,
  Target,
  Clock,
  Compass,
  CheckCircle2,
  Brain,
  Lightbulb,
  HeartHandshake,
  Layers,
  Rocket
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

  const progressionSteps = [
    {
      step: 1,
      title: "Curiosity",
      quote: "“I want to know how this works.”",
      desc: "Exploring how AI, apps, algorithms, and tech systems operate behind the scenes.",
      tag: "Spark",
      color: "border-blue-500/30 bg-blue-500/[0.06] text-blue-400"
    },
    {
      step: 2,
      title: "Hobby",
      quote: "“I spend a few hours experimenting.”",
      desc: "Tinkering in safe code sandboxes, tweaking variables, and trying simple models.",
      tag: "Play",
      color: "border-amber-500/30 bg-amber-500/[0.06] text-amber-400"
    },
    {
      step: 3,
      title: "Skill",
      quote: "“I can actually build something.”",
      desc: "Writing clean Python scripts, building real apps, and training vision classifiers.",
      tag: "Mastery",
      color: "border-[#00f2ff]/30 bg-[#00f2ff]/[0.06] text-[#00f2ff]"
    },
    {
      step: 4,
      title: "Portfolio",
      quote: "“I have projects that prove what I can do.”",
      desc: "Live repositories, working demos, and verifiable proof of your technical abilities.",
      tag: "Proof",
      color: "border-purple-500/30 bg-purple-500/[0.06] text-purple-400"
    },
    {
      step: 5,
      title: "Opportunity",
      quote: "“I can apply with real experience behind me.”",
      desc: "Standing out in competitions, university admissions, internships, and high-skill careers.",
      tag: "Future",
      color: "border-emerald-500/30 bg-emerald-500/[0.06] text-emerald-400"
    },
  ];

  const whyStartEarlyPoints = [
    {
      icon: Compass,
      title: "More Time to Explore",
      desc: "You can try different fields—from AI security to algorithmic finance and robotics—without needing to make an immediate career decision."
    },
    {
      icon: Zap,
      title: "More Time to Make Mistakes",
      desc: "Experiments that fail are part of learning. In a sandbox environment, mistakes cost nothing and build deep problem-solving intuition."
    },
    {
      icon: Layers,
      title: "More Time to Build",
      desc: "Small weekend builds gradually compound into an impressive portfolio of working applications before you finish school."
    },
    {
      icon: Target,
      title: "More Time to Discover Your Strengths",
      desc: "You learn whether you genuinely enjoy coding, mathematics, AI architecture, UI design, robotics, or data science."
    }
  ];

  const faqs = [
    {
      q: "Does a teenager need to be a math genius or already know coding to begin?",
      a: "Not at all. OnlineFirst starts with safe, visual sandboxes and step-by-step guidance. Whether you are 13 and writing your first lines of Python or 17 looking to build portfolio projects, every sprint meets you at your current level and builds upwards."
    },
    {
      q: "How does OnlineFirst fit alongside school and homework?",
      a: "OnlineFirst is designed to be a healthy, productive hobby—not a second school day. Practicing just 2 to 3 focused hours per week adds up to hundreds of hours of hands-on experience over your teen years without interfering with school commitments."
    },
    {
      q: "Is 17 too late to start learning AI and coding?",
      a: "Absolutely not. Starting at 17 puts you years ahead of most people who only encounter specialized technical skills in university or their mid-20s. You have plenty of time to build foundational skills and real projects before entering higher education or the workforce."
    },
    {
      q: "What computer or hardware does a student need?",
      a: "Any standard laptop or desktop with modern internet access. All our AI simulations and sandboxes run safely in cloud-hosted environments, so there is no need for expensive GPUs or specialized hardware to begin."
    },
    {
      q: "How does the Parent-Teen system support collaborative learning?",
      a: "Parents and teens can set clear, positive milestones paired with tangible rewards or celebration goals. This replaces tension over screen time with transparent progress tracking, skill growth, and mutual pride."
    }
  ];

  return (
    <div className="space-y-12">
      {/* 1. Top Banner Header */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00f2ff]/15 via-[#0a192f] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-sm font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-[#00f2ff]" />
            <span>The OnlineFirst Philosophy & Mission</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Why Starting as a Teen Is a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8]">
              Career Superpower
            </span>
          </h1>

          <p className="text-slate-200 text-base md:text-lg font-medium leading-relaxed max-w-3xl">
            Whether you are 13, 15 or 17, starting now gives you something valuable: time to explore, practise, build and discover what you are good at before major career decisions arrive.
          </p>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-slate-300 text-sm md:text-base leading-relaxed space-y-2">
            <p>
              The teenage years are one of the best times to explore technology, AI and digital skills because you can learn without the pressure of already needing to be an expert. Start at 13, 15 or 17 — what matters most is starting and building consistently.
            </p>
            <p className="text-[#00f2ff] font-semibold">
              You are not late. You are early compared with most people who only begin developing specialised career skills after school or university.
            </p>
          </div>
        </div>
      </div>

      {/* 2. School + Skills Dedicated Message */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#00f2ff]/[0.08] via-white/[0.03] to-purple-500/[0.08] backdrop-blur-xl border border-white/15 space-y-6 shadow-2xl">
        <div className="flex items-center gap-2.5 text-[#00f2ff] font-mono text-xs font-bold uppercase tracking-wider">
          <GraduationCap className="w-5 h-5 text-[#00f2ff]" />
          <span>Balanced Education Philosophy</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-black text-white">
            School Builds Your Foundation. <br className="hidden sm:inline" />
            <span className="text-[#00f2ff]">Skills Build Your Edge.</span>
          </h2>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed">
            Your school education gives you the foundation: communication, mathematics, science, languages, discipline, problem-solving and the qualifications that open future doors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-[#00f2ff]" />
              <span>Not a Replacement for School</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              OnlineFirst is not a replacement for school. It is the practical layer you can build alongside it.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>A Serious, Rewarding Hobby</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Think of AI, coding, robotics and digital creation like a serious hobby. You can practise a few hours each week, build projects you enjoy, and gradually develop skills that many people do not begin learning until much later.
            </p>
          </div>
        </div>

        {/* Core Project Philosophy Quote */}
        <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-center">
          <p className="text-base md:text-lg text-white font-bold font-mono">
            “Education gives you the foundation. Projects show what you can do with it.”
          </p>
        </div>
      </div>

      {/* 3. A Hobby Today, A Career Advantage Tomorrow (Visual Progression) */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-xs font-bold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-[#00f2ff]" />
            <span>Long-Term Progression</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            A Hobby Today. A Career Advantage Tomorrow.
          </h3>
          <p className="text-slate-300 text-sm md:text-base">
            How small weekly curiosity naturally compounds into real future capability without high-stakes pressure:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {progressionSteps.map((step, idx) => (
            <div
              key={step.step}
              className={`p-4 rounded-2xl border ${step.color} backdrop-blur-md space-y-2.5 flex flex-col justify-between relative`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black uppercase tracking-wider">
                    {step.step}. {step.title}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/40 border border-white/10">
                    {step.tag}
                  </span>
                </div>
                <div className="text-xs font-bold text-white italic">
                  {step.quote}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              {idx < progressionSteps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-500 font-mono text-xs">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Three Core Pillars (Reframed for All Ages) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#00f2ff]/10 border border-[#00f2ff]/30 flex items-center justify-center">
            <Brain className="w-6 h-6 text-[#00f2ff]" />
          </div>
          <h3 className="text-xl font-bold text-white">Your Brain Is Built to Learn</h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Teen years are an excellent time to experiment with new ways of thinking, solving problems and using technology. Learning early gives you more time to practise and discover what genuinely interests you.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <Clock className="w-6 h-6 text-amber-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Time Is Your Biggest Advantage</h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            You do not need to study AI eight hours a day. A few focused hours each week over several years can add up to hundreds of hours of practical experience before you finish school.
          </p>
          <div className="pt-2 text-xs font-mono text-slate-400 space-y-1 border-t border-white/10">
            <div>• Starting at 13 gives you more runway.</div>
            <div>• Starting at 15 still gives you years.</div>
            <div>• Starting at 17 is absolutely not too late.</div>
            <div className="text-[#00f2ff] font-bold pt-1">The advantage begins the day you start.</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 md:p-7 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
            <Award className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white">Skills Make Your Education More Powerful</h3>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Your education gives you knowledge and qualifications. Practical projects show that you can apply what you know. Together, they make you much better prepared for future study, internships and employment.
          </p>
        </div>
      </div>

      {/* 5. Why Start Before You Need To? (4 Benefits) */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#00f2ff]" />
            <span>Practical Benefits</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Why Start Before You Need To?
          </h3>
          <p className="text-slate-300 text-sm md:text-base">
            Starting as a teen gives you low-pressure freedom that disappears in adulthood.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyStartEarlyPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 backdrop-blur-md"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#00f2ff]">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-base">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Inclusive Callouts: 13 and Curious vs 17 and Just Starting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Callout A: 13-Year-Old */}
        <div className="p-6 md:p-7 rounded-3xl bg-emerald-500/[0.04] border border-emerald-500/20 backdrop-blur-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-mono text-xs font-bold uppercase">
            <span>13 and Curious?</span>
          </div>
          <h4 className="text-xl font-bold text-white">
            Great. Start small.
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">
            You do not need to understand advanced AI immediately. Begin with coding basics, simple creative experiments, beginner robotics, and safe AI tools.
          </p>
          <div className="p-3 rounded-xl bg-black/40 border border-emerald-500/20 text-xs font-mono text-emerald-300 font-semibold">
            Let your skills grow as you do.
          </div>
        </div>

        {/* Callout B: 17-Year-Old */}
        <div className="p-6 md:p-7 rounded-3xl bg-[#00f2ff]/[0.04] border border-[#00f2ff]/20 backdrop-blur-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2ff]/10 text-[#00f2ff] font-mono text-xs font-bold uppercase">
            <span>17 and Just Starting?</span>
          </div>
          <h4 className="text-xl font-bold text-white">
            You haven't missed anything.
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">
            You still have time to learn foundational skills, build your first projects and enter further education or work with far more experience than someone starting from zero.
          </p>
          <div className="p-3 rounded-xl bg-black/40 border border-[#00f2ff]/20 text-xs font-mono text-[#00f2ff] font-semibold">
            Action beats anxiety every time. Start today.
          </div>
        </div>
      </div>

      {/* 7. Reframe Income & Future Options Messaging */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00f2ff] font-mono text-xs font-bold uppercase tracking-wider">
            <Rocket className="w-4 h-4 text-[#00f2ff]" />
            <span>Future Capability</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Build Skills That Can Increase Your Future Options
          </h3>
          <p className="text-slate-300 text-sm md:text-base">
            Developing valuable technical skills alongside your education may help position you for:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {[
            "Stronger University Applications",
            "Competitive Internships",
            "Hackathons & Competitions",
            "Academic Scholarships",
            "Entrepreneurial Projects",
            "High-Skill Career Paths",
            "Freelance Portfolio Proof",
            "Higher Earning Opportunities"
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2 text-xs font-medium text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-[#00f2ff] shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-black/40 to-transparent border border-amber-500/30 text-amber-200 text-sm md:text-base font-semibold leading-relaxed">
          “The goal is not to chase a salary figure at 14. The goal is to become unusually capable by the time opportunities arrive.”
        </div>
      </div>

      {/* 8. The Core 5-Part Mantra */}
      <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-white/[0.05] via-white/[0.02] to-white/[0.05] backdrop-blur-xl border border-white/15 space-y-5">
        <div className="flex items-center gap-2.5 text-[#00f2ff] font-mono text-sm font-bold uppercase">
          <Terminal className="w-4 h-4 text-[#00f2ff]" />
          <span>The OnlineFirst Framework</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase block">Step 1</span>
            <span className="text-sm font-bold text-white block">School gives you foundation.</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase block">Step 2</span>
            <span className="text-sm font-bold text-white block">Curiosity gives you direction.</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase block">Step 3</span>
            <span className="text-sm font-bold text-[#00f2ff] block">Practice gives you skill.</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase block">Step 4</span>
            <span className="text-sm font-bold text-purple-300 block">Projects give you proof.</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-xs font-mono text-slate-400 uppercase block">Step 5</span>
            <span className="text-sm font-bold text-emerald-400 block">Time gives you the advantage.</span>
          </div>
        </div>

        <p className="text-center text-slate-300 text-xs md:text-sm font-mono pt-2">
          OnlineFirst brings these pieces together in one guided workspace.
        </p>
      </div>

      {/* 9. Parent-Teen Strategic Alignment */}
      <div className="p-6 md:p-8 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Parent-Teen Collaboration System</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Turning Screen Time into Real Technical Capability
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm md:text-base">
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <span className="font-mono text-[#00f2ff] font-bold block uppercase text-sm">For the Student:</span>
            <p className="text-slate-300 leading-relaxed text-sm">
              You get complete creative freedom to build real projects, earn XP, unlock achievements, and build algorithms you are genuinely proud to show friends and mentors.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2.5">
            <span className="font-mono text-amber-400 font-bold block uppercase text-sm">For the Parent:</span>
            <p className="text-slate-300 leading-relaxed text-sm">
              You gain clear milestone tracking, safety safeguards, and an agreed-upon incentive structure that replaces nagging with shared celebration and measurable growth.
            </p>
          </div>
        </div>
      </div>

      {/* 10. Frequently Asked Questions */}
      <div className="space-y-4">
        <h3 className="text-2xl md:text-3xl font-bold text-white font-mono flex items-center gap-2.5">
          <BookOpen className="w-6 h-6 text-[#00f2ff]" />
          <span>Frequently Asked Questions</span>
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-bold text-sm md:text-base text-white">{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-[#00f2ff] shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 11. Action Footer Call to Action */}
      <div className="p-8 md:p-10 rounded-3xl bg-white/[0.04] backdrop-blur-xl border border-white/15 text-center space-y-5">
        <h3 className="text-2xl md:text-3xl font-black text-white">
          Start Where You Are. Build Alongside School.
        </h3>
        <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Let small weekly projects compound into serious skills. Explore the career tracks or launch Sprint 1 right in your browser.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExplorePrograms}
            className="py-3 px-6 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-bold text-xs uppercase font-mono tracking-wider shadow-[0_0_20px_rgba(0,242,255,0.4)] cursor-pointer"
          >
            Explore 9 Career Programs
          </button>
          <button
            onClick={onLaunchBootcamp}
            className="py-3 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-bold text-xs uppercase font-mono tracking-wider border border-white/10 cursor-pointer"
          >
            Launch Bootcamp Sprints
          </button>
          <button
            onClick={onContactUs}
            className="py-3 px-6 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white font-bold text-xs uppercase font-mono tracking-wider border border-white/10 cursor-pointer"
          >
            Parent Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

