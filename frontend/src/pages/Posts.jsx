import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  fetchPosts,
  fetchComments,
  createPost,
  togglePostLike,
  addPostComment,
} from '../api/posts.js'
import { getStoredUser, clearAuth } from '../lib/authStorage.js'
import { filterByCategory, sortPosts } from '../lib/feed.js'
import { Header } from '../components/layout/Header.jsx'
import { Sidebar } from '../components/layout/Sidebar.jsx'
import { RightRail } from '../components/layout/RightRail.jsx'
import { CreatePostComposer } from '../components/feed/CreatePostComposer.jsx'
import { FeedToolbar } from '../components/feed/FeedToolbar.jsx'
import { PostCard } from '../components/feed/PostCard.jsx'
import { PostCardSkeleton } from '../components/feed/PostCardSkeleton.jsx'
import { AuthPromptDialog } from '../components/feed/AuthPromptDialog.jsx'

function Posts() {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => getStoredUser())
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [sort, setSort] = useState('hot')
  const [category, setCategory] = useState('All')
  const [authPrompt, setAuthPrompt] = useState({ open: false, action: '' })
  const [expandedPostId, setExpandedPostId] = useState(null)
  const [commentsByPost, setCommentsByPost] = useState({})
  const [commentsLoading, setCommentsLoading] = useState({})

  const loadPosts = useCallback(async () => {
    setLoadError('')
    try {
      const { data } = await fetchPosts()
      setPosts(data.posts ?? [])
    } catch {
      setLoadError('Could not load the feed. Is the server running?')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  useEffect(() => {
    const syncUser = () => setUser(getStoredUser())
    window.addEventListener('storage', syncUser)
    return () => window.removeEventListener('storage', syncUser)
  }, [])

  const visiblePosts = useMemo(
    () => sortPosts(filterByCategory(posts, category), sort),
    [posts, category, sort],
  )

  const openAuthPrompt = (action) => {
    setAuthPrompt({ open: true, action })
  }

  const closeAuthPrompt = () => {
    setAuthPrompt({ open: false, action: '' })
  }

  const handleLogout = () => {
    clearAuth()
    setUser(null)
    navigate('/')
  }

  const handleCreatePost = async (payload) => {
    await createPost(payload)
    await loadPosts()
  }

  const handleLike = async (postId) => {
    await togglePostLike(postId)
    setPosts((prev) =>
      prev.map((post) => {
        if (post._id !== postId) return post
        const likes = [...(post.likes ?? [])]
        const uid = String(user.id)
        const idx = likes.findIndex((id) => String(id) === uid)
        if (idx >= 0) likes.splice(idx, 1)
        else likes.push(user.id)
        return { ...post, likes }
      }),
    )
  }

  const loadCommentsForPost = async (postId) => {
    if (commentsByPost[postId]) return
    setCommentsLoading((s) => ({ ...s, [postId]: true }))
    try {
      const { data } = await fetchComments(postId)
      setCommentsByPost((s) => ({ ...s, [postId]: data.comments ?? [] }))
    } finally {
      setCommentsLoading((s) => ({ ...s, [postId]: false }))
    }
  }

  const handleToggleExpand = (postId) => {
    if (expandedPostId === postId) {
      setExpandedPostId(null)
      return
    }
    setExpandedPostId(postId)
    loadCommentsForPost(postId)
  }

  const handleAddComment = async (postId, text) => {
    await addPostComment(postId, text)
    const { data } = await fetchComments(postId)
    setCommentsByPost((s) => ({ ...s, [postId]: data.comments ?? [] }))
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? { ...p, comments: data.comments ?? p.comments }
          : p,
      ),
    )
  }

  const scrollToComposer = () => {
    document.getElementById('composer')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-svh bg-[#0c0d10] text-stone-200">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 107, 74, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 100% 50%, rgba(61, 214, 140, 0.08), transparent),
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />

      <Header
        user={user}
        onNewPost={user ? scrollToComposer : () => openAuthPrompt('create a post')}
        onLogout={handleLogout}
      />

      <div className="relative mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:flex lg:gap-8 lg:px-8 lg:py-8">
        <Sidebar activeCategory={category} onCategoryChange={setCategory} />

        <main className="min-w-0 flex-1 space-y-5">
          <section className="rounded-2xl border border-white/[0.06] bg-gradient-to-r from-[#1a1512] to-[#14161c] px-5 py-6 sm:px-7 sm:py-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ff6b4a]">
              Your campus feed
            </p>
            <h1 className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-2xl font-semibold leading-tight text-stone-50 sm:text-[1.75rem]">
              Read everything. Post when you&apos;re ready.
            </h1>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-stone-400">
              Threads from students near you — clubs, cram sessions, dining hall
              takes, and the occasional constructive rant.
            </p>
          </section>

          <div id="composer">
            <CreatePostComposer
              user={user}
              onSubmit={handleCreatePost}
              onAuthRequired={openAuthPrompt}
            />
          </div>

          <FeedToolbar
            sort={sort}
            onSortChange={setSort}
            postCount={visiblePosts.length}
          />

          {loadError && (
            <p className="rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200">
              {loadError}
            </p>
          )}

          {loading && (
            <div className="space-y-4">
              <PostCardSkeleton />
              <PostCardSkeleton />
              <PostCardSkeleton />
            </div>
          )}

          {!loading && !loadError && visiblePosts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-[#14161c]/50 px-6 py-16 text-center">
              <p className="font-[family-name:var(--font-display)] text-lg text-stone-200">
                Nothing here yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-stone-500">
                {user
                  ? 'Break the silence — your cohort is probably scrolling too.'
                  : 'Browse away, or register to drop the first thread.'}
              </p>
            </div>
          )}

          {!loading && (
            <div className="space-y-4 pb-12">
              {visiblePosts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  expanded={expandedPostId === post._id}
                  comments={commentsByPost[post._id]}
                  commentsLoading={commentsLoading[post._id]}
                  onToggleExpand={() => handleToggleExpand(post._id)}
                  onLike={handleLike}
                  onLoadComments={() => loadCommentsForPost(post._id)}
                  onAddComment={handleAddComment}
                  onAuthRequired={openAuthPrompt}
                />
              ))}
            </div>
          )}
        </main>

        <RightRail />
      </div>

      <AuthPromptDialog
        open={authPrompt.open}
        onClose={closeAuthPrompt}
        action={authPrompt.action}
      />
    </div>
  )
}

export default Posts
