import Image from 'next/image'
import { Music } from 'lucide-react'
import { cn } from '@/utils/cn'
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
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Selecione a playlist
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Escolha qual playlist você quer transferir.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {playlists.map((playlist) => {
          const isSelected = selected?.id === playlist.id
          const totalMinutes = Math.floor(playlist.totalDurationMs / 60000)

          return (
            <button
              key={playlist.id}
              onClick={() => onSelect(playlist)}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-3 text-left transition-all',
                isSelected
                  ? 'border-[var(--color-brand-500)] bg-[var(--color-brand-500)]/10'
                  : 'border-[var(--color-surface-600)] bg-[var(--color-surface-800)] hover:bg-[var(--color-surface-700)]'
              )}
            >
              {/* capa */}
              <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-600)]">
                {playlist.coverUrl ? (
                  <Image
                    src={playlist.coverUrl}
                    alt={playlist.name}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Music
                      size={20}
                      className="text-[var(--color-text-muted)]"
                    />
                  </div>
                )}
              </div>

              {/* info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-[var(--color-text-primary)]">
                  {playlist.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {playlist.tracks.length} músicas
                  {totalMinutes > 0 && ` · ${formatMinutes(totalMinutes)}`}
                </p>
              </div>

              {/* check */}
              {isSelected && (
                <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)]">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
