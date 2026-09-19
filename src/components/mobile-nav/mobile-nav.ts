import './mobile-nav.scss';
import logoIcon from '../../assets/icons/logo.png';

let navElement: HTMLElement | null = null;

export function renderMobileNav(): HTMLElement {
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

  const closeButton = nav.querySelector<HTMLButtonElement>('.mobile-nav__close')!;
  closeButton.addEventListener('click', closeMobileNav);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileNav();
    }
  });

  navElement = nav;
  return nav;
}

export function openMobileNav(): void {
  navElement?.classList.add('mobile-nav--open');
}

export function closeMobileNav(): void {
  navElement?.classList.remove('mobile-nav--open');
}

export function toggleMobileNav(): void {
  navElement?.classList.toggle('mobile-nav--open');
}
