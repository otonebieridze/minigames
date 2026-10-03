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

export interface GameFilters {
  category: string;
  sort: string;
}

interface GamesResponse {
  data: Game[];
}

export async function getFeaturedGames(): Promise<Game[]> {
  const response = await apiGet<GamesResponse>('/api/games?featured=true');
  return response.data;
}

export async function getGames(filters: GameFilters, limit: number): Promise<Game[]> {
  const query = new URLSearchParams({
    category: filters.category,
    sort: filters.sort,
    limit: String(limit),
  });

  const response = await apiGet<GamesResponse>(`/api/games?${query.toString()}`);
  return response.data;
}
