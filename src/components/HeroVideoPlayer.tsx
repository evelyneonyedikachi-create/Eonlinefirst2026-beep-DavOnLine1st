import React, { useState, useEffect, useRef } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  TrendingUp, 
  Dna, 
  ShieldAlert, 
  Car, 
  Bot, 
  Maximize2,
  ChevronRight,
  Eye
} from "lucide-react";
import { sound } from "../utils/soundEffects";

export interface VignetteData {
  id: string;
  careerId: string;
  careerTitle: string;
  category: string;
  onScreenLabel: string;
  subLabel: string;
  visualDescription: string;
  linkText: string;
  salary: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badgeBg: string;
  bgGradient: string;
  videoSceneType: 'robotics' | 'quant' | 'bio' | 'redteam' | 'autonomous' | 'personality';
}

export const VIGNETTES: VignetteData[] = [
  {
    id: "robotics",
    careerId: "robotics-ai-hardware-engineer",
    careerTitle: "Robotics / AI Hardware Engineer",
    category: "Hardware & Physical AI",
    onScreenLabel: "Bring AI to Life",
    subLabel: "Teen programming 6-axis robot arm & vision sensors",
    visualDescription: "Teen hands-on with precision robotic arm & drone, adjusting optical sensor, close-up on functioning mechanical gears & microcomputer.",
    linkText: "Programs → Robotics track",
    salary: "$160K – $320K+",
    icon: Cpu,
    accentColor: "#00f2ff",
    badgeBg: "bg-[#00f2ff]/20 text-[#00f2ff] border-[#00f2ff]/40",
    bgGradient: "from-[#00f2ff]/20 via-[#0a192f]/80 to-[#05070a]",
    videoSceneType: 'robotics',
  },
  {
    id: "quant",
    careerId: "algorithmic-quant-trader",
    careerTitle: "Algorithmic Quant Trader",
    category: "High-Frequency AI",
    onScreenLabel: "Automate Wall Street Alpha",
    subLabel: "Teen running autonomous high-frequency trading bot",
    visualDescription: "Multi-monitor dark setup analyzing live tick orders, statistical arbitrage signals, and autonomous microsecond execution.",
    linkText: "Programs → Quant Trader track",
    salary: "$200K – $500K+",
    icon: TrendingUp,
    accentColor: "#f59e0b",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    bgGradient: "from-amber-500/20 via-[#1c1308]/80 to-[#05070a]",
    videoSceneType: 'quant',
  },
  {
    id: "bio",
    careerId: "biohacker-drug-discovery",
    careerTitle: "AI Drug Discovery & Biohacker",
    category: "Generative Biology",
    onScreenLabel: "Cure Diseases with Code",
    subLabel: "Teen simulating AlphaFold 3D protein dockings",
    visualDescription: "High-tech biotech station visualizing glowing CRISPR molecular bindings and AI-synthesized therapeutic antibodies.",
    linkText: "Programs → Biohacker track",
    salary: "$130K – $300K+",
    icon: Dna,
    accentColor: "#10b981",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    bgGradient: "from-emerald-500/20 via-[#071f16]/80 to-[#05070a]",
    videoSceneType: 'bio',
  },
  {
    id: "redteam",
    careerId: "ai-security-specialist",
    careerTitle: "AI Security Specialist (Red Teamer)",
    category: "Cybersecurity & Defenses",
    onScreenLabel: "Hack the Neural Models First",
    subLabel: "Teen testing zero-day prompt injection exploits",
    visualDescription: "Cyber operations terminal finding model extraction vulnerabilities and deploying real-time semantic firewalls.",
    linkText: "Programs → AI Security track",
    salary: "$150K – $300K+",
    icon: ShieldAlert,
    accentColor: "#f43f5e",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    bgGradient: "from-rose-500/20 via-[#260811]/80 to-[#05070a]",
    videoSceneType: 'redteam',
  },
  {
    id: "autonomous",
    careerId: "autonomous-vehicle-simulation",
    careerTitle: "Autonomous Vehicle Simulation",
    category: "3D World Simulation",
    onScreenLabel: "Code Autonomous Machines",
    subLabel: "Teen training vision models across virtual cities",
    visualDescription: "Unreal Engine 5 physics simulation streaming real-time LiDAR point clouds and camera bounding boxes at 100x speed.",
    linkText: "Programs → Autonomous Simulation",
    salary: "$140K – $250K+",
    icon: Car,
    accentColor: "#3b82f6",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    bgGradient: "from-blue-500/20 via-[#09152b]/80 to-[#05070a]",
    videoSceneType: 'autonomous',
  },
  {
    id: "personality",
    careerId: "computational-linguist-designer",
    careerTitle: "LLM Personality & Voice Architect",
    category: "Synthetic Minds",
    onScreenLabel: "Sculpt Synthetic Minds",
    subLabel: "Teen tuning character neural weights & voice clones",
    visualDescription: "Sound & linguistic workstation crafting comedic video game NPC intelligence, memory graphs, and low-latency voice synthesis.",
    linkText: "Programs → Personality Designer",
    salary: "$120K – $220K+",
    icon: Bot,
    accentColor: "#a855f7",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    bgGradient: "from-purple-500/20 via-[#1b0a29]/80 to-[#05070a]",
    videoSceneType: 'personality',
  },
];

