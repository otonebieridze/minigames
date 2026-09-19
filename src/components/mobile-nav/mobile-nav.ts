import './mobile-nav.scss';
import logoIcon from '../../assets/icons/logo.png';

interface MobileNav {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function createMobileNav(): MobileNav {
  const nav = document.createElement('div');
  nav.className = 'mobile-nav';
  nav.setAttribute('role', 'dialog');
  nav.setAttribute('aria-label', 'Mobile navigation');

  nav.innerHTML = `
    <div class="mobile-nav__top">
      <a href="#/" class="mobile-nav__logo">
        <img src="${logoIcon}" alt="" width="32" height="32" />
        <span>MiniGames</span>
      </a>
      <button type="button" class="mobile-nav__close" aria-label="Close menu">&times;</button>
    </div>

    <nav class="mobile-nav__links" aria-label="Mobile navigation links">
      <a href="#/" class="mobile-nav__link mobile-nav__link--active">Home</a>
      <a href="#/" class="mobile-nav__link">Library</a>
      <a href="#/" class="mobile-nav__link">Tournaments</a>
      <a href="#/" class="mobile-nav__link">Community</a>
    </nav>

    <div class="mobile-nav__actions">
      <button type="button" class="mobile-nav__login-btn">Log In</button>
      <button type="button" class="mobile-nav__signup-btn">Sign Up</button>
    </div>
  `;

  function open(): void {
    nav.classList.add('mobile-nav--open');
  }

  function close(): void {
    nav.classList.remove('mobile-nav--open');
  }

  function toggle(): void {
    nav.classList.toggle('mobile-nav--open');
  }

  const closeButton = nav.querySelector<HTMLButtonElement>('.mobile-nav__close');
  if (closeButton) {
    closeButton.addEventListener('click', close);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
    }
  });

  return { element: nav, open, close, toggle };
}
