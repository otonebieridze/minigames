import { apiGet } from './client';

export interface GameSpecs {
  genre: string;
  players: string;
  duration: string;
  price: string;
}

export interface GameRecord {
  position: number;
  playerName: string;
  score: number;
  achievedAt: string;
}

export interface GameDetails {
  slug: string;
  name: string;
  heroImage: string;
  rating: number;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  fullDescription: string;
  specs: GameSpecs;
  topRecords: GameRecord[];
}

interface GameDetailsResponse {
  data: GameDetails;
}

export async function getGameDetails(slug: string): Promise<GameDetails> {
  const response = await apiGet<GameDetailsResponse>(`/api/games/${encodeURIComponent(slug)}`);
  return response.data;
}
