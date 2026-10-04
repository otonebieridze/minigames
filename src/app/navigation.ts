export function getCurrentPath(): string {
  const path = globalThis.location.pathname;
  return path === '/home' ? '/' : path;
}
