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
