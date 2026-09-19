import { renderHeader } from '../../components/header/header';

export function renderHomePage(container: HTMLElement): void {
  const main = document.createElement('main');
  main.className = 'home-page';
  main.textContent = 'Home page';

  container.append(renderHeader(), main);
}
