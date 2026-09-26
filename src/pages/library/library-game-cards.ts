import './library-game-cards.scss';
import { games } from '../../data/games';
import { categories } from '../../data/categories';

const GAMES_PER_PAGE = 6;

function getCategoryLabel(slug: string): string {
  const category = categories.find((item) => item.slug === slug);
  return category ? category.label : slug;
}

function formatLikes(count: number): string {
  const truncated = Math.floor(count / 100) / 10;
  return `${truncated}K`;
}

export function renderLibraryGameCards(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'library-game-cards';

  const list = document.createElement('ul');
  list.className = 'library-game-cards__list';

  for (const game of games.slice(0, GAMES_PER_PAGE)) {
    const item = document.createElement('li');
    item.className = 'library-game-cards__item';

    item.innerHTML = `
      <article class="game-card">
        <img src="${game.cardImage}" alt="${game.name}" class="game-card__image" />
        <div class="game-card__content">
          <div class="game-card__title-row">
            <h3 class="game-card__title">${game.name}</h3>
            <span class="game-card__badge">${getCategoryLabel(game.category)}</span>
          </div>
          <span class="game-card__price">${game.price}</span>
          <p class="game-card__description">${game.shortDescription}</p>
          <div class="game-card__stats">
            <span class="game-card__rating">★ ${game.rating}</span>
            <span class="game-card__likes">♥ ${formatLikes(game.likesCount)}</span>
          </div>
          <button type="button" class="game-card__details-btn">Details</button>
        </div>
      </article>
    `;

    const detailsButton = item.querySelector<HTMLButtonElement>('.game-card__details-btn');
    detailsButton?.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('open-game-details'));
    });

    list.append(item);
  }

  section.append(list);
  return section;
}
