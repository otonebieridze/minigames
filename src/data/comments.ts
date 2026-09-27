export interface Comment {
  commentId: string;
  authorName: string;
  text: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
  timeAgo: string;
}

export const comments: Comment[] = [
  {
    commentId: 'c5d9f2a1-7c3b-4e8f-9a0d-000000000001',
    authorName: 'ForestDweller',
    text: "The hand-drawn art is absolutely magical 🍄 Every location feels like a page from a children's storybook. The mushroom village made me cry happy tears!",
    likesCount: 12,
    isLikedByCurrentUser: false,
    createdAt: '2026-08-30T07:00:00Z',
    timeAgo: '3 hours ago',
  },
  {
    commentId: 'c5d9f2a1-7c3b-4e8f-9a0d-000000000002',
    authorName: 'HerbalTeaLover',
    text: 'Perfect cozy evening game — brew a cup of chamomile, wrap in a blanket and help the little Tukoni prepare for winter. The puzzles are gentle but satisfying.',
    likesCount: 5,
    isLikedByCurrentUser: false,
    createdAt: '2026-08-29T15:30:00Z',
    timeAgo: '1 day ago',
  },
  {
    commentId: 'c5d9f2a1-7c3b-4e8f-9a0d-000000000003',
    authorName: 'CottageCoreMia',
    text: 'I want to live inside this game forever 🌿 The NPCs are so charming, the tea recipes are real, and the atmosphere is pure warmth and calm.',
    likesCount: 8,
    isLikedByCurrentUser: false,
    createdAt: '2026-08-27T20:10:00Z',
    timeAgo: '3 days ago',
  },
];
