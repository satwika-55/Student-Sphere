import { useState } from 'react'
import { Loader2, MessageSquare } from 'lucide-react'
import { Avatar } from '../ui/Avatar.jsx'
import { Button } from '../ui/Button.jsx'
import { Textarea } from '../ui/Textarea.jsx'
import { timeAgo } from '../../lib/time.js'

export function CommentThread({
  postId,
  comments,
  loading,
  user,
  onLoad,
  onSubmit,
  onAuthRequired,
}) {
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      onAuthRequired('join the conversation')
      return
    }
    if (!text.trim()) return

    setSubmitting(true)
    try {
      await onSubmit(postId, text.trim())
      setText('')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="border-t border-white/[0.06] bg-[#0f1117]/40 px-4 py-4 sm:px-5">
      {!comments && !loading && (
        <button
          type="button"
          onClick={onLoad}
          className="text-sm text-[#ffb09a] hover:underline"
        >
          Load comments
        </button>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-stone-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Pulling replies…
        </div>
      )}

      {comments && comments.length === 0 && (
        <p className="flex items-center gap-2 text-sm text-stone-500">
          <MessageSquare className="h-4 w-4" />
          No comments yet — say something kind (or honest).
        </p>
      )}

      {comments && comments.length > 0 && (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment._id} className="flex gap-3">
              <Avatar
                name={comment.user?.username ?? 'anon'}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-sm font-medium text-stone-200">
                    u/{comment.user?.username ?? 'deleted'}
                  </span>
                  <span className="text-xs text-stone-600">
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-stone-300">
                  {comment.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <Textarea
          value={text}
          onFocus={() => {
            if (!user) onAuthRequired('join the conversation')
          }}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            user ? 'Add your take…' : 'Sign in to comment'
          }
          readOnly={!user}
          className="min-h-[44px] flex-1 py-2"
        />
        <Button
          type="submit"
          size="sm"
          disabled={submitting || !text.trim()}
          className="self-end"
        >
          {submitting ? '…' : 'Reply'}
        </Button>
      </form>
    </div>
  )
}
