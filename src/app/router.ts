interface Route {
  path: string;
  render: (container: HTMLElement) => void;
}

export function createRouter(container: HTMLElement, routes: Route[]): void {
  function resolve(): void {
    const path = globalThis.location.hash.slice(1) || '/';
    const route = routes.find((route) => route.path === path) ?? routes[0];

    container.replaceChildren();
    route.render(container);
  }

  globalThis.addEventListener('hashchange', resolve);
  globalThis.addEventListener('load', resolve);
}
