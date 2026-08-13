import React, { useState } from "react";
import { Sparkles, Mic, RefreshCw, Send, Copy, Check, MessageSquare, Volume2 } from "lucide-react";
import { sound } from "../../utils/soundEffects";

export const LyricGenSandbox: React.FC = () => {
  const [style, setStyle] = useState<string>("kanye");
  const [topic, setTopic] = useState<string>("Coding an autonomous AI bot at 3am");
  const [temperature, setTemperature] = useState<number>(0.9);
  const [output, setOutput] = useState<string>(
    `[Chorus - Auto-tune 808s]\nLightyears ahead while they're stuck in the past,\nBuilt the algorithm fast, make the dynasty last.\nGold records on the wall, neural weights in the cloud,\nTurn the stadium lights up, hear the matrix get loud!`
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const stylePresets = [
    { id: "kanye", name: "Kanye 808s & Stadium Anthem", icon: "🎤", color: "from-amber-500 to-orange-500" },
    { id: "cyberpunk", name: "Cyberpunk Netrunner Verse", icon: "⚡", color: "from-cyan-500 to-blue-500" },
    { id: "insult", name: "Shakespearean Cyber Roast", icon: "🎭", color: "from-purple-500 to-pink-500" },
    { id: "villain", name: "Anime Final Boss AI", icon: "👑", color: "from-rose-500 to-red-600" },
  ];

  const handleGenerate = async () => {
    sound.playClick();
    setIsLoading(true);

    try {
      const response = await fetch("/api/sandbox/generate-nlp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ style, topic, temperature }),
      });
      const data = await response.json();
      if (data.output) {
        setOutput(data.output);
        sound.playXpGain();
      }
    } catch {
      // Local preset fallback
      setOutput(`[Neural Verse Sync]\nLines of Python blazing on the OLED screen,\n15 years old running algorithms unseen.\nFirewalls shatter when the prompt takes flight,\nTurning code into gold in the middle of the night!`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-[#0b101c] border border-purple-500/30 p-6 md:p-7 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-base font-bold uppercase tracking-wider mb-1.5">
            <Mic className="w-5 h-5" />
            <span>Sprint 2 Simulator // System Prompting & Persona Engine</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            The AI Rap Lyric & Character Generator
          </h3>
          <p className="text-base text-slate-300 mt-1">
            Experiment with system prompt architectures, temperature sliders, and persona constraints in real-time.
          </p>
        </div>

        <div className="text-base font-mono text-cyan-400 bg-purple-500/10 px-3.5 py-1.5 rounded-xl border border-purple-500/30">
          Powered by Gemini 3.7 Flash API
        </div>
      </div>

      {/* Persona Selection */}
      <div>
        <span className="text-base font-mono uppercase text-slate-300 font-semibold block mb-3">
          Select Target Character Persona:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {stylePresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                sound.playClick();
                setStyle(preset.id);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                style === preset.id
                  ? "bg-slate-900 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-500"
                  : "bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="text-2xl mb-1.5">{preset.icon}</div>
              <div className="font-bold text-white text-base truncate">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base">
        <div className="md:col-span-2 space-y-2">
          <label className="text-base uppercase font-mono text-slate-300 font-semibold block">
            Prompt / Topic for the AI:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Building a stock trading bot, beating my friend at chess..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-base text-white focus:outline-none focus:border-purple-400 placeholder:text-slate-500 font-mono"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-base uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              <span>{isLoading ? "Generating..." : "Generate"}</span>
            </button>
          </div>
        </div>

        {/* Temperature slider */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between font-mono">
            <span className="text-slate-300 uppercase text-base">Creativity (Temp):</span>
            <span className="text-purple-300 font-bold text-base">{temperature}</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={1.2}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
          <div className="flex justify-between text-base text-slate-400 font-mono">
            <span>Precise (0.2)</span>
            <span>Balanced</span>
            <span>Wild (1.2)</span>
          </div>
        </div>
      </div>

      {/* Output Console */}
      <div className="relative p-6 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-base border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2 font-mono text-purple-400 font-bold text-base">
            <MessageSquare className="w-4 h-4" />
            <span>Generated Persona Output</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-base font-mono text-slate-300 hover:text-white px-3 py-1 rounded bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Verse</span>
              </>
            )}
          </button>
        </div>

        <pre className="text-base md:text-lg text-slate-200 font-mono leading-relaxed whitespace-pre-wrap pt-2">
          {output}
        </pre>
      </div>
    </div>
  );
};
