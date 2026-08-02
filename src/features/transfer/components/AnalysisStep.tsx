'use client'

import { useEffect } from 'react'
import { useTransferStore } from '../store/transferStore'
import type { TransferTrackResult, TrackMatchStatus } from '@/types/music'

export function AnalysisStep() {
  const {
    selectedPlaylist,
    progress,
    setProgress,
    setResults,
    setStatus,
    setStep,
  } = useTransferStore()

  useEffect(() => {
    if (!selectedPlaylist) return

    setStatus('analyzing')
    setProgress(0)

    // simula o progresso da análise — incrementa 2% a cada 80ms
    // total: ~4 segundos para 100%
    const interval = setInterval(() => {
      const current = useTransferStore.getState().progress

      if (current >= 100) {
        clearInterval(interval)

        // gera resultados simulados para cada track
        const results: TransferTrackResult[] = selectedPlaylist.tracks.map(
          (track) => {
            // distribuição realista: 70% matched, 20% low_confidence, 10% not_found
            const random = Math.random()
            let matchStatus: TrackMatchStatus
            let confidence: number

            if (random < 0.7) {
              matchStatus = 'matched'
              confidence = 0.95 + Math.random() * 0.05 // 95-100%
            } else if (random < 0.9) {
              matchStatus = 'low_confidence'
              confidence = 0.7 + Math.random() * 0.24 // 70-94%
            } else {
              matchStatus = 'not_found'
              confidence = 0
            }

            return { track, matchStatus, confidence }
          }
        )

        setResults(results)
        setStatus('completed')
        setStep(5)
        return
      }

      setProgress(Math.min(current + 2, 100))
    }, 80)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="flex flex-col items-center gap-2">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Analisando músicas...
        </h3>
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          Buscando correspondências na plataforma de destino. Isso pode levar
          alguns segundos.
        </p>
      </div>

      {/* barra de progresso principal */}
      <div className="flex w-full max-w-sm flex-col gap-2">
        <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-600)]">
          <div
            className="h-full rounded-full bg-[var(--color-brand-500)] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* tracks sendo analisadas */}
      {selectedPlaylist && (
        <div className="flex w-full max-w-sm flex-col gap-2">
          {selectedPlaylist.tracks.map((track, index) => {
            // calcula qual track está sendo "analisada" baseado no progresso
            const trackProgress = (index / selectedPlaylist.tracks.length) * 100
            const isDone = progress > trackProgress + 20
            const isAnalyzing = progress >= trackProgress && !isDone

            return (
              <div
                key={track.id}
                className="flex items-center gap-3 py-1.5 transition-opacity"
                style={{ opacity: isDone || isAnalyzing ? 1 : 0.3 }}
              >
                {/* indicador de status */}
                <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center">
                  {isDone ? (
                    <span className="text-xs text-[var(--color-success)]">
                      ✓
                    </span>
                  ) : isAnalyzing ? (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-[var(--color-brand-500)] border-t-transparent" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-[var(--color-surface-600)]" />
                  )}
                </div>
                <span className="truncate text-sm text-[var(--color-text-secondary)]">
                  {track.title}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
