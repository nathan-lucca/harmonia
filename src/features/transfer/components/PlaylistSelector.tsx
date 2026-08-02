import Image from 'next/image'
import { Music, Check } from 'lucide-react'
import { usePlaylistStore } from '@/features/playlists/store/playlistStore'
import { formatMinutes } from '@/utils/format'
import type { Playlist } from '@/types/music'

interface PlaylistSelectorProps {
  selected: Playlist | null
  onSelect: (playlist: Playlist) => void
}

export function PlaylistSelector({
  selected,
  onSelect,
}: PlaylistSelectorProps) {
  const { playlists } = usePlaylistStore()

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
          Selecione a playlist
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
          }}
        >
          Escolha qual playlist você quer transferir.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {playlists.map((playlist) => {
          const isSelected = selected?.id === playlist.id
          const totalMinutes = Math.floor(playlist.totalDurationMs / 60000)

          return (
            <button
              key={playlist.id}
              onClick={() => onSelect(playlist)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '12px',
                border: isSelected
                  ? '2px solid var(--color-brand-500)'
                  : '1px solid var(--color-surface-600)',
                background: isSelected
                  ? 'color-mix(in srgb, var(--color-brand-500) 10%, transparent)'
                  : 'var(--color-surface-700)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s',
              }}
            >
              {/* capa */}
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'var(--color-surface-600)',
                }}
              >
                {playlist.coverUrl ? (
                  <Image
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    width={44}
                    height={44}
                    unoptimized
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Music
                      size={18}
                      style={{ color: 'var(--color-text-muted)' }}
                    />
                  </div>
                )}
              </div>

              {/* info */}
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
                  {playlist.name}
                </p>
                <p
                  style={{
                    fontSize: '12px',
                    color: 'var(--color-text-muted)',
                    marginTop: '2px',
                  }}
                >
                  {playlist.tracks.length} músicas
                  {totalMinutes > 0 && ` · ${formatMinutes(totalMinutes)}`}
                </p>
              </div>

              {/* check */}
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
