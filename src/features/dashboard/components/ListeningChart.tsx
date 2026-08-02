'use client'

// Recharts precisa do 'use client' porque usa APIs do browser (SVG, resize, mouse events)
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  type TooltipProps,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardBody } from '@/components/ui/Card'
import { formatMinutes } from '@/utils/format'
import type { DailyStat } from '@/types/stats'

interface ListeningChartProps {
  data: DailyStat[]
}

// Tooltip customizado — substitui o tooltip padrão feio do Recharts
// pelo nosso visual com as CSS variables do design system
function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  // "active" é true só quando o mouse está sobre um ponto do gráfico
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-[var(--color-surface-600)] bg-[var(--color-surface-700)] px-3 py-2 shadow-lg">
      <p className="mb-1 text-xs text-[var(--color-text-muted)]">{label}</p>
      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
        {formatMinutes(payload[0].value as number)}
      </p>
    </div>
  )
}

export function ListeningChart({ data }: ListeningChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Minutos ouvidos por dia</CardTitle>
      </CardHeader>
      <CardBody>
        {/*
          ResponsiveContainer: faz o gráfico ocupar 100% da largura do container
          e altura fixa de 220px. Sem isso o Recharts precisa de width/height fixos.
        */}
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart
            data={data}
            margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
            // left: -20 empurra o eixo Y para a esquerda, economizando espaço
          >
            {/*
              defs: define o gradiente que será usado como preenchimento da área.
              O gradiente vai de 30% de opacidade no topo até 0% na base —
              cria o efeito de "área preenchida" sem ficar pesado visualmente.
            */}
            <defs>
              <linearGradient id="gradientMinutes" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-brand-500)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-brand-500)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            {/*
              CartesianGrid: linhas de grade horizontais sutis.
              strokeDasharray="3 3" cria linha tracejada.
              vertical={false} remove as linhas verticais — menos poluição visual.
            */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-surface-600)"
              vertical={false}
            />

            {/*
              XAxis: eixo horizontal com os dias da semana.
              tick: customiza a cor e tamanho do texto dos labels.
              axisLine/tickLine: remove as linhas do eixo — visual mais limpo.
            */}
            <XAxis
              dataKey="date"
              tick={{
                fill: 'var(--color-text-muted)',
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
            />

            {/*
              YAxis: eixo vertical com os valores de minutos.
              tickFormatter: formata os números (120 → "2h", 45 → "45min").
            */}
            <YAxis
              tick={{
                fill: 'var(--color-text-muted)',
                fontSize: 12,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => formatMinutes(value)}
            />

            {/* Tooltip customizado que criamos acima */}
            <Tooltip content={<CustomTooltip />} />

            {/*
              Area: o elemento principal do gráfico.
              type="monotone": suaviza a linha (sem ângulos abruptos).
              stroke: cor da linha superior.
              fill: usa o gradiente que definimos no <defs>.
              strokeWidth: espessura da linha.
              dot={false}: remove os pontos em cada dado — visual mais limpo.
              activeDot: ponto que aparece só quando o mouse está sobre o gráfico.
            */}
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="var(--color-brand-500)"
              fill="url(#gradientMinutes)"
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 4,
                fill: 'var(--color-brand-500)',
                stroke: 'var(--color-surface-800)',
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  )
}
