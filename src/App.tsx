import React, { useState, useEffect } from "react";
import { FuturisticBackground } from "./components/FuturisticBackground";
import { Header } from "./components/Header";
import { LandingHero } from "./components/LandingHero";
import { SalaryVisualizer } from "./components/SalaryVisualizer";
import { CareerGrid } from "./components/CareerGrid";
import { CareerDetailModal } from "./components/CareerDetailModal";
import { CommitmentModal } from "./components/CommitmentModal";
import { BootcampSprints } from "./components/BootcampSprints";
import { AiMentorChat } from "./components/AiMentorChat";
import { Dashboard } from "./components/Dashboard";
import { CAREER_TRACKS } from "./data/careersData";
import { CareerTrack, UserProgressState } from "./types";
import { getStoredProgress, saveProgress, calculateLevel } from "./utils/storage";
import { sound } from "./utils/soundEffects";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("careers");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [progress, setProgress] = useState<UserProgressState>(getStoredProgress());
  
  // Modals state
  const [selectedCareerDetail, setSelectedCareerDetail] = useState<CareerTrack | null>(null);
  const [selectedCommitCareer, setSelectedCommitCareer] = useState<CareerTrack | null>(null);
  const [targetSprintNum, setTargetSprintNum] = useState<number>(1);

  // Sync sound toggle to audio engine
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setEnabled(next);
    if (next) sound.playClick();
  };

  // Update progress helper
  const handleUpdateProgress = (updated: Partial<UserProgressState>) => {
    const newState = { ...progress, ...updated };
    setProgress(newState);
    saveProgress(newState);
  };

  // Award XP with sound check
  const handleAwardXp = (amount: number) => {
    const oldLevel = calculateLevel(progress.xp).level;
    const newXp = progress.xp + amount;
    const newLevel = calculateLevel(newXp).level;

    if (newLevel > oldLevel) {
      sound.playLevelUp();
    } else {
      sound.playXpGain();
    }

    handleUpdateProgress({ xp: newXp, level: newLevel });
  };

  // Toggle milestone completion
  const handleToggleMilestone = (milestoneId: string, milestoneXp: number) => {
    sound.playClick();
    const isCompleted = progress.completedMilestones.includes(milestoneId);
    let updatedMilestones: string[];
    let newXp: number;

    if (isCompleted) {
      updatedMilestones = progress.completedMilestones.filter((id) => id !== milestoneId);
      newXp = Math.max(0, progress.xp - milestoneXp);
    } else {
      updatedMilestones = [...progress.completedMilestones, milestoneId];
      newXp = progress.xp + milestoneXp;
      sound.playXpGain();
    }

    const newLevel = calculateLevel(newXp).level;
    handleUpdateProgress({
      completedMilestones: updatedMilestones,
      xp: newXp,
      level: newLevel,
    });
  };

  // Choose and Commit to a career track
  const handleCommitCareer = (careerId: string) => {
    const career = CAREER_TRACKS.find((c) => c.id === careerId);
    if (career) {
      setSelectedCareerDetail(null);
      setSelectedCommitCareer(career);
    }
  };

  // Confirm commit from modal
  const handleConfirmCommit = (careerId: string, targetAge: number) => {
    const isAlreadyCommitted = progress.committedCareerId === careerId;
    const xpBonus = isAlreadyCommitted ? 0 : 500;
    const newXp = progress.xp + xpBonus;
    const newLevel = calculateLevel(newXp).level;

    handleUpdateProgress({
      committedCareerId: careerId,
      targetAge: targetAge,
      xp: newXp,
      level: newLevel,
    });
  };

  const committedCareer = CAREER_TRACKS.find((c) => c.id === progress.committedCareerId) || null;

  return (
    <div className="relative min-h-screen bg-[#05070a] text-[#e0e6ed] font-sans selection:bg-[#00f2ff]/30 selection:text-[#00f2ff]">
      {/* Dynamic Cyber Grid & Starfield Background */}
      <FuturisticBackground />

      {/* Main Navigation Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          sound.playTab();
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        progress={progress}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Main Container Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 space-y-12">
        {/* Landing Hero Section (shown at top of career exploration) */}
        {activeTab === "careers" && (
          <>
            <LandingHero
              onExploreCareers={() => {
                const el = document.getElementById("careers-section-anchor");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              onLaunchBootcamp={() => {
                sound.playTab();
                setActiveTab("bootcamp");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onMeetMentors={() => {
                sound.playTab();
                setActiveTab("mentor");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />

            {/* Salary Visualizer Module */}
            <div className="pt-2">
              <SalaryVisualizer />
            </div>

            {/* 8 Future-Proof Career Paths Grid */}
            <div id="careers-section-anchor" className="pt-4">
              <CareerGrid
                careers={CAREER_TRACKS}
                committedCareerId={progress.committedCareerId}
                onSelectCareer={(career) => {
                  sound.playClick();
                  setSelectedCareerDetail(career);
                }}
                onCommitCareer={handleCommitCareer}
              />
            </div>
          </>
        )}

        {/* Tab 2: Bootcamp Sprints Environment */}
        {activeTab === "bootcamp" && (
          <BootcampSprints
            progress={progress}
            onToggleMilestone={handleToggleMilestone}
            activeSprintNum={targetSprintNum}
          />
        )}

        {/* Tab 3: AI Tech Lead Mentors */}
        {activeTab === "mentor" && (
          <AiMentorChat
            progress={progress}
            committedCareerTitle={committedCareer?.title}
            onAwardXp={handleAwardXp}
          />
        )}

        {/* Tab 4: Mission Control Dashboard */}
        {activeTab === "dashboard" && (
          <Dashboard
            progress={progress}
            committedCareer={committedCareer}
            onSaveNotes={(notes) => {
              handleUpdateProgress({ notes: { ...progress.notes, ...notes } });
            }}
            onSelectTab={(tab) => {
              sound.playTab();
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>

      {/* Frosted Glass Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05070a]/80 backdrop-blur-xl py-8 px-4 text-center text-xs text-slate-400 font-mono space-y-2">
        <div className="flex items-center justify-center gap-2 text-[#e0e6ed]">
          <span className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
          <span className="tracking-wide">ONLINEFIRST AI Studio // Frosted Glass Interface</span>
        </div>
        <p className="max-w-xl mx-auto text-slate-400 text-[11px]">
          Empowering the next generation with real-world AI engineering, high-earning specialization tracks, and hands-on code deliverables.
        </p>
      </footer>

      {/* Career Detail Modal */}
      {selectedCareerDetail && (
        <CareerDetailModal
          career={selectedCareerDetail}
          onClose={() => setSelectedCareerDetail(null)}
          onCommit={(careerId) => {
            setSelectedCareerDetail(null);
            handleCommitCareer(careerId);
          }}
          isCommitted={progress.committedCareerId === selectedCareerDetail.id}
          onJumpToSprint={(sprintNum) => {
            setTargetSprintNum(sprintNum);
            setActiveTab("bootcamp");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {/* Choose and Commit Protocol Modal */}
      {selectedCommitCareer && (
        <CommitmentModal
          career={selectedCommitCareer}
          onClose={() => setSelectedCommitCareer(null)}
          onConfirmCommit={handleConfirmCommit}
        />
      )}
    </div>
  );
}
