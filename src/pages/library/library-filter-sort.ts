import './library-filter-sort.scss';
import arrowDropDownIcon from '../../assets/icons/arrow_drop_down.png';
import { getCategories, type Category } from '../../api/categories';
import { createChipsSkeleton } from './library-chips-skeleton';
import { createErrorBanner } from '../../components/error-banner/error-banner';
import { createEmptyState } from '../../components/empty-state/empty-state';
import { showSnackbar } from '../../components/snackbar/snackbar';

interface SortOption {
  value: string;
  label: string;
}

const sortOptions: SortOption[] = [
  { value: 'rating-desc', label: 'Rating ↓' },
  { value: 'rating-asc', label: 'Rating ↑' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
];

export const DEFAULT_SORT = sortOptions[0].value;

const ACTIVE_CHIP_CLASS = 'library-filter-sort__chip--active';
const ACTIVE_SORT_OPTION_CLASS = 'library-filter-sort__sort-option--active';

interface FilterSortHandlers {
  onCategoriesReady: (categories: Category[]) => void;
  onCategoriesFailed: () => void;
  onCategoryChange: (slug: string) => void;
  onSortChange: (value: string) => void;
}

interface LibraryFilterSort {
  element: HTMLElement;
  setActive: (category: string, sort: string) => void;
}

function createChips(
  categories: Category[],
  onCategoryChange: (slug: string) => void,
): HTMLButtonElement[] {
  return categories.map((category) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'library-filter-sort__chip';
    chip.dataset.slug = category.slug;
    chip.textContent = category.label;
    chip.addEventListener('click', () => onCategoryChange(category.slug));
    return chip;
  });
}

export function renderLibraryFilterSort(handlers: FilterSortHandlers): LibraryFilterSort {
  const section = document.createElement('div');
  section.className = 'library-filter-sort';

  const sortOptionsHtml = sortOptions
    .map((option) => {
      const activeClass = option.value === DEFAULT_SORT ? ` ${ACTIVE_SORT_OPTION_CLASS}` : '';
      return `
        <li>
          <button type="button" class="library-filter-sort__sort-option${activeClass}" data-value="${option.value}" data-label="${option.label}">
            ${option.label}
          </button>
        </li>
      `;
    })
    .join('');

  section.innerHTML = `
    <div class="library-filter-sort__sort">
      <button type="button" class="library-filter-sort__sort-toggle" aria-expanded="false">
        <span class="library-filter-sort__sort-label">Sort by: ${sortOptions[0].label}</span>
        <img src="${arrowDropDownIcon}" alt="" class="library-filter-sort__sort-caret" width="20" height="20" />
      </button>
      <ul class="library-filter-sort__sort-list">
        ${sortOptionsHtml}
      </ul>
    </div>
  `;

  const chipsContainer = document.createElement('div');
  chipsContainer.className = 'library-filter-sort__chips';
  section.prepend(chipsContainer);

  async function loadCategories(): Promise<void> {
    chipsContainer.replaceChildren(...createChipsSkeleton());

    try {
      const categories = await getCategories();

      if (categories.length === 0) {
        chipsContainer.replaceChildren(createEmptyState('No categories found.'));
        handlers.onCategoriesFailed();
        return;
      }

      chipsContainer.replaceChildren(...createChips(categories, handlers.onCategoryChange));
      handlers.onCategoriesReady(categories);
    } catch {
      chipsContainer.replaceChildren(
        createErrorBanner('Could not load categories. Please try again.', loadCategories),
      );
      showSnackbar('Failed to load categories.', 'error');
      handlers.onCategoriesFailed();
    }
  }

  loadCategories();

  const sortWrapper = section.querySelector<HTMLElement>('.library-filter-sort__sort');
  const sortToggle = section.querySelector<HTMLButtonElement>('.library-filter-sort__sort-toggle');
  const sortLabel = section.querySelector<HTMLElement>('.library-filter-sort__sort-label');
  const sortOptionButtons = section.querySelectorAll<HTMLButtonElement>(
    '.library-filter-sort__sort-option',
  );

  function setActive(category: string, sort: string): void {
    const chips = chipsContainer.querySelectorAll<HTMLButtonElement>('.library-filter-sort__chip');
    for (const chip of chips) {
      chip.classList.toggle(ACTIVE_CHIP_CLASS, chip.dataset.slug === category);
    }

    for (const optionButton of sortOptionButtons) {
      const isActive = optionButton.dataset.value === sort;
      optionButton.classList.toggle(ACTIVE_SORT_OPTION_CLASS, isActive);

      if (isActive && sortLabel) {
        sortLabel.textContent = `Sort by: ${optionButton.dataset.label}`;
      }
    }
  }

  function closeSortList(): void {
    sortWrapper?.classList.remove('library-filter-sort__sort--open');
    sortToggle?.setAttribute('aria-expanded', 'false');
  }

  sortToggle?.addEventListener('click', () => {
    const isOpen = sortWrapper?.classList.toggle('library-filter-sort__sort--open');
    sortToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  });

  for (const optionButton of sortOptionButtons) {
    optionButton.addEventListener('click', () => {
      closeSortList();
      handlers.onSortChange(optionButton.dataset.value ?? DEFAULT_SORT);
    });
  }

  function handleOutsideClick(event: MouseEvent): void {
    if (!document.body.contains(sortWrapper)) {
      document.removeEventListener('click', handleOutsideClick);
      return;
    }
    if (sortWrapper && !sortWrapper.contains(event.target as Node)) {
      closeSortList();
    }
  }
  document.addEventListener('click', handleOutsideClick);

  return { element: section, setActive };
}
