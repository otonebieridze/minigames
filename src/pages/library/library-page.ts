import { renderLibraryTitle } from './library-title';
import { renderLibraryFilterSort, DEFAULT_SORT } from './library-filter-sort';
import { createLibraryGameCards } from './library-game-cards';
import { renderLibraryPagination } from './library-pagination';
import type { GameFilters } from '../../api/games';

const FALLBACK_CATEGORY = 'all';

export function renderLibraryPage(container: HTMLElement): void {
  const filters: GameFilters = { category: FALLBACK_CATEGORY, sort: DEFAULT_SORT };
  const gameCards = createLibraryGameCards();

  function loadWithCategory(slug: string): void {
    filters.category = slug;
    gameCards.load(filters);
  }

  function loadWithSort(sort: string): void {
    filters.sort = sort;
    gameCards.load(filters);
  }

  container.className = 'library-page';
  container.append(
    renderLibraryTitle(),
    renderLibraryFilterSort({
      onCategoriesLoaded: gameCards.setCategories,
      onDefaultCategory: loadWithCategory,
      onCategoryChange: loadWithCategory,
      onCategoriesFailed: () => loadWithCategory(FALLBACK_CATEGORY),
      onSortChange: loadWithSort,
    }),
    gameCards.element,
    renderLibraryPagination(),
  );
}
