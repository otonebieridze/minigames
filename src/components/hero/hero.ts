import './hero.scss';

export function renderHero(): HTMLElement {
  const hero = document.createElement('section');
  hero.className = 'hero';
  hero.setAttribute('aria-label', 'Welcome');

  hero.innerHTML = `
    <div class="hero__bg-image" aria-hidden="true"></div>
    <div class="hero__bg-overlay" aria-hidden="true"></div>

    <div class="hero__inner">
      <div class="hero__card">
        <h1 class="hero__title">Take a Short Break &amp; Have Fun</h1>

        <p class="hero__text hero__text--short">
          Discover hundreds of curated casual mini-games right in your browser.
        </p>
        <p class="hero__text hero__text--long">
          Discover hundreds of curated casual mini-games. Play instantly in your browser — puzzle, match 3, farm, and board classics.
        </p>

        <button type="button" class="hero__button">Browse Library</button>
      </div>
    </div>
  `;

  return hero;
}
