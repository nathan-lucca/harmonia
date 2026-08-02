import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useTransferStore } from '../store/transferStore'
import { platforms } from '@/mocks/platforms'

export function SummaryStep() {
  const { results, sourcePlatform, targetPlatform, selectedPlaylist, reset } =
    useTransferStore()

  const matched = results.filter((r) => r.matchStatus === 'matched').length
  const total = results.length
  const matchRate = total > 0 ? Math.round((matched / total) * 100) : 0

  const sourceInfo = platforms.find((p) => p.id === sourcePlatform)
  const targetInfo = platforms.find((p) => p.id === targetPlatform)

  return (
    <div className="flex flex-col items-center gap-6 py-4 text-center">
      {/* ícone de sucesso */}
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-success)]/20">
        <CheckCircle2 size={36} className="text-[var(--color-success)]" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
          Transferência concluída!
        </h3>
        <p className="max-w-sm text-sm text-[var(--color-text-secondary)]">
          A playlist <strong>{selectedPlaylist?.name}</strong> foi transferida
          de {sourceInfo?.name} para {targetInfo?.name} com{' '}
          <strong>{matchRate}% de correspondência</strong>.
        </p>
      </div>

      {/* estatísticas finais */}
      <div className="flex w-full max-w-xs flex-col gap-3 rounded-xl border border-[var(--color-surface-600)] bg-[var(--color-surface-800)] p-4">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">
            Total de músicas
          </span>
          <span className="font-medium text-[var(--color-text-primary)]">
            {total}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">
            Encontradas
          </span>
          <span className="font-medium text-[var(--color-success)]">
            {matched}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text-secondary)]">
            Taxa de correspondência
          </span>
          <span className="font-medium text-[var(--color-text-primary)]">
            {matchRate}%
          </span>
        </div>

        {/* barra de taxa */}
        <div className="h-2 overflow-hidden rounded-full bg-[var(--color-surface-600)]">
          <div
            className="h-full rounded-full bg-[var(--color-success)]"
            style={{ width: `${matchRate}%` }}
          />
        </div>
      </div>

      {/* ações */}
      <div className="flex gap-3">
        <Button variant="secondary" onClick={reset}>
          Nova transferência
        </Button>
      </div>
    </div>
  )
}
