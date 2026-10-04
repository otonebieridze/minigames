import './library-chips-skeleton.scss';
import '../../components/skeleton/skeleton.scss';

const TOTAL_CHIPS = 7;

export function createChipsSkeleton(): HTMLElement[] {
  const chips: HTMLElement[] = [];

  for (let index = 0; index < TOTAL_CHIPS; index += 1) {
    const chip = document.createElement('span');
    chip.className = 'chip-skeleton skeleton';
    chips.push(chip);
  }

  return chips;
}
