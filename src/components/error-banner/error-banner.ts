import './error-banner.scss';

export function createErrorBanner(message: string, onRetry: () => void): HTMLElement {
  const banner = document.createElement('div');
  banner.className = 'error-banner';
  banner.setAttribute('role', 'alert');

  const text = document.createElement('p');
  text.className = 'error-banner__message';
  text.textContent = message;

  const retryButton = document.createElement('button');
  retryButton.type = 'button';
  retryButton.className = 'error-banner__retry';
  retryButton.textContent = 'Retry';
  retryButton.addEventListener('click', onRetry);

  banner.append(text, retryButton);
  return banner;
}
