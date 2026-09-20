import './header.scss';
import logoIcon from '../../assets/icons/logo.png';
import hamburgerIcon from '../../assets/icons/hamburger.png';
import { createMobileNav } from '../mobile-nav/mobile-nav';
import { createAuthDialog } from '../auth-dialog/auth-dialog';

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

  const mobileNav = createMobileNav();
  const authDialog = createAuthDialog();
  document.body.append(mobileNav.element, authDialog.backdrop, authDialog.dialog);

  const burgerButton = header.querySelector<HTMLButtonElement>('.header__burger');
  if (burgerButton) {
    burgerButton.addEventListener('click', () => {
      mobileNav.toggle();
    });
  }

  const loginButton = header.querySelector<HTMLButtonElement>('.header__login-btn');
  const signupButton = header.querySelector<HTMLButtonElement>('.header__signup-btn');
  loginButton?.addEventListener('click', () => authDialog.open());
  signupButton?.addEventListener('click', () => authDialog.open());

  const mobileLoginButton =
    mobileNav.element.querySelector<HTMLButtonElement>('.mobile-nav__login-btn');
  const mobileSignupButton =
    mobileNav.element.querySelector<HTMLButtonElement>('.mobile-nav__signup-btn');
  mobileLoginButton?.addEventListener('click', () => {
    mobileNav.close();
    authDialog.open();
  });
  mobileSignupButton?.addEventListener('click', () => {
    mobileNav.close();
    authDialog.open();
  });

  return header;
}
