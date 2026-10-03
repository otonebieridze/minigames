import './empty-state.scss';

export function createEmptyState(message: string): HTMLElement {
  const emptyState = document.createElement('div');
  emptyState.className = 'empty-state';
  emptyState.setAttribute('role', 'status');

  const text = document.createElement('p');
  text.className = 'empty-state__message';
  text.textContent = message;

  emptyState.append(text);
  return emptyState;
}
