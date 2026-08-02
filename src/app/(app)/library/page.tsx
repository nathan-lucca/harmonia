'use client'

import { useState, useMemo, useTransition } from 'react'
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

// tabs disponíveis da biblioteca
type LibraryTab = 'tracks' | 'artists' | 'albums'

const TABS: { id: LibraryTab; label: string }[] = [
  { id: 'tracks', label: 'Músicas' },
  { id: 'artists', label: 'Artistas' },
  { id: 'albums', label: 'Álbuns' },
]

export default function LibraryPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // lê a tab ativa da URL — padrão 'tracks'
  const activeTab = (searchParams.get('tab') as LibraryTab) ?? 'tracks'

  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
  const [isPending, startTransition] = useTransition()

  // debounce de 300ms na busca — só filtra quando o usuário para de digitar
  const debouncedSearch = useDebounce(search, 300)

  const { play, currentTrack, isPlaying } = usePlayerStore()

  // troca de tab via URL
  function handleTabChange(tab: LibraryTab) {
    startTransition(() => {
      router.push(`/library?tab=${tab}`)
      setSearch('')
      setSelectedGenre(null)
    })
  }

  // filtra tracks por busca e gênero
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

  // filtra artistas por busca
  const filteredArtists = useMemo(() => {
    return mockArtists.filter(
      (artist) =>
        !debouncedSearch ||
        artist.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [debouncedSearch])

  // filtra álbuns por busca
  const filteredAlbums = useMemo(() => {
    return mockAlbums.filter(
      (album) =>
        !debouncedSearch ||
        album.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        album.artist.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
  }, [debouncedSearch])

  return (
    <div className="flex flex-col gap-6">
      {/* título */}
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Biblioteca
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Toda a sua música em um só lugar.
        </p>
      </div>

      {/* tabs */}
      <div className="flex gap-1 border-b border-[var(--color-surface-600)]">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => handleTabChange(id)}
            className={cn(
              'px-4 py-2.5 text-sm font-medium transition-colors',
              '-mb-px border-b-2',
              activeTab === id
                ? 'border-[var(--color-brand-500)] text-[var(--color-brand-400)]'
                : 'border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* barra de busca e controles */}
      <div className="flex flex-wrap items-center gap-3">
        {/* campo de busca */}
        <div className="relative min-w-48 flex-1">
          <Search
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--color-text-muted)]"
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
            className={cn(
              'w-full rounded-lg py-2.5 pr-9 pl-9 text-sm',
              'bg-[var(--color-surface-700)]',
              'border border-[var(--color-surface-600)]',
              'text-[var(--color-text-primary)]',
              'placeholder:text-[var(--color-text-muted)]',
              'focus:border-transparent focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none'
            )}
          />
          {/* botão para limpar a busca */}
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              aria-label="Limpar busca"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* alternância lista / grade */}
        <div className="flex overflow-hidden rounded-lg border border-[var(--color-surface-600)]">
          <button
            onClick={() => setViewMode('list')}
            aria-label="Visualização em lista"
            className={cn(
              'p-2.5 transition-colors',
              viewMode === 'list'
                ? 'bg-[var(--color-surface-600)] text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            aria-label="Visualização em grade"
            className={cn(
              'p-2.5 transition-colors',
              viewMode === 'grid'
                ? 'bg-[var(--color-surface-600)] text-[var(--color-text-primary)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* filtros de gênero — só aparece na aba de músicas */}
      {activeTab === 'tracks' && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedGenre(null)}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors',
              !selectedGenre
                ? 'bg-[var(--color-brand-500)] text-white'
                : 'bg-[var(--color-surface-700)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            )}
          >
            Todos
          </button>
          {mockGenres.map((genre) => (
            <button
              key={genre}
              onClick={() =>
                setSelectedGenre(genre === selectedGenre ? null : genre)
              }
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium transition-colors',
                selectedGenre === genre
                  ? 'bg-[var(--color-brand-500)] text-white'
                  : 'bg-[var(--color-surface-700)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {genre}
            </button>
          ))}
        </div>
      )}

      {/* conteúdo da tab ativa */}
      {isPending ? (
        // skeleton enquanto a tab carrega
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* aba: músicas */}
          {activeTab === 'tracks' && (
            <>
              {filteredTracks.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16">
                  <Search
                    size={40}
                    className="text-[var(--color-text-muted)]"
                  />
                  <p className="text-[var(--color-text-secondary)]">
                    Nenhuma música encontrada para "{debouncedSearch}"
                  </p>
                  <button
                    onClick={() => {
                      setSearch('')
                      setSelectedGenre(null)
                    }}
                    className="text-sm text-[var(--color-brand-400)] hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : viewMode === 'list' ? (
                // visualização em lista
                <ul role="list" className="flex flex-col">
                  {filteredTracks.map((track, index) => {
                    const isCurrentTrack = currentTrack?.id === track.id
                    return (
                      <li
                        key={track.id}
                        onClick={() => play(track, filteredTracks)}
                        className={cn(
                          'flex items-center gap-4 rounded-lg px-3 py-2.5',
                          'group cursor-pointer transition-colors',
                          isCurrentTrack
                            ? 'bg-[var(--color-brand-500)]/10'
                            : 'hover:bg-[var(--color-surface-700)]'
                        )}
                      >
                        {/* número / play */}
                        <span className="flex w-5 flex-shrink-0 items-center justify-center">
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

                        {/* capa */}
                        <Image
                          src={track.album.coverUrl}
                          alt={track.album.name}
                          width={36}
                          height={36}
                          unoptimized
                          className="flex-shrink-0 rounded-md bg-[var(--color-surface-600)]"
                        />

                        {/* título e artista */}
                        <div className="min-w-0 flex-1">
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
                            {track.artist.name} · {track.album.name}
                          </p>
                        </div>

                        {/* gênero */}
                        <Badge className="hidden flex-shrink-0 sm:flex">
                          {track.genres[0]}
                        </Badge>

                        {/* coração */}
                        <Heart
                          size={14}
                          className={cn(
                            'flex-shrink-0',
                            track.isLiked
                              ? 'fill-[var(--color-brand-500)] text-[var(--color-brand-500)]'
                              : 'text-[var(--color-text-muted)]'
                          )}
                        />

                        {/* duração */}
                        <span className="w-8 flex-shrink-0 text-right text-xs text-[var(--color-text-muted)]">
                          {formatDuration(track.durationMs)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                // visualização em grade
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredTracks.map((track) => (
                    <div
                      key={track.id}
                      onClick={() => play(track, filteredTracks)}
                      className="group cursor-pointer overflow-hidden rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)] transition-colors hover:bg-[var(--color-surface-700)]"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={track.album.coverUrl}
                          alt={track.album.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-brand-500)]">
                            <Play
                              size={16}
                              fill="white"
                              className="ml-0.5 text-white"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                          {track.title}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-[var(--color-text-muted)]">
                          {track.artist.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* aba: artistas */}
          {activeTab === 'artists' && (
            <>
              {filteredArtists.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16">
                  <Search
                    size={40}
                    className="text-[var(--color-text-muted)]"
                  />
                  <p className="text-[var(--color-text-secondary)]">
                    Nenhum artista encontrado.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {filteredArtists.map((artist) => (
                    <div
                      key={artist.id}
                      className="group flex cursor-pointer flex-col items-center gap-3 rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)] p-4 transition-colors hover:bg-[var(--color-surface-700)]"
                    >
                      <div className="relative h-20 w-20">
                        <Image
                          src={artist.imageUrl}
                          alt={artist.name}
                          fill
                          unoptimized
                          className="rounded-full bg-[var(--color-surface-600)] object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="w-full truncate text-sm font-medium text-[var(--color-text-primary)]">
                          {artist.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                          {formatNumber(artist.monthlyListeners)} ouvintes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* aba: álbuns */}
          {activeTab === 'albums' && (
            <>
              {filteredAlbums.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16">
                  <Search
                    size={40}
                    className="text-[var(--color-text-muted)]"
                  />
                  <p className="text-[var(--color-text-secondary)]">
                    Nenhum álbum encontrado.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {filteredAlbums.map((album) => (
                    <div
                      key={album.id}
                      className="group cursor-pointer overflow-hidden rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)] transition-colors hover:bg-[var(--color-surface-700)]"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={album.coverUrl}
                          alt={album.name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                          {album.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-[var(--color-text-muted)]">
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
