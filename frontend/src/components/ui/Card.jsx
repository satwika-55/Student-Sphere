import { cn } from '../../lib/utils.js'

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/[0.07] bg-[#14161c]/90 shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
        className,
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('flex flex-col gap-1 p-5 pb-0', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-5', className)} {...props} />
}
