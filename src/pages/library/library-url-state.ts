import { DEFAULT_SORT } from './library-filter-sort';
import type { GameFilters } from '../../api/games';

const FIRST_PAGE = 1;

export function readLibraryUrlState(defaultCategory: string): GameFilters {
  const parameters = new URLSearchParams(globalThis.location.search);
  const page = Math.trunc(Number(parameters.get('page')));

  return {
    category: parameters.get('category') ?? defaultCategory,
    sort: parameters.get('sort') ?? DEFAULT_SORT,
    page: Number.isFinite(page) ? Math.max(page, FIRST_PAGE) : FIRST_PAGE,
  };
}

export function buildLibraryUrl(filters: GameFilters): string {
  const parameters = new URLSearchParams({
    category: filters.category,
    sort: filters.sort,
    page: String(filters.page),
  });

  return `/library?${parameters.toString()}`;
}
