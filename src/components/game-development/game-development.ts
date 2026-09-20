import './game-development.scss';
import illustration from '../../assets/images/illustration-side.png';
import uploadIcon from '../../assets/icons/upload.png';

export function renderGameDevelopment(): HTMLElement {
  const section = document.createElement('section');
  section.className = 'game-dev';
  section.setAttribute('aria-label', 'Are You a Game Developer?');

  section.innerHTML = `
    <div class="game-dev__illustration">
      <img src="${illustration}" alt="" />
    </div>

    <div class="game-dev__card">
      <h2 class="game-dev__title">Are You a Game Developer?</h2>
      <p class="game-dev__text">
        Want to see your game on MiniGames? We're always looking for fun, engaging mini games to
        add to our platform. Submit your game and reach thousands of players!
      </p>
      <button type="button" class="game-dev__button">
        <img src="${uploadIcon}" alt="" width="24" height="24" />
        Submit Form
      </button>
      <p class="game-dev__contact">or contact us at developers@minigames.com</p>
    </div>
  `;

  return section;
}
