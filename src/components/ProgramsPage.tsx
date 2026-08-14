import React, { useState, useMemo } from "react";
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
  ChevronLeft,
  ChevronRight,
  Grid,
  ShieldCheck,
  X
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

const ITEMS_PER_PAGE = 6;

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onSelectCareer,
  onCommitCareer,
  committedCareerId,
  onNavigateBootcamp,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAllCards, setShowAllCards] = useState<boolean>(false);
  const [showVisualizer, setShowVisualizer] = useState<boolean>(false);

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

  const filterTabs = [
    { id: "all", label: "All Careers (9)" },
    { id: "robotics", label: "AI & Robotics" },
    { id: "quant", label: "Data & Quant" },
    { id: "cyber", label: "Cybersecurity" },
    { id: "biotech", label: "Bio-AI" },
    { id: "vision", label: "Autonomous & Vision" },
  ];

  const filteredCareers = useMemo(() => {
    return CAREER_TRACKS.filter((career) => {
      const matchesSearch = 
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.alias.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.keyTools.some(t => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
        career.teenHook.toLowerCase().includes(searchTerm.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === "robotics") {
        return career.id.includes("robotics") || career.id.includes("hardware");
      }
      if (selectedFilter === "quant") {
        return career.id.includes("quant") || career.salaryMax >= 300000;
      }
      if (selectedFilter === "biotech") {
        return career.id.includes("bio") || career.id.includes("drug");
      }
      if (selectedFilter === "cyber") {
        return career.id.includes("security") || career.id.includes("reliability") || career.id.includes("policy");
      }
      if (selectedFilter === "vision") {
        return career.id.includes("autonomous") || career.id.includes("geospatial") || career.id.includes("simulation");
      }
      return true;
    });
  }, [searchTerm, selectedFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredCareers.length / ITEMS_PER_PAGE);
  const displayedCareers = showAllCards 
    ? filteredCareers 
    : filteredCareers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleFilterChange = (filterId: string) => {
    sound.playClick();
    setSelectedFilter(filterId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      {/* 1. Concise Hero Section */}
      <div className="relative rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-6 md:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00f2ff]/15 via-[#0a192f]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.04] backdrop-blur-md border border-[#00f2ff]/30 text-[#00f2ff] font-mono text-base font-semibold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[#00f2ff]" />
            <span>High-Earning Career Pathways</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
            Explore High-Earning <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00f2ff] to-[#38bdf8]">AI Careers</span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg leading-relaxed font-medium">
            Discover what these careers actually do, what skills they require, and how OnlineFirst helps you begin building toward them.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-mono text-slate-200">
              <GraduationCap className="w-4 h-4 text-[#00f2ff]" />
              <span>All 9 Tracks: Degree-Optional</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-mono text-amber-300">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>$150K – $500K+ Target Range</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                setShowVisualizer(!showVisualizer);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 border border-[#00f2ff]/30 text-sm font-mono text-[#00f2ff] transition-all cursor-pointer"
            >
              <TrendingUp className="w-4 h-4 text-[#00f2ff]" />
              <span>{showVisualizer ? "Hide Salary Visualizer ▲" : "Compare Salaries & Fast Tracks ▼"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Optional Collapsible Salary Visualizer Module */}
      {showVisualizer && (
        <div className="animate-in fade-in slide-in-from-top-3 duration-300">
          <SalaryVisualizer />
        </div>
      )}

      {/* 2. Compact Filter & Navigation Area */}
      <div className="p-4 md:p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search robotics, quant, tools (ROS2, PyTorch)..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00f2ff] font-mono"
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(1);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Toggle: 6 per page vs View All */}
          <div className="flex items-center gap-2 self-start lg:self-auto text-xs font-mono text-slate-400">
            <span>Display:</span>
            <button
              onClick={() => {
                sound.playClick();
                setShowAllCards(false);
              }}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                !showAllCards
                  ? "bg-[#00f2ff]/20 text-[#00f2ff] border-[#00f2ff]/40 font-bold"
                  : "bg-white/[0.04] text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              Compact (6/page)
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setShowAllCards(true);
              }}
              className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                showAllCards
                  ? "bg-[#00f2ff]/20 text-[#00f2ff] border-[#00f2ff]/40 font-bold"
                  : "bg-white/[0.04] text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              View All ({filteredCareers.length})
            </button>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleFilterChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-sm font-mono font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedFilter === tab.id
                  ? "bg-[#00f2ff] text-[#05070a] font-bold shadow-[0_0_12px_rgba(0,242,255,0.35)]"
                  : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Compact Career Cards (3-Column Grid) */}
      {displayedCareers.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 space-y-3">
          <p className="text-slate-300 text-lg">No career tracks matched "{searchTerm}".</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedFilter("all");
            }}
            className="px-4 py-2 rounded-xl bg-[#00f2ff] text-[#05070a] font-bold font-mono text-sm"
          >
            Clear Search Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedCareers.map((career) => {
            const isCommitted = committedCareerId === career.id;

            return (
              <div
                key={career.id}
                className={`relative rounded-2xl p-5 md:p-6 transition-all duration-300 flex flex-col justify-between group backdrop-blur-xl ${
                  isCommitted
                    ? "bg-[#00f2ff]/10 border-2 border-[#00f2ff] shadow-[0_0_25px_rgba(0,242,255,0.25)] ring-1 ring-[#00f2ff]"
                    : "bg-white/[0.03] border border-white/10 hover:border-[#00f2ff]/40 hover:bg-white/[0.05]"
                }`}
              >
                <div className="space-y-3.5">
                  {/* Top Bar: Number + Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#00f2ff]">
                        #{career.number}
                      </span>
                      <span className="text-xs font-mono uppercase font-bold text-[#00f2ff] bg-[#00f2ff]/10 border border-[#00f2ff]/20 px-2 py-0.5 rounded-md truncate max-w-[170px]">
                        {career.badge}
                      </span>
                    </div>

                    {isCommitted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#00f2ff] text-[#05070a] font-black">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE
                      </span>
                    ) : (
                      <span className="text-xs font-mono text-slate-400">
                        {career.coolFactorScore}/10 Cool
                      </span>
                    )}
                  </div>

                  {/* Title & Alias */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/10 shrink-0">
                        {getIcon(career.iconName)}
                      </div>
                      <h3 className="text-lg font-black text-white group-hover:text-[#00f2ff] transition-colors leading-tight line-clamp-1">
                        {career.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[#00f2ff] font-mono font-semibold">
                      Role: {career.alias}
                    </p>
                  </div>

                  {/* Compensation & Growth Banner */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-slate-400 block">Target Comp</span>
                      <span className="text-sm font-black text-amber-400 font-mono">{career.salaryRange}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono uppercase text-slate-400 block">Degree</span>
                      <span className="text-xs font-mono font-semibold text-emerald-400">Optional</span>
                    </div>
                  </div>

                  {/* Teen Hook Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed line-clamp-2">
                    {career.teenHook}
                  </p>

                  {/* Stack & Tools Chips */}
                  <div className="pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {career.keyTools.slice(0, 3).map((tool, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300">
                          {tool}
                        </span>
                      ))}
                      {career.keyTools.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-white/[0.02] text-xs font-mono text-slate-400">
                          +{career.keyTools.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-2">
                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectCareer(career);
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white font-semibold text-sm transition-all border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#00f2ff]" />
                  </button>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onCommitCareer(career.id);
                    }}
                    className={`py-2.5 px-4 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCommitted
                        ? "bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40"
                        : "bg-[#00f2ff] hover:bg-[#33f5ff] text-[#05070a] shadow-[0_0_12px_rgba(0,242,255,0.3)] font-black"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isCommitted ? "Selected" : "Choose Path"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Pagination Controls (when not showing all) */}
      {!showAllCards && totalPages > 1 && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="text-sm font-mono text-slate-400">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredCareers.length)} of {filteredCareers.length} Careers
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setCurrentPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 transition-colors cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => {
                  sound.playClick();
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 400, behavior: "smooth" });
                }}
                className={`w-9 h-9 rounded-xl font-mono text-sm font-bold transition-all cursor-pointer ${
                  currentPage === pageNum
                    ? "bg-[#00f2ff] text-[#05070a] shadow-[0_0_10px_rgba(0,242,255,0.4)]"
                    : "bg-white/[0.04] text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => {
                sound.playClick();
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                window.scrollTo({ top: 400, behavior: "smooth" });
              }}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed border border-white/10 transition-colors cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

