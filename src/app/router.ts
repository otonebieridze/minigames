interface Route {
  path: string;
  render: (container: HTMLElement) => void;
}

export function createRouter(container: HTMLElement, routes: Route[]): void {
  function resolve(): void {
    const path = window.location.hash.slice(1) || '/';
    const route = routes.find((route) => route.path === path) ?? routes[0];

    container.replaceChildren();
    route.render(container);
  }

  window.addEventListener('hashchange', resolve);
  window.addEventListener('load', resolve);
}
