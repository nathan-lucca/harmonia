'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Modal } from '@/components/ui/Modal'
import { PlaylistCard } from '@/features/playlists/components/PlaylistCard'
import { PlaylistForm } from '@/features/playlists/components/PlaylistForm'
import { usePlaylistStore } from '@/features/playlists/store/playlistStore'
import type { Playlist } from '@/types/music'
import type { PlaylistFormData } from '@/schemas/playlist.schema'

export default function PlaylistsPage() {
  const { playlists, createPlaylist, updatePlaylist, deletePlaylist } = usePlaylistStore()

  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null)
  const [deletingPlaylist, setDeletingPlaylist] = useState<Playlist | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleCreate(data: PlaylistFormData) {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    createPlaylist(data)
    setIsLoading(false)
    setIsCreateOpen(false)
  }

  async function handleEdit(data: PlaylistFormData) {
    if (!editingPlaylist) return
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    updatePlaylist(editingPlaylist.id, data)
    setIsLoading(false)
    setEditingPlaylist(null)
  }

  function handleDelete() {
    if (!deletingPlaylist) return
    deletePlaylist(deletingPlaylist.id)
    setDeletingPlaylist(null)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Playlists
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            {playlists.length} playlist{playlists.length !== 1 ? 's' : ''}
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            borderRadius: '10px',
            background: 'var(--color-brand-500)',
            color: 'white',
            fontSize: '14px',
            fontWeight: 500,
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
        >
          <Plus size={16} />
          Nova playlist
        </button>
      </div>

      {/* conteúdo */}
      {playlists.length === 0 ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '80px 0',
        }}>
          <span style={{ fontSize: '56px' }}>🎵</span>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
              Nenhuma playlist ainda
            </p>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '6px' }}>
              Crie sua primeira playlist para organizar suas músicas.
            </p>
          </div>
          <button
            onClick={() => setIsCreateOpen(true)}
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
              cursor: 'pointer',
            }}
          >
            <Plus size={16} />
            Criar playlist
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        }}>
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
              onEdit={setEditingPlaylist}
              onDelete={setDeletingPlaylist}
            />
          ))}
        </div>
      )}

      {/* modal: criar */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Nova playlist"
        description="Dê um nome e uma descrição para sua playlist."
      >
        <PlaylistForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* modal: editar */}
      <Modal
        isOpen={!!editingPlaylist}
        onClose={() => setEditingPlaylist(null)}
        title="Editar playlist"
      >
        <PlaylistForm
          defaultValues={{
            name: editingPlaylist?.name ?? '',
            description: editingPlaylist?.description ?? '',
          }}
          onSubmit={handleEdit}
          onCancel={() => setEditingPlaylist(null)}
          isLoading={isLoading}
          submitLabel="Salvar alterações"
        />
      </Modal>

      {/* modal: confirmar exclusão */}
      <Modal
        isOpen={!!deletingPlaylist}
        onClose={() => setDeletingPlaylist(null)}
        title="Excluir playlist"
        size="sm"
      >
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Tem certeza que deseja excluir{' '}
          <strong style={{ color: 'var(--color-text-primary)' }}>
            {deletingPlaylist?.name}
          </strong>
          ? Essa ação não pode ser desfeita.
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
          <button
            onClick={() => setDeletingPlaylist(null)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              fontSize: '14px',
              border: '1px solid var(--color-surface-600)',
              cursor: 'pointer',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'var(--color-error)',
              color: 'white',
              fontSize: '14px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Excluir
          </button>
        </div>
      </Modal>
    </div>
  )
}