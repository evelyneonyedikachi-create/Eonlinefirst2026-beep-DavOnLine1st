import React, { useState } from "react";
import { 
  Compass, 
  Sparkles, 
  DollarSign, 
  GraduationCap, 
  Layers, 
  Cpu, 
  Dna, 
  TrendingUp, 
  Bot, 
  ShieldAlert, 
  Car, 
  Globe, 
  Scale, 
  Wrench,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  Flame,
  Award
} from "lucide-react";
import { CareerTrack } from "../types";
import { CAREER_TRACKS } from "../data/careersData";
import { SalaryVisualizer } from "./SalaryVisualizer";
import { sound } from "../utils/soundEffects";

interface ProgramsPageProps {
  onSelectCareer: (career: CareerTrack) => void;
  onCommitCareer: (careerId: string) => void;
  committedCareerId: string | null;
  onNavigateBootcamp: () => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onSelectCareer,
  onCommitCareer,
  committedCareerId,
  onNavigateBootcamp,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu": return <Cpu className="w-5 h-5 text-[#00f2ff]" />;
      case "Wrench": return <Wrench className="w-5 h-5 text-[#00f2ff]" />;
      case "Dna": return <Dna className="w-5 h-5 text-emerald-400" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-purple-400" />;
      case "Car": return <Car className="w-5 h-5 text-blue-400" />;
      case "ShieldAlert": return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      case "Globe": return <Globe className="w-5 h-5 text-teal-400" />;
      case "Scale": return <Scale className="w-5 h-5 text-indigo-400" />;
      default: return <Sparkles className="w-5 h-5 text-[#00f2ff]" />;
    }
  };

  const filteredCareers = CAREER_TRACKS.filter((career) => {
    const matchesSearch = 
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.keyTools.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));

    if (selectedFilter === "hardware") {
      return matchesSearch && (career.id.includes("robotics") || career.id.includes("autonomous"));
    }
    if (selectedFilter === "high-income") {
      return matchesSearch && career.salaryMax >= 300000;
    }
    if (selectedFilter === "biotech") {
      return matchesSearch && career.id.includes("bio");
    }
    if (selectedFilter === "cyber") {
      return matchesSearch && (career.id.includes("security") || career.id.includes("reliability"));
    }
    return matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Top Banner Header */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#00f2ff]/15 via-[#0a192f] to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-semibold uppercase tracking-wider">
            <Compass className="w-5 h-5 text-[#00f2ff]" />
            <span>High-Earning Specialization Directory</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            High-Earning <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#94a3b8]">AI Career Programs</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-3xl">
            Choose a high-leverage specialization. Master the stack, train models, build working code deliverables, and unlock $150K–$500K+ earning potential before your peers finish college.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-base font-mono text-slate-200">
              <GraduationCap className="w-5 h-5 text-[#00f2ff]" />
              <span>All Tracks: Degree-Optional</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-base font-mono text-amber-300">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span>$150,000 – $500,000+ Range</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.04] border border-white/10 text-base font-mono text-purple-300">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>5-Sprint Bootcamp Supported</span>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Visualizer Module */}
      <SalaryVisualizer />

      {/* Search & Filtering Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10">
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search robotics, quant, tools (ROS2, PyTorch)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 text-base text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {[
            { id: "all", label: "All 9 Tracks" },
            { id: "hardware", label: "Robotics & Hardware" },
            { id: "high-income", label: "Top Earnings ($300K+)" },
            { id: "biotech", label: "Biotech AI" },
            { id: "cyber", label: "Cyber & Reliability" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => {
                sound.playClick();
                setSelectedFilter(btn.id);
              }}
              className={`px-4 py-2.5 rounded-xl text-base font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === btn.id
                  ? "bg-[#00f2ff] text-[#05070a] font-bold shadow-[0_0_12px_rgba(0,242,255,0.4)]"
                  : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Career Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCareers.map((career) => {
          const isCommitted = committedCareerId === career.id;
          return (
            <div
              key={career.id}
              className={`relative rounded-3xl p-6 md:p-7 transition-all duration-300 flex flex-col justify-between group backdrop-blur-xl ${
                isCommitted
                  ? "bg-[#00f2ff]/10 border-2 border-[#00f2ff] shadow-[0_0_35px_rgba(0,242,255,0.3)]"
                  : "bg-white/[0.03] border border-white/10 hover:border-[#00f2ff]/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
              }`}
            >
              <div className="space-y-5">
                {/* Card Top: Number & Category Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono font-bold text-base text-[#00f2ff]">
                      #{career.number}
                    </span>
                    <span className="text-base font-mono uppercase font-bold text-[#00f2ff] bg-[#00f2ff]/10 border border-[#00f2ff]/20 px-2.5 py-0.5 rounded-lg">
                      {career.badge}
                    </span>
                  </div>

                  {isCommitted && (
                    <span className="inline-flex items-center gap-1.5 text-base font-mono px-3 py-1 rounded-full bg-[#00f2ff] text-[#05070a] font-black">
                      <CheckCircle2 className="w-4 h-4" /> COMMITTED
                    </span>
                  )}
                </div>

                {/* Title & Alias */}
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10">
                      {getIcon(career.iconName)}
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-[#00f2ff] transition-colors leading-tight">
                      {career.title}
                    </h3>
                  </div>
                  <p className="text-base text-[#00f2ff] font-mono font-semibold">
                    Alias: {career.alias}
                  </p>
                </div>

                {/* Compensation Banner */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-base font-mono uppercase text-slate-400 block mb-0.5">Target Comp</span>
                    <span className="text-lg font-black text-amber-400 font-mono">{career.salaryRange}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-mono uppercase text-slate-400 block mb-0.5">Demand</span>
                    <span className="text-base font-mono font-bold text-emerald-400">High Demand</span>
                  </div>
                </div>

                {/* Teen Hook Summary */}
                <p className="text-base text-slate-300 leading-relaxed font-normal">
                  {career.teenHook}
                </p>

                {/* Tools Chips */}
                <div className="pt-2">
                  <span className="text-base font-mono uppercase text-slate-400 block mb-2">Stack & Tools:</span>
                  <div className="flex flex-wrap gap-2">
                    {career.keyTools.slice(0, 4).map((tool, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-base font-mono text-slate-200">
                        {tool}
                      </span>
                    ))}
                    {career.keyTools.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-white/[0.02] text-base font-mono text-slate-400">
                        +{career.keyTools.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
                <button
                  onClick={() => onSelectCareer(career)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-base transition-all border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Deep Dive</span>
                  <ArrowRight className="w-4 h-4 text-[#00f2ff]" />
                </button>

                <button
                  onClick={() => onCommitCareer(career.id)}
                  className={`py-3 px-5 rounded-xl text-base font-bold transition-all cursor-pointer ${
                    isCommitted
                      ? "bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40"
                      : "bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] shadow-[0_0_15px_rgba(0,242,255,0.3)]"
                  }`}
                >
                  {isCommitted ? "Committed" : "Commit (+500 XP)"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
