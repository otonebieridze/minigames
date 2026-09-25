export function getCurrentPath(): string {
  return globalThis.location.hash.slice(1) || '/';
}