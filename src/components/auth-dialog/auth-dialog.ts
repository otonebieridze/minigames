import './auth-dialog.scss';
import mailIcon from '../../assets/icons/mail.png';
import lockIcon from '../../assets/icons/lock.png';
import personIcon from '../../assets/icons/person.png';
import visibilityIcon from '../../assets/icons/visibility.png';
import googleIcon from '../../assets/icons/google.png';

interface AuthDialog {
  element: HTMLElement;
  open: (tab?: AuthTab) => void;
  close: () => void;
}

type AuthTab = 'login' | 'register';

export function createAuthDialog(): AuthDialog {
  const backdrop = document.createElement('div');
  backdrop.className = 'auth-backdrop';

  const dialog = document.createElement('div');
  dialog.className = 'auth-dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Authentication');

  dialog.innerHTML = `
    <div class="auth-dialog__tabs">
      <button type="button" class="auth-dialog__tab auth-dialog__tab--active" data-tab="login">Login</button>
      <button type="button" class="auth-dialog__tab" data-tab="register">Register</button>
    </div>

    <div class="auth-dialog__panels">
      <div class="auth-dialog__panel auth-dialog__panel--active" data-panel="login">
        <h2 class="auth-dialog__title">Welcome Back!</h2>
        <p class="auth-dialog__subtitle">Sign in to resume your games and progress.</p>

        <form class="auth-dialog__form">
          <label class="auth-dialog__label">
            Email Address
            <span class="auth-dialog__input-wrap">
              <img src="${mailIcon}" alt="" class="auth-dialog__input-icon" />
              <input type="email" required class="auth-dialog__input" placeholder="e.g. alex@minigames.com" />
            </span>
          </label>

          <label class="auth-dialog__label">
            Password
            <span class="auth-dialog__input-wrap">
              <img src="${lockIcon}" alt="" class="auth-dialog__input-icon" />
              <input
                type="password"
                required
                minlength="8"
                class="auth-dialog__input auth-dialog__input--has-toggle"
                placeholder="••••••••"
              />
              <button type="button" class="auth-dialog__toggle-visibility" aria-label="Show password">
                <img src="${visibilityIcon}" alt="" />
              </button>
            </span>
          </label>

          <a href="#/" class="auth-dialog__forgot">Forgot Password?</a>
          <button type="submit" class="auth-dialog__submit">Login</button>
        </form>

        <div class="auth-dialog__divider"><span>OR</span></div>
        <button type="button" class="auth-dialog__google">
          <img src="${googleIcon}" alt="" width="20" height="20" />
          Continue with Google
        </button>

        <p class="auth-dialog__switch-text">
          Don't have an account?
          <button type="button" class="auth-dialog__switch-link" data-switch-to="register">Register</button>
        </p>
      </div>

      <div class="auth-dialog__panel" data-panel="register">
        <h2 class="auth-dialog__title">Create Account</h2>
        <p class="auth-dialog__subtitle">Join MiniGames to track your score &amp; streak.</p>

        <form class="auth-dialog__form">
          <label class="auth-dialog__label">
            Username
            <span class="auth-dialog__input-wrap">
              <img src="${personIcon}" alt="" class="auth-dialog__input-icon" />
              <input type="text" required minlength="3" class="auth-dialog__input" placeholder="e.g. CozyGamer_99" />
            </span>
          </label>

          <label class="auth-dialog__label">
            Email Address
            <span class="auth-dialog__input-wrap">
              <img src="${mailIcon}" alt="" class="auth-dialog__input-icon" />
              <input type="email" required class="auth-dialog__input" placeholder="your.email@domain.com" />
            </span>
          </label>

          <label class="auth-dialog__label">
            Password
            <span class="auth-dialog__input-wrap">
              <img src="${lockIcon}" alt="" class="auth-dialog__input-icon" />
              <input
                type="password"
                required
                minlength="8"
                class="auth-dialog__input auth-dialog__input--has-toggle"
                placeholder="Min. 8 characters"
              />
              <button type="button" class="auth-dialog__toggle-visibility" aria-label="Show password">
                <img src="${visibilityIcon}" alt="" />
              </button>
            </span>
          </label>

          <label class="auth-dialog__label">
            Confirm Password
            <span class="auth-dialog__input-wrap">
              <img src="${lockIcon}" alt="" class="auth-dialog__input-icon" />
              <input
                type="password"
                required
                minlength="8"
                class="auth-dialog__input auth-dialog__input--has-toggle"
                placeholder="Repeat your password"
              />
              <button type="button" class="auth-dialog__toggle-visibility" aria-label="Show password">
                <img src="${visibilityIcon}" alt="" />
              </button>
            </span>
          </label>

          <button type="submit" class="auth-dialog__submit">Create Account</button>
        </form>

        <div class="auth-dialog__divider"><span>OR</span></div>
        <button type="button" class="auth-dialog__google">
          <img src="${googleIcon}" alt="" width="20" height="20" />
          Sign up with Google
        </button>

        <p class="auth-dialog__switch-text">
          Already have an account?
          <button type="button" class="auth-dialog__switch-link" data-switch-to="login">Login</button>
        </p>
      </div>
    </div>
  `;

  backdrop.append(dialog);

  function switchTo(tab: AuthTab): void {
    const tabButtons = dialog.querySelectorAll<HTMLButtonElement>('.auth-dialog__tab');
    for (const tabButton of tabButtons) {
      tabButton.classList.toggle('auth-dialog__tab--active', tabButton.dataset.tab === tab);
    }

    const panels = dialog.querySelectorAll<HTMLElement>('.auth-dialog__panel');
    for (const panel of panels) {
      panel.classList.toggle('auth-dialog__panel--active', panel.dataset.panel === tab);
    }

    const panelsContainer = dialog.querySelector<HTMLElement>('.auth-dialog__panels');
    if (panelsContainer) {
      panelsContainer.scrollTop = 0;
    }
  }

  const tabButtons = dialog.querySelectorAll<HTMLButtonElement>('.auth-dialog__tab');
  for (const tabButton of tabButtons) {
    tabButton.addEventListener('click', () => {
      if (tabButton.dataset.tab === 'login' || tabButton.dataset.tab === 'register') {
        switchTo(tabButton.dataset.tab);
      }
    });
  }

  const switchLinks = dialog.querySelectorAll<HTMLButtonElement>('.auth-dialog__switch-link');
  for (const link of switchLinks) {
    link.addEventListener('click', () => {
      if (link.dataset.switchTo === 'login' || link.dataset.switchTo === 'register') {
        switchTo(link.dataset.switchTo);
      }
    });
  }

  const forms = dialog.querySelectorAll<HTMLFormElement>('.auth-dialog__form');
  for (const form of forms) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
  }

  const toggleButtons = dialog.querySelectorAll<HTMLButtonElement>(
    '.auth-dialog__toggle-visibility',
  );
  for (const toggleButton of toggleButtons) {
    toggleButton.addEventListener('click', () => {
      const input = toggleButton.previousElementSibling;
      if (input instanceof HTMLInputElement) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleButton.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      }
    });
  }

  function open(tab: AuthTab = 'login'): void {
    switchTo(tab);
    backdrop.classList.add('auth-backdrop--open');
  }

  function close(): void {
    backdrop.classList.remove('auth-backdrop--open');
  }

  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) {
      close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
    }
  });

  return { element: backdrop, open, close };
}
