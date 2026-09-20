import { renderHeader } from '../../components/header/header';
import { renderHero } from '../../components/hero/hero';
import { renderCarousel } from '../../components/carousel/carousel';
import { renderLeaderboard } from '../../components/leaderboard/leaderboard';
import { renderGameDevelopment } from '../../components/game-development/game-development';
import { renderFooter } from '../../components/footer/footer';

export function renderHomePage(container: HTMLElement): void {
  const main = document.createElement('main');
  main.className = 'home-page';
  main.append(renderHero(), renderCarousel(), renderLeaderboard(), renderGameDevelopment());

  container.append(renderHeader(), main, renderFooter());
}
