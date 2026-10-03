import './leaderboard.scss';
import { getLeaderboard, type LeaderboardEntry } from '../../api/leaderboard';
import { createLeaderboardSkeleton } from './leaderboard-skeleton';
import { createErrorBanner } from '../error-banner/error-banner';
import { createEmptyState } from '../empty-state/empty-state';
import { showSnackbar } from '../snackbar/snackbar';

function getInitials(playerName: string): string {
  return playerName.slice(0, 2).toUpperCase();
}

function formatCompactScore(score: number): string {
  return `${(score / 1000).toFixed(1)}K`;
}

function renderRow(entry: LeaderboardEntry): string {
  const fullScore = entry.totalScore.toLocaleString('en-US');
  const compactScore = formatCompactScore(entry.totalScore);

  return `
    <tr class="leaderboard__row">
      <td class="leaderboard__cell leaderboard__cell--rank">#${entry.rank}</td>
      <td class="leaderboard__cell leaderboard__cell--player">
        <span class="leaderboard__avatar">${getInitials(entry.playerName)}</span>
        <span class="leaderboard__name">${entry.playerName}</span>
      </td>
      <td class="leaderboard__cell leaderboard__cell--games">${entry.gamesPlayed}</td>
      <td class="leaderboard__cell leaderboard__cell--score">
        <span class="leaderboard__score-compact">${compactScore}</span>
        <span class="leaderboard__score-full">${fullScore}</span>
      </td>
      <td class="leaderboard__cell leaderboard__cell--streak">
        <span class="leaderboard__streak-compact">🔥 ${entry.streakDays}d</span>
        <span class="leaderboard__streak-full">🔥 ${entry.streakDays} days</span>
      </td>
      <td class="leaderboard__cell leaderboard__cell--favorite">
        <span class="leaderboard__badge">${entry.favoriteGameName}</span>
      </td>
    </tr>
  `;
}

function createTable(entries: LeaderboardEntry[]): HTMLTableElement {
  const table = document.createElement('table');
  table.className = 'leaderboard__table';

  table.innerHTML = `
    <thead>
      <tr class="leaderboard__header-row">
        <th class="leaderboard__heading leaderboard__heading--rank">Rank</th>
        <th class="leaderboard__heading leaderboard__heading--player">Player</th>
        <th class="leaderboard__heading leaderboard__heading--games">Games Played</th>
        <th class="leaderboard__heading leaderboard__heading--score">Total Score</th>
        <th class="leaderboard__heading leaderboard__heading--streak">Streak</th>
        <th class="leaderboard__heading leaderboard__heading--favorite">Favorite Game</th>
      </tr>
    </thead>
    <tbody>
      ${entries.map((entry) => renderRow(entry)).join('')}
    </tbody>
  `;

  return table;
}

export function renderLeaderboard(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'leaderboard';
  section.setAttribute('aria-label', 'Top Players This Week');

  section.innerHTML = `
    <div class="leaderboard__header">
      <span class="leaderboard__accent-bar" aria-hidden="true"></span>
      <h2 class="leaderboard__title">
        <span class="leaderboard__title-compact">Top Players</span>
        <span class="leaderboard__title-full">Top Players This Week</span>
      </h2>
    </div>
  `;

  const content = document.createElement('div');
  content.className = 'leaderboard__content';
  section.append(content);

  async function loadLeaderboard(): Promise<void> {
    content.replaceChildren(createLeaderboardSkeleton());

    try {
      const entries = await getLeaderboard();

      if (entries.length === 0) {
        content.replaceChildren(createEmptyState('No players found.'));
        return;
      }

      content.replaceChildren(createTable(entries));
    } catch {
      content.replaceChildren(
        createErrorBanner('Could not load top players. Please try again.', loadLeaderboard),
      );
      showSnackbar('Failed to load top players.', 'error');
    }
  }

  loadLeaderboard();

  return section;
}
