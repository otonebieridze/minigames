import './game-details-dialog.scss';
import closeIcon from '../../assets/icons/close.png';
import starIcon from '../../assets/icons/star.png';
import favoriteIcon from '../../assets/icons/favorite.png';
import favoriteIconBlack from '../../assets/icons/favorite-black.png';
import trophyIcon from '../../assets/icons/trophy.png';
import recordIcon1 from '../../assets/icons/record-icon-1.png';
import recordIcon2 from '../../assets/icons/record-icon-2.png';
import recordIcon3 from '../../assets/icons/record-icon-3.png';
import { gameDetailsMock } from '../../data/game-details-mock';

interface GameDetailsDialog {
  element: HTMLElement;
  open: () => void;
  close: () => void;
}

const recordIcons = [recordIcon1, recordIcon2, recordIcon3];

export function createGameDetailsDialog(): GameDetailsDialog {
  const backdrop = document.createElement('div');
  backdrop.className = 'game-details-backdrop';

  const dialog = document.createElement('div');
  dialog.className = 'game-details-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Game details');

  const badgesHtml = gameDetailsMock.badges
    .map(
      (badge) => `
        <div class="game-details-dialog__badge">
          <span class="game-details-dialog__badge-label">${badge.label}</span>
          <span class="game-details-dialog__badge-value">${badge.value}</span>
        </div>
      `,
    )
    .join('');

  const recordsHtml = gameDetailsMock.topRecords
    .map(
      (record, index) => `
        <li class="game-details-dialog__record">
          <div class="game-details-dialog__record-left">
            <img src="${recordIcons[index]}" alt="" class="game-details-dialog__record-icon" width="20" height="20" />
            <span class="game-details-dialog__record-player">${record.playerName}</span>
          </div>
          <div class="game-details-dialog__record-right">
            <span class="game-details-dialog__record-score">${record.score}</span>
            <span class="game-details-dialog__record-time">${record.timeAgo}</span>
          </div>
        </li>
      `,
    )
    .join('');

  dialog.innerHTML = `
    <div class="game-details-dialog__hero">
      <img src="${gameDetailsMock.coverImage}" alt="${gameDetailsMock.title}" class="game-details-dialog__cover" />
      <button type="button" class="game-details-dialog__close" aria-label="Close dialog">
        <img src="${closeIcon}" alt="" width="16" height="16" />
      </button>
    </div>

    <div class="game-details-dialog__content">
      <div class="game-details-dialog__title-row">
        <h2 class="game-details-dialog__title">${gameDetailsMock.title}</h2>
        <span class="game-details-dialog__rating">
          <img src="${starIcon}" alt="" width="24" height="24" />
          ${gameDetailsMock.rating}
        </span>
        <span class="game-details-dialog__likes">
          <img src="${favoriteIcon}" alt="" width="24" height="24" />
          ${gameDetailsMock.likesCount}
        </span>
      </div>

      <p class="game-details-dialog__description">${gameDetailsMock.description}</p>

      <div class="game-details-dialog__badges">
        ${badgesHtml}
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
          ${recordsHtml}
        </ul>
      </section>
    </div>
  `;

  backdrop.append(dialog);

  const favoriteButton = dialog.querySelector<HTMLButtonElement>(
    '.game-details-dialog__favorite-btn',
  );
  const favoriteText = dialog.querySelector<HTMLElement>('.game-details-dialog__favorite-text');

  function resetFavoriteState(): void {
    favoriteButton?.classList.remove('game-details-dialog__favorite-btn--active');
    favoriteButton?.setAttribute('aria-pressed', 'false');
    if (favoriteText) {
      favoriteText.textContent = 'Add to Favorites';
    }
  }

  favoriteButton?.addEventListener('click', () => {
    const isActive = favoriteButton.classList.toggle('game-details-dialog__favorite-btn--active');
    favoriteButton.setAttribute('aria-pressed', String(isActive));
    if (favoriteText) {
      favoriteText.textContent = isActive ? 'Added to Favorites' : 'Add to Favorites';
    }
  });

  function open(): void {
    resetFavoriteState();
    backdrop.classList.add('game-details-backdrop--open');
    document.body.style.overflow = 'hidden';
  }

  function close(): void {
    backdrop.classList.remove('game-details-backdrop--open');
    document.body.style.overflow = '';
  }

  const closeButton = dialog.querySelector<HTMLButtonElement>('.game-details-dialog__close');
  closeButton?.addEventListener('click', close);

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

  document.addEventListener('open-game-details', open);

  return { element: backdrop, open, close };
}
