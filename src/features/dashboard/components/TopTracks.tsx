'use client'

import Image from 'next/image'
import { Heart, Play } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
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
    <Card>
      <CardHeader>
        <CardTitle>Top Músicas</CardTitle>
      </CardHeader>
      <CardBody>
        <ul className="flex flex-col gap-3" role="list">
          {tracks.map((track) => {
            const isCurrentTrack = currentTrack?.id === track.id

            return (
              <li
                key={track.id}
                className={cn(
                  '-mx-1.5 flex items-center gap-3 rounded-lg p-1.5',
                  'group cursor-pointer transition-colors',
                  isCurrentTrack
                    ? 'bg-[var(--color-brand-500)]/10'
                    : 'hover:bg-[var(--color-surface-700)]'
                )}
                onClick={() => play(track, tracks)}
              >
                {/* posição ou ícone de play */}
                <span className="flex w-5 flex-shrink-0 items-center justify-center">
                  {isCurrentTrack && isPlaying ? (
                    // indicador animado de "tocando agora"
                    <span className="flex h-3 items-end gap-0.5">
                      <span className="h-2 w-0.5 animate-pulse bg-[var(--color-brand-400)]" />
                      <span className="h-3 w-0.5 animate-pulse bg-[var(--color-brand-400)] delay-75" />
                      <span className="h-1.5 w-0.5 animate-pulse bg-[var(--color-brand-400)] delay-150" />
                    </span>
                  ) : (
                    <>
                      {/* número visível normalmente, play visível no hover */}
                      <span className="font-mono text-xs text-[var(--color-text-muted)] group-hover:hidden">
                        {track.position}
                      </span>
                      <Play
                        size={12}
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
                />

                {/* título e artista */}
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

                {/* plays e duração */}
                <div className="flex flex-shrink-0 items-center gap-2">
                  <Heart
                    size={14}
                    className={cn(
                      track.isLiked
                        ? 'fill-[var(--color-brand-500)] text-[var(--color-brand-500)]'
                        : 'text-[var(--color-text-muted)]'
                    )}
                    aria-label={track.isLiked ? 'Curtida' : 'Não curtida'}
                  />
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {track.playsCount}x
                  </span>
                  <span className="w-8 text-right text-xs text-[var(--color-text-muted)]">
                    {formatDuration(track.durationMs)}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </CardBody>
    </Card>
  )
}
