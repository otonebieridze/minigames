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
  page: number;
}

interface GamesMeta {
  page: number;
  totalPages: number;
}

interface GamesResponse {
  data: Game[];
  meta: GamesMeta;
}

export interface GamesPage {
  games: Game[];
  page: number;
  totalPages: number;
}

export async function getFeaturedGames(): Promise<Game[]> {
  const response = await apiGet<GamesResponse>('/api/games?featured=true');
  return response.data;
}

export async function getGames(filters: GameFilters, limit: number): Promise<GamesPage> {
  const query = new URLSearchParams({
    category: filters.category,
    sort: filters.sort,
    page: String(filters.page),
    limit: String(limit),
  });

  const response = await apiGet<GamesResponse>(`/api/games?${query.toString()}`);

  return {
    games: response.data,
    page: response.meta.page,
    totalPages: response.meta.totalPages,
  };
}
