import {
  Mic2,
  Music,
  Tag,
  Flame,
  Clock,
  Disc3,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import { InsightCard } from '@/features/insights/components/InsightCard'
import { GenreChart } from '@/features/insights/components/GenreChart'
import { mockStats } from '@/mocks/stats'
import { formatMinutes } from '@/utils/format'
import { mockUser } from '@/mocks/user'

export default function InsightsPage() {
  const { topArtists, topTracks, topGenres, totalMinutes, streakDays } =
    mockStats

  const topArtist = topArtists[0]
  const topTrack = topTracks[0]
  const topGenre = topGenres[0]

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* título */}
      <div>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          Insights
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
          }}
        >
          Sua semana musical em números.
        </p>
      </div>

      {/* grid principal — 4 cards */}
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        }}
      >
        <InsightCard
          label="artista do mês"
          value={topArtist.name}
          detail={`${formatMinutes(topArtist.minutesListened)} ouvidos`}
          icon={Mic2}
          accent="#7C5CFC"
        />
        <InsightCard
          label="música mais tocada"
          value={topTrack.title}
          detail={`${topTrack.playsCount} reproduções`}
          icon={Music}
          accent="#06B6D4"
        />
        <InsightCard
          label="gênero dominante"
          value={topGenre.genre}
          detail={`${topGenre.percentage}% das reproduções`}
          icon={Tag}
          accent="#F59E0B"
        />
        <InsightCard
          label="sequência atual"
          value={`${streakDays} dias`}
          detail="ouvindo música todo dia"
          icon={Flame}
          accent="#EF4444"
        />
      </div>

      {/* segunda linha — 3 cards */}
      <div
        style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        <InsightCard
          label="tempo total"
          value={formatMinutes(totalMinutes)}
          detail="essa semana"
          icon={Clock}
          accent="#22C55E"
        />
        <InsightCard
          label="artistas únicos"
          value={mockStats.uniqueArtists.toString()}
          detail="artistas diferentes"
          icon={Disc3}
          accent="#7C5CFC"
        />
        <InsightCard
          label="músicas tocadas"
          value={mockStats.uniqueTracks.toString()}
          detail="faixas diferentes"
          icon={TrendingUp}
          accent="#06B6D4"
        />
      </div>

      {/* gráfico de gêneros */}
      <GenreChart genres={topGenres} />
    </div>
  )
}