interface HeroVideoPlayerProps {
  onEnterAiWorld: (careerId?: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const HeroVideoPlayer: React.FC<HeroVideoPlayerProps> = ({
  onEnterAiWorld,
  soundEnabled,
  onToggleSound,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPct, setProgressPct] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const VIGNETTE_DURATION = 4000; // 4 seconds per vignette (24 seconds total loop)

  const activeVignette = VIGNETTES[currentIndex];

  // Advance vignettes automatically
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 50;
    const step = (interval / VIGNETTE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgressPct((prev) => {
        if (prev + step >= 100) {
          setCurrentIndex((idx) => (idx + 1) % VIGNETTES.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  // Canvas animated photorealistic background render
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.02;
      const w = (canvas.width = canvas.offsetWidth);
      const h = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, w, h);

      // Base atmospheric dark fill
      const grad = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, w * 0.8);
      grad.addColorStop(0, "rgba(8, 14, 26, 0.95)");
      grad.addColorStop(1, "rgba(4, 6, 12, 0.98)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Render Scene specific visual geometry
      const scene = activeVignette.videoSceneType;

      if (scene === "robotics") {
        // Robotics: Robot arm joints, laser sensors, circuit traces
        ctx.strokeStyle = "rgba(0, 242, 255, 0.4)";
        ctx.lineWidth = 2;

        // Base pivot
        const bx = w * 0.35 + Math.sin(time * 0.5) * 20;
        const by = h * 0.75;
        const j1x = bx + Math.cos(time * 0.8) * 80;
        const j1y = by - 120 + Math.sin(time * 0.8) * 40;
        const j2x = j1x + Math.sin(time) * 100;
        const j2y = j1y - 60 + Math.cos(time * 0.9) * 30;
        const endX = j2x + 50 + Math.sin(time * 1.5) * 15;
        const endY = j2y + 40;

        // Draw arm segments
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(j1x, j1y);
        ctx.lineTo(j2x, j2y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw glowing servo joints
        [ { x: bx, y: by, r: 12 }, { x: j1x, y: j1y, r: 10 }, { x: j2x, y: j2y, r: 8 }, { x: endX, y: endY, r: 6 } ].forEach(p => {
          ctx.fillStyle = "#00f2ff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });

        // Laser scan cone
        const coneGrad = ctx.createRadialGradient(endX, endY, 5, endX + 100, endY + 80, 120);
        coneGrad.addColorStop(0, "rgba(0, 242, 255, 0.6)");
        coneGrad.addColorStop(1, "rgba(0, 242, 255, 0)");
        ctx.fillStyle = coneGrad;
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX + 140, endY + 70);
        ctx.lineTo(endX + 60, endY + 120);
        ctx.closePath();
        ctx.fill();

        // Hardware grid telemetry
        for (let i = 0; i < 6; i++) {
          const gx = (w * 0.6) + (i * 25);
          const gh = 30 + Math.sin(time * 2 + i) * 25;
          ctx.fillStyle = "rgba(0, 242, 255, 0.35)";
          ctx.fillRect(gx, h * 0.7 - gh, 15, gh);
        }
      } else if (scene === "quant") {
        // Quant: Candlesticks, moving averages, order book curves
        ctx.strokeStyle = "rgba(245, 158, 11, 0.7)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = 0; x < w; x += 15) {
          const y = h * 0.5 + Math.sin((x + time * 100) * 0.02) * 50 + Math.cos(x * 0.05) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Candlesticks
        for (let i = 0; i < 18; i++) {
          const cx = (w * 0.15) + (i * (w * 0.7 / 18));
          const ch = 40 + Math.sin(time * 3 + i) * 30;
          const cy = h * 0.5 + Math.cos(time + i) * 40;
          const isUp = (i + Math.floor(time)) % 2 === 0;
          ctx.fillStyle = isUp ? "rgba(16, 185, 129, 0.6)" : "rgba(239, 68, 68, 0.6)";
          ctx.fillRect(cx - 6, cy - ch / 2, 12, ch);
          ctx.fillRect(cx - 1, cy - ch / 2 - 15, 2, ch + 30);
        }
      } else if (scene === "bio") {
        // Biohacker: 3D Protein double helix
        const points = 30;
        for (let i = 0; i < points; i++) {
          const px = (w * 0.2) + (i * (w * 0.6 / points));
          const angle = (i * 0.3) + time * 1.5;
          const y1 = h * 0.5 + Math.sin(angle) * 70;
          const y2 = h * 0.5 - Math.sin(angle) * 70;

          ctx.strokeStyle = "rgba(16, 185, 129, 0.3)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(px, y1);
          ctx.lineTo(px, y2);
          ctx.stroke();

          ctx.fillStyle = "#10b981";
          ctx.beginPath();
          ctx.arc(px, y1, 5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#00f2ff";
          ctx.beginPath();
          ctx.arc(px, y2, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (scene === "redteam") {
        // Red team: Neural node matrix & intrusion pulses
        const nodes = 20;
        for (let i = 0; i < nodes; i++) {
          const nx = (w * 0.2) + ((i % 5) * (w * 0.6 / 4));
          const ny = (h * 0.3) + (Math.floor(i / 5) * (h * 0.4 / 3));

          ctx.fillStyle = (i % 3 === 0) ? "#f43f5e" : "rgba(244, 63, 94, 0.4)";
          ctx.beginPath();
          ctx.arc(nx, ny, 6, 0, Math.PI * 2);
          ctx.fill();

          if (i > 0) {
            ctx.strokeStyle = "rgba(244, 63, 94, 0.2)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nx, ny);
            ctx.lineTo((w * 0.2) + (((i - 1) % 5) * (w * 0.6 / 4)), ny);
            ctx.stroke();
          }
        }
      } else if (scene === "autonomous") {
        // Autonomous LiDAR sweeps & 3D perspective grid
        ctx.strokeStyle = "rgba(59, 130, 246, 0.35)";
        ctx.lineWidth = 1;
        const horizon = h * 0.4;
        const cx = w * 0.5;

        for (let x = -w * 0.5; x <= w * 1.5; x += 50) {
          ctx.beginPath();
          ctx.moveTo(cx, horizon);
          ctx.lineTo(x, h);
          ctx.stroke();
        }

        // Concentric LiDAR circles
        for (let r = 30; r < 250; r += 45) {
          ctx.strokeStyle = "rgba(0, 242, 255, 0.25)";
          ctx.beginPath();
          ctx.arc(cx, h * 0.75, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      } else {
        // Personality / Audio waveform
        ctx.strokeStyle = "rgba(168, 85, 247, 0.6)";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let x = 0; x < w; x += 10) {
          const y = h * 0.5 + Math.sin((x + time * 60) * 0.03) * Math.sin(time * 2) * 50;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Atmospheric Vignette Scanline overlay
      ctx.fillStyle = "rgba(255, 255, 255, 0.015)";
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeVignette.videoSceneType]);

  const handleSelectVignette = (index: number) => {
    sound.playClick();
    setCurrentIndex(index);
    setProgressPct(0);
  };

  const handleTogglePlay = () => {
    sound.playClick();
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      className="relative w-full rounded-3xl overflow-hidden border border-white/15 bg-[#05070a] shadow-[0_20px_60px_rgba(0,0,0,0.8)] select-none group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        minHeight: "460px",
        height: "52vh",
        maxHeight: "580px",
      }}
    >
      {/* 1. Canvas Dynamic Visual Render Engine */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2. Frosted Ambient Lighting & Gradient Wash */}
      <div className={`absolute inset-0 bg-gradient-to-t ${activeVignette.bgGradient} opacity-60 transition-all duration-700 pointer-events-none`} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070a]/90 via-transparent to-[#05070a]/80 pointer-events-none" />

      {/* 3. Top Telemetry HUD Header */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-base font-mono text-[#00f2ff]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold uppercase tracking-wider">LIVE 4K CINEMATIC // VIGNETTE {currentIndex + 1}/6</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-md border border-white/10 text-base font-mono text-slate-200">
            <activeVignette.icon className="w-4 h-4 text-[#00f2ff]" />
            <span>{activeVignette.category}</span>
          </div>
        </div>

        {/* Controls (Play/Pause, Audio Mute, Maximize) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
            title={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? <Pause className="w-5 h-5 text-[#00f2ff]" /> : <Play className="w-5 h-5 text-[#00f2ff]" />}
          </button>

          <button
            onClick={onToggleSound}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/15 backdrop-blur-md transition-all cursor-pointer"
            title={soundEnabled ? "Mute audio" : "Enable audio"}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5 text-[#00f2ff]" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* 4. Center High-Impact Vignette Content & Clickable Invitation */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 pointer-events-none">
        <div className="pt-10 max-w-2xl">
          {/* Active Career Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-base font-mono font-bold mb-3 shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeVignette.accentColor }} />
            <span className="text-white">{activeVignette.careerTitle}</span>
            <span className="text-[#94a3b8]">|</span>
            <span className="text-amber-400 font-mono">{activeVignette.salary}</span>
          </div>

          {/* Large On-Screen Action Label */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.05] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            "{activeVignette.onScreenLabel}"
          </h2>

          {/* Short Supporting Scene Hook */}
          <p className="text-base sm:text-lg text-slate-200 font-medium mt-2 max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] leading-relaxed">
            {activeVignette.subLabel}
          </p>
        </div>

        {/* Center-Right Overlaid Clickable Invitation Cue: "Enter the AI world" */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-14 pointer-events-auto">
          <div className="max-w-lg">
            <div className="text-base font-mono uppercase text-slate-300 font-semibold mb-1.5 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#00f2ff]" />
              <span>Ultra-Realistic Simulation:</span>
            </div>
            <p className="text-base text-slate-200 line-clamp-2 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 leading-relaxed">
              {activeVignette.visualDescription}
            </p>
          </div>

          {/* Primary Action Button: "Enter the AI World" */}
          <button
            id="hero-video-enter-btn"
            onClick={() => {
              sound.playLevelUp();
              onEnterAiWorld(activeVignette.careerId);
            }}
            className="py-4 px-8 rounded-2xl bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] font-black text-base uppercase font-mono tracking-wider shadow-[0_0_35px_rgba(0,242,255,0.6)] hover:shadow-[0_0_50px_rgba(0,242,255,0.9)] transition-all transform hover:scale-105 flex items-center gap-3 cursor-pointer group/btn"
          >
            <Sparkles className="w-5 h-5 text-[#05070a] group-hover/btn:rotate-12 transition-transform" />
            <span>Enter the AI World</span>
            <ArrowRight className="w-5 h-5 text-[#05070a] group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 5. Bottom Vignette Selector Bar & Scrub Timeline */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-3 bg-black/80 backdrop-blur-xl border-t border-white/10 flex flex-col gap-2 pointer-events-auto">
        {/* Timeline Progress Bar */}
        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#00f2ff] transition-all duration-75 shadow-[0_0_8px_#00f2ff]"
            style={{ width: `${((currentIndex * 100) + progressPct) / VIGNETTES.length}%` }}
          />
        </div>

        {/* Career Hotspots / Vignette Chips */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none py-1">
          {VIGNETTES.map((vignette, idx) => {
            const Icon = vignette.icon;
            const isActive = currentIndex === idx;
            return (
              <button
                key={vignette.id}
                onClick={() => handleSelectVignette(idx)}
                className={`flex-1 min-w-[170px] p-2.5 rounded-2xl text-left transition-all duration-200 flex items-center gap-2.5 cursor-pointer border ${
                  isActive
                    ? "bg-white/15 border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                    : "bg-white/[0.03] border-white/5 hover:bg-white/[0.08] opacity-70 hover:opacity-100"
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isActive ? "bg-[#00f2ff] text-[#05070a]" : "bg-white/10 text-slate-300"}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-base font-mono uppercase font-bold text-white truncate">
                    {vignette.careerTitle.split("/")[0]}
                  </div>
                  <div className="text-base text-[#00f2ff] font-mono truncate">
                    "{vignette.onScreenLabel}"
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
