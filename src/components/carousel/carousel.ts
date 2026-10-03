import './carousel.scss';
import starIcon from '../../assets/icons/star.png';
import favoriteIcon from '../../assets/icons/favorite.png';
import arrowBackIcon from '../../assets/icons/arrow_back.png';
import arrowForwardIcon from '../../assets/icons/arrow_forward.png';
import { getFeaturedGames, type Game } from '../../api/games';
import { formatLikesCount } from '../../utils/format-likes-count';
import { createCarouselSkeleton } from './carousel-skeleton';
import { createErrorBanner } from '../error-banner/error-banner';
import { createEmptyState } from '../empty-state/empty-state';
import { showSnackbar } from '../snackbar/snackbar';

const AUTOPLAY_INTERVAL_MS = 4000;
const SWIPE_THRESHOLD_PX = 40;
const CLICK_MOVEMENT_THRESHOLD_PX = 5;

function getSignedDistance(cardIndex: number, centerIndex: number, total: number): number {
  let distance = (cardIndex - centerIndex) % total;
  if (distance > total / 2) distance -= total;
  if (distance < -total / 2) distance += total;
  return distance;
}

function getRoleClass(distance: number): string {
  if (distance === 0) return 'carousel__card--featured';
  if (Math.abs(distance) === 1) return '';
  return Math.abs(distance) === 2 ? 'carousel__card--edge' : 'carousel__card--hidden';
}

function createTrack(section: HTMLElement, games: Game[]): HTMLUListElement {
  const track = document.createElement('ul');
  track.className = 'carousel__track';

  const totalCards = games.length;
  let currentIndex = 0;
  let shouldSuppressClick = false;

  const cardElements = games.map((game) => {
    const item = document.createElement('li');
    item.innerHTML = `
      <img src="${game.cardImage}" alt="${game.name}" class="carousel__card-image" />
      <div class="carousel__overlay">
        <div class="carousel__overlay-content">
          <p class="carousel__card-title">${game.name}</p>
          <div class="carousel__card-stats">
            <span class="carousel__stat">
              <img src="${starIcon}" alt="" class="carousel__stat-icon" />
              ${game.rating}
            </span>
            <span class="carousel__stat">
              <img src="${favoriteIcon}" alt="" class="carousel__stat-icon" />
              ${formatLikesCount(game.likesCount)}
            </span>
          </div>
        </div>
      </div>
    `;

    item.addEventListener('click', () => {
      if (shouldSuppressClick) return;
      document.dispatchEvent(new CustomEvent('open-game-details'));
    });

    track.append(item);
    return item;
  });

  function updateRoles(): void {
    for (const [index, card] of cardElements.entries()) {
      const distance = getSignedDistance(index, currentIndex, totalCards);
      card.className = ['carousel__card', getRoleClass(distance)].filter(Boolean).join(' ');
      card.style.order = String(distance);
    }
  }

  function goToNext(): void {
    currentIndex = (currentIndex + 1) % totalCards;
    updateRoles();
  }

  function goToPrevious(): void {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateRoles();
  }

  updateRoles();

  const previousButton = section.querySelector<HTMLButtonElement>('[data-direction="prev"]');
  const nextButton = section.querySelector<HTMLButtonElement>('[data-direction="next"]');

  previousButton?.addEventListener('click', () => {
    goToPrevious();
    resetAutoplay();
  });

  nextButton?.addEventListener('click', () => {
    goToNext();
    resetAutoplay();
  });

  let autoplayTimeoutId: number | undefined;
  let autoplayStartedAt = 0;
  let autoplayRemainingMs = AUTOPLAY_INTERVAL_MS;

  function startAutoplay(durationMs: number): void {
    autoplayStartedAt = Date.now();
    autoplayRemainingMs = durationMs;
    autoplayTimeoutId = globalThis.setTimeout(() => {
      if (!document.body.contains(section)) return;
      goToNext();
      startAutoplay(AUTOPLAY_INTERVAL_MS);
    }, durationMs);
  }

  function pauseAutoplay(): void {
    if (autoplayTimeoutId === undefined) return;
    globalThis.clearTimeout(autoplayTimeoutId);
    autoplayTimeoutId = undefined;
    const elapsed = Date.now() - autoplayStartedAt;
    autoplayRemainingMs = Math.max(0, autoplayRemainingMs - elapsed);
  }

  function resumeAutoplay(): void {
    startAutoplay(autoplayRemainingMs);
  }

  function resetAutoplay(): void {
    if (autoplayTimeoutId !== undefined) {
      globalThis.clearTimeout(autoplayTimeoutId);
    }
    startAutoplay(AUTOPLAY_INTERVAL_MS);
  }

  startAutoplay(AUTOPLAY_INTERVAL_MS);

  let isPointerDown = false;
  let didSwipe = false;
  let pointerStartX = 0;

  track.addEventListener('pointerdown', (event) => {
    isPointerDown = true;
    didSwipe = false;
    shouldSuppressClick = false;
    pointerStartX = event.clientX;
    pauseAutoplay();
  });

  track.addEventListener('pointermove', (event) => {
    if (!isPointerDown) return;

    const deltaX = event.clientX - pointerStartX;

    if (Math.abs(deltaX) > CLICK_MOVEMENT_THRESHOLD_PX) {
      shouldSuppressClick = true;
    }

    if (didSwipe || Math.abs(deltaX) <= SWIPE_THRESHOLD_PX) return;

    didSwipe = true;
    if (deltaX < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
    pointerStartX = event.clientX;
  });

  function endPointerInteraction(): void {
    if (!isPointerDown) return;
    isPointerDown = false;

    if (didSwipe) {
      resetAutoplay();
    } else {
      resumeAutoplay();
    }
  }

  track.addEventListener('pointerup', endPointerInteraction);
  track.addEventListener('pointerleave', endPointerInteraction);
  track.addEventListener('pointercancel', endPointerInteraction);

  return track;
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
        <button type="button" class="carousel__arrow" data-direction="prev" aria-label="Previous games">
          <img src="${arrowBackIcon}" alt="" width="20" height="20" />
        </button>
        <button type="button" class="carousel__arrow" data-direction="next" aria-label="Next games">
          <img src="${arrowForwardIcon}" alt="" width="20" height="20" />
        </button>
      </div>
    </div>
  `;

  const content = document.createElement('div');
  content.className = 'carousel__content';
  section.append(content);

  async function loadGames(): Promise<void> {
    content.replaceChildren(createCarouselSkeleton());

    try {
      const games = await getFeaturedGames();

      if (games.length === 0) {
        content.replaceChildren(createEmptyState('No new games found.'));
        return;
      }

      content.replaceChildren(createTrack(section, games));
    } catch {
      content.replaceChildren(
        createErrorBanner('Could not load new games. Please try again.', loadGames),
      );
      showSnackbar('Failed to load new games.', 'error');
    }
  }

  loadGames();

  return section;
}
