import './game-details-dialog.scss';
import './game-details-dialog-states.scss';
import closeIcon from '../../assets/icons/close.png';
import starIcon from '../../assets/icons/star.png';
import favoriteIcon from '../../assets/icons/favorite.png';
import favoriteIconBlack from '../../assets/icons/favorite-black.png';
import trophyIcon from '../../assets/icons/trophy.png';
import recordIcon1 from '../../assets/icons/record-icon-1.png';
import recordIcon2 from '../../assets/icons/record-icon-2.png';
import recordIcon3 from '../../assets/icons/record-icon-3.png';
import sendIcon from '../../assets/icons/send-comment-trigger.png';
import { getGameDetails, type GameDetails } from '../../api/game-details';
import { formatLikesCount } from '../../utils/format-likes-count';
import { formatTimeAgo } from '../../utils/format-time-ago';
import { createGameDetailsSkeleton } from './game-details-skeleton';
import { createErrorBanner } from '../error-banner/error-banner';
import { createEmptyState } from '../empty-state/empty-state';
import { showSnackbar } from '../snackbar/snackbar';

interface GameDetailsDialog {
  element: HTMLElement;
  open: (slug: string) => void;
  close: () => void;
}

interface OpenGameDetailsEventDetail {
  slug: string;
}

const recordIcons = [recordIcon1, recordIcon2, recordIcon3];
const TEXTAREA_MAX_HEIGHT_PX = 88;
const FAVORITE_ACTIVE_CLASS = 'game-details-dialog__favorite-btn--active';

function createBadgesHtml(details: GameDetails): string {
  const badges = [
    { label: 'Genre', value: details.specs.genre },
    { label: 'Players', value: details.specs.players },
    { label: 'Duration', value: details.specs.duration },
    { label: 'Price', value: details.specs.price },
  ];

  return badges
    .map(
      (badge) => `
        <div class="game-details-dialog__badge">
          <span class="game-details-dialog__badge-label">${badge.label}</span>
          <span class="game-details-dialog__badge-value">${badge.value}</span>
        </div>
      `,
    )
    .join('');
}

function createRecordsHtml(details: GameDetails): string {
  return details.topRecords
    .map(
      (record, index) => `
        <li class="game-details-dialog__record">
          <div class="game-details-dialog__record-left">
            <img src="${recordIcons[index]}" alt="" class="game-details-dialog__record-icon" width="20" height="20" />
            <span class="game-details-dialog__record-player">${record.playerName}</span>
          </div>
          <div class="game-details-dialog__record-right">
            <span class="game-details-dialog__record-score">${record.score}</span>
            <span class="game-details-dialog__record-time">${formatTimeAgo(record.achievedAt)}</span>
          </div>
        </li>
      `,
    )
    .join('');
}

function setupFavoriteButton(content: HTMLElement, isLiked: boolean): void {
  const button = content.querySelector<HTMLButtonElement>('.game-details-dialog__favorite-btn');
  const text = content.querySelector<HTMLElement>('.game-details-dialog__favorite-text');
  if (!button || !text) return;

  const setFavorite = (isActive: boolean): void => {
    button.classList.toggle(FAVORITE_ACTIVE_CLASS, isActive);
    button.setAttribute('aria-pressed', String(isActive));
    text.textContent = isActive ? 'Added to Favorites' : 'Add to Favorites';
  };

  setFavorite(isLiked);

  button.addEventListener('click', () => {
    setFavorite(!button.classList.contains(FAVORITE_ACTIVE_CLASS));
  });
}

function setupCommentForm(content: HTMLElement): void {
  const form = content.querySelector<HTMLFormElement>('.game-details-dialog__comment-form');
  const input = content.querySelector<HTMLTextAreaElement>('.game-details-dialog__comment-input');

  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    const nextHeight = Math.min(input.scrollHeight, TEXTAREA_MAX_HEIGHT_PX);
    input.style.height = `${nextHeight}px`;
  });

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
  });
}

