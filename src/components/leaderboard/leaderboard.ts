import './leaderboard.scss';

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  initials: string;
  gamesPlayed: number;
  totalScore: number;
  streakDays: number;
  favoriteGameName: string;
}

const leaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    playerName: 'Alex_Pro99',
    initials: 'AP',
    gamesPlayed: 142,
    totalScore: 94_250,
    streakDays: 12,
    favoriteGameName: 'Heartopia',
  },
  {
    rank: 2,
    playerName: 'CozyGamer_x',
    initials: 'CG',
    gamesPlayed: 118,
    totalScore: 81_400,
    streakDays: 8,
    favoriteGameName: 'Cat Mail Co.',
  },
  {
    rank: 3,
    playerName: 'MatchMaster',
    initials: 'MM',
    gamesPlayed: 98,
    totalScore: 72_110,
    streakDays: 5,
    favoriteGameName: 'Tiny Glade',
  },
  {
    rank: 4,
    playerName: 'BubblePop',
    initials: 'BP',
    gamesPlayed: 87,
    totalScore: 65_900,
    streakDays: 3,
    favoriteGameName: 'Whisper of the House',
  },
  {
    rank: 5,
    playerName: 'SudokuGod',
    initials: 'SG',
    gamesPlayed: 74,
    totalScore: 59_320,
    streakDays: 2,
    favoriteGameName: 'Cat Chess',
  },
];

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
        <span class="leaderboard__avatar">${entry.initials}</span>
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

    <table class="leaderboard__table">
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
        ${leaderboard.map((entry) => renderRow(entry)).join('')}
      </tbody>
    </table>
  `;

  return section;
}
