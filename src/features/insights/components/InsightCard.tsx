import { cn } from '@/utils/cn'
import type { LucideIcon } from 'lucide-react'

interface InsightCardProps {
  label: string // ex: "artista do mês"
  value: string // ex: "Arctic Monkeys"
  detail?: string // ex: "420 minutos ouvidos"
  icon: LucideIcon
  accent?: string // cor de destaque em hex
  size?: 'default' | 'large'
}

export function InsightCard({
  label,
  value,
  detail,
  icon: Icon,
  accent = 'var(--color-brand-500)',
  size = 'default',
}: InsightCardProps) {
  return (
    <div
      className={cn(
        'relative flex flex-col gap-3 overflow-hidden rounded-2xl p-5',
        'bg-[var(--color-surface-800)]',
        'border border-[var(--color-surface-600)]',
        'transition-transform duration-200 hover:-translate-y-0.5'
      )}
    >
      {/* gradiente de fundo sutil no canto superior direito */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full opacity-10 blur-2xl"
        style={{ background: accent }}
      />

      {/* ícone */}
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${accent}20` }} // 20 = 12% de opacidade em hex
      >
        <Icon size={18} style={{ color: accent }} aria-hidden="true" />
      </div>

      {/* label */}
      <p className="text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
        {label}
      </p>

      {/* valor principal — tamanho varia conforme o conteúdo */}
      <p
        className={cn(
          'leading-tight font-bold text-[var(--color-text-primary)]',
          size === 'large' ? 'text-4xl' : 'text-2xl'
        )}
      >
        {value}
      </p>

      {/* detalhe opcional */}
      {detail && (
        <p className="text-sm text-[var(--color-text-secondary)]">{detail}</p>
      )}
    </div>
  )
}
