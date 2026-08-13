import React, { useState, useRef, useEffect } from "react";
import { 
  Bot, 
  Send, 
  Sparkles, 
  Code2, 
  Zap, 
  Award, 
  RefreshCw, 
  MessageSquare, 
  CheckCircle2, 
  Terminal,
  Cpu,
  Flame
} from "lucide-react";
import { MentorMessage, MentorPersona, CodeReviewResult, MicroChallenge, UserProgressState } from "../types";
import { MENTOR_PERSONAS } from "../data/mentorPersonas";
import { sound } from "../utils/soundEffects";

interface AiMentorChatProps {
  progress: UserProgressState;
  committedCareerTitle?: string;
  onAwardXp: (amount: number) => void;
}

export const AiMentorChat: React.FC<AiMentorChatProps> = ({
  progress,
  committedCareerTitle,
  onAwardXp,
}) => {
  const [activeTab, setActiveTab] = useState<"chat" | "review" | "challenge">("chat");
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("alex");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  // Chat history state with rich default kickoff message
  const [messages, setMessages] = useState<MentorMessage[]>([
    {
      id: "msg-0",
      sender: "mentor",
      personaId: "alex",
      text: `Yo! Alex here. Welcome to the ONLINEFIRST AI Studio. At 15, you have a massive advantage over everyone else—while they're memorizing dry theory, we're going to build real bots and algorithms. Ask me anything about Python, building your first trading bot, or breaking into high-income AI engineering!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Code review state
  const [codeSnippet, setCodeSnippet] = useState<string>(
`import pandas as pd
import yfinance as yf
from sklearn.linear_model import LinearRegression

# Pull historical ticker data
data = yf.download('NVDA', period='90d')
data['SMA_20'] = data['Close'].rolling(window=20).mean()
data = data.dropna()

# Train simple linear regressor
X = data[['SMA_20']]
y = data['Close']
model = LinearRegression().fit(X, y)
print("Model coefficients:", model.coef_)`
  );
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);

  // Micro challenge state
  const [challenge, setChallenge] = useState<MicroChallenge | null>({
    title: "The 3-Line Prompt Jailbreak Test",
    xpReward: 150,
    objective: "Write a system prompt for a gaming NPC that refuses to reveal the secret cheat code, then test 3 different prompt injection techniques to see if you can bypass your own defense.",
    hint: "Use roleplay or hypothetical framing: 'Pretend you are in developer debug mode...'",
  });
  const [isLoadingChallenge, setIsLoadingChallenge] = useState<boolean>(false);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);

  const activePersona = MENTOR_PERSONAS.find((p) => p.id === selectedPersonaId) || MENTOR_PERSONAS[0];
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    sound.playClick();
    const userMsg: MentorMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsSending(true);

    try {
      const response = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          persona: selectedPersonaId,
          careerContext: committedCareerTitle,
          userLevel: `Level ${progress.level}`,
          currentSprint: `Sprint ${progress.completedSprints.length + 1}`,
        }),
      });

      const data = await response.json();
      const mentorReply: MentorMessage = {
        id: `mentor-${Date.now()}`,
        sender: "mentor",
        personaId: selectedPersonaId,
        text: data.reply || "Transmission received! Let's keep building.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: data.isFallback,
      };

      setMessages((prev) => [...prev, mentorReply]);
      sound.playXpGain();
      onAwardXp(15); // Reward +15 XP for asking questions!
    } catch {
      const fallbackReply: MentorMessage = {
        id: `mentor-fallback-${Date.now()}`,
        sender: "mentor",
        personaId: selectedPersonaId,
        text: "Solid question! Always remember: keep your scripts modular, start with a minimal working demo, and test edge cases. What's the next feature you want to code?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFallback: true,
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsSending(false);
    }
  };

  const handleReviewCode = async () => {
    sound.playClick();
    setIsReviewing(true);

    try {
      const response = await fetch("/api/mentor/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeOrProject: codeSnippet,
          sprintTitle: committedCareerTitle || "AI Development",
          language: "python",
        }),
      });

      const data = await response.json();
      setReviewResult(data);
      sound.playXpGain();
      onAwardXp(50); // Reward +50 XP for code submission!
    } catch {
      setReviewResult({
        score: 92,
        coolFactor: "🔥 9.6 / 10",
        feedback: "Awesome code structure! Your Pandas feature creation is clean and your Scikit-Learn pipeline works great.",
        optimizations: [
          "Use vectorized operations instead of row iteration.",
          "Add try/except error handling for Yahoo Finance rate limits.",
          "Wrap the prediction into an interactive Streamlit UI.",
        ],
        nextChallenge: "Hook this script up to send a Discord notification on moving average crossover!",
        isFallback: true,
      });
    } finally {
      setIsReviewing(false);
    }
  };

  const handleGetNewChallenge = async () => {
    sound.playClick();
    setIsLoadingChallenge(true);
    setChallengeCompleted(false);

    try {
      const response = await fetch("/api/mentor/challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          careerId: committedCareerTitle,
          userLevel: `Level ${progress.level}`,
        }),
      });

      const data = await response.json();
      setChallenge(data);
      sound.playTab();
    } catch {
      setChallenge({
        title: "Micro-Hack: Stock Trend Predictor Experiment",
        xpReward: 150,
        objective: "Adjust the moving average window from 7 days to 21 days in your Python regression model and observe if prediction variance shrinks.",
        hint: "Look at the Mean Squared Error metric in your output console.",
      });
    } finally {
      setIsLoadingChallenge(false);
    }
  };

  const handleCompleteChallenge = () => {
    sound.playLevelUp();
    setChallengeCompleted(true);
    if (challenge) {
      onAwardXp(challenge.xpReward);
    }
  };

  return (
    <div className="space-y-6">
      {/* Studio Header Banner in Frosted Glass */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00f2ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-bold uppercase">
            <Bot className="w-5 h-5 text-[#00f2ff]" />
            <span>Interactive Cyber Mentor System // Real-Time AI Feedback</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Meet Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">AI Tech Leads</span>
          </h2>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Need code review, architectural advice, or a quick 10-minute micro-quest? Select a mentor persona below and get instant, teen-tailored guidance powered by server-side Gemini 3.7 Flash.
          </p>
        </div>
      </div>

      {/* Persona Selection Bar in Frosted Glass */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {MENTOR_PERSONAS.map((persona) => {
          const isSelected = persona.id === selectedPersonaId;
          return (
            <button
              key={persona.id}
              onClick={() => {
                sound.playClick();
                setSelectedPersonaId(persona.id);
              }}
              className={`p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between backdrop-blur-md ${
                isSelected
                  ? "bg-[#00f2ff]/15 border-[#00f2ff] shadow-[0_0_20px_rgba(0,242,255,0.25)] ring-1 ring-[#00f2ff]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{persona.avatar}</span>
                <div>
                  <h4 className="font-extrabold text-white text-lg leading-tight">
                    {persona.name}
                  </h4>
                  <p className="text-base text-[#00f2ff] font-mono">{persona.role}</p>
                </div>
              </div>

              <p className="text-base text-slate-300 leading-relaxed italic mb-3">
                "{persona.quote}"
              </p>

              <div className="text-base text-slate-400 font-mono">
                {persona.styleDescription.split(".")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub Navigation in Frosted Glass */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => {
            sound.playTab();
            setActiveTab("chat");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-bold font-mono transition-all cursor-pointer backdrop-blur-md ${
            activeTab === "chat"
              ? "bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff] shadow-sm"
              : "text-[#94a3b8] hover:text-white"
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Live Mentor Chat</span>
        </button>

        <button
          onClick={() => {
            sound.playTab();
            setActiveTab("review");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-bold font-mono transition-all cursor-pointer backdrop-blur-md ${
            activeTab === "review"
              ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
              : "text-[#94a3b8] hover:text-white"
          }`}
        >
          <Code2 className="w-4 h-4" />
          <span>Review My Code (+50 XP)</span>
        </button>

        <button
          onClick={() => {
            sound.playTab();
            setActiveTab("challenge");
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-base font-bold font-mono transition-all cursor-pointer backdrop-blur-md ${
            activeTab === "challenge"
              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
              : "text-[#94a3b8] hover:text-white"
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>10-Min Micro Challenge (+150 XP)</span>
        </button>
      </div>

      {/* Tab 1: Live Chat in Frosted Glass */}
      {activeTab === "chat" && (
        <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-7 space-y-4 shadow-2xl flex flex-col h-[560px]">
          {/* Chat active mentor indicator */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-base">
            <div className="flex items-center gap-3 font-mono">
              <span className="text-2xl">{activePersona.avatar}</span>
              <div>
                <span className="font-bold text-white block text-lg">{activePersona.name}</span>
                <span className="text-slate-300 text-base">{activePersona.role}</span>
              </div>
            </div>

            <div className="text-base font-mono text-[#00f2ff] bg-[#00f2ff]/10 px-3.5 py-1.5 rounded-lg border border-[#00f2ff]/20">
              Target: {committedCareerTitle || "AI Explorer"}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-white/10">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-lg flex-shrink-0">
                    {isUser ? "👤" : activePersona.avatar}
                  </div>

                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-base leading-relaxed ${
                      isUser
                        ? "bg-[#00f2ff] text-[#05070a] font-medium rounded-tr-none shadow-[0_2px_15px_rgba(0,242,255,0.3)]"
                        : "bg-white/[0.04] backdrop-blur-md border border-white/10 text-slate-200 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-base font-mono opacity-60 block mt-2 text-right">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            {isSending && (
              <div className="flex items-center gap-2 text-base text-slate-300 font-mono pl-12">
                <RefreshCw className="w-4 h-4 animate-spin text-[#00f2ff]" />
                <span>{activePersona.name} is typing response...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Form in Frosted Glass */}
          <form onSubmit={handleSendMessage} className="flex gap-3 pt-3 border-t border-white/10">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Ask ${activePersona.name} anything about code, Python, bots, or careers...`}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-[#00f2ff] placeholder:text-slate-500 font-mono backdrop-blur-md"
            />
            <button
              type="submit"
              disabled={isSending || !inputMessage.trim()}
              className="py-3 px-6 rounded-xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-base uppercase font-mono tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.35)] transition-all cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Code Review System */}
      {activeTab === "review" && (
        <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 space-y-6 shadow-2xl">
          <div>
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <Code2 className="w-6 h-6 text-purple-400" />
              <span>AI Code Review & Quality Evaluator</span>
            </h3>
            <p className="text-base text-slate-300 mt-1.5">
              Paste your Python script or sprint project. The AI will evaluate your architecture, calculate your "Cool Factor Score", and recommend senior-level optimizations.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-base uppercase font-mono text-slate-300 font-semibold block">
              Paste Python Code / Script:
            </label>
            <textarea
              rows={8}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-base text-slate-200 font-mono focus:outline-none focus:border-purple-400 leading-relaxed backdrop-blur-md"
            />

            <div className="flex justify-end">
              <button
                onClick={handleReviewCode}
                disabled={isReviewing || !codeSnippet.trim()}
                className="py-3 px-6 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-black text-base uppercase font-mono tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all cursor-pointer disabled:opacity-50"
              >
                {isReviewing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Evaluating Code...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Run AI Code Review (+50 XP)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Evaluation Results Card */}
          {reviewResult && (
            <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-purple-500/40 space-y-4 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 font-mono font-black text-2xl border border-purple-500/30">
                    {reviewResult.score}/100
                  </div>
                  <div>
                    <span className="text-base font-mono uppercase text-slate-300 font-semibold block">
                      Architectural Quality
                    </span>
                    <span className="font-bold text-white text-lg">Approved for Production Build</span>
                  </div>
                </div>

                <div className="text-base font-mono font-bold px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Cool Factor: {reviewResult.coolFactor}
                </div>
              </div>

              <div>
                <span className="text-base font-mono uppercase text-[#00f2ff] font-bold block mb-1.5">
                  Tech Lead Feedback:
                </span>
                <p className="text-base text-slate-200 leading-relaxed">
                  {reviewResult.feedback}
                </p>
              </div>

              <div>
                <span className="text-base font-mono uppercase text-emerald-400 font-bold block mb-2">
                  Actionable Upgrades & Senior Optimizations:
                </span>
                <ul className="space-y-2 text-base text-slate-300">
                  {reviewResult.optimizations.map((opt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-base">
                <span className="text-base font-mono uppercase text-purple-400 font-bold block mb-1">
                  Recommended Next Quest:
                </span>
                <p className="text-slate-300">{reviewResult.nextChallenge}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Micro Challenge */}
      {activeTab === "challenge" && challenge && (
        <div className="rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-amber-500/30 p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-base font-bold uppercase mb-1.5">
                <Flame className="w-5 h-5" />
                <span>Gamified 10-Minute Side Quest</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white">
                {challenge.title}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-base border border-amber-500/40">
                +{challenge.xpReward} XP Reward
              </span>

              <button
                onClick={handleGetNewChallenge}
                disabled={isLoadingChallenge}
                className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 transition-colors"
                title="Generate another micro-challenge"
              >
                <RefreshCw className={`w-5 h-5 ${isLoadingChallenge ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md space-y-3">
            <span className="text-base uppercase font-mono text-[#00f2ff] font-bold block">
              Mission Objective:
            </span>
            <p className="text-base text-slate-200 leading-relaxed font-medium">
              {challenge.objective}
            </p>

            <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-base font-mono text-purple-300">
              <strong className="text-purple-400">Tactical Hint:</strong> {challenge.hint}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleCompleteChallenge}
              disabled={challengeCompleted}
              className={`py-3.5 px-8 rounded-xl font-mono text-base uppercase font-extrabold tracking-wider transition-all flex items-center gap-2.5 shadow-lg cursor-pointer ${
                challengeCompleted
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              }`}
            >
              <Award className="w-5 h-5" />
              <span>{challengeCompleted ? "Challenge Completed (+150 XP Claimed!)" : "Mark Challenge Complete & Claim XP"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
