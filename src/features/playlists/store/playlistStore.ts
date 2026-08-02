import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Playlist } from '@/types/music'
import { mockPlaylists } from '@/mocks/playlists'
import type { PlaylistFormData } from '@/schemas/playlist.schema'

interface PlaylistStore {
  playlists: Playlist[]
  removeTrack: (playlistId: string, trackId: string) => void

  // CRUD
  createPlaylist: (data: PlaylistFormData) => Playlist
  updatePlaylist: (id: string, data: PlaylistFormData) => void
  deletePlaylist: (id: string) => void
  getPlaylistById: (id: string) => Playlist | undefined
}

export const usePlaylistStore = create<PlaylistStore>()(
  persist(
    (set, get) => ({
      // começa com os dados mockados
      playlists: mockPlaylists,

      createPlaylist: (data) => {
        const newPlaylist: Playlist = {
          id: crypto.randomUUID(),
          name: data.name,
          description: data.description ?? '',
          tracks: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isPublic: false,
          totalDurationMs: 0,
        }
        set((state) => ({ playlists: [newPlaylist, ...state.playlists] }))
        return newPlaylist
      },

      updatePlaylist: (id, data) => {
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === id
              ? { ...p, ...data, updatedAt: new Date().toISOString() }
              : p
          ),
        }))
      },

      deletePlaylist: (id) => {
        set((state) => ({
          playlists: state.playlists.filter((p) => p.id !== id),
        }))
      },

      removeTrack: (playlistId, trackId) => {
        set((state) => ({
          playlists: state.playlists.map((p) => {
            if (p.id !== playlistId) return p
            const updatedTracks = p.tracks.filter((t) => t.id !== trackId)
            return {
              ...p,
              tracks: updatedTracks,
              totalDurationMs: updatedTracks.reduce(
                (sum, t) => sum + t.durationMs,
                0
              ),
              updatedAt: new Date().toISOString(),
            }
          }),
        }))
      },

      getPlaylistById: (id) => {
        return get().playlists.find((p) => p.id === id)
      },
    }),
    { name: 'harmonia-playlists' }
  )
)
