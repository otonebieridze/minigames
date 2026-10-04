import './game-details-dialog-states.scss';
import '../skeleton/skeleton.scss';
import favoriteIcon from '../../assets/icons/favorite.png';
import favoriteIconBlack from '../../assets/icons/favorite-black.png';
import sendIcon from '../../assets/icons/send-comment-trigger.png';
import { getComments, type GameComment } from '../../api/comments';
import { formatTimeAgo } from '../../utils/format-time-ago';
import { createErrorBanner } from '../error-banner/error-banner';
import { createEmptyState } from '../empty-state/empty-state';
import { showSnackbar } from '../snackbar/snackbar';

const COMMENTS_LIMIT = 3;
const SKELETON_ITEMS = 3;
const AVATAR_COLORS = ['blue', 'yellow', 'gray'] as const;
const TEXTAREA_MAX_HEIGHT_PX = 88;

function createCommentsSkeleton(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'comments-skeleton';
  wrapper.setAttribute('aria-busy', 'true');

  for (let index = 0; index < SKELETON_ITEMS; index += 1) {
    const item = document.createElement('div');
    item.className = 'comments-skeleton__item skeleton';
    wrapper.append(item);
  }

  return wrapper;
}

function createCommentItem(comment: GameComment, index: number): HTMLLIElement {
  const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const avatarInitial = comment.authorName.charAt(0).toUpperCase();
  const likeIcon = comment.isLikedByCurrentUser ? favoriteIcon : favoriteIconBlack;

  const item = document.createElement('li');
  item.className = 'game-details-dialog__comment';

  item.innerHTML = `
    <div class="game-details-dialog__comment-header">
      <div class="game-details-dialog__comment-header-left">
        <div class="game-details-dialog__comment-avatar game-details-dialog__comment-avatar--${avatarColor}">
          ${avatarInitial}
        </div>
        <span class="game-details-dialog__comment-author">${comment.authorName}</span>
      </div>
      <span class="game-details-dialog__comment-time">${formatTimeAgo(comment.createdAt)}</span>
    </div>
    <p class="game-details-dialog__comment-text">${comment.text}</p>
    <span class="game-details-dialog__comment-like game-details-dialog__comment-like--readonly">
      <img src="${likeIcon}" alt="" class="game-details-dialog__comment-like-icon" width="16" height="16" />
      <span class="game-details-dialog__comment-like-count">${comment.likesCount}</span>
    </span>
  `;

  return item;
}

function createCommentsList(comments: GameComment[]): HTMLUListElement {
  const list = document.createElement('ul');
  list.className = 'game-details-dialog__comments-list';
  list.append(...comments.map((comment, index) => createCommentItem(comment, index)));
  return list;
}

function createCommentForm(): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'game-details-dialog__comment-form';

  form.innerHTML = `
    <div class="game-details-dialog__comment-avatar game-details-dialog__comment-avatar--user">U</div>
    <textarea
      class="game-details-dialog__comment-input"
      placeholder="Write a comment..."
      rows="1"
    ></textarea>
    <button type="submit" class="game-details-dialog__comment-submit" aria-label="Submit comment">
      <img src="${sendIcon}" alt="" width="40" height="40" />
    </button>
  `;

  const input = form.querySelector<HTMLTextAreaElement>('.game-details-dialog__comment-input');

  input?.addEventListener('input', () => {
    input.style.height = 'auto';
    const nextHeight = Math.min(input.scrollHeight, TEXTAREA_MAX_HEIGHT_PX);
    input.style.height = `${nextHeight}px`;
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });

  return form;
}

export function createCommentsSection(slug: string): HTMLElement {
  const section = document.createElement('section');
  section.className = 'game-details-dialog__comments';

  const title = document.createElement('h3');
  title.className = 'game-details-dialog__comments-title';
  title.textContent = 'Comments';

  const area = document.createElement('div');

  section.append(title, createCommentForm(), area);

  async function loadComments(): Promise<void> {
    title.textContent = 'Comments';
    area.replaceChildren(createCommentsSkeleton());

    try {
      const { comments, totalComments } = await getComments(slug, COMMENTS_LIMIT);
      title.textContent = `Comments (${totalComments})`;

      if (comments.length === 0) {
        area.replaceChildren(createEmptyState('No comments yet.'));
        return;
      }

      area.replaceChildren(createCommentsList(comments));
    } catch {
      area.replaceChildren(
        createErrorBanner('Could not load comments. Please try again.', loadComments),
      );
      showSnackbar('Failed to load comments.', 'error');
    }
  }

  loadComments();

  return section;
}
