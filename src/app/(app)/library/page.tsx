'use client'

import { useState, useMemo, useTransition, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, LayoutGrid, List, Play, Heart, X } from 'lucide-react'
import { useDebounce } from '@/hooks/useDebounce'
import { usePlayerStore } from '@/features/player/store/playerStore'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/utils/cn'
import { formatDuration, formatNumber } from '@/utils/format'
import {
  mockTracks,
  mockArtists,
  mockAlbums,
  mockGenres,
} from '@/mocks/library'

type LibraryTab = 'tracks' | 'artists' | 'albums'

const TABS: { id: LibraryTab; label: string }[] = [
  { id: 'tracks', label: 'Músicas' },
  { id: 'artists', label: 'Artistas' },
  { id: 'albums', label: 'Álbuns' },
]

function LibraryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTab = (searchParams.get('tab') as LibraryTab) ?? 'tracks'

  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [isPending, startTransition] = useTransition()

  const debouncedSearch = useDebounce(search, 300)
  const { play, currentTrack, isPlaying } = usePlayerStore()

  function handleTabChange(tab: LibraryTab) {
    startTransition(() => {
      router.push(`/library?tab=${tab}`)
      setSearch('')
      setSelectedGenre(null)
    })
  }

  const filteredTracks = useMemo(() => {
    return mockTracks.filter((track) => {
      const matchesSearch =
        !debouncedSearch ||
        track.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        track.artist.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        track.album.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesGenre =
        !selectedGenre || track.genres.includes(selectedGenre)
      return matchesSearch && matchesGenre
    })
  }, [debouncedSearch, selectedGenre])

  const filteredArtists = useMemo(() => {
    return mockArtists.filter(
      (artist) =>
        !debouncedSearch ||
        artist.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [debouncedSearch])

  const filteredAlbums = useMemo(() => {
    return mockAlbums.filter(
      (album) =>
        !debouncedSearch ||
        album.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        album.artist.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [debouncedSearch])

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
      {/* título */}
      <div>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          Biblioteca
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
          }}
        >
          Toda a sua música em um só lugar.
        </p>
      </div>

      {/* tabs */}
      <div
        style={{
          borderBottom: '1px solid var(--color-surface-600)',
          display: 'flex',
          gap: '4px',
        }}
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            style={{
              padding: '10px 16px',
              fontSize: '14px',
              fontWeight: 500,
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom:
                activeTab === id
                  ? '2px solid var(--color-brand-500)'
                  : '2px solid transparent',
              marginBottom: '-1px',
              color:
                activeTab === id
                  ? 'var(--color-brand-400)'
                  : 'var(--color-text-secondary)',
              background: 'none',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* busca + alternância */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        {/* campo de busca */}
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
            }}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              activeTab === 'tracks'
                ? 'Buscar músicas...'
                : activeTab === 'artists'
                  ? 'Buscar artistas...'
                  : 'Buscar álbuns...'
            }
            style={{
              width: '100%',
              padding: '10px 36px',
              fontSize: '14px',
              borderRadius: '10px',
              background: 'var(--color-surface-700)',
              border: '1px solid var(--color-surface-600)',
              color: 'var(--color-text-primary)',
              outline: 'none',
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              aria-label="Limpar busca"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* lista / grade */}
        <div
          style={{
            display: 'flex',
            border: '1px solid var(--color-surface-600)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {[
            { mode: 'list' as const, Icon: List, label: 'Lista' },
            { mode: 'grid' as const, Icon: LayoutGrid, label: 'Grade' },
          ].map(({ mode, Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              aria-label={`Visualização em ${label}`}
              style={{
                padding: '8px 10px',
                background:
                  viewMode === mode
                    ? 'var(--color-surface-600)'
                    : 'transparent',
                color:
                  viewMode === mode
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-muted)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      {/* filtros de gênero */}
      {activeTab === 'tracks' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            { id: null, label: 'Todos' },
            ...mockGenres.map((g) => ({ id: g, label: g })),
          ].map(({ id, label }) => (
            <button
              key={label}
              onClick={() => setSelectedGenre(id)}
              style={{
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.15s',
                background:
                  selectedGenre === id
                    ? 'var(--color-brand-500)'
                    : 'var(--color-surface-700)',
                color:
                  selectedGenre === id
                    ? 'white'
                    : 'var(--color-text-secondary)',
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* conteúdo */}
      {isPending ? (
        <div
          style={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* ── músicas ── */}
          {activeTab === 'tracks' && (
            <>
              {filteredTracks.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '64px 0',
                  }}
                >
                  <Search
                    size={40}
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Nenhuma música encontrada para "{debouncedSearch}"
                  </p>
                  <button
                    onClick={() => {
                      setSearch('')
                      setSelectedGenre(null)
                    }}
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-brand-400)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : viewMode === 'list' ? (
                <ul
                  role="list"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  {filteredTracks.map((track, index) => {
                    const isCurrentTrack = currentTrack?.id === track.id
                    return (
                      <li
                        key={track.id}
                        onClick={() => play(track, filteredTracks)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '8px 10px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          background: isCurrentTrack
                            ? 'color-mix(in srgb, var(--color-brand-500) 10%, transparent)'
                            : 'transparent',
                          transition: 'background 0.15s',
                        }}
                        className="group hover:bg-[var(--color-surface-700)]"
                      >
                        {/* número / play */}
                        <span
                          style={{
                            width: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
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

                        {/* capa */}
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

                        {/* título e artista */}
                        <div style={{ flex: 1, minWidth: 0 }}>
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

                        {/* badge gênero — oculto em mobile */}
                        <span className="hidden sm:block">
                          <Badge>{track.genres[0]}</Badge>
                        </span>

                        {/* coração */}
                        <Heart
                          size={14}
                          style={{
                            flexShrink: 0,
                            color: track.isLiked
                              ? 'var(--color-brand-500)'
                              : 'var(--color-text-muted)',
                            fill: track.isLiked
                              ? 'var(--color-brand-500)'
                              : 'none',
                          }}
                        />

                        {/* duração */}
                        <span
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                            width: '32px',
                            textAlign: 'right',
                            flexShrink: 0,
                          }}
                        >
                          {formatDuration(track.durationMs)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gap: '16px',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(150px, 1fr))',
                  }}
                >
                  {filteredTracks.map((track) => (
                    <div
                      key={track.id}
                      onClick={() => play(track, filteredTracks)}
                      className="group"
                      style={{
                        borderRadius: '12px',
                        border: '1px solid var(--color-surface-600)',
                        background: 'var(--color-surface-800)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                    >
                      <div style={{ position: 'relative', aspectRatio: '1' }}>
                        <Image
                          src={track.album.coverUrl}
                          alt={track.album.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: 'var(--color-brand-500)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Play
                              size={16}
                              fill="white"
                              className="ml-0.5 text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '12px' }}>
                        <p
                          style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
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
                            marginTop: '2px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {track.artist.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── artistas ── */}
          {activeTab === 'artists' && (
            <>
              {filteredArtists.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '64px 0',
                  }}
                >
                  <Search
                    size={40}
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Nenhum artista encontrado.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gap: '16px',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(140px, 1fr))',
                  }}
                >
                  {filteredArtists.map((artist) => (
                    <div
                      key={artist.id}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid var(--color-surface-600)',
                        background: 'var(--color-surface-800)',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      className="hover:bg-[var(--color-surface-700)]"
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '72px',
                          height: '72px',
                        }}
                      >
                        <Image
                          src={artist.imageUrl}
                          alt={artist.name}
                          fill
                          unoptimized
                          style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                            background: 'var(--color-surface-600)',
                          }}
                        />
                      </div>
                      <div style={{ textAlign: 'center', width: '100%' }}>
                        <p
                          style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {artist.name}
                        </p>
                        <p
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                            marginTop: '2px',
                          }}
                        >
                          {formatNumber(artist.monthlyListeners)} ouvintes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── álbuns ── */}
          {activeTab === 'albums' && (
            <>
              {filteredAlbums.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '64px 0',
                  }}
                >
                  <Search
                    size={40}
                    style={{ color: 'var(--color-text-muted)' }}
                  />
                  <p style={{ color: 'var(--color-text-secondary)' }}>
                    Nenhum álbum encontrado.
                  </p>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gap: '16px',
                    gridTemplateColumns:
                      'repeat(auto-fill, minmax(150px, 1fr))',
                  }}
                >
                  {filteredAlbums.map((album) => (
                    <div
                      key={album.id}
                      style={{
                        borderRadius: '12px',
                        border: '1px solid var(--color-surface-600)',
                        background: 'var(--color-surface-800)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      className="hover:bg-[var(--color-surface-700)]"
                    >
                      <div style={{ position: 'relative', aspectRatio: '1' }}>
                        <Image
                          src={album.coverUrl}
                          alt={album.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div style={{ padding: '12px' }}>
                        <p
                          style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {album.name}
                        </p>
                        <p
                          style={{
                            fontSize: '12px',
                            color: 'var(--color-text-muted)',
                            marginTop: '2px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {album.artist.name} · {album.releaseYear}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default function LibraryPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div>
            <div
              style={{
                height: '28px',
                width: '120px',
                borderRadius: '8px',
                background: 'var(--color-surface-700)',
                marginBottom: '8px',
              }}
            />
            <div
              style={{
                height: '16px',
                width: '200px',
                borderRadius: '6px',
                background: 'var(--color-surface-700)',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gap: '16px',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            }}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: '200px',
                  borderRadius: '12px',
                  background: 'var(--color-surface-700)',
                }}
              />
            ))}
          </div>
        </div>
      }
    >
      <LibraryContent />
    </Suspense>
  )
}
