import React, { useState } from "react";
import { FuturisticBackground } from "./components/FuturisticBackground";
import { Header } from "./components/Header";
import { IntroVideoPage } from "./components/IntroVideoPage";
import { LandingHero } from "./components/LandingHero";
import { ProgramsPage } from "./components/ProgramsPage";
import { BootcampSprints } from "./components/BootcampSprints";
import { AiMentorChat } from "./components/AiMentorChat";
import { AboutPage } from "./components/AboutPage";
import { ContactPage } from "./components/ContactPage";
import { Dashboard } from "./components/Dashboard";
import { CareerDetailModal } from "./components/CareerDetailModal";
import { CommitmentModal } from "./components/CommitmentModal";
import { CAREER_TRACKS } from "./data/careersData";
import { CareerTrack, UserProgressState, SprintSubmissionData } from "./types";
import { getStoredProgress, saveProgress, calculateLevel } from "./utils/storage";
import { sound } from "./utils/soundEffects";

export default function App() {
  // Two-stage entry: Start with intro video page
  const [activeTab, setActiveTab] = useState<string>("intro");
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

  // Daily Streak Claim
  const handleDailyCheckIn = () => {
    const today = new Date().toISOString().split("T")[0];
    if (progress.lastCheckInDate === today) return;

    const lastDate = progress.lastCheckInDate ? new Date(progress.lastCheckInDate) : null;
    const now = new Date();
    const isConsecutive = lastDate && (now.getTime() - lastDate.getTime()) <= 48 * 60 * 60 * 1000;
    const newStreak = isConsecutive ? progress.streakDays + 1 : 1;

    sound.playLevelUp();
    handleAwardXp(50);
    handleUpdateProgress({
      lastCheckInDate: today,
      streakDays: newStreak,
    });
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

  // Toggle timeline step completion
  const handleToggleTimelineStep = (sprintId: string, stepNumber: number) => {
    sound.playClick();
    const currentSteps = progress.completedTimelineSteps?.[sprintId] || [];
    const isStepDone = currentSteps.includes(stepNumber);

    let updatedSteps: number[];
    let newXp = progress.xp;

    if (isStepDone) {
      updatedSteps = currentSteps.filter((num) => num !== stepNumber);
      newXp = Math.max(0, progress.xp - 50);
    } else {
      updatedSteps = [...currentSteps, stepNumber];
      newXp = progress.xp + 50;
      sound.playXpGain();
    }

    const newLevel = calculateLevel(newXp).level;
    const updatedMap = {
      ...(progress.completedTimelineSteps || {}),
      [sprintId]: updatedSteps,
    };

    handleUpdateProgress({
      completedTimelineSteps: updatedMap,
      xp: newXp,
      level: newLevel,
    });
  };

  // Submit completed sprint
  const handleSubmitSprint = (submission: SprintSubmissionData) => {
    sound.playLevelUp();
    const newXp = progress.xp + 300;
    const newLevel = calculateLevel(newXp).level;

    const completedSprints = progress.completedSprints.includes(submission.sprintId)
      ? progress.completedSprints
      : [...progress.completedSprints, submission.sprintId];

    const submissions = {
      ...(progress.submissions || {}),
      [submission.sprintId]: submission,
    };

    handleUpdateProgress({
      completedSprints,
      submissions,
      xp: newXp,
      level: newLevel,
    });
  };

  const handleNavigateTab = (tabId: string, param?: string | number) => {
    sound.playTab();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (typeof param === "number") {
      setTargetSprintNum(param);
    } else if (typeof param === "string" && tabId === "programs") {
      const career = CAREER_TRACKS.find((c) => c.id === param);
      if (career) {
        setSelectedCareerDetail(career);
      }
    }
  };

  const committedCareer = CAREER_TRACKS.find((c) => c.id === progress.committedCareerId) || null;

  // If activeTab is "intro", render the clean, minimal Intro / Video Entry Page
  if (activeTab === "intro") {
    return (
      <div className="relative min-h-screen bg-[#05070a] text-[#e0e6ed] font-sans selection:bg-[#00f2ff]/30 selection:text-[#00f2ff]">
        <FuturisticBackground />
        <IntroVideoPage
          onEnterApp={(careerId) => {
            if (careerId) {
              handleNavigateTab("programs", careerId);
            } else {
              handleNavigateTab("home");
            }
          }}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
        />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#05070a] text-[#e0e6ed] font-sans selection:bg-[#00f2ff]/30 selection:text-[#00f2ff] flex flex-col justify-between">
      {/* Dynamic Cyber Grid & Starfield Background */}
      <FuturisticBackground />

      {/* Persistent Simplified Navigation Header: Home | Careers | Sprints | AI Mentors | About + MY MISSION */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleNavigateTab}
        onWatchIntro={() => handleNavigateTab("intro")}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        streakDays={progress.streakDays}
      />

      {/* Main Page Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 flex-1 w-full">
        {/* Page 1: Clean, Professional Dashboard-Style Landing Page */}
        {activeTab === "home" && (
          <LandingHero
            onNavigateTab={handleNavigateTab}
            onWatchIntro={() => handleNavigateTab("intro")}
          />
        )}

        {/* Page 2: Programs (9 Career Tracks + Salary Visualizer) */}
        {activeTab === "programs" && (
          <ProgramsPage
            onSelectCareer={(career) => {
              sound.playClick();
              setSelectedCareerDetail(career);
            }}
            onCommitCareer={handleCommitCareer}
            committedCareerId={progress.committedCareerId}
            onNavigateBootcamp={() => handleNavigateTab("bootcamp")}
          />
        )}

        {/* Page 3: Bootcamp Sprints (5-Sprint Roadmap) */}
        {activeTab === "bootcamp" && (
          <BootcampSprints
            progress={progress}
            onToggleMilestone={handleToggleMilestone}
            onToggleTimelineStep={handleToggleTimelineStep}
            onSubmitSprint={handleSubmitSprint}
            activeSprintNum={targetSprintNum}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {/* Page 4: AI Mentors (Gemini 2.5 Tech Lead Chat) */}
        {activeTab === "mentor" && (
          <AiMentorChat
            progress={progress}
            committedCareerTitle={committedCareer?.title}
            onAwardXp={handleAwardXp}
          />
        )}

        {/* Page 5: About (Why 15 Advantage, Manifesto & FAQ) */}
        {activeTab === "about" && (
          <AboutPage
            onExplorePrograms={() => handleNavigateTab("programs")}
            onLaunchBootcamp={() => handleNavigateTab("bootcamp")}
            onContactUs={() => handleNavigateTab("contact")}
          />
        )}

        {/* Page 6: Contact & Consultation */}
        {activeTab === "contact" && (
          <ContactPage
            onExplorePrograms={() => handleNavigateTab("programs")}
            onLaunchBootcamp={() => handleNavigateTab("bootcamp")}
          />
        )}

        {/* Page 7: Mission Control Dashboard */}
        {activeTab === "dashboard" && (
          <Dashboard
            progress={progress}
            committedCareer={committedCareer}
            onSaveNotes={(notes) => {
              handleUpdateProgress({ notes: { ...progress.notes, ...notes } });
            }}
            onSelectTab={handleNavigateTab}
            onCheckIn={handleDailyCheckIn}
          />
        )}
      </main>

      {/* Clean Glass Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05070a]/90 backdrop-blur-xl py-10 px-4 text-center text-base text-slate-300 font-mono space-y-3">
        <div className="flex items-center justify-center gap-2 text-[#e0e6ed] text-base font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
          <span className="tracking-wide">ONLINEFIRST AI Studio // Built for Future AI Engineers</span>
        </div>
        <p className="max-w-2xl mx-auto text-slate-300 text-base leading-relaxed">
          Empowering teenagers with real-world AI engineering, high-growth specialization tracks, and hands-on portfolio deliverables.
        </p>
        <div className="pt-2 flex items-center justify-center gap-6 text-sm text-slate-400">
          <button 
            onClick={() => handleNavigateTab("intro")} 
            className="hover:text-[#00f2ff] transition-colors cursor-pointer"
          >
            Watch Intro Video
          </button>
          <span>·</span>
          <button 
            onClick={() => handleNavigateTab("programs")} 
            className="hover:text-[#00f2ff] transition-colors cursor-pointer"
          >
            9 Career Tracks
          </button>
          <span>·</span>
          <button 
            onClick={() => handleNavigateTab("bootcamp")} 
            className="hover:text-[#00f2ff] transition-colors cursor-pointer"
          >
            5 Build Sprints
          </button>
          <span>·</span>
          <button 
            onClick={() => handleNavigateTab("contact")} 
            className="hover:text-[#00f2ff] transition-colors cursor-pointer"
          >
            Contact & Consultation
          </button>
        </div>
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
            handleNavigateTab("bootcamp");
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
