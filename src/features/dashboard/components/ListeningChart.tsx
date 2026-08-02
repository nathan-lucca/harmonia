'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { formatMinutes } from '@/utils/format'
import type { DailyStat } from '@/types/stats'

interface ListeningChartProps {
  data: DailyStat[]
}

interface TooltipPayload {
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null

  return (
    <div
      className="rounded-lg border border-[var(--color-surface-600)] bg-[var(--color-surface-700)] shadow-lg"
      style={{ padding: '8px 12px' }}
    >
      <p
        className="text-xs text-[var(--color-text-muted)]"
        style={{ marginBottom: '2px' }}
      >
        {label}
      </p>
      <p className="text-sm font-semibold text-[var(--color-text-primary)]">
        {formatMinutes(payload[0].value)}
      </p>
    </div>
  )
}

export function ListeningChart({ data }: ListeningChartProps) {
  return (
    <div
      className="rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)]"
      style={{ padding: '20px' }}
    >
      <h3
        className="font-semibold text-[var(--color-text-primary)]"
        style={{ marginBottom: '16px', fontSize: '15px' }}
      >
        Minutos ouvidos por dia
      </h3>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 0, left: -20, bottom: 0 }}
        >
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

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--color-surface-600)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) => formatMinutes(value)}
          />

          <Tooltip content={<CustomTooltip />} />

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
    </div>
  )
}
