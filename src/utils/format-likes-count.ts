export function formatLikesCount(count: number): string {
  const truncated = Math.floor(count / 100) / 10;
  return `${truncated}K`;
}
