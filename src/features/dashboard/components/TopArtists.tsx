import Image from 'next/image'
import { Badge } from '@/components/ui/Badge'
import { formatMinutes } from '@/utils/format'
import type { PeriodStats } from '@/types/stats'

interface TopArtistsProps {
  artists: PeriodStats['topArtists']
}

export function TopArtists({ artists }: TopArtistsProps) {
  return (
    <div
      className="rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)]"
      style={{ padding: '20px' }}
    >
      <h3
        className="font-semibold text-[var(--color-text-primary)]"
        style={{ marginBottom: '16px', fontSize: '15px' }}
      >
        Top Artistas
      </h3>

      <ul className="flex flex-col" style={{ gap: '8px' }} role="list">
        {artists.map((artist) => (
          <li
            key={artist.id}
            className="flex items-center"
            style={{ gap: '12px' }}
          >
            {/* posição */}
            <span
              className="flex-shrink-0 text-right font-mono text-xs text-[var(--color-text-muted)]"
              style={{ width: '14px' }}
            >
              {artist.position}
            </span>

            {/* avatar */}
            <Image
              src={artist.imageUrl}
              alt={artist.name}
              width={36}
              height={36}
              unoptimized
              className="flex-shrink-0 rounded-full bg-[var(--color-surface-600)]"
              style={{ width: '36px', height: '36px' }}
            />

            {/* nome e gênero */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                {artist.name}
              </p>
              <p className="truncate text-xs text-[var(--color-text-muted)]">
                {artist.genres[0]}
              </p>
            </div>

            {/* duração — badge com padding garantido */}
            <Badge
              variant="default"
              className="flex-shrink-0 whitespace-nowrap"
            >
              {formatMinutes(artist.minutesListened)}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
