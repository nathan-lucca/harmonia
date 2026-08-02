import { Check } from 'lucide-react'
import { platforms, type PlatformInfo } from '@/mocks/platforms'
import type { TransferPlatform } from '@/types/music'

interface PlatformSelectorProps {
  title: string
  subtitle: string
  selected: TransferPlatform | null
  excluded?: TransferPlatform | null
  onSelect: (platform: TransferPlatform) => void
}

export function PlatformSelector({
  title,
  subtitle,
  selected,
  excluded,
  onSelect,
}: PlatformSelectorProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '10px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}
      >
        {platforms.map((platform: PlatformInfo) => {
          const isExcluded = platform.id === excluded
          const isSelected = platform.id === selected

          return (
            <button
              key={platform.id}
              onClick={() => !isExcluded && onSelect(platform.id)}
              disabled={isExcluded}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px',
                borderRadius: '12px',
                border: isSelected
                  ? '2px solid var(--color-brand-500)'
                  : '1px solid var(--color-surface-600)',
                background: isSelected
                  ? 'color-mix(in srgb, var(--color-brand-500) 10%, transparent)'
                  : 'var(--color-surface-700)',
                cursor: isExcluded ? 'not-allowed' : 'pointer',
                opacity: isExcluded ? 0.4 : 1,
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '22px', flexShrink: 0 }}>
                {platform.emoji}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {platform.name}
                </p>
                {isExcluded && (
                  <p
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    já selecionada
                  </p>
                )}
              </div>
              {isSelected && (
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'var(--color-brand-500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Check size={12} style={{ color: 'white' }} />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
