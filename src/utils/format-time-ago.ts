const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;

export function formatTimeAgo(isoDate: string): string {
  const elapsedMs = Date.now() - new Date(isoDate).getTime();

  const days = Math.floor(elapsedMs / MS_IN_DAY);
  if (days > 0) return `${days}d ago`;

  const hours = Math.floor(elapsedMs / MS_IN_HOUR);
  if (hours > 0) return `${hours}h ago`;

  const minutes = Math.max(Math.floor(elapsedMs / MS_IN_MINUTE), 1);
  return `${minutes}m ago`;
}
