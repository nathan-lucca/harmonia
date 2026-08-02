import { Clock, Users, Music, Flame } from 'lucide-react'
import { StatCard } from '@/features/dashboard/components/StatCard'
import { TopArtists } from '@/features/dashboard/components/TopArtists'
import { TopTracks } from '@/features/dashboard/components/TopTracks'
import { mockStats } from '@/mocks/stats'
import { formatMinutes } from '@/utils/format'
import { mockUser } from '@/mocks/user'

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* saudação */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Bom dia, {mockUser.name.split(' ')[0]}! 👋
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Aqui está um resumo da sua semana musical.
        </p>
      </div>

      {/* stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Minutos ouvidos"
          value={formatMinutes(mockStats.totalMinutes)}
          subtitle="essa semana"
          icon={Clock}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Artistas únicos"
          value={mockStats.uniqueArtists.toString()}
          subtitle="descobertos"
          icon={Users}
          trend="up"
          trendValue="+5"
        />
        <StatCard
          title="Músicas tocadas"
          value={mockStats.uniqueTracks.toString()}
          subtitle="faixas diferentes"
          icon={Music}
          trend="neutral"
          trendValue="estável"
        />
        <StatCard
          title="Sequência"
          value={`${mockStats.streakDays} dias`}
          subtitle="ouvindo música"
          icon={Flame}
          trend="up"
          trendValue="recorde!"
        />
      </div>

      {/* top artistas e top tracks lado a lado */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TopArtists artists={mockStats.topArtists} />
        <TopTracks tracks={mockStats.topTracks} />
      </div>
    </div>
  )
}
