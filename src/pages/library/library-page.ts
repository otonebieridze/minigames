import { renderLibraryTitle } from './library-title';
import { renderLibraryFilterSort } from './library-filter-sort';
import { renderLibraryGameCards } from './library-game-cards';
import { renderLibraryPagination } from './library-pagination';

export function renderLibraryPage(container: HTMLElement): void {
  container.className = 'library-page';
  container.append(
    renderLibraryTitle(),
    renderLibraryFilterSort(),
    renderLibraryGameCards(),
    renderLibraryPagination(),
  );
}
