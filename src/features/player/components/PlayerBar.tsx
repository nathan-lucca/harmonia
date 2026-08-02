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

  // useRef guarda a referência do intervalo sem causar re-render
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // gerencia o intervalo de progresso
  // sempre que isPlaying ou currentTrack mudam, recria o intervalo
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    if (isPlaying && currentTrack) {
      intervalRef.current = setInterval(() => {
        tick()
      }, 1000)
    }

    // cleanup: cancela o intervalo quando o componente desmonta
    // ou quando isPlaying/currentTrack mudam
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, currentTrack?.id, tick])

  // calcula a porcentagem de progresso para a barra visual
  const progressPercent = currentTrack
    ? (currentTimeMs / currentTrack.durationMs) * 100
    : 0

  // ícone do repeat muda conforme o modo
  const RepeatIcon = repeatMode === 'one' ? Repeat1 : Repeat

  return (
    <footer
      className="fixed right-0 bottom-0 left-0 z-50 flex h-20 items-center justify-between border-t border-[var(--color-surface-600)] bg-[var(--color-surface-800)] px-6"
      aria-label="Reprodutor de música"
    >
      {/* info da faixa */}
      <div className="flex w-64 min-w-0 items-center gap-3">
        {currentTrack ? (
          <>
            <Image
              src={currentTrack.album.coverUrl}
              alt={currentTrack.album.name}
              width={44}
              height={44}
              unoptimized
              className="flex-shrink-0 rounded-md bg-[var(--color-surface-600)]"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                {currentTrack.title}
              </p>
              <p className="truncate text-xs text-[var(--color-text-muted)]">
                {currentTrack.artist.name}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="h-11 w-11 flex-shrink-0 rounded-md bg-[var(--color-surface-600)]" />
            <p className="text-sm text-[var(--color-text-muted)]">
              Nenhuma faixa selecionada
            </p>
          </>
        )}
      </div>

      {/* controles centrais */}
      <div className="flex max-w-md flex-1 flex-col items-center gap-2">
        {/* botões */}
        <div className="flex items-center gap-3">
          {/* shuffle */}
          <button
            onClick={toggleShuffle}
            aria-label={isShuffled ? 'Desativar aleatório' : 'Ativar aleatório'}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              isShuffled
                ? 'text-[var(--color-brand-400)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}
          >
            <Shuffle size={15} />
          </button>

          {/* anterior */}
          <button
            onClick={previous}
            aria-label="Faixa anterior"
            disabled={!currentTrack}
            className="p-1.5 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] disabled:opacity-30"
          >
            <SkipBack size={18} />
          </button>

          {/* play / pause - botão principal */}
          <button
            onClick={isPlaying ? pause : resume}
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
            disabled={!currentTrack}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)] transition-colors hover:bg-[var(--color-brand-400)] disabled:opacity-30"
          >
            {isPlaying ? (
              <Pause size={16} fill="white" className="text-white" />
            ) : (
              <Play size={16} fill="white" className="ml-0.5 text-white" />
            )}
          </button>

          {/* próxima */}
          <button
            onClick={next}
            aria-label="Próxima faixa"
            disabled={!currentTrack}
            className="p-1.5 text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-text-primary)] disabled:opacity-30"
          >
            <SkipForward size={18} />
          </button>

          {/* repeat */}
          <button
            onClick={cycleRepeat}
            aria-label={`Modo repetir: ${repeatMode}`}
            className={cn(
              'rounded-md p-1.5 transition-colors',
              repeatMode !== 'off'
                ? 'text-[var(--color-brand-400)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}
          >
            <RepeatIcon size={15} />
          </button>
        </div>

        {/* barra de progresso */}
        <div className="flex w-full items-center gap-2">
          <span className="w-8 flex-shrink-0 text-right text-xs text-[var(--color-text-muted)]">
            {formatDuration(currentTimeMs)}
          </span>

          {/*
            input range como barra de progresso clicável.
            ao clicar em qualquer ponto, o seek() move para aquele momento.
          */}
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

          <span className="w-8 flex-shrink-0 text-xs text-[var(--color-text-muted)]">
            {currentTrack ? formatDuration(currentTrack.durationMs) : '0:00'}
          </span>
        </div>
      </div>

      {/* volume */}
      <div className="flex w-64 items-center justify-end gap-2">
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
          className="p-1.5 text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
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
          aria-valuenow={Math.round((isMuted ? 0 : volume) * 100)}
          aria-valuetext={`${Math.round((isMuted ? 0 : volume) * 100)}%`}
          className="h-1 w-24 cursor-pointer appearance-none rounded-full"
          style={{
            background: `linear-gradient(to right, var(--color-brand-500) ${(isMuted ? 0 : volume) * 100}%, var(--color-surface-600) ${(isMuted ? 0 : volume) * 100}%)`,
          }}
        />
      </div>
    </footer>
  )
}
