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

    const interval = setInterval(() => {
      const current = useTransferStore.getState().progress

      if (current >= 100) {
        clearInterval(interval)

        const results: TransferTrackResult[] = selectedPlaylist.tracks.map(
          (track) => {
            const random = Math.random()
            let matchStatus: TrackMatchStatus
            let confidence: number

            if (random < 0.7) {
              matchStatus = 'matched'
              confidence = 0.95 + Math.random() * 0.05
            } else if (random < 0.9) {
              matchStatus = 'low_confidence'
              confidence = 0.7 + Math.random() * 0.24
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '16px 0',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          Analisando músicas...
        </h3>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '6px',
            lineHeight: 1.5,
          }}
        >
          Buscando correspondências na plataforma de destino.
        </p>
      </div>

      {/* barra de progresso */}
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
            Progresso
          </span>
          <span
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {progress}%
          </span>
        </div>
        <div
          style={{
            height: '8px',
            borderRadius: '9999px',
            background: 'var(--color-surface-600)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '9999px',
              background: 'var(--color-brand-500)',
              width: `${progress}%`,
              transition: 'width 0.1s ease',
            }}
          />
        </div>
      </div>

      {/* lista de tracks sendo analisadas */}
      {selectedPlaylist && (
        <div
          style={{
            width: '100%',
            maxWidth: '360px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {selectedPlaylist.tracks.map((track, index) => {
            const trackProgress = (index / selectedPlaylist.tracks.length) * 100
            const isDone = progress > trackProgress + 20
            const isAnalyzing = progress >= trackProgress && !isDone

            return (
              <div
                key={track.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  opacity: isDone || isAnalyzing ? 1 : 0.3,
                  transition: 'opacity 0.3s',
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isDone ? (
                    <span
                      style={{
                        fontSize: '14px',
                        color: 'var(--color-success)',
                      }}
                    >
                      ✓
                    </span>
                  ) : isAnalyzing ? (
                    <div
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: '2px solid var(--color-brand-500)',
                        borderTopColor: 'transparent',
                      }}
                      className="animate-spin"
                    />
                  ) : (
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--color-surface-600)',
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
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
