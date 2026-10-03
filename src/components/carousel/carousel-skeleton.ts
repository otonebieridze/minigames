import './carousel.scss';
import '../skeleton/skeleton.scss';

const CARD_MODIFIERS = [
  'carousel__card--edge',
  '',
  'carousel__card--featured',
  '',
  'carousel__card--edge',
];

export function createCarouselSkeleton(): HTMLElement {
  const track = document.createElement('ul');
  track.className = 'carousel__track';
  track.setAttribute('aria-busy', 'true');

  for (const modifier of CARD_MODIFIERS) {
    const card = document.createElement('li');
    card.className = ['carousel__card', 'skeleton', modifier].filter(Boolean).join(' ');
    track.append(card);
  }

  return track;
}
