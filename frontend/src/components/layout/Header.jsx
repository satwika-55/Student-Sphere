import { Link, useLocation } from 'react-router-dom'
import { GraduationCap, LogOut, Sparkles, MessageSquare } from 'lucide-react'
import { Button, buttonVariants } from '../ui/Button.jsx'
import { Avatar } from '../ui/Avatar.jsx'
import { cn } from '../../lib/utils.js'

export function Header({ user, onLogout }) {
  const location = useLocation()
  const path = location.pathname

  // Determine what center navigation buttons to show
  const showPosts = path === '/' || path === '/gita-gpt' || path === '/login' || path === '/register'
  const showGitaGPT = path === '/' || path === '/posts' || path === '/login' || path === '/register'

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0c0d10]/80 backdrop-blur-xl w-full">
      <div className="flex h-[4.25rem] w-full items-center justify-between gap-4 px-6 md:px-12">
        
        {/* Left Side: Logo */}
        <Link to="/" className="group flex min-w-0 items-center gap-3 shrink-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b4a] to-[#ff9470] text-[#0c0d10] shadow-lg shadow-[#ff6b4a]/20 transition-transform group-hover:-rotate-3">
            <GraduationCap className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="min-w-0">
            <span className="block font-[family-name:var(--font-display)] text-lg font-bold leading-none tracking-tight text-stone-50">
              StudentSphere
            </span>
            <span className="hidden text-[11px] text-stone-500 sm:block mt-0.5">
              campus chatter, unfiltered
            </span>
          </span>
        </Link>

        {/* Middle Side: Dynamic Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-1">
          {showPosts && (
            <Link
              to="/posts"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#ff6b4a]/10 hover:border-[#ff6b4a]/30 text-stone-300 hover:text-[#ff9470] text-xs sm:text-sm font-semibold tracking-wide transition-all"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Campus Feed
            </Link>
          )}
          {showGitaGPT && (
            <Link
              to="/gita-gpt"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#ff6b4a]/20 bg-[#ff6b4a]/5 hover:bg-[#ff6b4a]/15 text-[#ff9470] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-[0_0_12px_rgba(255,107,74,0.05)] hover:shadow-[0_0_18px_rgba(255,107,74,0.15)] hover:border-[#ff6b4a]/50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Gita GPT
            </Link>
          )}
        </div>

        {/* Right Side: Auth controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-3 sm:flex">
                <Avatar name={user.username} size="sm" />
                <span className="text-sm font-medium text-stone-200">
                  u/{user.username}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout} title="Log out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }))}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className={cn(buttonVariants({ variant: 'default', size: 'sm' }))}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
