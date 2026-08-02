import type { Playlist } from '@/types/music'
import { mockStats } from './stats'

// usamos as tracks do mockStats para popular as playlists
const allTracks = mockStats.topTracks

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Favoritas do Mês',
    description: 'As músicas que mais ouvi esse mês',
    coverUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=playlist1',
    tracks: allTracks.slice(0, 3),
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString(),
    isPublic: true,
    totalDurationMs: allTracks
      .slice(0, 3)
      .reduce((sum, t) => sum + t.durationMs, 0),
  },
  {
    id: '2',
    name: 'Indie Vibes',
    description: 'Indie rock para o dia a dia',
    coverUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=playlist2',
    tracks: allTracks.slice(1, 4),
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
    isPublic: false,
    totalDurationMs: allTracks
      .slice(1, 4)
      .reduce((sum, t) => sum + t.durationMs, 0),
  },
  {
    id: '3',
    name: 'Foco Total',
    description: 'Para trabalhar e estudar',
    coverUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=playlist3',
    tracks: allTracks.slice(2, 5),
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
    isPublic: false,
    totalDurationMs: allTracks
      .slice(2, 5)
      .reduce((sum, t) => sum + t.durationMs, 0),
  },
]
