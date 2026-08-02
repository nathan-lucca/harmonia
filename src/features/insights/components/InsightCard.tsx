import type { LucideIcon } from 'lucide-react'

interface InsightCardProps {
  label: string
  value: string
  detail?: string
  icon: LucideIcon
  accent?: string
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
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        padding: '20px',
        background: 'var(--color-surface-800)',
        border: '1px solid var(--color-surface-600)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transition: 'transform 0.2s',
      }}
    >
      {/* gradiente de fundo */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: accent,
          opacity: 0.08,
          filter: 'blur(32px)',
          pointerEvents: 'none',
        }}
      />

      {/* ícone */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${accent}20`,
          flexShrink: 0,
        }}
      >
        <Icon size={18} style={{ color: accent }} aria-hidden="true" />
      </div>

      {/* label */}
      <p
        style={{
          fontSize: '11px',
          fontWeight: 500,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </p>

      {/* valor principal */}
      <p
        style={{
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          fontSize: size === 'large' ? '36px' : '22px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </p>

      {/* detalhe */}
      {detail && (
        <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
          {detail}
        </p>
      )}
    </div>
  )
}
