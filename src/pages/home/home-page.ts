import { renderHeader } from '../../components/header/header';
import { renderHero } from '../../components/hero/hero';
import { renderCarousel } from '../../components/carousel/carousel';

export function renderHomePage(container: HTMLElement): void {
  const main = document.createElement('main');
  main.className = 'home-page';
  main.append(renderHero(), renderCarousel());

  container.append(renderHeader(), main);
}
