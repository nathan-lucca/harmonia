import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatMinutes } from '@/utils/format'
import type { PeriodStats } from '@/types/stats'

interface TopArtistsProps {
  artists: PeriodStats['topArtists']
}

export function TopArtists({ artists }: TopArtistsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Artistas</CardTitle>
      </CardHeader>
      <CardBody>
        <ul className="flex flex-col gap-3" role="list">
          {artists.map((artist) => (
            <li key={artist.id} className="flex items-center gap-3">
              {/* posição */}
              <span className="w-5 flex-shrink-0 text-right font-mono text-xs text-[var(--color-text-muted)]">
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

              {/* minutos ouvidos */}
              <Badge variant="default" className="flex-shrink-0">
                {formatMinutes(artist.minutesListened)}
              </Badge>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}
