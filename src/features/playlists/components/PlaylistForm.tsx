'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  playlistSchema,
  type PlaylistFormData,
} from '@/schemas/playlist.schema'

interface PlaylistFormProps {
  defaultValues?: PlaylistFormData
  onSubmit: (data: PlaylistFormData) => void
  onCancel: () => void
  isLoading?: boolean
  submitLabel?: string
}

export function PlaylistForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
  submitLabel = 'Criar playlist',
}: PlaylistFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistSchema),
    defaultValues,
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      {/* campo nome */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label
          htmlFor="playlist-name"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
          }}
        >
          Nome <span style={{ color: 'var(--color-error)' }}>*</span>
        </label>
        <input
          id="playlist-name"
          type="text"
          placeholder="Ex: Favoritas do Mês"
          {...register('name')}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '14px',
            background: 'var(--color-surface-700)',
            border: `1px solid ${errors.name ? 'var(--color-error)' : 'var(--color-surface-600)'}`,
            color: 'var(--color-text-primary)',
            outline: 'none',
          }}
        />
        {errors.name && (
          <p
            role="alert"
            style={{ fontSize: '12px', color: 'var(--color-error)' }}
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* campo descrição */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label
          htmlFor="playlist-description"
          style={{
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
          }}
        >
          Descrição{' '}
          <span
            style={{
              fontSize: '13px',
              fontWeight: 400,
              color: 'var(--color-text-muted)',
            }}
          >
            (opcional)
          </span>
        </label>
        <textarea
          id="playlist-description"
          placeholder="Ex: As músicas que mais ouvi esse mês"
          rows={3}
          {...register('description')}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '10px',
            fontSize: '14px',
            background: 'var(--color-surface-700)',
            border: `1px solid ${errors.description ? 'var(--color-error)' : 'var(--color-surface-600)'}`,
            color: 'var(--color-text-primary)',
            outline: 'none',
            resize: 'none',
          }}
        />
        {errors.description && (
          <p
            role="alert"
            style={{ fontSize: '12px', color: 'var(--color-error)' }}
          >
            {errors.description.message}
          </p>
        )}
      </div>

      {/* botões */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '12px',
          paddingTop: '8px',
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
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
          type="submit"
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '14px',
            fontWeight: 500,
            background: 'var(--color-brand-500)',
            border: 'none',
            color: 'white',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {isLoading && (
            <svg
              className="animate-spin"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                opacity="0.25"
              />
              <path
                fill="currentColor"
                opacity="0.75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {submitLabel}
        </button>
      </div>
    </form>
  )
}
