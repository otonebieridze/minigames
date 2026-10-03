import { apiGet } from './client';

export interface Game {
  slug: string;
  name: string;
  category: string;
  price: string;
  shortDescription: string;
  rating: number;
  likesCount: number;
  cardImage: string;
}

interface GamesResponse {
  data: Game[];
}

export async function getFeaturedGames(): Promise<Game[]> {
  const response = await apiGet<GamesResponse>('/api/games?featured=true');
  return response.data;
}

export async function getGames(limit: number): Promise<Game[]> {
  const response = await apiGet<GamesResponse>(`/api/games?limit=${limit}`);
  return response.data;
}
