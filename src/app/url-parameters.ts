import { navigate } from './router';

export function getUrlParameter(name: string): string | undefined {
  return new URLSearchParams(globalThis.location.search).get(name) ?? undefined;
}

export function setUrlParameter(name: string, value: string | undefined): void {
  if (getUrlParameter(name) === value) return;

  const parameters = new URLSearchParams(globalThis.location.search);

  if (value === undefined) {
    parameters.delete(name);
  } else {
    parameters.set(name, value);
  }

  const query = parameters.toString();
  navigate(globalThis.location.pathname + (query ? `?${query}` : ''));
}
