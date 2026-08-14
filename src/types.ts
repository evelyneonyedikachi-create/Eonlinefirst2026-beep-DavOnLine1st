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

export interface SprintTimelineStep {
  stepNumber: number;
  name: string;
  duration: string;
  category: 'learn' | 'try' | 'build' | 'test' | 'publish' | 'submit';
  description: string;
  actionTip: string;
}

export interface SprintDeliverable {
  id: string;
  title: string;
  description: string;
  required: boolean;
}

export interface SprintLearningResource {
  category: 'start' | 'watch' | 'practise' | 'stuck';
  title: string;
  platform: string;
  url: string;
  whatItTeaches: string;
  whenToUse: string;
  buttonLabel: string;
  badge: string;
}

export interface LabChallengeStep {
  step: number;
  task: string;
  targetLine: string;
  hint1: string;
  hint2: string;
  solutionCode: string;
  completedMessage: string;
}

export interface SprintLabData {
  title: string;
  language: string;
  instructions: string;
  initialCode: string;
  challenges: LabChallengeStep[];
}

export interface SprintVisualMockup {
  type: string;
  title: string;
  tagline: string;
  badge: string;
  color: string;
  previewPoints: string[];
}

export interface BootcampSprint {
  id: string;
  sprintNumber: number;
  title: string;
  codename: string;
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skillsList: string[];
  finalOutput: string;
  duration: string;
  goal: string;
  motivationHook: string;
  bragPhrases: string[];
  color: string;
  accent: string;
  visualMockup: SprintVisualMockup;
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
  timelineSteps: SprintTimelineStep[];
  deliverables: SprintDeliverable[];
  milestones: {
    id: string;
    title: string;
    xp: number;
    description: string;
  }[];
  learningResources: SprintLearningResource[];
  labData: SprintLabData;
  whatYouCanNowDo: string[];
  sandboxType: 'stock' | 'nlp' | 'vision' | 'agent' | 'portfolio' | 'redteam';
}

export interface SprintSubmissionData {
  sprintId: string;
  sprintNumber?: number;
  sprintTitle?: string;
  liveUrl: string;
  screenshotName?: string;
  screenshotPreviewUrl?: string; // local preview only
  description: string;
  customizationNote: string;
  skillsDemonstrated?: string[];
  technologiesUsed?: string[];
  badgeEarned?: string;
  xpEarned?: number;
  submittedAt: string;
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
  completedTimelineSteps: Record<string, number[]>; // sprintId -> array of completed step numbers (1..6)
  completedSprints: string[];
  submissions: Record<string, SprintSubmissionData>;
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
