import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils.js'
export function Dialog({ open, onClose, title, description, children, className }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={cn(
        'fixed inset-0 z-50 m-auto w-[min(100%,28rem)] max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#16181f] p-0 text-stone-100 shadow-2xl backdrop:bg-black/70 open:animate-in',
        className,
      )}
    >
      <div className="relative p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-stone-500 transition-colors hover:bg-white/5 hover:text-stone-200"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        {title && (
          <h2 className="pr-8 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-stone-50">
            {title}
          </h2>
        )}
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-stone-400">{description}</p>
        )}
        <div className={cn(title || description ? 'mt-5' : '')}>{children}</div>
      </div>
    </dialog>
  )
}

export function DialogActions({ className, ...props }) {
  return <div className={cn('mt-6 flex flex-wrap gap-2', className)} {...props} />
}
