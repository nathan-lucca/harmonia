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

export default function InsightsPage() {
  const { topArtists, topTracks, topGenres, totalMinutes, streakDays } =
    mockStats

  const topArtist = topArtists[0]
  const topTrack = topTracks[0]
  const topGenre = topGenres[0]

  return (
    <div className="flex flex-col gap-6">
      {/* título */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Insights
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Sua semana musical em números.
        </p>
      </div>

      {/* grid principal de insight cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          size="default"
        />
      </div>

      {/* segunda linha de cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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

      {/* card de retrospectiva */}
      <div className="rounded-2xl border border-[var(--color-brand-500)]/30 bg-gradient-to-br from-[var(--color-brand-600)] to-[#06B6D4]/60 p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-white/70" />
              <span className="text-xs font-medium tracking-wider text-white/70 uppercase">
                sua semana em resumo
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Foi uma boa semana musical! 🎶
            </h3>
            <p className="max-w-md text-sm text-white/80">
              Você ouviu <strong>{formatMinutes(totalMinutes)}</strong> de
              música, descobriu{' '}
              <strong>{mockStats.uniqueArtists} artistas</strong> e manteve uma
              sequência de <strong>{streakDays} dias</strong>. Seu gênero
              favorito foi <strong>{topGenre.genre}</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
