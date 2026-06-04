import { cn } from '../../lib/utils.js'

export function Input({ className, type = 'text', ...props }) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-lg border border-white/10 bg-[#0f1117] px-3 py-2 text-sm text-stone-100 placeholder:text-stone-500 transition-colors focus-visible:border-[#ff6b4a]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff6b4a]/25 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
