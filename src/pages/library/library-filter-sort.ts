import './library-filter-sort.scss';
import arrowDropDownIcon from '../../assets/icons/arrow_drop_down.png';

interface Category {
  slug: string;
  label: string;
  isDefault: boolean;
}

const categories: Category[] = [
  { slug: 'all', label: 'All Games', isDefault: true },
  { slug: 'puzzle', label: 'Puzzle', isDefault: false },
  { slug: 'card', label: 'Card', isDefault: false },
  { slug: 'match', label: 'Match', isDefault: false },
  { slug: 'farm', label: 'Farm', isDefault: false },
  { slug: 'strategy', label: 'Strategy', isDefault: false },
  { slug: 'arcade', label: 'Arcade', isDefault: false },
];

const sortOptions: string[] = ['Rating', 'Popularity', 'Newest', 'Price: Low to High'];

export function renderLibraryFilterSort(): HTMLElement {
  const section = document.createElement('div');
  section.className = 'library-filter-sort';

  const chipsHtml = categories
    .map((category) => {
      const activeClass = category.isDefault ? ' library-filter-sort__chip--active' : '';
      return `
        <button type="button" class="library-filter-sort__chip${activeClass}" data-slug="${category.slug}">
          ${category.label}
        </button>
      `;
    })
    .join('');

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
    <div class="library-filter-sort__chips">
      ${chipsHtml}
    </div>

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

  const chipButtons = section.querySelectorAll<HTMLButtonElement>('.library-filter-sort__chip');
  for (const chip of chipButtons) {
    chip.addEventListener('click', () => {
      for (const otherChip of chipButtons) {
        otherChip.classList.remove('library-filter-sort__chip--active');
      }
      chip.classList.add('library-filter-sort__chip--active');
    });
  }

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
