import { useState } from 'react'
import { Send } from 'lucide-react'
import { Card, CardContent } from '../ui/Card.jsx'
import { Textarea } from '../ui/Textarea.jsx'
import { Button } from '../ui/Button.jsx'
import { Avatar } from '../ui/Avatar.jsx'

const CATEGORIES = ['General', 'Campus', 'Academics', 'Events', 'Rants']

export function CreatePostComposer({ user, onSubmit, onAuthRequired }) {
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('General')
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleFocus = () => {
    if (!user) {
      onAuthRequired('share a post')
      return
    }
    setExpanded(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      onAuthRequired('share a post')
      return
    }
    if (!content.trim()) return

    setLoading(true)
    try {
      await onSubmit({ content: content.trim(), category })
      setContent('')
      setCategory('General')
      setExpanded(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Avatar name={user?.username ?? '?'} />
            <div className="min-w-0 flex-1">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={handleFocus}
                placeholder={
                  user
                    ? "What's happening on campus?"
                    : 'Sign in to start a thread…'
                }
                readOnly={!user}
                className={expanded ? 'min-h-[100px]' : 'min-h-[52px]'}
              />

              {(expanded || content) && user && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                          category === cat
                            ? 'bg-[#ff6b4a]/20 text-[#ffb09a]'
                            : 'bg-white/5 text-stone-500 hover:text-stone-300'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <Button type="submit" size="sm" disabled={loading || !content.trim()}>
                    <Send className="h-3.5 w-3.5" />
                    {loading ? 'Posting…' : 'Post'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
