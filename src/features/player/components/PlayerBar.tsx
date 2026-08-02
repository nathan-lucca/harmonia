import { Play, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function PlayerBar() {
  return (
    <footer
      className="fixed right-0 bottom-0 left-0 z-50 flex h-20 items-center justify-between border-t border-[var(--color-surface-600)] bg-[var(--color-surface-800)] px-6"
      aria-label="Reprodutor de música"
    >
      {/* info da faixa atual */}
      <div className="flex w-64 items-center gap-3">
        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-[var(--color-surface-600)]" />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
            Nenhuma faixa selecionada
          </p>
          <p className="truncate text-xs text-[var(--color-text-muted)]">—</p>
        </div>
      </div>

      {/* controles centrais */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" aria-label="Faixa anterior">
          <SkipBack size={18} />
        </Button>
        <Button
          variant="primary"
          size="md"
          aria-label="Reproduzir"
          className="h-10 w-10 rounded-full p-0"
        >
          <Play size={18} />
        </Button>
        <Button variant="ghost" size="sm" aria-label="Próxima faixa">
          <SkipForward size={18} />
        </Button>
      </div>

      {/* volume */}
      <div className="flex w-64 items-center justify-end gap-2">
        <Button variant="ghost" size="sm" aria-label="Volume">
          <Volume2 size={18} />
        </Button>
        {/* barra de volume placeholder */}
        <div className="h-1 w-24 rounded-full bg-[var(--color-surface-600)]">
          <div className="h-full w-3/4 rounded-full bg-[var(--color-brand-500)]" />
        </div>
      </div>
    </footer>
  )
}
