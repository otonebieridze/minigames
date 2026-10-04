import './library-game-cards.scss';
import { getGames, type Game, type GameFilters } from '../../api/games';
import type { Category } from '../../api/categories';
import { formatLikesCount } from '../../utils/format-likes-count';
import { createGameCardsSkeleton } from './library-game-cards-skeleton';
import { createErrorBanner } from '../../components/error-banner/error-banner';
import { createEmptyState } from '../../components/empty-state/empty-state';
import { showSnackbar } from '../../components/snackbar/snackbar';

const GAMES_PER_PAGE = 6;

interface LibraryGameCards {
  element: HTMLElement;
  load: (filters: GameFilters) => Promise<void>;
  setCategories: (categories: Category[]) => void;
}

function getCategoryLabel(categories: Category[], slug: string): string {
  const category = categories.find((item) => item.slug === slug);
  return category ? category.label : slug;
}

function createList(games: Game[], categories: Category[]): HTMLUListElement {
  const list = document.createElement('ul');
  list.className = 'library-game-cards__list';

  for (const game of games) {
    const item = document.createElement('li');
    item.className = 'library-game-cards__item';

    item.innerHTML = `
      <article class="game-card">
        <img src="${game.cardImage}" alt="${game.name}" class="game-card__image" />
        <div class="game-card__content">
          <div class="game-card__title-row">
            <h3 class="game-card__title">${game.name}</h3>
            <span class="game-card__badge">${getCategoryLabel(categories, game.category)}</span>
          </div>
          <span class="game-card__price">${game.price}</span>
          <p class="game-card__description">${game.shortDescription}</p>
          <div class="game-card__stats">
            <span class="game-card__rating">★ ${game.rating}</span>
            <span class="game-card__likes">♥ ${formatLikesCount(game.likesCount)}</span>
          </div>
          <button type="button" class="game-card__details-btn">Details</button>
        </div>
      </article>
    `;

    const detailsButton = item.querySelector<HTMLButtonElement>('.game-card__details-btn');
    detailsButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('open-game-details', { detail: { slug: game.slug } }));
    });

    list.append(item);
  }

  return list;
}

export function createLibraryGameCards(
  onPaginationData: (page: number, totalPages: number) => void,
): LibraryGameCards {
  const section = document.createElement('section');
  section.className = 'library-game-cards';

  let loadedCategories: Category[] = [];

  function setCategories(categories: Category[]): void {
    loadedCategories = categories;
  }

  async function load(filters: GameFilters): Promise<void> {
    section.replaceChildren(createGameCardsSkeleton());

    try {
      const { games, page, totalPages } = await getGames(filters, GAMES_PER_PAGE);
      onPaginationData(page, totalPages);

      if (games.length === 0) {
        section.replaceChildren(createEmptyState('No games found.'));
        return;
      }

      section.replaceChildren(createList(games, loadedCategories));
    } catch {
      section.replaceChildren(
        createErrorBanner('Could not load games. Please try again.', () => load(filters)),
      );
      showSnackbar('Failed to load games.', 'error');
    }
  }

  return { element: section, load, setCategories };
}
