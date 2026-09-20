import './auth-dialog.scss';

interface AuthDialog {
  backdrop: HTMLElement;
  dialog: HTMLElement;
  open: () => void;
  close: () => void;
}

export function createAuthDialog(): AuthDialog {
  const backdrop = document.createElement('div');
  backdrop.className = 'auth-backdrop';

  const dialog = document.createElement('div');
  dialog.className = 'auth-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Authentication');

  dialog.innerHTML = `
    <p class="auth-dialog__placeholder">Login / Register Form</p>
  `;

  function open(): void {
    backdrop.classList.add('auth-backdrop--open');
    dialog.classList.add('auth-dialog--open');
  }

  function close(): void {
    backdrop.classList.remove('auth-backdrop--open');
    dialog.classList.remove('auth-dialog--open');
  }

  backdrop.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
    }
  });

  return { backdrop, dialog, open, close };
}
