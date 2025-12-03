export enum LiftType {
  SQUAT = 'Squat',
  BENCH = 'Bench Press',
  DEADLIFT = 'Deadlift',
  OHP = 'Overhead Press'
}

export interface Set {
  id: string;
  reps: number;
  weight: number;
  rpe?: number;
}

export interface WorkoutSession {
  id: string;
  date: string;
  liftType: LiftType;
  sets: Set[];
  notes?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  avatarUrl: string;
  total: number;
  squatMax: number;
  benchMax: number;
  deadliftMax: number;
  wilks: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatarUrl: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isPR: boolean;
  liftType?: LiftType;
  weightLifted?: number;
}

export interface LeaderboardEntry {
  rank: number;
  user: UserProfile;
}