function createContent(details: GameDetails): HTMLElement[] {
  const hero = document.createElement('div');
  hero.className = 'game-details-dialog__hero';
  hero.innerHTML = `
    <img src="${details.heroImage}" alt="${details.name}" class="game-details-dialog__cover" />
  `;

  const content = document.createElement('div');
  content.className = 'game-details-dialog__content';
  content.innerHTML = `
    <div class="game-details-dialog__title-row">
      <h2 class="game-details-dialog__title">${details.name}</h2>
      <span class="game-details-dialog__rating">
        <img src="${starIcon}" alt="" width="24" height="24" />
        ${details.rating}
      </span>
      <span class="game-details-dialog__likes">
        <img src="${favoriteIcon}" alt="" width="24" height="24" />
        ${formatLikesCount(details.likesCount)}
      </span>
    </div>

    <p class="game-details-dialog__description">${details.fullDescription}</p>

    <div class="game-details-dialog__badges">
      ${createBadgesHtml(details)}
    </div>

    <div class="game-details-dialog__actions">
      <button type="button" class="game-details-dialog__play-btn">Play Now</button>
      <button type="button" class="game-details-dialog__favorite-btn" aria-pressed="false">
        <img src="${favoriteIconBlack}" alt="" width="18" height="18" />
        <span class="game-details-dialog__favorite-text">Add to Favorites</span>
      </button>
    </div>

    <section class="game-details-dialog__records">
      <h3 class="game-details-dialog__records-title">
        <img src="${trophyIcon}" alt="" width="20" height="20" />
        Top Records
      </h3>
      <ul class="game-details-dialog__records-list">
        ${createRecordsHtml(details)}
      </ul>
    </section>

    <section class="game-details-dialog__comments">
      <h3 class="game-details-dialog__comments-title">Comments</h3>

      <form class="game-details-dialog__comment-form">
        <div class="game-details-dialog__comment-avatar game-details-dialog__comment-avatar--user">U</div>
        <textarea
          class="game-details-dialog__comment-input"
          placeholder="Write a comment..."
          rows="1"
        ></textarea>
        <button type="submit" class="game-details-dialog__comment-submit" aria-label="Submit comment">
          <img src="${sendIcon}" alt="" width="40" height="40" />
        </button>
      </form>

      <ul class="game-details-dialog__comments-list"></ul>
    </section>
  `;

  if (details.topRecords.length === 0) {
    const recordsList = content.querySelector('.game-details-dialog__records-list');
    recordsList?.replaceWith(createEmptyState('No records yet.'));
  }

  setupFavoriteButton(content, details.isLikedByCurrentUser);
  setupCommentForm(content);

  return [hero, content];
}

export function createGameDetailsDialog(): GameDetailsDialog {
  const backdrop = document.createElement('div');
  backdrop.className = 'game-details-backdrop';

  const dialog = document.createElement('div');
  dialog.className = 'game-details-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Game details');

  const body = document.createElement('div');
  body.className = 'game-details-dialog__body';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'game-details-dialog__close';
  closeButton.setAttribute('aria-label', 'Close dialog');
  closeButton.innerHTML = `<img src="${closeIcon}" alt="" width="16" height="16" />`;

  dialog.append(body, closeButton);
  backdrop.append(dialog);

  async function loadDetails(slug: string): Promise<void> {
    body.replaceChildren(createGameDetailsSkeleton());

    try {
      const details = await getGameDetails(slug);
      body.replaceChildren(...createContent(details));
    } catch {
      const state = document.createElement('div');
      state.className = 'game-details-dialog__state';
      state.append(
        createErrorBanner('Could not load game details. Please try again.', () =>
          loadDetails(slug),
        ),
      );
      body.replaceChildren(state);
      showSnackbar('Failed to load game details.', 'error');
    }
  }

  function open(slug: string): void {
    loadDetails(slug);
    backdrop.classList.add('game-details-backdrop--open');
    document.body.style.overflow = 'hidden';
  }

  function close(): void {
    backdrop.classList.remove('game-details-backdrop--open');
    document.body.style.overflow = '';
  }

  closeButton.addEventListener('click', close);

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
    }
  });

  document.addEventListener('open-game-details', (event) => {
    const { slug } = (event as CustomEvent<OpenGameDetailsEventDetail>).detail;
    open(slug);
  });

  return { element: backdrop, open, close };
}
