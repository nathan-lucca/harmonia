'use client'

import Image from 'next/image'
import { Heart, Play } from 'lucide-react'
import { formatDuration } from '@/utils/format'
import { cn } from '@/utils/cn'
import { usePlayerStore } from '@/features/player/store/playerStore'
import type { PeriodStats } from '@/types/stats'

interface TopTracksProps {
  tracks: PeriodStats['topTracks']
}

export function TopTracks({ tracks }: TopTracksProps) {
  const { play, currentTrack, isPlaying } = usePlayerStore()

  return (
    <div
      className="rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)]"
      style={{ padding: '20px' }}
    >
      <h3
        className="font-semibold text-[var(--color-text-primary)]"
        style={{ marginBottom: '16px', fontSize: '15px' }}
      >
        Top Músicas
      </h3>

      <ul className="flex flex-col" style={{ gap: '4px' }} role="list">
        {tracks.map((track) => {
          const isCurrentTrack = currentTrack?.id === track.id

          return (
            <li
              key={track.id}
              className={cn(
                'group flex cursor-pointer items-center rounded-lg transition-colors',
                isCurrentTrack
                  ? 'bg-[var(--color-brand-500)]/10'
                  : 'hover:bg-[var(--color-surface-700)]'
              )}
              style={{ gap: '10px', padding: '8px' }}
              onClick={() => play(track, tracks)}
            >
              {/* posição ou indicador tocando */}
              <span
                className="flex flex-shrink-0 items-center justify-center"
                style={{ width: '18px' }}
              >
                {isCurrentTrack && isPlaying ? (
                  <span
                    className="flex items-end"
                    style={{ gap: '2px', height: '12px' }}
                  >
                    <span
                      className="w-0.5 animate-pulse bg-[var(--color-brand-400)]"
                      style={{ height: '8px' }}
                    />
                    <span
                      className="w-0.5 animate-pulse bg-[var(--color-brand-400)]"
                      style={{ height: '12px' }}
                    />
                    <span
                      className="w-0.5 animate-pulse bg-[var(--color-brand-400)]"
                      style={{ height: '6px' }}
                    />
                  </span>
                ) : (
                  <>
                    <span className="font-mono text-xs text-[var(--color-text-muted)] group-hover:hidden">
                      {track.position}
                    </span>
                    <Play
                      size={11}
                      className="hidden fill-current text-[var(--color-text-primary)] group-hover:block"
                    />
                  </>
                )}
              </span>

              {/* capa */}
              <Image
                src={track.album.coverUrl}
                alt={track.album.name}
                width={36}
                height={36}
                unoptimized
                className="flex-shrink-0 rounded-md bg-[var(--color-surface-600)]"
                style={{ width: '36px', height: '36px' }}
              />

              {/* título e artista — flex-1 para ocupar o espaço restante */}
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'truncate text-sm font-medium',
                    isCurrentTrack
                      ? 'text-[var(--color-brand-400)]'
                      : 'text-[var(--color-text-primary)]'
                  )}
                >
                  {track.title}
                </p>
                <p className="truncate text-xs text-[var(--color-text-muted)]">
                  {track.artist.name}
                </p>
              </div>

              {/* plays e duração — oculta plays no mobile para não apertar */}
              <div
                className="flex flex-shrink-0 items-center"
                style={{ gap: '6px' }}
              >
                <Heart
                  size={13}
                  className={cn(
                    track.isLiked
                      ? 'fill-[var(--color-brand-500)] text-[var(--color-brand-500)]'
                      : 'text-[var(--color-text-muted)]'
                  )}
                />
                {/* plays — oculto em telas pequenas */}
                <span className="hidden text-xs text-[var(--color-text-muted)] sm:inline">
                  {track.playsCount}x
                </span>
                <span
                  className="text-xs text-[var(--color-text-muted)] tabular-nums"
                  style={{ width: '32px', textAlign: 'right' }}
                >
                  {formatDuration(track.durationMs)}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
