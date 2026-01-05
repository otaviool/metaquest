export enum LessonStatus {
  LOCKED = 'LOCKED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  xp: number;
  status: LessonStatus;
  icon?: string; // Emoji or icon name
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  color: string; // Tailwind color class base (e.g., 'green', 'blue')
  lessons: Lesson[];
}

export interface DailyChallenge {
  id: string;
  description: string;
  type: 'XP' | 'LESSON_COUNT';
  target: number;
  progress: number;
  reward: number; // Gems
  completed: boolean;
  icon: string;
}

export interface UserStats {
  xp: number;
  level: number;
  xpToNextLevel: number;
  streak: number;
  gems: number;
  hearts: number;
  league: string;
}

export interface AppState {
  hasOnboarded: boolean;
  userGoal: string;
  units: Unit[];
  stats: UserStats;
  dailyChallenges: DailyChallenge[];
  isLoading: boolean;
}