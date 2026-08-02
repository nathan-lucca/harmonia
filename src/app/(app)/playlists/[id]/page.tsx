'use client'

import { use, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Play, Shuffle, Clock, Trash2, Music, ArrowLeft } from 'lucide-react'
import { usePlaylistStore } from '@/features/playlists/store/playlistStore'
import { usePlayerStore } from '@/features/player/store/playerStore'
import { Modal } from '@/components/ui/Modal'
import { formatDuration, formatMinutes } from '@/utils/format'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function PlaylistDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { getPlaylistById, removeTrack } = usePlaylistStore()
  const { play, currentTrack, isPlaying } = usePlayerStore()
  const [trackToRemove, setTrackToRemove] = useState<{
    id: string
    title: string
  } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const playlist = getPlaylistById(id)

  // aguarda o cliente montar antes de renderizar
  if (!mounted) return null
  if (!playlist) notFound()

  // a partir daqui o TypeScript precisa saber que playlist existe
  const totalMinutes = Math.floor(playlist!.totalDurationMs / 60000)

  function handlePlayAll() {
    if (playlist!.tracks.length === 0) return
    play(playlist!.tracks[0], playlist!.tracks)
  }

  function handlePlayShuffled() {
    if (playlist!.tracks.length === 0) return
    const shuffled = [...playlist!.tracks].sort(() => Math.random() - 0.5)
    play(shuffled[0], shuffled)
  }

  function handleRemoveTrack() {
    if (!trackToRemove) return
    removeTrack(playlist!.id, trackToRemove.id)
    setTrackToRemove(null)
  }

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* botão voltar */}
      <Link
        href="/playlists"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          textDecoration: 'none',
          width: 'fit-content',
        }}
      >
        <ArrowLeft size={16} />
        Voltar para playlists
      </Link>

      {/* header da playlist */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '24px',
          flexWrap: 'wrap',
        }}
      >
        {/* capa */}
        <div
          style={{
            width: '160px',
            height: '160px',
            borderRadius: '16px',
            overflow: 'hidden',
            flexShrink: 0,
            background: 'var(--color-surface-600)',
          }}
        >
          {playlist.coverUrl ? (
            <Image
              src={playlist.coverUrl}
              alt={playlist.name}
              width={160}
              height={160}
              unoptimized
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Music size={48} style={{ color: 'var(--color-text-muted)' }} />
            </div>
          )}
        </div>

        {/* info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            minWidth: 0,
            flex: 1,
          }}
        >
          <div>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '4px',
              }}
            >
              Playlist
            </p>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {playlist.name}
            </h2>
            {playlist.description && (
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-secondary)',
                  marginTop: '4px',
                }}
              >
                {playlist.description}
              </p>
            )}
          </div>

          {/* metadados */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              fontSize: '13px',
              color: 'var(--color-text-muted)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Music size={12} />
              <span suppressHydrationWarning>
                {playlist.tracks.length} músicas
              </span>
            </div>
            {totalMinutes > 0 && (
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Clock size={12} />
                <span suppressHydrationWarning>
                  {formatMinutes(totalMinutes)}
                </span>
              </div>
            )}
          </div>

          {/* botões */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={handlePlayAll}
              disabled={playlist.tracks.length === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '10px',
                background: 'var(--color-brand-500)',
                color: 'white',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                cursor:
                  playlist.tracks.length === 0 ? 'not-allowed' : 'pointer',
                opacity: playlist.tracks.length === 0 ? 0.5 : 1,
              }}
            >
              <Play size={16} fill="white" />
              Tocar tudo
            </button>
            <button
              onClick={handlePlayShuffled}
              disabled={playlist.tracks.length === 0}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '10px',
                background: 'var(--color-surface-700)',
                color: 'var(--color-text-primary)',
                fontSize: '14px',
                fontWeight: 500,
                border: '1px solid var(--color-surface-600)',
                cursor:
                  playlist.tracks.length === 0 ? 'not-allowed' : 'pointer',
                opacity: playlist.tracks.length === 0 ? 0.5 : 1,
              }}
            >
              <Shuffle size={16} />
              Aleatório
            </button>
          </div>
        </div>
      </div>

      {/* lista de tracks */}
      {playlist.tracks.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '64px 0',
          }}
        >
          <Music size={48} style={{ color: 'var(--color-text-muted)' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Nenhuma música ainda
            </p>
            <p
              style={{
                fontSize: '14px',
                color: 'var(--color-text-secondary)',
                marginTop: '4px',
              }}
            >
              Adicione músicas para começar a ouvir.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* cabeçalho */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '32px 1fr 64px 32px',
              gap: '16px',
              padding: '8px 16px',
              borderBottom: '1px solid var(--color-surface-600)',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            <span>#</span>
            <span>Título</span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Clock size={12} />
            </span>
            <span />
          </div>

          {/* tracks */}
          <ul
            role="list"
            style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}
          >
            {playlist.tracks.map((track, index) => {
              const isCurrentTrack = currentTrack?.id === track.id

              return (
                <li
                  key={track.id}
                  onClick={() => play(track, playlist.tracks)}
                  className="group hover:bg-[var(--color-surface-700)]"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr 64px 32px',
                    gap: '16px',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    alignItems: 'center',
                    background: isCurrentTrack
                      ? 'color-mix(in srgb, var(--color-brand-500) 10%, transparent)'
                      : 'transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  {/* número / play */}
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isCurrentTrack && isPlaying ? (
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'flex-end',
                          gap: '2px',
                          height: '12px',
                        }}
                      >
                        <span
                          style={{
                            width: '2px',
                            height: '8px',
                            background: 'var(--color-brand-400)',
                          }}
                          className="animate-pulse"
                        />
                        <span
                          style={{
                            width: '2px',
                            height: '12px',
                            background: 'var(--color-brand-400)',
                          }}
                          className="animate-pulse"
                        />
                        <span
                          style={{
                            width: '2px',
                            height: '6px',
                            background: 'var(--color-brand-400)',
                          }}
                          className="animate-pulse"
                        />
                      </span>
                    ) : (
                      <>
                        <span
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                          }}
                          className="group-hover:hidden"
                        >
                          {index + 1}
                        </span>
                        <Play
                          size={12}
                          className="hidden fill-current group-hover:block"
                          style={{ color: 'var(--color-text-primary)' }}
                        />
                      </>
                    )}
                  </span>

                  {/* título e artista */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      minWidth: 0,
                    }}
                  >
                    <Image
                      src={track.album.coverUrl}
                      alt={track.album.name}
                      width={36}
                      height={36}
                      unoptimized
                      style={{
                        borderRadius: '6px',
                        flexShrink: 0,
                        background: 'var(--color-surface-600)',
                      }}
                    />
                    <div style={{ minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          color: isCurrentTrack
                            ? 'var(--color-brand-400)'
                            : 'var(--color-text-primary)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {track.title}
                      </p>
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--color-text-muted)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {track.artist.name} · {track.album.name}
                      </p>
                    </div>
                  </div>

                  {/* duração */}
                  <p
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-muted)',
                      textAlign: 'right',
                    }}
                  >
                    {formatDuration(track.durationMs)}
                  </p>

                  {/* remover */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setTrackToRemove({ id: track.id, title: track.title })
                      }
                      aria-label={`Remover ${track.title}`}
                      className="opacity-0 group-hover:opacity-100"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-text-muted)',
                        transition: 'all 0.15s',
                        padding: '4px',
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {/* modal: confirmar remoção */}
      <Modal
        isOpen={!!trackToRemove}
        onClose={() => setTrackToRemove(null)}
        title="Remover música"
        size="sm"
      >
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Tem certeza que deseja remover{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {trackToRemove?.title}
          </strong>{' '}
          desta playlist?
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '8px',
          }}
        >
          <button
            onClick={() => setTrackToRemove(null)}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              background: 'transparent',
              border: '1px solid var(--color-surface-600)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleRemoveTrack}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: 500,
              background: 'var(--color-error)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Remover
          </button>
        </div>
      </Modal>
    </div>
  )
}
