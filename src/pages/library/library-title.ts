import './library-title.scss';

export function renderLibraryTitle(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'library-title';

  section.innerHTML = `
    <h1 class="library-title__heading">Game Library</h1>
    <p class="library-title__subheading">Browse our collection of casual mini-games</p>
  `;

  return section;
}
