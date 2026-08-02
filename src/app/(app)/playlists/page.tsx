'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { PlaylistCard } from '@/features/playlists/components/PlaylistCard'
import { PlaylistForm } from '@/features/playlists/components/PlaylistForm'
import { usePlaylistStore } from '@/features/playlists/store/playlistStore'
import type { Playlist } from '@/types/music'
import type { PlaylistFormData } from '@/schemas/playlist.schema'

export default function PlaylistsPage() {
  const { playlists, createPlaylist, updatePlaylist, deletePlaylist } =
    usePlaylistStore()

  // controla qual modal está aberto
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null)
  const [deletingPlaylist, setDeletingPlaylist] = useState<Playlist | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  // simula delay de API ao criar
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
    <div className="flex flex-col gap-6">
      {/* header da página */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Playlists
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {playlists.length} playlist{playlists.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus size={16} />}
          onClick={() => setIsCreateOpen(true)}
        >
          Nova playlist
        </Button>
      </div>

      {/* grid de playlists */}
      {playlists.length === 0 ? (
        // estado vazio
        <div className="flex flex-col items-center justify-center gap-4 py-20">
          <span className="text-6xl">🎵</span>
          <div className="text-center">
            <p className="text-lg font-medium text-[var(--color-text-primary)]">
              Nenhuma playlist ainda
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Crie sua primeira playlist para organizar suas músicas.
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus size={16} />}
            onClick={() => setIsCreateOpen(true)}
          >
            Criar playlist
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

      {/* modal: Criar playlist */}
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

      {/* modal: Editar playlist */}
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

      {/* modal: Confirmar exclusão */}
      <Modal
        isOpen={!!deletingPlaylist}
        onClose={() => setDeletingPlaylist(null)}
        title="Excluir playlist"
        size="sm"
      >
        <p className="text-sm text-[var(--color-text-secondary)]">
          Tem certeza que deseja excluir{' '}
          <span className="font-semibold text-[var(--color-text-primary)]">
            {deletingPlaylist?.name}
          </span>
          ? Essa ação não pode ser desfeita.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={() => setDeletingPlaylist(null)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Excluir
          </Button>
        </div>
      </Modal>
    </div>
  )
}
