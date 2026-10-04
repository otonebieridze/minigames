import './library-filter-sort.scss';
import arrowDropDownIcon from '../../assets/icons/arrow_drop_down.png';
import { getCategories, type Category } from '../../api/categories';
import { createChipsSkeleton } from './library-chips-skeleton';
import { createErrorBanner } from '../../components/error-banner/error-banner';
import { createEmptyState } from '../../components/empty-state/empty-state';
import { showSnackbar } from '../../components/snackbar/snackbar';

const sortOptions: string[] = ['Rating', 'Popularity', 'Newest', 'Price: Low to High'];
const ACTIVE_CHIP_CLASS = 'library-filter-sort__chip--active';

function createChips(categories: Category[]): HTMLButtonElement[] {
  const chips = categories.map((category) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'library-filter-sort__chip';
    chip.dataset.slug = category.slug;
    chip.textContent = category.label;

    if (category.isDefault) {
      chip.classList.add(ACTIVE_CHIP_CLASS);
    }

    return chip;
  });

  for (const chip of chips) {
    chip.addEventListener('click', () => {
      for (const otherChip of chips) {
        otherChip.classList.remove(ACTIVE_CHIP_CLASS);
      }
      chip.classList.add(ACTIVE_CHIP_CLASS);
    });
  }

  return chips;
}

export function renderLibraryFilterSort(): HTMLElement {
  const section = document.createElement('div');
  section.className = 'library-filter-sort';

  const sortOptionsHtml = sortOptions
    .map((option, index) => {
      const activeClass = index === 0 ? ' library-filter-sort__sort-option--active' : '';
      return `
        <li>
          <button type="button" class="library-filter-sort__sort-option${activeClass}" data-value="${option}">
            ${option}
          </button>
        </li>
      `;
    })
    .join('');

  section.innerHTML = `
    <div class="library-filter-sort__sort">
      <button type="button" class="library-filter-sort__sort-toggle" aria-expanded="false">
        <span class="library-filter-sort__sort-label">Sort by: ${sortOptions[0]} ↓</span>
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
        return;
      }

      chipsContainer.replaceChildren(...createChips(categories));
    } catch {
      chipsContainer.replaceChildren(
        createErrorBanner('Could not load categories. Please try again.', loadCategories),
      );
      showSnackbar('Failed to load categories.', 'error');
    }
  }

  loadCategories();

  const sortWrapper = section.querySelector<HTMLElement>('.library-filter-sort__sort');
  const sortToggle = section.querySelector<HTMLButtonElement>('.library-filter-sort__sort-toggle');
  const sortLabel = section.querySelector<HTMLElement>('.library-filter-sort__sort-label');
  const sortOptionButtons = section.querySelectorAll<HTMLButtonElement>(
    '.library-filter-sort__sort-option',
  );

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
      if (sortLabel) {
        sortLabel.textContent = `Sort by: ${optionButton.dataset.value} ↓`;
      }
      for (const otherOption of sortOptionButtons) {
        otherOption.classList.remove('library-filter-sort__sort-option--active');
      }
      optionButton.classList.add('library-filter-sort__sort-option--active');
      closeSortList();
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

  return section;
}
