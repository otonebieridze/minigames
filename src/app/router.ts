interface Route {
  path: string;
  render: (container: HTMLElement) => void;
}

interface NavigateOptions {
  replace?: boolean;
}

const listeners: (() => void)[] = [];

export function onUrlChange(listener: () => void): void {
  listeners.push(listener);
}

function notifyUrlChange(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function navigate(url: string, options: NavigateOptions = {}): void {
  const currentUrl = globalThis.location.pathname + globalThis.location.search;
  if (url === currentUrl) return;

  if (options.replace) {
    globalThis.history.replaceState(undefined, '', url);
  } else {
    globalThis.history.pushState(undefined, '', url);
  }

  notifyUrlChange();
}

function handleLinkClick(event: MouseEvent): void {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;

  const target = event.target instanceof Element ? event.target : undefined;
  const link = target?.closest('a');

  if (!link || link.target === '_blank') return;

  const url = new URL(link.href);
  if (url.origin !== globalThis.location.origin) return;

  event.preventDefault();
  navigate(url.pathname + url.search);
}

export function createRouter(container: HTMLElement, routes: Route[]): void {
  let renderedPath: string | undefined;

  function render(): void {
    const path = globalThis.location.pathname;
    if (path === renderedPath) return;

    renderedPath = path;
    const route = routes.find((item) => item.path === path) ?? routes[0];

    container.replaceChildren();
    route.render(container);
  }

  onUrlChange(render);
  globalThis.addEventListener('popstate', notifyUrlChange);
  document.addEventListener('click', handleLinkClick);

  render();
}
