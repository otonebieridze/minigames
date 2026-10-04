import './leaderboard-skeleton.scss';
import '../skeleton/skeleton.scss';

const TOTAL_ROWS = 6;

export function createLeaderboardSkeleton(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'leaderboard-skeleton';
  wrapper.setAttribute('aria-busy', 'true');

  for (let index = 0; index < TOTAL_ROWS; index += 1) {
    const row = document.createElement('div');
    row.className = 'leaderboard-skeleton__row skeleton';
    wrapper.append(row);
  }

  return wrapper;
}
