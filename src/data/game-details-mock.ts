import { comments } from './comments';

export interface TopRecord {
  playerName: string;
  score: string;
  timeAgo: string;
}

export const gameDetailsMock = {
  title: 'Tukoni: Forest Keepers',
  rating: 4.9,
  likesCount: '31.2K',
  description:
    'Tukoni: Forest Keepers — a cozy hand-drawn puzzle-adventure. You are Traveller, a little forest spirit on an important mission. Wander storybook meadows, visit mushroom villages, meet adorable inhabitants, solve gentle hand-crafted puzzles, brew herbal teas and help the Tukoni forest prepare peacefully for the coming winter.',
  coverImage: '/assets/images/games/tukoni-forest-keepers-hero.jpg',
  badges: [
    { label: 'Genre', value: 'Puzzle' },
    { label: 'Players', value: 'Solo' },
    { label: 'Duration', value: '40-90 min' },
    { label: 'Price', value: 'Free' },
  ],
  topRecords: [
    { playerName: 'ForestSpirit', score: '356,700 pts', timeAgo: '2 days ago' },
    { playerName: 'TeaBrewer', score: '332,400 pts', timeAgo: '5 days ago' },
    { playerName: 'HerbalistPath', score: '308,900 pts', timeAgo: '1 week ago' },
  ],
  comments,
};
