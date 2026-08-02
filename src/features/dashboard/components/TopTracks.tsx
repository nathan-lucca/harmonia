import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { formatDuration } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { PeriodStats } from '@/types/stats'

interface TopTracksProps {
  tracks: PeriodStats['topTracks']
}

export function TopTracks({ tracks }: TopTracksProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Músicas</CardTitle>
      </CardHeader>
      <CardBody>
        <ul className="flex flex-col gap-3" role="list">
          {tracks.map((track) => (
            <li key={track.id} className="flex items-center gap-3">
              {/* posição */}
              <span className="w-5 flex-shrink-0 text-right font-mono text-xs text-[var(--color-text-muted)]">
                {track.position}
              </span>

              {/* capa do álbum */}
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
                <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
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
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
