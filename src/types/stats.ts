import type { Artist, Track } from './music'

export type TimePeriod = 'week' | 'month' | 'semester' | 'year'

export interface GenreStat {
  genre: string
  percentage: number
  color: string
  trackCount: number
}

export interface DailyStat {
  date: string // formato: "Seg", "Ter", "Qua"...
  minutes: number
}

export interface PeriodStats {
  totalMinutes: number
  uniqueArtists: number
  uniqueTracks: number
  streakDays: number
  topArtists: (Artist & { minutesListened: number; position: number })[]
  topTracks: (Track & { playsCount: number; position: number })[]
  topGenres: GenreStat[]
  dailyStats: DailyStat[]
}
