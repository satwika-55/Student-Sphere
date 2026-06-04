import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils.js'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0d10] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-[#ff6b4a] text-[#0c0d10] shadow-[0_2px_0_#c94e34] hover:brightness-110 active:translate-y-px active:shadow-none focus-visible:ring-[#ff6b4a]/60',
        secondary:
          'border border-white/10 bg-white/5 text-stone-200 hover:bg-white/10 focus-visible:ring-white/20',
        ghost:
          'text-stone-300 hover:bg-white/5 hover:text-stone-100 focus-visible:ring-white/15',
        outline:
          'border border-[#3dd68c]/40 bg-[#3dd68c]/10 text-[#9ef0c4] hover:bg-[#3dd68c]/20 focus-visible:ring-[#3dd68c]/40',
        danger:
          'bg-red-950/80 text-red-200 border border-red-500/30 hover:bg-red-900/60',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-11 px-6',
        icon: 'h-9 w-9 shrink-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export function Button({
  className,
  variant,
  size,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { buttonVariants }
