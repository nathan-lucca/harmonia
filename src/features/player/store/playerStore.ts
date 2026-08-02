import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Track } from '@/types/music'

// QueueItem tem um ID único para a fila
// porque a mesma música pode aparecer duas vezes na fila
interface QueueItem {
  track: Track
  queueId: string
}

// RepeatMode controla o comportamento ao terminar uma faixa
type RepeatMode = 'off' | 'one' | 'all'

interface PlayerState {
  // estado atual
  currentTrack: Track | null
  queue: QueueItem[]
  isPlaying: boolean
  currentTimeMs: number
  volume: number // 0 a 1
  isMuted: boolean
  repeatMode: RepeatMode
  isShuffled: boolean
  isExpanded: boolean
  originalQueue: QueueItem[] // guarda a fila original antes do shuffle
}

interface PlayerActions {
  // ações principais
  play: (track: Track, queue?: Track[]) => void
  pause: () => void
  resume: () => void
  next: () => void
  previous: () => void
  seek: (timeMs: number) => void

  // volume
  setVolume: (volume: number) => void
  toggleMute: () => void

  // modos
  toggleShuffle: () => void
  cycleRepeat: () => void

  // fila
  addToQueue: (track: Track) => void
  removeFromQueue: (queueId: string) => void

  // UI
  setExpanded: (expanded: boolean) => void

  // tick do progresso (chamado pelo useEffect)
  tick: () => void
}

type PlayerStore = PlayerState & PlayerActions

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      // estado inicial
      currentTrack: null,
      queue: [],
      isPlaying: false,
      currentTimeMs: 0,
      volume: 0.8,
      isMuted: false,
      repeatMode: 'off',
      isShuffled: false,
      isExpanded: false,
      originalQueue: [],

      // toca uma faixa e define a fila
      play: (track, queue = []) => {
        const queueItems: QueueItem[] = queue.map((t) => ({
          track: t,
          queueId: crypto.randomUUID(),
        }))
        set({
          currentTrack: track,
          queue: queueItems,
          isPlaying: true,
          currentTimeMs: 0,
          originalQueue: queueItems,
        })
      },

      pause: () => set({ isPlaying: false }),

      resume: () => {
        // só retoma se houver uma faixa atual
        if (get().currentTrack) set({ isPlaying: true })
      },

      // avança para a próxima faixa da fila
      next: () => {
        const { queue, currentTrack, repeatMode } = get()
        if (!currentTrack || queue.length === 0) return

        const currentIndex = queue.findIndex(
          (q) => q.track.id === currentTrack.id
        )

        // repeat: one — reinicia a mesma faixa
        if (repeatMode === 'one') {
          set({ currentTimeMs: 0, isPlaying: true })
          return
        }

        // tem próxima faixa na fila
        if (currentIndex < queue.length - 1) {
          set({
            currentTrack: queue[currentIndex + 1].track,
            currentTimeMs: 0,
            isPlaying: true,
          })
          return
        }

        // chegou no fim da fila
        if (repeatMode === 'all') {
          // repeat: all — volta para o início
          set({
            currentTrack: queue[0].track,
            currentTimeMs: 0,
            isPlaying: true,
          })
        } else {
          // repeat: off — para de tocar
          set({ isPlaying: false, currentTimeMs: 0 })
        }
      },

      // volta para a faixa anterior
      previous: () => {
        const { queue, currentTrack, currentTimeMs } = get()
        if (!currentTrack) return

        // se passou mais de 3 segundos, reinicia a faixa atual
        if (currentTimeMs > 3000) {
          set({ currentTimeMs: 0 })
          return
        }

        const currentIndex = queue.findIndex(
          (q) => q.track.id === currentTrack.id
        )

        if (currentIndex > 0) {
          set({
            currentTrack: queue[currentIndex - 1].track,
            currentTimeMs: 0,
          })
        }
      },

      seek: (timeMs) => set({ currentTimeMs: timeMs }),

      setVolume: (volume) => set({ volume, isMuted: volume === 0 }),

      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      // embaralha a fila preservando a original para poder desfazer
      toggleShuffle: () => {
        const { isShuffled, queue, originalQueue, currentTrack } = get()

        if (isShuffled) {
          // desfaz o shuffle — volta para a fila original
          set({ isShuffled: false, queue: originalQueue })
        } else {
          // embaralha — remove a faixa atual e embaralha o resto
          const withoutCurrent = queue.filter(
            (q) => q.track.id !== currentTrack?.id
          )
          const shuffled = [...withoutCurrent].sort(() => Math.random() - 0.5)
          const currentItem = queue.find((q) => q.track.id === currentTrack?.id)
          // faixa atual fica no início da fila embaralhada
          const newQueue = currentItem ? [currentItem, ...shuffled] : shuffled
          set({ isShuffled: true, queue: newQueue })
        }
      },

      // cicla entre os modos: off → all → one → off
      cycleRepeat: () => {
        const modes: RepeatMode[] = ['off', 'all', 'one']
        const current = get().repeatMode
        const next = modes[(modes.indexOf(current) + 1) % modes.length]
        set({ repeatMode: next })
      },

      addToQueue: (track) => {
        const newItem: QueueItem = { track, queueId: crypto.randomUUID() }
        set((state) => ({ queue: [...state.queue, newItem] }))
      },

      removeFromQueue: (queueId) => {
        set((state) => ({
          queue: state.queue.filter((q) => q.queueId !== queueId),
        }))
      },

      setExpanded: (expanded) => set({ isExpanded: expanded }),

      // incrementa o progresso em 1 segundo — chamado pelo useEffect no PlayerBar
      tick: () => {
        // lê o estado atual diretamente do get() — nunca fica desatualizado
        const state = get()

        if (!state.isPlaying || !state.currentTrack) return

        if (state.currentTimeMs >= state.currentTrack.durationMs) {
          // repeatMode: one — reinicia a mesma faixa sem avançar
          if (state.repeatMode === 'one') {
            set({ currentTimeMs: 0 })
            return
          }

          // para os outros modos, chama o next() normalmente
          get().next()
        } else {
          set({ currentTimeMs: state.currentTimeMs + 1000 })
        }
      },
    }),
    {
      name: 'harmonia-player',
      // persiste APENAS volume e modos — não persiste a faixa atual
      // porque o áudio não estaria tocando de verdade ao reabrir
      partialize: (state) => ({
        volume: state.volume,
        isMuted: state.isMuted,
        repeatMode: state.repeatMode,
      }),
    }
  )
)
