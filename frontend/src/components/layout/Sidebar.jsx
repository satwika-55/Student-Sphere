import { Flame, Sparkles, BookOpen, PartyPopper, MessageCircle } from 'lucide-react'
import { cn } from '../../lib/utils.js'

const CATEGORIES = [
  { id: 'All', icon: Flame },
  { id: 'General', icon: MessageCircle },
  { id: 'Campus', icon: Sparkles },
  { id: 'Academics', icon: BookOpen },
  { id: 'Events', icon: PartyPopper },
  { id: 'Rants', icon: MessageCircle },
]

export function Sidebar({ activeCategory, onCategoryChange }) {
  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <nav className="sticky top-[5.5rem] space-y-1">
        <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">
          Browse
        </p>
        {CATEGORIES.map(({ id, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onCategoryChange(id)}
            className={cn(
              'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
              activeCategory === id
                ? 'bg-[#ff6b4a]/15 font-medium text-[#ffb09a]'
                : 'text-stone-400 hover:bg-white/5 hover:text-stone-200',
            )}
          >
            <Icon className="h-4 w-4 shrink-0 opacity-70" />
            {id === 'All' ? 'Everything' : id}
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-[#12141a] p-4">
        <p className="text-xs font-semibold text-[#3dd68c]">Tonight on campus</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-400">
          Midterms are loud in the feed. Drop a study tip or a rant — someone&apos;s
          probably awake too.
        </p>
      </div>
    </aside>
  )
}
