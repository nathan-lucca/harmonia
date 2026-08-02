'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import type { GenreStat } from '@/types/stats'

interface GenreChartProps {
  genres: GenreStat[]
}

// tooltip customizado para o gráfico de pizza
function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload as GenreStat

  return (
    <div className="rounded-lg border border-[var(--color-surface-600)] bg-[var(--color-surface-700)] px-3 py-2 shadow-lg">
      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
        {data.genre}
      </p>
      <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
        {data.percentage}% · {data.trackCount} músicas
      </p>
    </div>
  )
}

export function GenreChart({ genres }: GenreChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Gêneros</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="flex items-center gap-6">
          {/* gráfico de pizza */}
          <div className="flex-shrink-0">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={genres}
                  cx="50%"
                  cy="50%"
                  innerRadius={50} // innerRadius cria o efeito "donut"
                  outerRadius={80}
                  dataKey="percentage"
                  strokeWidth={0} // sem borda entre os segmentos
                >
                  {genres.map((genre, index) => (
                    <Cell key={index} fill={genre.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* legenda com barras de progresso */}
          <div className="flex flex-1 flex-col gap-3">
            {genres.map((genre) => (
              <div key={genre.genre} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* bolinha colorida */}
                    <div
                      className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ background: genre.color }}
                    />
                    <span className="text-sm text-[var(--color-text-primary)]">
                      {genre.genre}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                    {genre.percentage}%
                  </span>
                </div>
                {/* barra de progresso */}
                <div className="h-1 overflow-hidden rounded-full bg-[var(--color-surface-600)]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${genre.percentage}%`,
                      background: genre.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
