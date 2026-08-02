'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MoreHorizontal, Play, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)
  const totalMinutes = Math.floor(playlist.totalDurationMs / 60000)

  return (
    <div
      style={{
        borderRadius: '14px',
        background: 'var(--color-surface-800)',
        border: '1px solid var(--color-surface-600)',
        overflow: 'visible',
        transition: 'background 0.15s',
        position: 'relative',
      }}
      className="group hover:bg-[var(--color-surface-700)]"
    >
      {/* capa */}
      <Link
        href={`/playlists/${playlist.id}`}
        style={{
          display: 'block',
          borderRadius: '14px 14px 0 0',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '1' }}>
          {playlist.coverUrl ? (
            <Image
              src={playlist.coverUrl}
              alt={playlist.name}
              fill
              unoptimized
              style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
              className="group-hover:scale-105"
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'var(--color-surface-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
              }}
            >
              🎵
            </div>
          )}

          {/* overlay play */}
          <div
            className="opacity-0 group-hover:opacity-100"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.2s',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--color-brand-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <Play
                size={20}
                fill="white"
                style={{ color: 'white', marginLeft: '2px' }}
              />
            </div>
          </div>
        </div>
      </Link>

      {/* info */}
      <div style={{ padding: '12px 14px 14px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <div style={{ minWidth: 0, flex: 1 }}>
            <Link
              href={`/playlists/${playlist.id}`}
              style={{ textDecoration: 'none' }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {playlist.name}
              </p>
            </Link>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginTop: '3px',
              }}
            >
              {playlist.tracks.length} músicas
              {totalMinutes > 0 && ` · ${formatMinutes(totalMinutes)}`}
            </p>
          </div>

          {/* menu três pontinhos */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Opções da playlist"
              aria-expanded={menuOpen}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                transition: 'all 0.15s',
              }}
            >
              <MoreHorizontal size={16} />
            </button>

            {/* dropdown */}
            {menuOpen && (
              <>
                {/* overlay invisível para fechar */}
                <div
                  style={{ position: 'fixed', inset: 0, zIndex: 10 }}
                  onClick={() => setMenuOpen(false)}
                />

                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '32px',
                    zIndex: 20,
                    width: '148px',
                    borderRadius: '10px',
                    background: 'var(--color-surface-700)',
                    border: '1px solid var(--color-surface-600)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => {
                      onEdit(playlist)
                      setMenuOpen(false)
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      color: 'var(--color-text-secondary)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    className="hover:bg-[var(--color-surface-600)]"
                  >
                    <Pencil size={14} />
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      onDelete(playlist)
                      setMenuOpen(false)
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      color: 'var(--color-error)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    className="hover:bg-[var(--color-surface-600)]"
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
