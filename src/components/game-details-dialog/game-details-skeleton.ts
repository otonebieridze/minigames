import './game-details-dialog-states.scss';
import '../skeleton/skeleton.scss';

const LINE_MODIFIERS = [
  'game-details-skeleton__line--title',
  '',
  '',
  'game-details-skeleton__line--short',
];

export function createGameDetailsSkeleton(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('aria-busy', 'true');

  const hero = document.createElement('div');
  hero.className = 'game-details-skeleton__hero skeleton';

  const content = document.createElement('div');
  content.className = 'game-details-skeleton__content';

  for (const modifier of LINE_MODIFIERS) {
    const line = document.createElement('div');
    line.className = ['game-details-skeleton__line', 'skeleton', modifier]
      .filter(Boolean)
      .join(' ');
    content.append(line);
  }

  wrapper.append(hero, content);
  return wrapper;
}
