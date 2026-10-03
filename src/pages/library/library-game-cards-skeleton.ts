import './library-game-cards.scss';
import './library-game-cards-skeleton.scss';
import '../../components/skeleton/skeleton.scss';

const TOTAL_CARDS = 6;

export function createGameCardsSkeleton(): HTMLElement {
  const list = document.createElement('ul');
  list.className = 'library-game-cards__list';
  list.setAttribute('aria-busy', 'true');

  for (let index = 0; index < TOTAL_CARDS; index += 1) {
    const item = document.createElement('li');
    item.className = 'library-game-cards__item';

    const card = document.createElement('div');
    card.className = 'game-card-skeleton skeleton';

    item.append(card);
    list.append(item);
  }

  return list;
}
