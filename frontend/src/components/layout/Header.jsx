import { Link } from 'react-router-dom'
import { GraduationCap, LogOut, PenLine } from 'lucide-react'
import { Button, buttonVariants } from '../ui/Button.jsx'
import { Avatar } from '../ui/Avatar.jsx'
import { cn } from '../../lib/utils.js'

export function Header({ user, onNewPost, onLogout }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#0c0d10]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.25rem] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff6b4a] to-[#ff9470] text-[#0c0d10] shadow-lg shadow-[#ff6b4a]/20 transition-transform group-hover:-rotate-3">
            <GraduationCap className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span className="min-w-0">
            <span className="block font-[family-name:var(--font-display)] text-lg font-semibold leading-none tracking-tight text-stone-50">
              StudentSphere
            </span>
            <span className="hidden text-[11px] text-stone-500 sm:block">
              campus chatter, unfiltered
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex"
                onClick={onNewPost}
              >
                <PenLine className="h-3.5 w-3.5" />
                New post
              </Button>
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
