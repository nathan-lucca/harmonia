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
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          {title}
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)]/10">
          <Icon
            size={16}
            className="text-[var(--color-brand-400)]"
            aria-hidden="true"
          ></Icon>
        </div>
      </div>

      <div>
        <p className="text-3xl font-bold text-[var(--color-text-primary)]">
          {value}
        </p>

        {subtitle && (
          <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
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
          <span>{trend === 'up' ? '⬆️' : trend === 'down' ? '⬇️' : '➡️'}</span>
          <span>{trendValue} vs período anterior</span>
        </div>
      )}
    </Card>
  )
}
