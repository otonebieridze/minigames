import './carousel.scss';
import gameEdge1 from '../../assets/images/games/game-1.jpg';
import gameIslanders from '../../assets/images/games/game-2.jpg';
import gameVacationCafe from '../../assets/images/games/game-3.jpg';
import gameWinterBurrow from '../../assets/images/games/game-4.jpg';
import gameEdge2 from '../../assets/images/games/game-5.jpg';
import starIcon from '../../assets/icons/star.png';
import favoriteIcon from '../../assets/icons/favorite.png';
import arrowBackIcon from '../../assets/icons/arrow_back.png';
import arrowForwardIcon from '../../assets/icons/arrow_forward.png';

interface GameCard {
  title: string;
  image: string;
  rating: number;
  likes: string;
  featured?: boolean;
  edge?: boolean;
}

const games: GameCard[] = [
  { title: 'Mahjong Solitaire', image: gameEdge1, rating: 4.7, likes: '19.1K', edge: true },
  { title: 'ISLANDERS: New Shores', image: gameIslanders, rating: 4.9, likes: '54.2K' },
  {
    title: 'Vacation Cafe Simulator',
    image: gameVacationCafe,
    rating: 4.8,
    likes: '28.7K',
    featured: true,
  },
  { title: 'Winter Burrow', image: gameWinterBurrow, rating: 4.9, likes: '32.4K' },
  { title: 'Bubble Shooter', image: gameEdge2, rating: 4.6, likes: '41.0K', edge: true },
];

function renderCard(game: GameCard): string {
  const modifiers = [
    game.featured ? 'carousel__card--featured' : '',
    game.edge ? 'carousel__card--edge' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return `
    <li class="carousel__card ${modifiers}">
      <img src="${game.image}" alt="${game.title}" class="carousel__card-image" />
      <div class="carousel__overlay">
        <div class="carousel__overlay-content">
          <p class="carousel__card-title">${game.title}</p>
          <div class="carousel__card-stats">
            <span class="carousel__stat">
              <img src="${starIcon}" alt="" class="carousel__stat-icon" />
              ${game.rating}
            </span>
            <span class="carousel__stat">
              <img src="${favoriteIcon}" alt="" class="carousel__stat-icon" />
              ${game.likes}
            </span>
          </div>
        </div>
      </div>
    </li>
  `;
}

export function renderCarousel(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'carousel';
  section.setAttribute('aria-label', 'New Games');

  section.innerHTML = `
    <div class="carousel__header">
      <div class="carousel__title-group">
        <span class="carousel__accent-bar" aria-hidden="true"></span>
        <h2 class="carousel__title">New Games</h2>
      </div>
      <div class="carousel__nav">
        <button type="button" class="carousel__arrow" aria-label="Previous games">
          <img src="${arrowBackIcon}" alt="" width="20" height="20" />
        </button>
        <button type="button" class="carousel__arrow" aria-label="Next games">
          <img src="${arrowForwardIcon}" alt="" width="20" height="20" />
        </button>
      </div>
    </div>

    <ul class="carousel__track">
      ${games.map((game) => renderCard(game)).join('')}
    </ul>
  `;

  return section;
}
