'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Repeat1,
} from 'lucide-react'
import { usePlayerStore } from '../store/playerStore'
import { formatDuration } from '@/utils/format'
import { cn } from '@/utils/cn'

export function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTimeMs,
    volume,
    isMuted,
    repeatMode,
    isShuffled,
    pause,
    resume,
    next,
    previous,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
    tick,
  } = usePlayerStore()

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (isPlaying && currentTrack) {
      intervalRef.current = setInterval(() => tick(), 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, currentTrack?.id, tick])

  const progressPercent = currentTrack
    ? (currentTimeMs / currentTrack.durationMs) * 100
    : 0

  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat

  const iconBtn = (active?: boolean) =>
    cn(
      'flex items-center justify-center rounded-lg transition-colors',
      'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]',
      'hover:bg-[var(--color-surface-700)] disabled:opacity-30 disabled:cursor-not-allowed',
      active && 'text-[var(--color-brand-400)]'
    )

  return (
    <footer
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-[var(--color-surface-600)] bg-[var(--color-surface-800)]"
      aria-label="Reprodutor de música"
    >
      {/* ── layout desktop ── */}
      <div
        className="hidden items-center md:flex"
        style={{ height: '80px', padding: '0 24px', gap: '16px' }}
      >
        {/* info da faixa */}
        <div
          className="flex flex-shrink-0 items-center"
          style={{ width: '220px', gap: '12px' }}
        >
          <div
            className="flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-600)]"
            style={{ width: '44px', height: '44px' }}
          >
            {currentTrack && (
              <Image
                src={currentTrack.album.coverUrl}
                alt={currentTrack.album.name}
                width={44}
                height={44}
                unoptimized
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
              {currentTrack?.title ?? 'Nenhuma faixa'}
            </p>
            <p className="truncate text-xs text-[var(--color-text-muted)]">
              {currentTrack?.artist.name ?? '—'}
            </p>
          </div>
        </div>

        {/* controles centrais */}
        <div
          className="flex flex-1 flex-col items-center"
          style={{ gap: '6px' }}
        >
          {/* botões */}
          <div className="flex items-center" style={{ gap: '4px' }}>
            <button
              onClick={toggleShuffle}
              aria-label={
                isShuffled ? 'Desativar aleatório' : 'Ativar aleatório'
              }
              className={iconBtn(isShuffled)}
              style={{ width: '32px', height: '32px' }}
            >
              <Shuffle size={15} />
            </button>

            <button
              onClick={previous}
              disabled={!currentTrack}
              aria-label="Faixa anterior"
              className={iconBtn()}
              style={{ width: '32px', height: '32px' }}
            >
              <SkipBack size={17} />
            </button>

            {/* play/pause */}
            <button
              onClick={isPlaying ? pause : resume}
              disabled={!currentTrack}
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              className="flex flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] transition-colors hover:bg-[var(--color-brand-400)] disabled:opacity-40"
              style={{ width: '36px', height: '36px', margin: '0 4px' }}
            >
              {isPlaying ? (
                <Pause size={15} fill="white" className="text-white" />
              ) : (
                <Play size={15} fill="white" className="ml-0.5 text-white" />
              )}
            </button>

            <button
              onClick={next}
              disabled={!currentTrack}
              aria-label="Próxima faixa"
              className={iconBtn()}
              style={{ width: '32px', height: '32px' }}
            >
              <SkipForward size={17} />
            </button>

            <button
              onClick={cycleRepeat}
              aria-label={`Repetir: ${repeatMode}`}
              className={iconBtn(repeatMode !== 'off')}
              style={{ width: '32px', height: '32px' }}
            >
              <RepeatIcon size={15} />
            </button>
          </div>

          {/* barra de progresso */}
          <div
            className="flex w-full items-center"
            style={{ gap: '8px', maxWidth: '480px' }}
          >
            <span
              className="flex-shrink-0 text-xs text-[var(--color-text-muted)] tabular-nums"
              style={{ width: '36px', textAlign: 'right' }}
            >
              {formatDuration(currentTimeMs)}
            </span>
            <input
              type="range"
              min={0}
              max={currentTrack?.durationMs ?? 100}
              value={currentTimeMs}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!currentTrack}
              aria-label="Progresso da faixa"
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full disabled:cursor-default"
              style={{
                background: `linear-gradient(to right, var(--color-brand-500) ${progressPercent}%, var(--color-surface-600) ${progressPercent}%)`,
              }}
            />
            <span
              className="flex-shrink-0 text-xs text-[var(--color-text-muted)] tabular-nums"
              style={{ width: '36px' }}
            >
              {currentTrack ? formatDuration(currentTrack.durationMs) : '0:00'}
            </span>
          </div>
        </div>

        {/* volume */}
        <div
          className="flex flex-shrink-0 items-center"
          style={{ width: '160px', gap: '8px', justifyContent: 'flex-end' }}
        >
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
            className={iconBtn()}
            style={{ width: '32px', height: '32px' }}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.02}
            value={isMuted ? 0 : volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            aria-label="Volume"
            className="cursor-pointer appearance-none rounded-full"
            style={{
              width: '80px',
              height: '4px',
              background: `linear-gradient(to right, var(--color-brand-500) ${(isMuted ? 0 : volume) * 100}%, var(--color-surface-600) ${(isMuted ? 0 : volume) * 100}%)`,
            }}
          />
        </div>
      </div>

      {/* ── layout mobile ── */}
      <div
        className="flex flex-col md:hidden"
        style={{ padding: '10px 16px 14px' }}
      >
        {/* barra de progresso no topo */}
        <input
          type="range"
          min={0}
          max={currentTrack?.durationMs ?? 100}
          value={currentTimeMs}
          onChange={(e) => seek(Number(e.target.value))}
          disabled={!currentTrack}
          aria-label="Progresso da faixa"
          className="w-full cursor-pointer appearance-none rounded-full disabled:cursor-default"
          style={{
            height: '3px',
            marginBottom: '10px',
            background: `linear-gradient(to right, var(--color-brand-500) ${progressPercent}%, var(--color-surface-600) ${progressPercent}%)`,
          }}
        />

        {/* linha principal: info + controles */}
        <div className="flex items-center" style={{ gap: '12px' }}>
          {/* capa */}
          <div
            className="flex-shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-600)]"
            style={{ width: '40px', height: '40px' }}
          >
            {currentTrack && (
              <Image
                src={currentTrack.album.coverUrl}
                alt={currentTrack.album.name}
                width={40}
                height={40}
                unoptimized
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* título e artista */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
              {currentTrack?.title ?? 'Nenhuma faixa'}
            </p>
            <p className="truncate text-xs text-[var(--color-text-muted)]">
              {currentTrack?.artist.name ?? '—'}
            </p>
          </div>

          {/* controles essenciais no mobile */}
          <div
            className="flex flex-shrink-0 items-center"
            style={{ gap: '4px' }}
          >
            <button
              onClick={previous}
              disabled={!currentTrack}
              aria-label="Faixa anterior"
              className={iconBtn()}
              style={{ width: '36px', height: '36px' }}
            >
              <SkipBack size={18} />
            </button>

            <button
              onClick={isPlaying ? pause : resume}
              disabled={!currentTrack}
              aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
              className="flex flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] transition-colors hover:bg-[var(--color-brand-400)] disabled:opacity-40"
              style={{ width: '40px', height: '40px' }}
            >
              {isPlaying ? (
                <Pause size={16} fill="white" className="text-white" />
              ) : (
                <Play size={16} fill="white" className="ml-0.5 text-white" />
              )}
            </button>

            <button
              onClick={next}
              disabled={!currentTrack}
              aria-label="Próxima faixa"
              className={iconBtn()}
              style={{ width: '36px', height: '36px' }}
            >
              <SkipForward size={18} />
            </button>
          </div>
        </div>

        {/* tempo no mobile */}
        <div
          className="flex items-center justify-between"
          style={{ marginTop: '6px' }}
        >
          <span className="text-xs text-[var(--color-text-muted)] tabular-nums">
            {formatDuration(currentTimeMs)}
          </span>
          <span className="text-xs text-[var(--color-text-muted)] tabular-nums">
            {currentTrack ? formatDuration(currentTrack.durationMs) : '0:00'}
          </span>
        </div>
      </div>
    </footer>
  )
}
