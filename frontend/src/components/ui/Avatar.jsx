import { cn } from '../../lib/utils.js'

function initials(name = '') {
  return name
    .split(/[\s_]+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

const palette = [
  'bg-[#2a3d5c] text-sky-100',
  'bg-[#3d2a4f] text-violet-100',
  'bg-[#3d3a2a] text-amber-100',
  'bg-[#2a3d36] text-emerald-100',
]

function colorFromName(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return palette[Math.abs(hash) % palette.length]
}

export function Avatar({ name, className, size = 'md' }) {
  const sizeClass =
    size === 'sm' ? 'h-8 w-8 text-xs' : size === 'lg' ? 'h-11 w-11 text-sm' : 'h-9 w-9 text-xs'

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold ring-2 ring-black/20',
        sizeClass,
        colorFromName(name),
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  )
}
