import { UserProgressState } from "../types";

const STORAGE_KEY = "nexus_ai_user_progress_v1";

export const INITIAL_PROGRESS: UserProgressState = {
  xp: 450,
  level: 2,
  streakDays: 4,
  lastCheckInDate: new Date().toISOString().split("T")[0],
  committedCareerId: null,
  commitmentDate: null,
  targetAge: 19,
  completedMilestones: ["s1-m1", "s1-m2"],
  completedSprints: [],
  unlockedBadges: ["initiate", "terminal_scout"],
  notes: {},
  soundEnabled: true,
};

export const LEVEL_TIERS = [
  { level: 1, title: "Level 1: Terminal Novice", minXp: 0, maxXp: 300, badge: "🌱" },
  { level: 2, title: "Level 2: Script Crafter", minXp: 300, maxXp: 900, badge: "⚡" },
  { level: 3, title: "Level 3: Algorithm Architect", minXp: 900, maxXp: 2000, badge: "🔮" },
  { level: 4, title: "Level 4: Cyber Red Teamer", minXp: 2000, maxXp: 4000, badge: "🛡️" },
  { level: 5, title: "Level 5: AI Matrix Titan", minXp: 4000, maxXp: 8000, badge: "👑" },
];

export function getStoredProgress(): UserProgressState {
  if (typeof window === "undefined") return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PROGRESS;
    return { ...INITIAL_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveStoredProgress(progress: UserProgressState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error("Failed to save progress:", err);
  }
}

export const saveProgress = saveStoredProgress;

export function calculateLevel(xp: number): { level: number; title: string; badge: string; nextLevelXp: number; progressPercent: number } {
  let currentTier = LEVEL_TIERS[0];
  for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_TIERS[i].minXp) {
      currentTier = LEVEL_TIERS[i];
      break;
    }
  }

  const range = currentTier.maxXp - currentTier.minXp;
  const currentInTier = Math.max(0, xp - currentTier.minXp);
  const progressPercent = Math.min(100, Math.round((currentInTier / range) * 100));

  return {
    level: currentTier.level,
    title: currentTier.title,
    badge: currentTier.badge,
    nextLevelXp: currentTier.maxXp,
    progressPercent,
  };
}
