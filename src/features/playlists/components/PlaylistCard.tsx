'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MoreHorizontal, Play, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils/cn'
import { formatMinutes } from '@/utils/format'
import type { Playlist } from '@/types/music'

interface PlaylistCardProps {
  playlist: Playlist
  onEdit: (playlist: Playlist) => void
  onDelete: (playlist: Playlist) => void
}

export function PlaylistCard({
  playlist,
  onEdit,
  onDelete,
}: PlaylistCardProps) {
  // controla o menu de opções (três pontinhos)
  const [menuOpen, setMenuOpen] = useState(false)

  const totalMinutes = Math.floor(playlist.totalDurationMs / 60000)

  return (
    <div
      className={cn(
        'group relative rounded-xl',
        'bg-[var(--color-surface-800)]',
        'border border-[var(--color-surface-600)]',
        'transition-all duration-200',
        'hover:border-[var(--color-surface-600)] hover:bg-[var(--color-surface-700)]'
      )}
    >
      {/* capa da playlist */}
      <Link href={`/playlists/${playlist.id}`} className="block overflow-hidden rounded-t-xl">
        <div className="relative aspect-square">
          {playlist.coverUrl ? (
            <Image
              src={playlist.coverUrl}
              alt={playlist.name}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            // fallback quando não tem capa
            <div className="flex h-full w-full items-center justify-center bg-[var(--color-surface-600)]">
              <span className="text-4xl">🎵</span>
            </div>
          )}

          {/* botão play que aparece no hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-500)] shadow-lg">
              <Play size={20} fill="white" className="ml-1 text-white" />
            </div>
          </div>
        </div>
      </Link>

      {/* info da playlist */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link href={`/playlists/${playlist.id}`}>
              <h3 className="truncate text-sm font-semibold text-[var(--color-text-primary)] hover:underline">
                {playlist.name}
              </h3>
            </Link>
            <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
              {playlist.tracks.length} músicas
              {totalMinutes > 0 && ` • ${formatMinutes(totalMinutes)}`}
            </p>
          </div>

          {/* menu de opções */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Opções da playlist"
              aria-expanded={menuOpen}
              className="rounded-md p-1 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-600)] hover:text-[var(--color-text-primary)]"
            >
              <MoreHorizontal size={16} />
            </button>

            {/* dropdown menu */}
            {menuOpen && (
              <>
                {/* overlay invisível para fechar o menu ao clicar fora */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute top-8 right-0 z-20 w-36 overflow-hidden rounded-lg border border-[var(--color-surface-600)] bg-[var(--color-surface-700)] shadow-xl">
                  <button
                    onClick={() => {
                      onEdit(playlist)
                      setMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-600)] hover:text-[var(--color-text-primary)]"
                  >
                    <Pencil size={14} />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      onDelete(playlist)
                      setMenuOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-[var(--color-error)] transition-colors hover:bg-[var(--color-surface-600)]"
                  >
                    <Trash2 size={14} />
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
