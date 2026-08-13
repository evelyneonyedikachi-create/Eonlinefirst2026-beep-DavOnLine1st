import React, { useState } from "react";
import { Eye, Camera, ShieldAlert, Crosshair, Sparkles, Bell, CheckCircle2, RefreshCw } from "lucide-react";
import { sound } from "../../utils/soundEffects";

export const VisionQuestSandbox: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<"bedroom" | "lego" | "pokemon" | "drone">("bedroom");
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(0.75);
  const [showBoxes, setShowBoxes] = useState<boolean>(true);
  const [isAlertTriggered, setIsAlertTriggered] = useState<boolean>(false);

  const scenarios = {
    bedroom: {
      title: "Bedroom Sentry Camera (Intruder Alert)",
      subtitle: "Detects humans approaching your bedroom door and triggers phone alerts",
      bgGradient: "from-slate-900 via-indigo-950 to-slate-900",
      objects: [
        { label: "Person (Sibling)", conf: 0.94, x: "25%", y: "20%", w: "45%", h: "60%", color: "border-rose-500 text-rose-400 bg-rose-500/10", isIntruder: true },
        { label: "Backpack", conf: 0.88, x: "10%", y: "65%", w: "20%", h: "25%", color: "border-cyan-500 text-cyan-400 bg-cyan-500/10", isIntruder: false },
        { label: "Door Handle", conf: 0.91, x: "75%", y: "45%", w: "15%", h: "20%", color: "border-amber-500 text-amber-400 bg-amber-500/10", isIntruder: false },
      ],
    },
    lego: {
      title: "Lego Brick Neural Classifier",
      subtitle: "Scans messy Lego piles and identifies brick types and part numbers",
      bgGradient: "from-slate-900 via-blue-950 to-slate-900",
      objects: [
        { label: "2x4 Red Brick (ID #3001)", conf: 0.96, x: "30%", y: "30%", w: "30%", h: "25%", color: "border-red-500 text-red-400 bg-red-500/10", isIntruder: false },
        { label: "1x2 Blue Plate (ID #3023)", conf: 0.89, x: "65%", y: "55%", w: "25%", h: "20%", color: "border-blue-500 text-blue-400 bg-blue-500/10", isIntruder: false },
        { label: "Minifig Helmet", conf: 0.82, x: "15%", y: "45%", w: "20%", h: "25%", color: "border-amber-500 text-amber-400 bg-amber-500/10", isIntruder: false },
      ],
    },
    pokemon: {
      title: "Trading Card Rarity Scanner",
      subtitle: "Optical recognition scanner detecting holo foil condition and estimated PSA grade",
      bgGradient: "from-slate-900 via-purple-950 to-slate-900",
      objects: [
        { label: "Charizard Holographic (Base Set)", conf: 0.98, x: "25%", y: "15%", w: "50%", h: "70%", color: "border-purple-500 text-purple-300 bg-purple-500/10", isIntruder: false },
        { label: "Centering: 9.5 GEM MT", conf: 0.92, x: "22%", y: "12%", w: "56%", h: "76%", color: "border-emerald-500 text-emerald-300 bg-emerald-500/10", isIntruder: false },
      ],
    },
    drone: {
      title: "Autonomous Drone Targeting HUD",
      subtitle: "High-speed 60 FPS YOLOv8 inference tracking moving landing pads",
      bgGradient: "from-slate-900 via-emerald-950 to-slate-900",
      objects: [
        { label: "Landing Pad Alpha", conf: 0.97, x: "35%", y: "40%", w: "30%", h: "30%", color: "border-emerald-500 text-emerald-400 bg-emerald-500/10", isIntruder: false },
        { label: "Obstacle: Tree Branch", conf: 0.86, x: "10%", y: "15%", w: "25%", h: "40%", color: "border-amber-500 text-amber-400 bg-amber-500/10", isIntruder: false },
      ],
    },
  };

  const active = scenarios[selectedScenario];

  const handleTriggerTest = () => {
    sound.playClick();
    setIsAlertTriggered(true);
    sound.playXpGain();
    setTimeout(() => setIsAlertTriggered(false), 3000);
  };

  return (
    <div className="rounded-2xl bg-[#0b101c] border border-cyan-500/30 p-6 md:p-7 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-base font-bold uppercase tracking-wider mb-1.5">
            <Eye className="w-5 h-5" />
            <span>Sprint 3 Simulator // YOLOv8 & OpenCV Computer Vision HUD</span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {active.title}
          </h3>
          <p className="text-base text-slate-300 mt-1">
            {active.subtitle}
          </p>
        </div>

        {/* Scenario Switchers */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {(["bedroom", "lego", "pokemon", "drone"] as const).map((scen) => (
            <button
              key={scen}
              onClick={() => {
                sound.playClick();
                setSelectedScenario(scen);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-base font-semibold uppercase font-mono transition-all cursor-pointer ${
                selectedScenario === scen
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {scen}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Simulator Display Box */}
      <div className="relative w-full h-84 rounded-2xl overflow-hidden border border-cyan-500/40 bg-gradient-to-br bg-slate-950 flex items-center justify-center shadow-inner">
        {/* Synthetic Video Feed Background Grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Cyber HUD Overlay Lines */}
        <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between z-20">
          <div className="flex items-center justify-between font-mono text-base text-cyan-400">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span>LIVE CAM FEED // 60 FPS // YOLOv8n</span>
            </div>
            <div className="flex items-center gap-4">
              <span>RES: 1920x1080</span>
              <span>LATENCY: 12ms</span>
            </div>
          </div>

          <div className="flex items-center justify-between font-mono text-base text-slate-300">
            <div className="flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-cyan-400" />
              <span>TARGET ACQUISITION: ACTIVE</span>
            </div>
            <span className="text-emerald-400 font-bold">INFERENCE: ONLINE</span>
          </div>
        </div>

        {/* Render Bounding Boxes */}
        {showBoxes &&
          active.objects
            .filter((obj) => obj.conf >= confidenceThreshold)
            .map((obj, idx) => (
              <div
                key={idx}
                className={`absolute border-2 rounded-lg p-2 transition-all duration-300 pointer-events-none z-10 ${obj.color}`}
                style={{
                  left: obj.x,
                  top: obj.y,
                  width: obj.w,
                  height: obj.h,
                }}
              >
                <div className="absolute -top-7 left-0 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-base font-mono font-bold flex items-center gap-1.5 shadow-md">
                  <span>{obj.label}</span>
                  <span className="text-cyan-300">{Math.round(obj.conf * 100)}%</span>
                </div>
              </div>
            ))}

        {/* Simulated Alert Overlay */}
        {isAlertTriggered && (
          <div className="absolute inset-0 bg-rose-950/40 border-4 border-rose-500 flex items-center justify-center z-30 animate-pulse">
            <div className="p-5 rounded-2xl bg-slate-950/95 border border-rose-500 text-center space-y-2 shadow-2xl">
              <ShieldAlert className="w-10 h-10 text-rose-400 mx-auto animate-bounce" />
              <h4 className="text-white font-black font-mono text-lg">INTRUDER DETECTED!</h4>
              <p className="text-slate-200 text-base font-mono">
                Screenshot captured & SMS dispatched to phone: +1 (555) ***-**42
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Control sliders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-base">
        {/* Confidence Threshold */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex justify-between font-mono">
            <span className="text-slate-300 uppercase text-base">Confidence Filter:</span>
            <span className="text-cyan-300 font-bold text-base">{Math.round(confidenceThreshold * 100)}%</span>
          </div>
          <input
            type="range"
            min={0.5}
            max={0.95}
            step={0.05}
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Toggle Boxes */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-slate-200 font-semibold block text-base">Render Bounding Boxes</span>
            <span className="text-base text-slate-400 font-mono">OpenCV cv2.rectangle()</span>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              setShowBoxes(!showBoxes);
            }}
            className={`px-3.5 py-1.5 rounded-lg text-base font-mono font-bold transition-all ${
              showBoxes ? "bg-cyan-500 text-slate-950" : "bg-slate-800 text-slate-400"
            }`}
          >
            {showBoxes ? "ON" : "OFF"}
          </button>
        </div>

        {/* Trigger Test Alarm */}
        <div className="flex items-end">
          <button
            onClick={handleTriggerTest}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-black text-base uppercase font-mono tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all cursor-pointer"
          >
            <Bell className="w-5 h-5 text-slate-950" />
            <span>Simulate Intruder Alarm</span>
          </button>
        </div>
      </div>
    </div>
  );
};
