import Image from 'next/image'
import { Check, AlertTriangle, X } from 'lucide-react'
import { useTransferStore } from '../store/transferStore'

export function ResultsStep() {
  const { results, setStep } = useTransferStore()

  const matched = results.filter((r) => r.matchStatus === 'matched')
  const lowConfidence = results.filter(
    (r) => r.matchStatus === 'low_confidence'
  )
  const notFound = results.filter((r) => r.matchStatus === 'not_found')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          Análise concluída
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
          }}
        >
          Encontramos {matched.length} de {results.length} músicas.
        </p>
      </div>

      {/* resumo */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}
      >
        {[
          {
            count: matched.length,
            label: 'encontradas',
            color: 'var(--color-success)',
            bg: 'color-mix(in srgb, var(--color-success) 12%, transparent)',
          },
          {
            count: lowConfidence.length,
            label: 'incertas',
            color: 'var(--color-warning)',
            bg: 'color-mix(in srgb, var(--color-warning) 12%, transparent)',
          },
          {
            count: notFound.length,
            label: 'não encontradas',
            color: 'var(--color-error)',
            bg: 'color-mix(in srgb, var(--color-error) 12%, transparent)',
          },
        ].map(({ count, label, color, bg }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '14px',
              borderRadius: '12px',
              background: bg,
            }}
          >
            <span style={{ fontSize: '24px', fontWeight: 700, color }}>
              {count}
            </span>
            <span
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                textAlign: 'center',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* lista detalhada */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          maxHeight: '240px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {results.map(({ track, matchStatus, confidence }) => (
          <div
            key={track.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: 'var(--color-surface-700)',
              border: '1px solid var(--color-surface-600)',
            }}
          >
            {/* ícone status */}
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background:
                  matchStatus === 'matched'
                    ? 'color-mix(in srgb, var(--color-success) 15%, transparent)'
                    : matchStatus === 'low_confidence'
                      ? 'color-mix(in srgb, var(--color-warning) 15%, transparent)'
                      : 'color-mix(in srgb, var(--color-error) 15%, transparent)',
              }}
            >
              {matchStatus === 'matched' && (
                <Check size={14} style={{ color: 'var(--color-success)' }} />
              )}
              {matchStatus === 'low_confidence' && (
                <AlertTriangle
                  size={14}
                  style={{ color: 'var(--color-warning)' }}
                />
              )}
              {matchStatus === 'not_found' && (
                <X size={14} style={{ color: 'var(--color-error)' }} />
              )}
            </div>

            {/* capa */}
            <Image
              src={track.album.coverUrl}
              alt={track.album.name}
              width={32}
              height={32}
              unoptimized
              style={{
                borderRadius: '6px',
                flexShrink: 0,
                background: 'var(--color-surface-600)',
              }}
            />

            {/* info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {track.title}
              </p>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
                {track.artist.name}
              </p>
            </div>

            {/* confiança */}
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '9999px',
                flexShrink: 0,
                color:
                  matchStatus === 'matched'
                    ? 'var(--color-success)'
                    : matchStatus === 'low_confidence'
                      ? 'var(--color-warning)'
                      : 'var(--color-error)',
                background:
                  matchStatus === 'matched'
                    ? 'color-mix(in srgb, var(--color-success) 12%, transparent)'
                    : matchStatus === 'low_confidence'
                      ? 'color-mix(in srgb, var(--color-warning) 12%, transparent)'
                      : 'color-mix(in srgb, var(--color-error) 12%, transparent)',
              }}
            >
              {matchStatus !== 'not_found'
                ? `${Math.round(confidence * 100)}%`
                : 'N/A'}
            </span>
          </div>
        ))}
      </div>

      {/* botão concluir */}
      <button
        onClick={() => setStep(6)}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          background: 'var(--color-brand-500)',
          color: 'white',
          fontSize: '14px',
          fontWeight: 500,
          border: 'none',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
      >
        Concluir transferência
      </button>
    </div>
  )
}
