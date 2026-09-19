import { renderHeader } from '../../components/header/header';
import { renderHero } from '../../components/hero/hero';

export function renderHomePage(container: HTMLElement): void {
  const main = document.createElement('main');
  main.className = 'home-page';
  main.append(renderHero());

  container.append(renderHeader(), main);
}
