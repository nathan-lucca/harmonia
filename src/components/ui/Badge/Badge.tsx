import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'brand'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  const variants: Record<BadgeVariant, string> = {
    default: 'bg-[var(--color-surface-600)] text-[var(--color-text-secondary)]',
    success: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
    warning: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
    error: 'bg-[var(--color-error)]/15 text-[var(--color-error)]',
    brand: 'bg-[var(--color-brand-500)]/15 text-[var(--color-brand-400)]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      style={{ padding: '2px 8px' }}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge }
export type { BadgeProps, BadgeVariant }
