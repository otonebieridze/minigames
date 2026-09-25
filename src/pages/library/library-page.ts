import { renderLibraryTitle } from './library-title';
import { renderLibraryFilterSort } from './library-filter-sort';

export function renderLibraryPage(container: HTMLElement): void {
  container.className = 'library-page';
  container.append(renderLibraryTitle(), renderLibraryFilterSort());
}
