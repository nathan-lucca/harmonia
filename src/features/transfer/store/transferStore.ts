import { create } from 'zustand'
import type {
  Playlist,
  TransferPlatform,
  TransferTrackResult,
  TransferStatus,
} from '@/types/music'

interface TransferStore {
  // estado do wizard
  step: number
  sourcePlatform: TransferPlatform | null
  selectedPlaylist: Playlist | null
  targetPlatform: TransferPlatform | null
  progress: number
  results: TransferTrackResult[]
  status: TransferStatus

  // ações
  setStep: (step: number) => void
  setSourcePlatform: (platform: TransferPlatform) => void
  setSelectedPlaylist: (playlist: Playlist) => void
  setTargetPlatform: (platform: TransferPlatform) => void
  setProgress: (progress: number) => void
  setResults: (results: TransferTrackResult[]) => void
  setStatus: (status: TransferStatus) => void
  reset: () => void
}

const initialState = {
  step: 1,
  sourcePlatform: null,
  selectedPlaylist: null,
  targetPlatform: null,
  progress: 0,
  results: [],
  status: 'idle' as TransferStatus,
}

export const useTransferStore = create<TransferStore>()((set) => ({
  ...initialState,

  setStep: (step) => set({ step }),
  setSourcePlatform: (platform) => set({ sourcePlatform: platform }),
  setSelectedPlaylist: (playlist) => set({ selectedPlaylist: playlist }),
  setTargetPlatform: (platform) => set({ targetPlatform: platform }),
  setProgress: (progress) => set({ progress }),
  setResults: (results) => set({ results }),
  setStatus: (status) => set({ status }),

  // reseta tudo para o estado inicial — botão "nova transferência"
  reset: () => set(initialState),
}))
