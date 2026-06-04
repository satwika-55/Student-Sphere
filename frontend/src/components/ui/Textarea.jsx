import { cn } from '../../lib/utils.js'

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        'flex min-h-[88px] w-full resize-y rounded-lg border border-white/10 bg-[#0f1117] px-3 py-2.5 text-sm leading-relaxed text-stone-100 placeholder:text-stone-500 transition-colors focus-visible:border-[#ff6b4a]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b4a]/25 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
