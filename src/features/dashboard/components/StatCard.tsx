import { Card } from '@/components/ui/Card'
import { cn } from '@/utils/cn'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon: LucideIcon
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <div
      className="flex flex-col rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)]"
      style={{ padding: '20px', gap: '12px' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          {title}
        </span>
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: '32px',
            height: '32px',
            background:
              'color-mix(in srgb, var(--color-brand-500) 15%, transparent)',
          }}
        >
          <Icon
            size={16}
            className="text-[var(--color-brand-400)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div>
        <p
          className="font-bold text-[var(--color-text-primary)]"
          style={{ fontSize: '28px' }}
        >
          {value}
        </p>
        {subtitle && (
          <p
            className="text-xs text-[var(--color-text-muted)]"
            style={{ marginTop: '2px' }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {trend && trendValue && (
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium',
            trend === 'up' && 'text-[var(--color-success)]',
            trend === 'down' && 'text-[var(--color-error)]',
            trend === 'neutral' && 'text-[var(--color-text-muted)]'
          )}
        >
          <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
          <span>{trendValue} vs período anterior</span>
        </div>
      )}
    </div>
  )
}
