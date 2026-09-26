import { renderLibraryTitle } from './library-title';
import { renderLibraryFilterSort } from './library-filter-sort';
import { renderLibraryGameCards } from './library-game-cards';

export function renderLibraryPage(container: HTMLElement): void {
  container.className = 'library-page';
  container.append(renderLibraryTitle(), renderLibraryFilterSort(), renderLibraryGameCards());
}
