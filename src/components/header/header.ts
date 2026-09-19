import './header.scss';
import logoIcon from '../../assets/icons/logo.png';
import hamburgerIcon from '../../assets/icons/hamburger.png';
import { renderMobileNav, toggleMobileNav } from '../mobile-nav/mobile-nav';

export function renderHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'header';

  header.innerHTML = `
    <div class="header__inner">
      <a href="#/" class="header__logo">
        <img src="${logoIcon}" alt="" class="header__logo-icon" width="32" height="32" />
        <span class="header__logo-text">MiniGames</span>
      </a>

      <div class="header__right">
        <nav class="header__nav" aria-label="Main navigation">
          <a href="#/" class="header__nav-link header__nav-link--active">Home</a>
          <a href="#/" class="header__nav-link">Library</a>
          <a href="#/" class="header__nav-link">Tournaments</a>
          <a href="#/" class="header__nav-link">Community</a>
        </nav>

        <div class="header__actions">
          <button type="button" class="header__login-btn">Log In</button>
          <button type="button" class="header__signup-btn">Sign Up</button>
          <button type="button" class="header__burger" aria-label="Open menu">
            <img src="${hamburgerIcon}" alt="" width="32" height="32" />
          </button>
        </div>
      </div>
    </div>
  `;

  const burgerButton = header.querySelector<HTMLButtonElement>('.header__burger')!;
  burgerButton.addEventListener('click', () => {
    toggleMobileNav();
  });

  if (!document.querySelector('.mobile-nav')) {
    document.body.append(renderMobileNav());
  }

  return header;
}
