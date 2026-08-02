import { CheckCircle2 } from 'lucide-react'
import { useTransferStore } from '../store/transferStore'
import { platforms } from '@/mocks/platforms'

export function SummaryStep() {
  const { results, sourcePlatform, targetPlatform, selectedPlaylist, reset } =
    useTransferStore()

  const matched = results.filter((r) => r.matchStatus === 'matched').length
  const total = results.length
  const matchRate = total > 0 ? Math.round((matched / total) * 100) : 0

  const sourceInfo = platforms.find((p) => p.id === sourcePlatform)
  const targetInfo = platforms.find((p) => p.id === targetPlatform)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '16px 0',
        textAlign: 'center',
      }}
    >
      {/* ícone de sucesso */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background:
            'color-mix(in srgb, var(--color-success) 15%, transparent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CheckCircle2 size={36} style={{ color: 'var(--color-success)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          Transferência concluída!
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '360px',
          }}
        >
          A playlist{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {selectedPlaylist?.name}
          </strong>{' '}
          foi transferida de {sourceInfo?.name} para {targetInfo?.name} com{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {matchRate}% de correspondência
          </strong>
          .
        </p>
      </div>

      {/* estatísticas */}
      <div
        style={{
          width: '100%',
          maxWidth: '280px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px',
          borderRadius: '12px',
          background: 'var(--color-surface-700)',
          border: '1px solid var(--color-surface-600)',
        }}
      >
        {[
          {
            label: 'Total de músicas',
            value: total,
            color: 'var(--color-text-primary)',
          },
          {
            label: 'Encontradas',
            value: matched,
            color: 'var(--color-success)',
          },
          {
            label: 'Taxa de correspondência',
            value: `${matchRate}%`,
            color: 'var(--color-text-primary)',
          },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}
            >
              {label}
            </span>
            <span style={{ fontSize: '14px', fontWeight: 600, color }}>
              {value}
            </span>
          </div>
        ))}

        {/* barra de taxa */}
        <div
          style={{
            height: '6px',
            borderRadius: '9999px',
            background: 'var(--color-surface-600)',
            overflow: 'hidden',
            marginTop: '4px',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              background: 'var(--color-success)',
              width: `${matchRate}%`,
            }}
          />
        </div>
      </div>

      {/* ação */}
      <button
        onClick={reset}
        style={{
          padding: '10px 24px',
          borderRadius: '10px',
          background: 'var(--color-surface-700)',
          border: '1px solid var(--color-surface-600)',
          color: 'var(--color-text-primary)',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.15s',
        }}
      >
        Nova transferência
      </button>
    </div>
  )
}
