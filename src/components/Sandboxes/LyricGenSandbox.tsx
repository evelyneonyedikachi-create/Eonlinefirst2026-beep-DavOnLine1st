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
    <div className="rounded-2xl bg-[#0b101c] border border-purple-500/30 p-5 md:p-6 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Mic className="w-4 h-4" />
            <span>Sprint 2 Simulator // System Prompting & Persona Engine</span>
          </div>
          <h3 className="text-xl font-black text-white">
            The AI Rap Lyric & Character Generator
          </h3>
          <p className="text-xs text-slate-400">
            Experiment with system prompt architectures, temperature sliders, and persona constraints in real-time.
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/30">
          Powered by Gemini 3.7 Flash API
        </div>
      </div>

      {/* Persona Selection */}
      <div>
        <span className="text-[11px] font-mono uppercase text-slate-400 font-semibold block mb-2">
          Select Target Character Persona:
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {stylePresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                sound.playClick();
                setStyle(preset.id);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                style === preset.id
                  ? "bg-slate-900 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-500"
                  : "bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300"
              }`}
            >
              <div className="text-lg mb-1">{preset.icon}</div>
              <div className="font-bold text-white text-xs truncate">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
            Prompt / Topic for the AI:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Building a stock trading bot, beating my friend at chess, late night coding..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400 placeholder:text-slate-600 font-mono"
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold text-xs uppercase font-mono tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{isLoading ? "Generating..." : "Generate"}</span>
            </button>
          </div>
        </div>

        {/* Temperature slider */}
        <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex justify-between font-mono mb-1.5">
            <span className="text-slate-400 uppercase text-[10px]">Creativity (Temperature):</span>
            <span className="text-purple-300 font-bold">{temperature}</span>
          </div>
          <input
            type="range"
            min={0.2}
            max={1.2}
            step={0.1}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
          <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
            <span>Precise (0.2)</span>
            <span>Balanced</span>
            <span>Wild (1.2)</span>
          </div>
        </div>
      </div>

      {/* Output Console */}
      <div className="relative p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2 font-mono text-purple-400 font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Generated Persona Output</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Verse</span>
              </>
            )}
          </button>
        </div>

        <pre className="text-xs md:text-sm text-slate-200 font-mono leading-relaxed whitespace-pre-wrap pt-2">
          {output}
        </pre>
      </div>
    </div>
  );
};
