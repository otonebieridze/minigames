import './library-pagination.scss';
import chevronBackIcon from '../../assets/icons/chevron_backward.png';
import chevronForwardIcon from '../../assets/icons/chevron_forward.png';

const BREAKPOINT_TABLET_PX = 768;
const TOTAL_PAGES = 4;
const MAX_VISIBLE_TABLET_UP = 4;
const MAX_VISIBLE_MOBILE = 3;
const TABLET_UP_QUERY = `(min-width: ${BREAKPOINT_TABLET_PX}px)`;

export function renderLibraryPagination(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'library-pagination';
  nav.setAttribute('aria-label', 'Library pagination');

  let currentPage = 1;

  const previousButton = document.createElement('button');
  previousButton.type = 'button';
  previousButton.className = 'library-pagination__arrow';
  previousButton.setAttribute('aria-label', 'Previous page');
  previousButton.innerHTML = `<img src="${chevronBackIcon}" alt="" width="20" height="20" />`;

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'library-pagination__arrow';
  nextButton.setAttribute('aria-label', 'Next page');
  nextButton.innerHTML = `<img src="${chevronForwardIcon}" alt="" width="20" height="20" />`;

  const pagesList = document.createElement('ul');
  pagesList.className = 'library-pagination__pages';

  nav.append(previousButton, pagesList, nextButton);

  function getMaxVisible(): number {
    return globalThis.matchMedia(TABLET_UP_QUERY).matches
      ? MAX_VISIBLE_TABLET_UP
      : MAX_VISIBLE_MOBILE;
  }

  function getVisibleRange(): number[] {
    const maxVisible = Math.min(getMaxVisible(), TOTAL_PAGES);
    const lastPossibleStart = TOTAL_PAGES - maxVisible + 1;
    const centeredStart = currentPage - Math.floor(maxVisible / 2);
    const start = Math.max(1, Math.min(centeredStart, lastPossibleStart));
    return Array.from({ length: maxVisible }, (_, index) => start + index);
  }

  function render(): void {
    pagesList.replaceChildren();

    for (const page of getVisibleRange()) {
      const item = document.createElement('li');
      const pageButton = document.createElement('button');
      pageButton.type = 'button';
      pageButton.className = 'library-pagination__page';
      pageButton.textContent = String(page);
      pageButton.setAttribute('aria-current', page === currentPage ? 'page' : 'false');

      if (page === currentPage) {
        pageButton.classList.add('library-pagination__page--active');
      }

      pageButton.addEventListener('click', () => {
        currentPage = page;
        render();
      });

      item.append(pageButton);
      pagesList.append(item);
    }

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === TOTAL_PAGES;
  }

  previousButton.addEventListener('click', () => {
    if (currentPage <= 1) return;
    currentPage -= 1;
    render();
  });

  nextButton.addEventListener('click', () => {
    if (currentPage >= TOTAL_PAGES) return;
    currentPage += 1;
    render();
  });

  globalThis.addEventListener('resize', render);

  render();

  return nav;
}
