import React, { useState } from "react";
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Printer, 
  Share2, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Cpu, 
  Brain, 
  ShieldCheck, 
  Code, 
  Flame, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Target, 
  Layers, 
  Globe, 
  Terminal, 
  Compass, 
  HelpCircle,
  X,
  Copy
} from "lucide-react";
import { UserProgressState, CareerTrack } from "../types";
import { BOOTCAMP_SPRINTS } from "../data/sprintsData";
import { CAREER_TRACKS } from "../data/careersData";
import { sound } from "../utils/soundEffects";

interface GraduationPageProps {
  progress: UserProgressState;
  committedCareer: CareerTrack | null;
  onNavigateTab: (tabId: string, param?: string | number) => void;
  onExportProgress: () => void;
}

export const GraduationPage: React.FC<GraduationPageProps> = ({
  progress,
  committedCareer,
  onNavigateTab,
  onExportProgress,
}) => {
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [copiedBrag, setCopiedBrag] = useState<boolean>(false);
  const [expandedPathway, setExpandedPathway] = useState<string | null>("genai");
  const [activeProjectIdea, setActiveProjectIdea] = useState<number | null>(null);

  const completedSprintCount = progress.completedSprints.length;
  const isFullyGraduated = completedSprintCount >= 5;

  const handleCopyBrag = () => {
    sound.playClick();
    const text = `🚀 I HAVE BUILT FIVE REAL AI PROJECTS!\n\nI just finished the OnlineFirst AI Build Sprints:\n1. Stock & Market Predictor (Python & ML)\n2. Interactive AI Web App (Cloud APIs & Streamlit)\n3. Real-Time Vision Sentry (OpenCV & YOLOv8)\n4. Autonomous Price Hunter (Playwright & Function Calling)\n5. Master AI Portfolio (Kaggle & Hugging Face)\n\nTotal XP: ${progress.xp} | Matrix Level: ${progress.level}\nOnlineFirst is an educational project initiative.`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedBrag(true);
    sound.playXpGain();
    setTimeout(() => setCopiedBrag(false), 2500);
  };

  const skillsPracticed = [
    { name: "Python Programming", category: "Core Coding" },
    { name: "Machine Learning (Scikit-Learn)", category: "AI Models" },
    { name: "Pandas & Data Wrangling", category: "Data Science" },
    { name: "Matplotlib Data Visualisation", category: "Data Science" },
    { name: "REST APIs & JSON Parsing", category: "Cloud & Web" },
    { name: "Prompt Engineering & Personas", category: "Generative AI" },
    { name: "Streamlit Interactive UIs", category: "App Building" },
    { name: "OpenCV (cv2) Video Processing", category: "Computer Vision" },
    { name: "YOLOv8 Object Detection", category: "Computer Vision" },
    { name: "Headless Browser Control (Playwright)", category: "Automation" },
    { name: "LLM Function & Tool Calling", category: "AI Agents" },
    { name: "Discord & Cloud Webhooks", category: "Integrations" },
    { name: "GitHub Version Control", category: "Dev Tools" },
    { name: "Hugging Face Spaces Deployment", category: "Cloud Deployment" },
    { name: "Kaggle AI Competitions", category: "Data Science" },
    { name: "Debugging & Problem Solving", category: "Core Mindset" },
    { name: "Responsible AI & Ethics", category: "Ethics" },
    { name: "Technical Project Documentation", category: "Communication" },
  ];

  const accomplishments = [
    "Built 5 practical technology projects from scratch",
    "Worked with real Python code, virtual environments, and libraries",
    "Used modern AI development tools and neural cloud APIs",
    "Debugged unexpected errors and resolved code failures independently",
    "Customised projects with unique features rather than merely copying templates",
    "Published or shared working outputs to public repositories and web hosts",
    "Created the verified foundation of a personal technical portfolio",
    "Explored emerging career directions across AI engineering and quantitative science",
    "Learned the meta-skill of how to learn and build independently",
  ];

  const nextPathways = [
    {
      id: "ml",
      title: "1. Machine Learning & Deep Learning",
      subtitle: "Supervised & Unsupervised Learning, Neural Networks, PyTorch & TensorFlow",
      tag: "Foundational AI",
      color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      description: "Dive deeper into mathematical modeling, gradient descent, loss functions, convolutional neural networks (CNNs), and recurrent architectures.",
      progression: "Python Fundamentals → Classical ML (Regression/Trees) → Neural Networks → Deep Learning & Transformers",
      keyTopics: ["PyTorch & Tensors", "Gradient Descent & Backprop", "Convolutional Neural Networks (CNNs)", "Loss Function Optimisation", "Overfitting & Cross-Validation"],
      freeResource: "Fast.ai — Practical Deep Learning for Coders",
      resourceUrl: "https://course.fast.ai/"
    },
    {
      id: "genai",
      title: "2. Generative AI & LLM Engineering",
      subtitle: "Transformers, Embeddings, Vector DBs, RAG & Autonomous ReAct Agents",
      tag: "High Demand",
      color: "from-purple-500/20 to-indigo-500/20 border-purple-500/30",
      description: "Learn how modern Large Language Models operate under the hood, build Retrieval-Augmented Generation (RAG) pipelines, and architect autonomous reasoning agents.",
      progression: "API Prompting → Embeddings & Vector Search → RAG Pipelines → Autonomous ReAct Agent Frameworks → Model Fine-Tuning",
      keyTopics: ["Transformer Self-Attention", "Vector Databases (Chroma, Pinecone)", "Retrieval-Augmented Generation (RAG)", "LangChain / LlamaIndex", "Multimodal Vision-Language Models"],
      freeResource: "DeepLearning.AI — Short Courses by Andrew Ng",
      resourceUrl: "https://www.deeplearning.ai/short-courses/"
    },
    {
      id: "robotics",
      title: "3. Robotics & Physical AI",
      subtitle: "Raspberry Pi, Arduino, ROS (Robot Operating System), Sensors & Vision",
      tag: "Hardware + Code",
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
      description: "Bring your AI out of the screen and into the real physical world by controlling microcontrollers, motors, robotic arms, and autonomous rovers.",
      progression: "Python/C++ → Microcontroller Basics (Arduino) → Microcomputers (Raspberry Pi) → Sensor Fusion & OpenCV → ROS2 (Robot Operating System)",
      keyTopics: ["GPIO Pins & PWM Motor Drivers", "Sensors (LiDAR, Ultrasonic, IMU)", "OpenCV Spatial Tracking", "ROS2 Architecture & Nodes", "Kinematics & Path Planning"],
      freeResource: "ROS2 Official Tutorials & Arduino Project Hub",
      resourceUrl: "https://docs.ros.org/en/humble/Tutorials.html"
    },
    {
      id: "cybersecurity",
      title: "4. Cybersecurity & Responsible AI",
      subtitle: "Secure Coding, AI Security, Prompt Injection, Privacy & Ethical Hacking",
      tag: "Critical Defense",
      color: "from-red-500/20 to-orange-500/20 border-red-500/30",
      description: "Learn how computer networks, software vulnerabilities, and AI models can be secured against malicious attacks, prompt injection, and data poisoning. Note: Only practice in authorised environments.",
      progression: "Computer Networking & Linux → Cybersecurity Fundamentals → Secure Python Coding → AI Vulnerabilities & Red-Teaming → Responsible AI Auditing",
      keyTopics: ["Linux CLI & Bash Scripting", "OWASP Top 10 Vulnerabilities", "Prompt Injection Defense", "Model Weight Stealing & Poisoning", "Data Privacy & GDPR Governance"],
      freeResource: "OverTheWire (Bandit Wargame) & OWASP Top 10 for LLMs",
      resourceUrl: "https://overthewire.org/wargames/bandit/"
    },
    {
      id: "datascience",
      title: "5. Data Science & Quantitative Computing",
      subtitle: "Statistics, Probability, SQL, Predictive Modelling & Financial Simulations",
      tag: "Mathematical & Analytical",
      color: "from-amber-500/20 to-yellow-500/20 border-amber-500/30",
      description: "Transform massive unorganized data tables into statistical insights, predictive formulas, and risk models. Note: Educational simulation only, not financial investment advice.",
      progression: "Python & Pandas → Descriptive & Inferential Statistics → SQL Database Queries → Time-Series Forecasting → Monte Carlo Simulations",
      keyTopics: ["Probability Distributions", "Hypothesis Testing & p-values", "SQL Joins & Grouping", "Time-Series Moving Averages", "Algorithmic Backtesting Engines"],
      freeResource: "Kaggle Learn — Micro-Courses in Python, Pandas & SQL",
      resourceUrl: "https://www.kaggle.com/learn"
    },
    {
      id: "product",
      title: "6. AI Product Building & Entrepreneurship",
      subtitle: "UX Design, Product Strategy, Cloud Deployment, APIs & User Research",
      tag: "Creator & Builder",
      color: "from-rose-500/20 to-pink-500/20 border-rose-500/30",
      description: "Move from writing single scripts to building full software products that solve real human problems, find actual users, and run reliably in production.",
      progression: "Problem Discovery → Figma Prototyping → Full-Stack Web Development → Cloud Hosting (Vercel/Docker) → User Analytics & Iteration",
      keyTopics: ["User Centered Design (UX)", "React / Next.js Frontend", "FastAPI / Node.js Backends", "Database Storage (Postgres/Firestore)", "Responsible Product Launching"],
      freeResource: "The Odin Project & Y Combinator Startup School",
      resourceUrl: "https://www.theodinproject.com/"
    },
  ];

  const universityCourses = [
    {
      university: "University of Helsinki",
      course: "Elements of AI",
      difficulty: "Accessible",
      badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      description: "A free, friendly introduction to what AI is, how it works, and what it can and cannot do. No heavy math required.",
      url: "https://www.elementsofai.com/",
      note: "Perfect starting point for high schoolers to ground concepts in plain English."
    },
    {
      university: "Harvard University",
      course: "CS50's Introduction to Artificial Intelligence with Python",
      difficulty: "Intermediate",
      badgeColor: "bg-[#00f2ff]/15 text-[#00f2ff] border-[#00f2ff]/30",
      description: "Explores search algorithms, knowledge graphs, uncertainty, probability, optimization, machine learning, neural networks, and language processing.",
      url: "https://cs50.harvard.edu/ai/",
      note: "Expects prior basic Python programming experience (which you gained in these sprints)."
    },
    {
      university: "Massachusetts Institute of Technology (MIT)",
      course: "MIT OpenCourseWare — 6.034 Artificial Intelligence",
      difficulty: "University Level",
      badgeColor: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      description: "Deep lecture recordings on knowledge representation, search heuristics, constraint satisfaction, neural nets, and computational intelligence.",
      url: "https://ocw.mit.edu/courses/6-034-artificial-intelligence-fall-2010/",
      note: "Gives you an authentic taste of first-year MIT computer science curriculum."
    },
    {
      university: "Stanford University",
      course: "Stanford Online — CS229: Machine Learning",
      difficulty: "Advanced",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      description: "Rigorous study of supervised and unsupervised learning, deep learning, reinforcement learning, and statistical learning theory.",
      url: "https://cs229.stanford.edu/",
      note: "Requires university-level linear algebra, multivariable calculus, and probability."
    },
  ];

  const originalProjectIdeas = [
    {
      title: "1. Personal AI Homework Tutor & Study Companion",
      description: "A Streamlit web app that takes lecture notes or textbook PDFs, creates instant flashcards, quizzes you with multiple-choice questions, and explains difficult math/science concepts in plain language.",
      techStack: "Python · Streamlit · Gemini API · PyPDF2"
    },
    {
      title: "2. Autonomous Daily Discord Tech News Curator",
      description: "A Python background bot that scans Hacker News, ArXiv, and GitHub trending every morning, filters articles relevant to your interests, and dispatches a rich Markdown digest to your private Discord.",
      techStack: "Python · Playwright · BeautifulSoup · Discord Webhooks"
    },
    {
      title: "3. Computer Vision Gym & Basketball Form Coach",
      description: "A webcam app using OpenCV and MediaPipe to track posture landmarks during pushups, squats, or basketball shooting form, counting repetitions and giving real-time audio posture cues.",
      techStack: "Python · OpenCV · MediaPipe · Pyttsx3"
    },
    {
      title: "4. Neighborhood Real Estate & Rental Price Estimator",
      description: "A machine learning regression model trained on local property or apartment listings to predict fair monthly rent based on bedrooms, square footage, and distance to city center.",
      techStack: "Python · Pandas · Scikit-Learn · Streamlit"
    },
    {
      title: "5. Generative Video Game Lore & Quest Generator",
      description: "An interactive RPG world-building tool where players choose factions, items, and moral choices, generating branching story dialogues and pixel art character portraits.",
      techStack: "Python · REST APIs · Prompt Chaining · Gradio"
    },
    {
      title: "6. Responsible AI Model Vulnerability Scanner",
      description: "A testing script that systematically checks LLM chatbots for prompt injection leaks, unsafe system prompt disclosure, and PII leakage in an ethical testing environment.",
      techStack: "Python · Pytest · Regex · Security Testing"
    },
  ];

  return (
    <div className="space-y-12 pb-16 animate-in fade-in duration-300">
      {/* 1. HERO CELEBRATION HEADER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#09111e] via-[#060a12] to-[#05070a] border border-[#00f2ff]/40 p-8 md:p-12 shadow-[0_0_80px_rgba(0,242,255,0.2)] text-center space-y-6">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#00f2ff]/20 blur-[90px] pointer-events-none" />

        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-mono text-sm font-bold uppercase tracking-wider shadow-lg">
          <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
          <span>ONLINEFIRST MISSION COMPLETE // MASTER LEVEL REACHED</span>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">
            YOU DID IT.
          </h1>
          <p className="text-2xl md:text-3xl font-extrabold text-[#00f2ff]">
            You completed all 5 OnlineFirst Build Sprints.
          </p>
          <p className="text-lg md:text-xl text-slate-300 font-medium">
            You didn't just learn about AI. <strong className="text-white">You built with it.</strong>
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              sound.playClick();
              setShowReportModal(true);
            }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-base transition-all cursor-pointer shadow-[0_0_30px_rgba(0,242,255,0.4)] hover:scale-105"
          >
            <Download className="w-5 h-5" />
            <span>Download My Achievement Report</span>
          </button>

          <button
            onClick={handleCopyBrag}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white font-bold text-base transition-all cursor-pointer"
          >
            {copiedBrag ? (
              <>
                <Check className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">Copied Brag Card!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5 text-[#00f2ff]" />
                <span>Share My Graduation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. BRAG FACTOR BANNER: "I HAVE BUILT FIVE REAL AI PROJECTS." */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#00f2ff]/10 via-purple-500/10 to-emerald-500/10 border border-white/20 text-center space-y-4 shadow-2xl">
        <div className="flex items-center justify-center gap-2 text-amber-400 font-mono text-sm font-bold uppercase tracking-wider">
          <Flame className="w-5 h-5 text-orange-400" />
          <span>VERIFIED PORTFOLIO FACT</span>
        </div>
        <div className="text-3xl md:text-5xl font-black text-white tracking-wide uppercase font-mono">
          “I HAVE BUILT FIVE REAL AI PROJECTS.”
        </div>
        <p className="text-base text-slate-300 max-w-2xl mx-auto">
          While most people only prompt chatbots, you have designed, coded, debugged, and published five functional software applications from scratch.
        </p>
      </div>

      {/* 3. LOOK WHAT YOU'VE ACCOMPLISHED (5 Sprint Artifacts Grid) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="text-xs font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
              Your Personal Project Portfolio
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Look What You've Accomplished
            </h2>
          </div>
          <span className="text-sm font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl self-start sm:self-auto font-bold">
            5 / 5 Sprints Completed ✓
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BOOTCAMP_SPRINTS.map((sprint) => {
            const sub = progress.submissions?.[sprint.id];
            const isCompleted = progress.completedSprints.includes(sprint.id) || !!sub;

            return (
              <div
                key={sprint.id}
                className="p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 hover:border-[#00f2ff]/50 transition-all duration-300 flex flex-col justify-between space-y-5 group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-xl bg-white/[0.06] border border-white/10 font-mono text-xs font-bold text-[#00f2ff]">
                      SPRINT 0{sprint.sprintNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-xl font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Completed</span>
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-[#00f2ff] transition-colors">
                      {sprint.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {sub?.description || sprint.project.summary}
                    </p>
                  </div>

                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {sprint.skillsList.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-black/50 border border-white/10 text-slate-300 font-mono text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* What you customised */}
                  {sub?.customizationNote && (
                    <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-xs text-slate-300 space-y-1">
                      <span className="font-bold text-[#00f2ff] block uppercase text-[10px] font-mono">What I Customised:</span>
                      <p className="italic">"{sub.customizationNote}"</p>
                    </div>
                  )}

                  {/* Screenshot preview if available */}
                  {sub?.screenshotPreviewUrl && (
                    <div className="rounded-xl overflow-hidden border border-white/10 max-h-32">
                      <img
                        src={sub.screenshotPreviewUrl}
                        alt={sprint.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="pt-2">
                  {sub?.liveUrl ? (
                    <a
                      href={sub.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-bold text-xs transition-all"
                    >
                      <span>View Published Project</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#00f2ff]" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onNavigateTab("bootcamp", sprint.sprintNumber)}
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-white font-bold text-xs transition-all"
                    >
                      <span>Review Sprint Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. SKILLS YOU HAVE PRACTISED (Skill Cloud) */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="text-xs font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
            Technical Capability Matrix
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Skills You Have Practised
          </h2>
          <p className="text-sm text-slate-300">
            These represent real tools, libraries, workflows, and concepts you actively wrote code with throughout your 5 sprints.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {skillsPracticed.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-2 hover:border-[#00f2ff]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-[#00f2ff] uppercase font-bold">
                  {item.category}
                </span>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="text-xs font-bold text-white leading-tight">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. THINGS YOU HAVE ACTUALLY DONE (Checklist) */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="text-xs font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
            Practical Evidence
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Things You Have Actually Done
          </h2>
          <p className="text-sm text-slate-300">
            Your sprint progress represents applied, real-world execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {accomplishments.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3 text-sm text-slate-200"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                ✓
              </div>
              <span className="font-medium leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. WHAT COULD YOU LEARN NEXT? (6 Advanced Pathways) */}
      <div className="space-y-6">
        <div className="space-y-1 border-b border-white/10 pb-4">
          <div className="text-xs font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
            Curated Next Horizons
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            What Could You Learn Next?
          </h2>
          <p className="text-sm text-slate-300">
            The 5 sprints gave you the fundamental building blocks. Here is how your learning can branch out into specialized domains.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {nextPathways.map((path) => {
            const isExpanded = expandedPathway === path.id;

            return (
              <div
                key={path.id}
                className={`p-6 rounded-3xl bg-white/[0.03] backdrop-blur-xl border transition-all duration-300 space-y-4 ${
                  isExpanded ? "border-[#00f2ff]/50 bg-white/[0.05]" : "border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  onClick={() => {
                    sound.playClick();
                    setExpandedPathway(isExpanded ? null : path.id);
                  }}
                  className="cursor-pointer select-none space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-3 py-1 rounded-xl bg-white/[0.06] border border-white/10 font-mono text-xs font-bold text-[#00f2ff]">
                      {path.tag}
                    </span>
                    <button className="text-slate-400 hover:text-white p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  <h3 className="text-xl font-black text-white leading-tight">
                    {path.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium">
                    {path.subtitle}
                  </p>
                </div>

                {isExpanded && (
                  <div className="space-y-4 pt-2 border-t border-white/10 animate-in fade-in">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {path.description}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                      <span className="text-[10px] font-mono text-[#00f2ff] font-bold uppercase block">
                        Suggested Progression Path:
                      </span>
                      <p className="text-xs text-slate-200 font-mono">
                        {path.progression}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-slate-400 uppercase font-bold block">
                        Key Topics to Explore:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {path.keyTopics.map((topic, tidx) => (
                          <span
                            key={tidx}
                            className="px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 text-xs text-slate-300"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                      <span className="text-slate-400">Free Starting Resource:</span>
                      <a
                        href={path.resourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#00f2ff] hover:underline font-bold"
                      >
                        <span>{path.freeResource}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. UNIVERSITY-LEVEL LEARNING (Ready to Go Deeper?) */}
      <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
            <GraduationCap className="w-4 h-4 text-[#00f2ff]" />
            <span>Ready to Go Deeper?</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white">
            Explore Open University Material
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            You don't have to wait until university to explore university-level material. Many world-class universities make their learning resources publicly available.
          </p>
          <div className="p-3.5 rounded-2xl bg-[#00f2ff]/10 border border-[#00f2ff]/20 text-xs text-[#00f2ff] flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>These resources are here to show you where your learning can eventually go. You do not need to understand everything today.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {universityCourses.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                    {item.university}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold ${item.badgeColor}`}>
                    {item.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white">
                  {item.course}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-slate-400 italic">
                  💡 {item.note}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#00f2ff] hover:underline font-bold"
                >
                  <span>Open Course Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. RECOMMENDED NEXT STEP BASED ON CAREER DIRECTION */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-950/20 via-black/50 to-[#05070a] border border-purple-500/30 p-6 md:p-8 space-y-5 shadow-2xl">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
          <Target className="w-4 h-4" />
          <span>Recommended Next Horizon</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">
          {committedCareer ? `Your ${committedCareer.title} Blueprint` : "Choose Your Next Target"}
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          {committedCareer
            ? `Based on your chosen path in ${committedCareer.title}, here is the recommended sequence of tools and projects to build next:`
            : "Select a specialized career direction or explore open-ended projects to keep expanding your portfolio:"}
        </p>

        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
              1. Python Mastery
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-3 py-1 rounded-xl bg-white/[0.06] text-slate-200 border border-white/10">
              2. Data Structures & Math
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-3 py-1 rounded-xl bg-white/[0.06] text-slate-200 border border-white/10">
              3. Specialised Frameworks
            </span>
            <span className="text-slate-500">→</span>
            <span className="px-3 py-1 rounded-xl bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/30 font-bold">
              4. Original Portfolio Capstone
            </span>
          </div>
        </div>
      </div>

      {/* 9. THREE CHOICES AT THE END */}
      <div className="space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="text-xs font-mono text-[#00f2ff] uppercase font-bold tracking-wider">
            Where Do You Want to Go Next?
          </div>
          <h2 className="text-3xl font-black text-white">
            Three Paths Forward
          </h2>
          <p className="text-sm text-slate-300">
            You've completed the guided journey. Now you can start creating your own.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Path 1: KEEP LEARNING */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/15 hover:border-[#00f2ff]/40 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#00f2ff]/15 text-[#00f2ff] flex items-center justify-center text-xl font-bold">
                📚
              </div>
              <h3 className="text-xl font-black text-white">
                1. Keep Learning
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Explore the open university courses, advanced Deep Learning, LLM Engineering, or Robotics resources.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                window.scrollTo({ top: 1200, behavior: "smooth" });
              }}
              className="w-full py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs transition-all cursor-pointer border border-white/10"
            >
              Browse Next Horizons ↑
            </button>
          </div>

          {/* Path 2: BUILD MY OWN PROJECT */}
          <div className="p-6 rounded-3xl bg-[#00f2ff]/[0.06] border border-[#00f2ff]/30 hover:border-[#00f2ff]/60 transition-all flex flex-col justify-between space-y-5 shadow-lg">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/15 text-amber-400 flex items-center justify-center text-xl font-bold">
                🛠️
              </div>
              <h3 className="text-xl font-black text-white">
                2. Build My Own Project
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Choose an original project idea from your imagination and build it using the tools you practiced.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setActiveProjectIdea(activeProjectIdea !== null ? null : 0);
              }}
              className="w-full py-3 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-xs transition-all cursor-pointer shadow-[0_0_20px_rgba(0,242,255,0.3)]"
            >
              {activeProjectIdea !== null ? "Hide Project Prompts" : "View 6 Project Ideas →"}
            </button>
          </div>

          {/* Path 3: VIEW MY PORTFOLIO */}
          <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/15 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-400 flex items-center justify-center text-xl font-bold">
                📁
              </div>
              <h3 className="text-xl font-black text-white">
                3. View My Portfolio
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Open Mission Control to review your completed projects, exported backups, and rank progress.
              </p>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateTab("dashboard");
              }}
              className="w-full py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-xs transition-all cursor-pointer border border-white/10"
            >
              Go to Mission Control →
            </button>
          </div>
        </div>

        {/* Expandable 6 Original Project Ideas */}
        {activeProjectIdea !== null && (
          <div className="p-6 md:p-8 rounded-3xl bg-black/60 border border-[#00f2ff]/30 space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>6 Original Capstone Ideas to Build Next</span>
              </div>
              <button
                onClick={() => setActiveProjectIdea(null)}
                className="text-xs font-mono text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {originalProjectIdeas.map((idea, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white">
                      {idea.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {idea.description}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-[#00f2ff] block font-bold">
                      Stack: {idea.techStack}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 10. FORMAL COMPLETION REPORT MODAL */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-[#080d16] border border-[#00f2ff]/40 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_80px_rgba(0,242,255,0.25)] max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setShowReportModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Document Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] font-bold uppercase">
                  <span>ONLINEFIRST EDUCATIONAL INITIATIVE</span>
                </div>
                <h3 className="text-2xl font-black text-white">
                  Five-Sprint Completion Record
                </h3>
                <p className="text-xs font-mono text-slate-400">
                  Document Reference: OF-{new Date().getFullYear()}-{progress.level} · Date: {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="text-right hidden sm:block">
                <span className="text-xs font-mono text-amber-400 font-bold block">Status: Verified</span>
                <span className="text-xs font-mono text-slate-400">{progress.xp.toLocaleString()} Total XP</span>
              </div>
            </div>

            {/* Document Table */}
            <div className="space-y-4 text-xs text-slate-200">
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Sprints Done</span>
                    <span className="text-lg font-bold text-[#00f2ff] font-mono">5 / 5</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Matrix Level</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">Lvl {progress.level}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Total XP</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{progress.xp}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Track</span>
                    <span className="text-xs font-bold text-purple-300 truncate block mt-1">
                      {committedCareer ? committedCareer.shortTitle : "AI Engineering"}
                    </span>
                  </div>
                </div>
              </div>

              {/* 5 Projects List */}
              <div className="space-y-2">
                <span className="font-mono text-[11px] text-slate-400 uppercase font-bold block">
                  Completed Projects & Deliverables:
                </span>
                {BOOTCAMP_SPRINTS.map((sprint) => {
                  const sub = progress.submissions?.[sprint.id];
                  return (
                    <div
                      key={sprint.id}
                      className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <strong className="text-white">Sprint {sprint.sprintNumber}: {sprint.title}</strong>
                        <div className="text-[11px] text-slate-400">
                          {sub?.customizationNote || sprint.project.summary}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-[#00f2ff] shrink-0">
                        {sub?.liveUrl ? "Link Recorded ✓" : "Completed ✓"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Skills Practiced */}
              <div className="space-y-1">
                <span className="font-mono text-[11px] text-slate-400 uppercase font-bold block">
                  Skills Practised:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Python, Scikit-Learn Machine Learning, Pandas DataFrames, Matplotlib, REST APIs, Prompt Engineering, Streamlit, OpenCV, YOLOv8 Object Detection, Playwright Browser Automation, Function Calling, Discord Webhooks, Kaggle, Hugging Face Spaces.
                </p>
              </div>

              {/* Formal Disclaimer (MANDATORY) */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs text-slate-400 leading-relaxed">
                <p className="font-medium">
                  <strong>Disclaimer:</strong> OnlineFirst is a private, not-for-profit educational initiative. This completion record documents participation and project work and is not an accredited academic qualification.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={onExportProgress}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono cursor-pointer border border-white/10"
              >
                <Download className="w-4 h-4 text-[#00f2ff]" />
                <span>Save JSON Progress</span>
              </button>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-bold text-xs font-mono uppercase tracking-wide cursor-pointer shadow-[0_0_20px_rgba(0,242,255,0.3)]"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
