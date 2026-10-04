import { renderLibraryTitle } from './library-title';
import { renderLibraryFilterSort } from './library-filter-sort';
import { createLibraryGameCards } from './library-game-cards';
import { createLibraryPagination } from './library-pagination';
import { buildLibraryUrl, readLibraryUrlState } from './library-url-state';
import { navigate, onUrlChange } from '../../app/router';
import type { GameFilters } from '../../api/games';

const FALLBACK_CATEGORY = 'all';
const FIRST_PAGE = 1;

export function renderLibraryPage(container: HTMLElement): void {
  let defaultCategory = FALLBACK_CATEGORY;
  let areCategoriesSettled = false;
  let loadedUrl: string | undefined;

  const pagination = createLibraryPagination((page) => changeUrl({ page }));
  const gameCards = createLibraryGameCards(pagination.update);
  const filterSort = renderLibraryFilterSort({
    onCategoriesReady: (categories) => {
      const defaultItem = categories.find((category) => category.isDefault);

      gameCards.setCategories(categories);
      defaultCategory = defaultItem ? defaultItem.slug : categories[0].slug;
      areCategoriesSettled = true;
      loadedUrl = undefined;
      applyUrlState();
    },
    onCategoriesFailed: () => {
      areCategoriesSettled = true;
      applyUrlState();
    },
    onCategoryChange: (slug) => changeUrl({ category: slug, page: FIRST_PAGE }),
    onSortChange: (sort) => changeUrl({ sort, page: FIRST_PAGE }),
  });

  function changeUrl(changes: Partial<GameFilters>): void {
    const current = readLibraryUrlState(defaultCategory);
    navigate(buildLibraryUrl({ ...current, ...changes }));
  }

  function applyUrlState(): void {
    if (!areCategoriesSettled) return;

    const filters = readLibraryUrlState(defaultCategory);
    const url = buildLibraryUrl(filters);
    if (url === loadedUrl) return;

    loadedUrl = url;
    filterSort.setActive(filters.category, filters.sort);
    gameCards.load(filters);
  }

  const unsubscribe = onUrlChange(() => {
    if (!gameCards.element.isConnected) {
      unsubscribe();
      return;
    }

    applyUrlState();
  });

  container.className = 'library-page';
  container.append(renderLibraryTitle(), filterSort.element, gameCards.element, pagination.element);
}
