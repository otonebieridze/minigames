import { renderHero } from '../../components/hero/hero';
import { renderCarousel } from '../../components/carousel/carousel';
import { renderLeaderboard } from '../../components/leaderboard/leaderboard';
import { renderGameDevelopment } from '../../components/game-development/game-development';

export function renderHomePage(container: HTMLElement): void {
  container.className = 'home-page';
  container.append(renderHero(), renderCarousel(), renderLeaderboard(), renderGameDevelopment());
}