import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils.js'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        default: 'border-white/10 bg-white/5 text-stone-300',
        campus: 'border-sky-500/30 bg-sky-950/50 text-sky-200',
        academics: 'border-violet-500/30 bg-violet-950/50 text-violet-200',
        events: 'border-amber-500/30 bg-amber-950/50 text-amber-200',
        rants: 'border-rose-500/30 bg-rose-950/50 text-rose-200',
        general: 'border-stone-500/30 bg-stone-900/80 text-stone-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const categoryVariant = {
  Campus: 'campus',
  Academics: 'academics',
  Events: 'events',
  Rants: 'rants',
  General: 'general',
}

export function Badge({ className, variant, category, children, ...props }) {
  const resolved =
    variant ?? (category ? categoryVariant[category] ?? 'general' : 'default')

  return (
    <span className={cn(badgeVariants({ variant: resolved }), className)} {...props}>
      {children ?? category}
    </span>
  )
}
