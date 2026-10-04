import { apiGet } from './client';

export interface GameComment {
  commentId: string;
  authorName: string;
  text: string;
  likesCount: number;
  isLikedByCurrentUser: boolean;
  createdAt: string;
}

interface CommentsResponse {
  data: GameComment[];
  meta: {
    totalComments: number;
  };
}

export interface CommentsResult {
  comments: GameComment[];
  totalComments: number;
}

export async function getComments(slug: string, limit: number): Promise<CommentsResult> {
  const query = new URLSearchParams({
    limit: String(limit),
    sort: 'newest',
  });

  const response = await apiGet<CommentsResponse>(
    `/api/games/${encodeURIComponent(slug)}/comments?${query.toString()}`,
  );

  return {
    comments: response.data,
    totalComments: response.meta.totalComments,
  };
}
