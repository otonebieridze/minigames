import { renderLibraryTitle } from './library-title';
import { renderLibraryFilterSort, DEFAULT_SORT } from './library-filter-sort';
import { createLibraryGameCards } from './library-game-cards';
import { createLibraryPagination } from './library-pagination';
import type { GameFilters } from '../../api/games';

const FALLBACK_CATEGORY = 'all';
const FIRST_PAGE = 1;

export function renderLibraryPage(container: HTMLElement): void {
  const filters: GameFilters = {
    category: FALLBACK_CATEGORY,
    sort: DEFAULT_SORT,
    page: FIRST_PAGE,
  };

  const pagination = createLibraryPagination(loadWithPage);
  const gameCards = createLibraryGameCards(pagination.update);

  function loadWithPage(page: number): void {
    filters.page = page;
    gameCards.load(filters);
  }

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
    pagination.element,
  );
}
