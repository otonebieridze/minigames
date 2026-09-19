import './footer.scss';
import logoIcon from '../../assets/icons/logo.png';
import shareIcon from '../../assets/icons/community-share.png';
import chatIcon from '../../assets/icons/community-chat.png';
import rssIcon from '../../assets/icons/community-rss.png';
import githubBadge from '../../assets/icons/github-badge.png';
import rsBadge from '../../assets/icons/rs-badge.png';

export function renderFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer__top">
      <div class="footer__brand">
        <a href="#/" class="footer__logo">
          <img src="${logoIcon}" alt="" width="32" height="32" />
          <span>MiniGames</span>
        </a>
        <p class="footer__tagline">
          Take a short break and have fun. Hundreds of curated casual mini-games right in your web
          browser. No download required.
        </p>
      </div>

      <div class="footer__nav-groups">
        <div class="footer__col">
          <p class="footer__heading">Explore</p>
          <a href="#/" class="footer__link">Home</a>
          <a href="#/" class="footer__link">Library</a>
          <a href="#/" class="footer__link">Categories</a>
          <a href="#/" class="footer__link">Tournaments</a>
        </div>

        <div class="footer__col">
          <p class="footer__heading">Company</p>
          <a href="#/" class="footer__link">About Us</a>
          <a href="#/" class="footer__link">Contact</a>
          <a href="#/" class="footer__link">Privacy Policy</a>
          <a href="#/" class="footer__link">Terms of Service</a>
        </div>

        <div class="footer__community">
          <p class="footer__heading">Community</p>
          <div class="footer__social">
            <a href="#/" class="footer__social-link" aria-label="Share">
              <img src="${shareIcon}" alt="" width="40" height="40" />
            </a>
            <a href="#/" class="footer__social-link" aria-label="Chat">
              <img src="${chatIcon}" alt="" width="40" height="40" />
            </a>
            <a href="#/" class="footer__social-link" aria-label="RSS feed">
              <img src="${rssIcon}" alt="" width="40" height="40" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <hr class="footer__divider" />

    <div class="footer__bottom">
      <p class="footer__copyright">© 2026 MiniGames. All rights reserved.</p>

      <a href="https://rs.school/courses/short-track" class="footer__credit-link" target="_blank" rel="noopener noreferrer">
        <img src="${rsBadge}" alt="" width="24" height="24" />
        RS School
      </a>

      <a href="https://github.com/otonebieridze" class="footer__credit-link" target="_blank" rel="noopener noreferrer">
        <img src="${githubBadge}" alt="" width="24" height="24" />
        @otonebieridze
      </a>

      <p class="footer__made-with-love">Designed with love</p>
    </div>
  `;

  return footer;
}
