export interface Artist {
  id: string
  name: string
  imageUrl: string
  genres: string[]
  monthlyListeners: number
}

export interface Album {
  id: string
  name: string
  artistId: string
  artist: Pick<Artist, 'id' | 'name'>
  coverUrl: string
  releaseYear: number
}

export interface Track {
  id: string
  title: string
  artistId: string
  artist: Pick<Artist, 'id' | 'name'>
  albumId: string
  album: Pick<Album, 'id' | 'name' | 'coverUrl'>
  durationMs: number
  genres: string[]
  isLiked: boolean
}

export interface Playlist {
  id: string
  name: string
  description: string
  coverUrl?: string
  tracks: Track[]
  createdAt: string
  updatedAt: string
  isPublic: boolean
  totalDurationMs: number
}

export type TransferPlatform =
  'spotify' | 'deezer' | 'apple_music' | 'youtube_music' | 'tidal'
export type TransferStatus = 'idle' | 'analyzing' | 'completed' | 'error'
export type TrackMatchStatus = 'matched' | 'not_found' | 'low_confidence'

export interface TransferTrackResult {
  track: Track
  matchStatus: TrackMatchStatus
  confidence: number // 0-1
}
