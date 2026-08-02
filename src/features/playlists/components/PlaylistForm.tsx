'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  playlistSchema,
  type PlaylistFormData,
} from '@/schemas/playlist.schema'
import { Button } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

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
    register, // conecta o input ao formulário
    handleSubmit, // intercepta o submit e valida antes de chamar onSubmit
    formState: { errors }, // erros de validação do Zod
  } = useForm<PlaylistFormData>({
    resolver: zodResolver(playlistSchema), // usa o Zod para validar
    defaultValues,
  })

  return (
    // handleSubmit valida os dados antes de chamar onSubmit
    // se houver erro, onSubmit não é chamado
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* campo Nome */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="playlist-name"
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          Nome <span className="text-[var(--color-error)]">*</span>
        </label>
        <input
          id="playlist-name"
          type="text"
          placeholder="Ex: Favoritas do Mês"
          // register conecta este input ao React Hook Form
          {...register('name')}
          className={cn(
            'w-full rounded-lg px-3 py-2.5 text-sm',
            'bg-[var(--color-surface-700)]',
            'border transition-colors',
            'text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-muted)]',
            'focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none',
            // borda vermelha se houver erro de validação
            errors.name
              ? 'border-[var(--color-error)]'
              : 'border-[var(--color-surface-600)] focus:border-transparent'
          )}
        />
        {/* mensagem de erro — só aparece se houver erro */}
        {errors.name && (
          <p className="text-xs text-[var(--color-error)]" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* campo Descrição */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="playlist-description"
          className="text-sm font-medium text-[var(--color-text-primary)]"
        >
          Descrição
          <span className="ml-1 font-normal text-[var(--color-text-muted)]">
            (opcional)
          </span>
        </label>
        <textarea
          id="playlist-description"
          placeholder="Ex: As músicas que mais ouvi esse mês"
          rows={3}
          {...register('description')}
          className={cn(
            'w-full resize-none rounded-lg px-3 py-2.5 text-sm',
            'bg-[var(--color-surface-700)]',
            'border border-[var(--color-surface-600)]',
            'text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-muted)]',
            'focus:border-transparent focus:ring-2 focus:ring-[var(--color-brand-500)] focus:outline-none',
            errors.description && 'border-[var(--color-error)]'
          )}
        />
        {errors.description && (
          <p className="text-xs text-[var(--color-error)]" role="alert">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* botões */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isLoading={isLoading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
