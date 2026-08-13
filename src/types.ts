export interface CareerTrack {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  alias: string;
  tagline: string;
  salaryRange: string;
  salaryMin: number;
  salaryMax: number;
  degreeRequirement: string;
  hasDegreeRequired: boolean;
  color: string;
  glowColor: string;
  accentGradient: string;
  badge: string;
  iconName: string;
  coolFactorScore: number;
  whatItIs: string;
  teenHook: string;
  dayInTheLife: string[];
  superpowers: string[];
  keyTools: string[];
  recommendedSprints: number[];
  hiringCompanies: string[];
  growthProjection: string;
}

export interface BootcampSprint {
  id: string;
  sprintNumber: number;
  title: string;
  codename: string;
  duration: string;
  goal: string;
  motivationHook: string;
  color: string;
  accent: string;
  curriculum: {
    module: string;
    description: string;
    skills: string[];
  }[];
  project: {
    name: string;
    summary: string;
    deliverable: string;
    bragFactor: string;
  };
  milestones: {
    id: string;
    title: string;
    xp: number;
    description: string;
  }[];
  sandboxType: 'stock' | 'nlp' | 'vision' | 'agent' | 'portfolio' | 'redteam';
}

export interface UserProgressState {
  xp: number;
  level: number;
  streakDays: number;
  lastCheckInDate: string;
  committedCareerId: string | null;
  commitmentDate: string | null;
  targetAge: number;
  completedMilestones: string[];
  completedSprints: string[];
  unlockedBadges: string[];
  notes: Record<string, string>;
  soundEnabled: boolean;
}

export interface MentorMessage {
  id: string;
  sender: 'user' | 'mentor';
  text: string;
  timestamp: string;
  personaId?: string;
  isFallback?: boolean;
}

export interface MentorPersona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  accentColor: string;
  styleDescription: string;
  quote: string;
}

export interface CodeReviewResult {
  score: number;
  coolFactor: string;
  feedback: string;
  optimizations: string[];
  nextChallenge: string;
  isFallback?: boolean;
}

export interface MicroChallenge {
  title: string;
  xpReward: number;
  objective: string;
  hint: string;
  completed?: boolean;
}
