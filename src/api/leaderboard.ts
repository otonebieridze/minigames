import { apiGet } from './client';

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameSlug: string;
  favoriteGameName: string;
}

interface LeaderboardResponse {
  data: LeaderboardEntry[];
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const response = await apiGet<LeaderboardResponse>('/api/leaderboard');
  return response.data;
}
