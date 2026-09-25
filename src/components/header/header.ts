import './header.scss';
import logoIcon from '../../assets/icons/logo.png';
import hamburgerIcon from '../../assets/icons/hamburger.png';
import { createMobileNav } from '../mobile-nav/mobile-nav';
import { createAuthDialog } from '../auth-dialog/auth-dialog';
import { getCurrentPath } from '../../app/navigation';

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
          <a href="#/" class="header__nav-link" data-path="/">Home</a>
          <a href="#/library" class="header__nav-link" data-path="/library">Library</a>
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

  const mobileNav = createMobileNav();
  const authDialog = createAuthDialog();
  document.body.append(mobileNav.element, authDialog.element);

  const burgerButton = header.querySelector<HTMLButtonElement>('.header__burger');
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      mobileNav.toggle();
    });
  }

  const loginButton = header.querySelector<HTMLButtonElement>('.header__login-btn');
  const signupButton = header.querySelector<HTMLButtonElement>('.header__signup-btn');
  loginButton?.addEventListener('click', () => authDialog.open('login'));
  signupButton?.addEventListener('click', () => authDialog.open('register'));

  const mobileLoginButton =
    mobileNav.element.querySelector<HTMLButtonElement>('.mobile-nav__login-btn');
  const mobileSignupButton =
    mobileNav.element.querySelector<HTMLButtonElement>('.mobile-nav__signup-btn');
  mobileLoginButton?.addEventListener('click', () => {
    mobileNav.close();
    authDialog.open('login');
  });
  mobileSignupButton?.addEventListener('click', () => {
    mobileNav.close();
    authDialog.open('register');
  });

  const navLinks = header.querySelectorAll<HTMLAnchorElement>('.header__nav-link[data-path]');

  function updateActiveLink(): void {
    const currentPath = getCurrentPath();
    navLinks.forEach((link) => {
      link.classList.toggle('header__nav-link--active', link.dataset.path === currentPath);
    });
  }

  updateActiveLink();
  globalThis.addEventListener('hashchange', updateActiveLink);

  return header;
}
