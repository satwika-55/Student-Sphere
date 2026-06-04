import { cn } from '../../lib/utils.js'

const SORTS = [
  { id: 'hot', label: 'Hot' },
  { id: 'new', label: 'New' },
  { id: 'top', label: 'Top' },
]

export function FeedToolbar({ sort, onSortChange, postCount }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
      <div className="flex gap-1 rounded-xl bg-[#0f1117] p-1">
        {SORTS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => onSortChange(id)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-all',
              sort === id
                ? 'bg-[#ff6b4a] text-[#0c0d10] shadow-sm'
                : 'text-stone-500 hover:text-stone-200',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-xs text-stone-500">
        {postCount === 0
          ? 'Quiet feed — be the first voice'
          : `${postCount} thread${postCount === 1 ? '' : 's'} in view`}
      </p>
    </div>
  )
}
