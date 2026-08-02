'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import type { GenreStat } from '@/types/stats'

interface GenreChartProps {
  genres: GenreStat[]
}

// substitui a interface e função:
interface TooltipPayload {
  payload: GenreStat
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  const data = payload[0].payload

  return (
    <div
      style={{
        borderRadius: '10px',
        border: '1px solid var(--color-surface-600)',
        background: 'var(--color-surface-700)',
        padding: '10px 14px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      <p
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
        }}
      >
        {data.genre}
      </p>
      <p
        style={{
          fontSize: '12px',
          color: 'var(--color-text-muted)',
          marginTop: '2px',
        }}
      >
        {data.percentage}% · {data.trackCount} músicas
      </p>
    </div>
  )
}

export function GenreChart({ genres }: GenreChartProps) {
  return (
    <div
      style={{
        borderRadius: '16px',
        border: '1px solid var(--color-surface-600)',
        background: 'var(--color-surface-800)',
        padding: '20px',
      }}
    >
      <h3
        style={{
          fontSize: '15px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '20px',
        }}
      >
        Distribuição de Gêneros
      </h3>

      <div
        style={{
          display: 'flex',
          gap: '24px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* gráfico donut */}
        <div style={{ flexShrink: 0 }}>
          <ResponsiveContainer width={180} height={180}>
            <PieChart>
              <Pie
                data={genres}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="percentage"
                strokeWidth={0}
              >
                {genres.map((genre, index) => (
                  <Cell key={index} fill={genre.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* legenda com barras */}
        <div
          style={{
            flex: 1,
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {genres.map((genre) => (
            <div
              key={genre.genre}
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      background: genre.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    {genre.genre}
                  </span>
                </div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                  }}
                >
                  {genre.percentage}%
                </span>
              </div>
              <div
                style={{
                  height: '4px',
                  borderRadius: '9999px',
                  background: 'var(--color-surface-600)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    borderRadius: '9999px',
                    background: genre.color,
                    width: `${genre.percentage}%`,
                    transition: 'width 0.5s',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
