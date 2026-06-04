import { cn } from '../../lib/utils.js'

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]',
        className,
      )}
      {...props}
    />
  )
}
