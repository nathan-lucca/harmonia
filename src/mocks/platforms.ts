import type { TransferPlatform } from '@/types/music'

export interface PlatformInfo {
  id: TransferPlatform
  name: string
  color: string
  bgColor: string
  emoji: string
}

export const platforms: PlatformInfo[] = [
  {
    id: 'spotify',
    name: 'Spotify',
    color: '#1DB954',
    bgColor: '#1DB95420',
    emoji: '🟢',
  },
  {
    id: 'deezer',
    name: 'Deezer',
    color: '#A238FF',
    bgColor: '#A238FF20',
    emoji: '🟣',
  },
  {
    id: 'apple_music',
    name: 'Apple Music',
    color: '#FC3C44',
    bgColor: '#FC3C4420',
    emoji: '🔴',
  },
  {
    id: 'youtube_music',
    name: 'YouTube Music',
    color: '#FF0000',
    bgColor: '#FF000020',
    emoji: '▶️',
  },
  {
    id: 'tidal',
    name: 'Tidal',
    color: '#00FFFF',
    bgColor: '#00FFFF20',
    emoji: '🔵',
  },
]
