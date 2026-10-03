import { renderLibraryTitle } from './library-title';
import { renderLibraryFilterSort } from './library-filter-sort';
import { createLibraryGameCards } from './library-game-cards';
import { renderLibraryPagination } from './library-pagination';
import type { GameFilters } from '../../api/games';

export function renderLibraryPage(container: HTMLElement): void {
  const filters: GameFilters = { category: 'all', sort: 'rating-desc' };
  const gameCards = createLibraryGameCards();

  container.className = 'library-page';
  container.append(
    renderLibraryTitle(),
    renderLibraryFilterSort(),
    gameCards.element,
    renderLibraryPagination(),
  );

  gameCards.load(filters);
}
