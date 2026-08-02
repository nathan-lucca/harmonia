'use client'

import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
}: ModalProps) {
  // Ref para o container do modal — usado para mover o foco
  const modalRef = useRef<HTMLDivElement>(null)

  // fecha o modal ao pressionar Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // move o foco para dentro do modal ao abrir
      modalRef.current?.focus()
    }
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // bloqueia o scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }

  return (
    // overlay — fundo escurecido atrás do modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      // fecha ao clicar no overlay (fora do modal)
      onClick={onClose}
    >
      {/* fundo semi-transparente */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* container do modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        // para a propagação do clique — não fecha ao clicar dentro do modal
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative w-full rounded-2xl',
          'bg-[var(--color-surface-800)]',
          'border border-[var(--color-surface-600)]',
          'shadow-2xl shadow-black/40',
          'flex flex-col gap-4 p-6',
          'focus:outline-none',
          sizes[size]
        )}
      >
        {/* header do modal */}
        <div className="flex items-start justify-between">
          <div>
            <h2
              id="modal-title"
              className="text-lg font-semibold text-[var(--color-text-primary)]"
            >
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">
                {description}
              </p>
            )}
          </div>

          {/* botão de fechar */}
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="-mt-1 -mr-1 rounded-md p-1 text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]"
          >
            <X size={18} />
          </button>
        </div>

        {/* conteúdo */}
        {children}
      </div>
    </div>
  )
}
