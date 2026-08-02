import Image from 'next/image'
import { Check, AlertTriangle, X } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useTransferStore } from '../store/transferStore'
import { cn } from '@/utils/cn'

export function ResultsStep() {
  const { results, setStep } = useTransferStore()

  const matched = results.filter((r) => r.matchStatus === 'matched')
  const lowConfidence = results.filter(
    (r) => r.matchStatus === 'low_confidence'
  )
  const notFound = results.filter((r) => r.matchStatus === 'not_found')

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Análise concluída
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Encontramos {matched.length} de {results.length} músicas.
        </p>
      </div>

      {/* resumo em cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-success)]/20 bg-[var(--color-success)]/10 p-3">
          <span className="text-2xl font-bold text-[var(--color-success)]">
            {matched.length}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            encontradas
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-warning)]/20 bg-[var(--color-warning)]/10 p-3">
          <span className="text-2xl font-bold text-[var(--color-warning)]">
            {lowConfidence.length}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            incertas
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 rounded-xl border border-[var(--color-error)]/20 bg-[var(--color-error)]/10 p-3">
          <span className="text-2xl font-bold text-[var(--color-error)]">
            {notFound.length}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            não encontradas
          </span>
        </div>
      </div>

      {/* lista detalhada */}
      <div className="flex max-h-64 flex-col gap-2 overflow-y-auto pr-1">
        {results.map(({ track, matchStatus, confidence }) => (
          <div
            key={track.id}
            className="flex items-center gap-3 rounded-lg border border-[var(--color-surface-600)] bg-[var(--color-surface-800)] p-2.5"
          >
            {/* ícone de status */}
            <div
              className={cn(
                'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full',
                matchStatus === 'matched' && 'bg-[var(--color-success)]/20',
                matchStatus === 'low_confidence' &&
                  'bg-[var(--color-warning)]/20',
                matchStatus === 'not_found' && 'bg-[var(--color-error)]/20'
              )}
            >
              {matchStatus === 'matched' && (
                <Check size={14} className="text-[var(--color-success)]" />
              )}
              {matchStatus === 'low_confidence' && (
                <AlertTriangle
                  size={14}
                  className="text-[var(--color-warning)]"
                />
              )}
              {matchStatus === 'not_found' && (
                <X size={14} className="text-[var(--color-error)]" />
              )}
            </div>

            {/* capa */}
            <Image
              src={track.album.coverUrl}
              alt={track.album.name}
              width={32}
              height={32}
              unoptimized
              className="flex-shrink-0 rounded-md bg-[var(--color-surface-600)]"
            />

            {/* info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                {track.title}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {track.artist.name}
              </p>
            </div>

            {/* badge de status */}
            <Badge
              variant={
                matchStatus === 'matched'
                  ? 'success'
                  : matchStatus === 'low_confidence'
                    ? 'warning'
                    : 'error'
              }
              className="flex-shrink-0"
            >
              {matchStatus === 'matched' && `${Math.round(confidence * 100)}%`}
              {matchStatus === 'low_confidence' &&
                `${Math.round(confidence * 100)}%`}
              {matchStatus === 'not_found' && 'N/A'}
            </Badge>
          </div>
        ))}
      </div>

      <Button variant="primary" onClick={() => setStep(6)}>
        Concluir transferência
      </Button>
    </div>
  )
}
