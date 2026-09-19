import { renderHeader } from '../../components/header/header';
import { renderHero } from '../../components/hero/hero';
import { renderCarousel } from '../../components/carousel/carousel';
import { renderLeaderboard } from '../../components/leaderboard/leaderboard';

export function renderHomePage(container: HTMLElement): void {
  const main = document.createElement('main');
  main.className = 'home-page';
  main.append(renderHero(), renderCarousel(), renderLeaderboard());

  container.append(renderHeader(), main);
}
