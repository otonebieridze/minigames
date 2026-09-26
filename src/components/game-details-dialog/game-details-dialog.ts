import './game-details-dialog.scss';
import closeIcon from '../../assets/icons/close.png';

interface GameDetailsDialog {
  element: HTMLElement;
  open: () => void;
  close: () => void;
}

export function createGameDetailsDialog(): GameDetailsDialog {
  const backdrop = document.createElement('div');
  backdrop.className = 'game-details-backdrop';

  const dialog = document.createElement('div');
  dialog.className = 'game-details-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Game details');

  dialog.innerHTML = `
    <button type="button" class="game-details-dialog__close" aria-label="Close dialog">
      <img src="${closeIcon}" alt="" width="16" height="16" />
    </button>
    <div class="game-details-dialog__content">
      <h2 class="game-details-dialog__title">Tukoni: Forest Keepers</h2>
    </div>
  `;

  backdrop.append(dialog);

  function open(): void {
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
