'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Play,
  Shuffle,
  Clock,
  Trash2,
  Music,
  ArrowLeft,
  Heart,
} from 'lucide-react'
import { usePlaylistStore } from '@/features/playlists/store/playlistStore'
import { usePlayerStore } from '@/features/player/store/playerStore'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import { formatDuration, formatMinutes } from '@/utils/format'

interface PageProps {
  // no Next.js 15+, params é uma Promise
  params: Promise<{ id: string }>
}

export default function PlaylistDetailPage({ params }: PageProps) {
  // use() desencapsula a Promise de params — padrão do Next.js 15
  const { id } = use(params)

  const { getPlaylistById, removeTrack } = usePlaylistStore()
  const { play, currentTrack, isPlaying } = usePlayerStore()

  // track que está com confirmação de remoção pendente
  const [removingTrackId, setRemovingTrackId] = useState<string | null>(null)

  const playlist = getPlaylistById(id)

  // se a playlist não existir, renderiza a página 404
  if (!playlist) notFound()

  const totalMinutes = Math.floor(playlist.totalDurationMs / 60000)

  function handlePlayAll() {
    if (playlist.tracks.length === 0) return
    play(playlist.tracks[0], playlist.tracks)
  }

  function handlePlayShuffled() {
    if (playlist.tracks.length === 0) return
    const shuffled = [...playlist.tracks].sort(() => Math.random() - 0.5)
    play(shuffled[0], shuffled)
  }

  function handleRemoveTrack(trackId: string) {
    removeTrack(playlist.id, trackId)
    setRemovingTrackId(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* botão voltar */}
      <Link
        href="/playlists"
        className="flex w-fit items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
      >
        <ArrowLeft size={16} />
        Voltar para playlists
      </Link>

      {/* header da playlist */}
      <div className="flex items-end gap-6">
        {/* capa */}
        <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface-600)]">
          {playlist.coverUrl ? (
            <Image
              src={playlist.coverUrl}
              alt={playlist.name}
              width={160}
              height={160}
              unoptimized
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Music size={48} className="text-[var(--color-text-muted)]" />
            </div>
          )}
        </div>

        {/* info */}
        <div className="flex min-w-0 flex-col gap-3">
          <div>
            <p className="mb-1 text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
              Playlist
            </p>
            <h2 className="truncate text-3xl font-bold text-[var(--color-text-primary)]">
              {playlist.name}
            </h2>
            {playlist.description && (
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {playlist.description}
              </p>
            )}
          </div>

          {/* metadados */}
          <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
            <span className="flex items-center gap-1">
              <Music size={12} />
              {playlist.tracks.length} músicas
            </span>
            {totalMinutes > 0 && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {formatMinutes(totalMinutes)}
              </span>
            )}
          </div>

          {/* botões de ação */}
          <div className="flex gap-2">
            <Button
              variant="primary"
              leftIcon={<Play size={16} fill="white" />}
              onClick={handlePlayAll}
              disabled={playlist.tracks.length === 0}
            >
              Tocar tudo
            </Button>
            <Button
              variant="secondary"
              leftIcon={<Shuffle size={16} />}
              onClick={handlePlayShuffled}
              disabled={playlist.tracks.length === 0}
            >
              Aleatório
            </Button>
          </div>
        </div>
      </div>

      {/* lista de tracks */}
      {playlist.tracks.length === 0 ? (
        // estado vazio
        <div className="flex flex-col items-center justify-center gap-3 py-16">
          <Music size={48} className="text-[var(--color-text-muted)]" />
          <div className="text-center">
            <p className="font-medium text-[var(--color-text-primary)]">
              Nenhuma música ainda
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Adicione músicas para começar a ouvir.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* cabeçalho da tabela */}
          <div className="grid grid-cols-[2rem_1fr_1fr_4rem_2rem] gap-4 border-b border-[var(--color-surface-600)] px-4 py-2 text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase">
            <span>#</span>
            <span>Título</span>
            <span>Álbum</span>
            <span className="flex items-center justify-end">
              <Clock size={12} />
            </span>
            <span />
          </div>

          {/* tracks */}
          <ul role="list">
            {playlist.tracks.map((track, index) => {
              const isCurrentTrack = currentTrack?.id === track.id
              const isRemovingThis = removingTrackId === track.id

              return (
                <li
                  key={track.id}
                  className={cn(
                    'grid grid-cols-[2rem_1fr_1fr_4rem_2rem] gap-4 px-4 py-3',
                    'group cursor-pointer items-center rounded-lg transition-colors',
                    isCurrentTrack
                      ? 'bg-[var(--color-brand-500)]/10'
                      : 'hover:bg-[var(--color-surface-700)]'
                  )}
                  onClick={() => play(track, playlist.tracks)}
                >
                  {/* número / indicador tocando */}
                  <span className="flex items-center justify-center">
                    {isCurrentTrack && isPlaying ? (
                      <span className="flex h-3 items-end gap-0.5">
                        <span className="h-2 w-0.5 animate-pulse bg-[var(--color-brand-400)]" />
                        <span className="h-3 w-0.5 animate-pulse bg-[var(--color-brand-400)] delay-75" />
                        <span className="h-1.5 w-0.5 animate-pulse bg-[var(--color-brand-400)] delay-150" />
                      </span>
                    ) : (
                      <>
                        <span className="text-xs text-[var(--color-text-muted)] group-hover:hidden">
                          {index + 1}
                        </span>
                        <Play
                          size={12}
                          className="hidden fill-current text-[var(--color-text-primary)] group-hover:block"
                        />
                      </>
                    )}
                  </span>

                  {/* título e artista */}
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src={track.album.coverUrl}
                      alt={track.album.name}
                      width={36}
                      height={36}
                      unoptimized
                      className="flex-shrink-0 rounded-md bg-[var(--color-surface-600)]"
                    />
                    <div className="min-w-0">
                      <p
                        className={cn(
                          'truncate text-sm font-medium',
                          isCurrentTrack
                            ? 'text-[var(--color-brand-400)]'
                            : 'text-[var(--color-text-primary)]'
                        )}
                      >
                        {track.title}
                      </p>
                      <p className="truncate text-xs text-[var(--color-text-muted)]">
                        {track.artist.name}
                      </p>
                    </div>
                  </div>

                  {/* álbum */}
                  <p className="truncate text-sm text-[var(--color-text-muted)]">
                    {track.album.name}
                  </p>

                  {/* duração */}
                  <p className="text-right text-sm text-[var(--color-text-muted)]">
                    {formatDuration(track.durationMs)}
                  </p>

                  {/* botão remover */}
                  <div
                    className="flex items-center justify-center"
                    // para a propagação para não iniciar a reprodução ao clicar em remover
                    onClick={(e) => e.stopPropagation()}
                  >
                    {isRemovingThis ? (
                      // confirmação inline de exclusão
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleRemoveTrack(track.id)}
                          className="text-xs text-[var(--color-error)] hover:underline"
                        >
                          Sim
                        </button>
                        <span className="text-xs text-[var(--color-text-muted)]">
                          /
                        </span>
                        <button
                          onClick={() => setRemovingTrackId(null)}
                          className="text-xs text-[var(--color-text-muted)] hover:underline"
                        >
                          Não
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRemovingTrackId(track.id)}
                        aria-label={`Remover ${track.title} da playlist`}
                        className="text-[var(--color-text-muted)] opacity-0 transition-opacity group-hover:opacity-100 hover:text-[var(--color-error)]"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
