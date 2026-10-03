import './snackbar.scss';

export type SnackbarType = 'success' | 'error';

const AUTO_DISMISS_MS = 4000;

function getContainer(): HTMLElement {
  const existing = document.querySelector<HTMLElement>('.snackbar-container');
  if (existing) return existing;

  const created = document.createElement('div');
  created.className = 'snackbar-container';
  document.body.append(created);
  return created;
}

export function showSnackbar(message: string, type: SnackbarType = 'success'): void {
  const snackbar = document.createElement('div');
  snackbar.className = `snackbar snackbar--${type}`;
  snackbar.setAttribute('role', type === 'error' ? 'alert' : 'status');

  const text = document.createElement('span');
  text.textContent = message;

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'snackbar__close';
  closeButton.setAttribute('aria-label', 'Close notification');
  closeButton.textContent = '×';
  closeButton.addEventListener('click', () => snackbar.remove());

  snackbar.append(text, closeButton);
  getContainer().append(snackbar);

  globalThis.setTimeout(() => snackbar.remove(), AUTO_DISMISS_MS);
}
