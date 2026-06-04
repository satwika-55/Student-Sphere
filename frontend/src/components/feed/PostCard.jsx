import { useState } from 'react'
import {
  ArrowBigUp,
  MessageSquare,
  Share2,
  Bookmark,
} from 'lucide-react'
import { Card } from '../ui/Card.jsx'
import { Badge } from '../ui/Badge.jsx'
import { Avatar } from '../ui/Avatar.jsx'
import { timeAgo } from '../../lib/time.js'
import { cn } from '../../lib/utils.js'
import { CommentThread } from './CommentThread.jsx'

function authorName(post) {
  return post.author?.username ?? 'unknown'
}

function userLiked(post, userId) {
  if (!userId || !post.likes?.length) return false
  return post.likes.some((id) => String(id) === String(userId))
}

export function PostCard({
  post,
  user,
  comments,
  commentsLoading,
  expanded,
  onToggleExpand,
  onLike,
  onLoadComments,
  onAddComment,
  onAuthRequired,
}) {
  const [likeBusy, setLikeBusy] = useState(false)
  const liked = userLiked(post, user?.id)
  const likeCount = post.likes?.length ?? 0
  const commentCount = post.comments?.length ?? 0

  const handleLike = async () => {
    if (!user) {
      onAuthRequired('upvote')
      return
    }
    setLikeBusy(true)
    try {
      await onLike(post._id)
    } finally {
      setLikeBusy(false)
    }
  }

  return (
    <Card className="overflow-hidden p-0 transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
      <article className="flex">
        <div className="flex w-11 shrink-0 flex-col items-center gap-0.5 border-r border-white/[0.06] bg-[#0f1117]/60 py-3 sm:w-12">
          <button
            type="button"
            disabled={likeBusy}
            onClick={handleLike}
            className={cn(
              'rounded-lg p-1.5 transition-colors hover:bg-white/5',
              liked ? 'text-[#ff6b4a]' : 'text-stone-500 hover:text-[#ff9470]',
            )}
            aria-label={liked ? 'Remove upvote' : 'Upvote'}
          >
            <ArrowBigUp
              className={cn('h-6 w-6', liked && 'fill-current')}
              strokeWidth={liked ? 0 : 2}
            />
          </button>
          <span
            className={cn(
              'text-xs font-bold tabular-nums',
              liked ? 'text-[#ffb09a]' : 'text-stone-400',
            )}
          >
            {likeCount}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
              <Avatar name={authorName(post)} size="sm" />
              <span className="font-medium text-stone-300">
                u/{authorName(post)}
              </span>
              <span className="text-stone-600">·</span>
              <span>{timeAgo(post.createdAt)}</span>
              <Badge category={post.category} />
            </div>

            <p className="mt-3 whitespace-pre-wrap text-[15px] leading-relaxed text-stone-100">
              {post.content}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-1 border-t border-white/[0.05] pt-3">
              <button
                type="button"
                onClick={onToggleExpand}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-400 transition-colors hover:bg-white/5 hover:text-stone-200"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                {commentCount} comment{commentCount === 1 ? '' : 's'}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-500 transition-colors hover:bg-white/5 hover:text-stone-400"
                onClick={() => !user && onAuthRequired('share posts')}
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </button>
              <button
                type="button"
                className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:text-stone-400"
                onClick={() => !user && onAuthRequired('save posts')}
              >
                <Bookmark className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {expanded && (
            <CommentThread
              postId={post._id}
              comments={comments}
              loading={commentsLoading}
              user={user}
              onLoad={onLoadComments}
              onSubmit={onAddComment}
              onAuthRequired={onAuthRequired}
            />
          )}
        </div>
      </article>
    </Card>
  )
}
