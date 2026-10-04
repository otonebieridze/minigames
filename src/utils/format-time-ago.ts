const MS_IN_MINUTE = 60 * 1000;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
const DAYS_IN_YEAR = 365;
const MAX_WEEKS = 3;
const MAX_MONTHS = 11;

function formatUnit(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? '' : 's'} ago`;
}

export function formatTimeAgo(isoDate: string): string {
  const elapsedMs = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(elapsedMs / MS_IN_MINUTE);

  if (minutes < 1) return 'just now';

  const hours = Math.floor(minutes / MINUTES_IN_HOUR);

  if (hours < 1) return `${minutes} min ago`;

  const days = Math.floor(hours / HOURS_IN_DAY);

  if (days < 1) return formatUnit(hours, 'hour');
  if (days < DAYS_IN_WEEK) return formatUnit(days, 'day');
  if (days < (MAX_WEEKS + 1) * DAYS_IN_WEEK) {
    return formatUnit(Math.floor(days / DAYS_IN_WEEK), 'week');
  }
  if (days < DAYS_IN_YEAR) {
    const months = Math.min(Math.max(Math.floor(days / DAYS_IN_MONTH), 1), MAX_MONTHS);
    return formatUnit(months, 'month');
  }

  return formatUnit(Math.floor(days / DAYS_IN_YEAR), 'year');
}
