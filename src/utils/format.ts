// converte milisegundos para "3:45"
export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// converte minutos para "2h 47min"
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}min`

  const h = Math.floor(minutes / 60)
  const m = minutes % 60

  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

// formata números grandes: 18500000 -> "18.5M"
export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`

  return n.toString()
}
