import { cn } from '@/utils/cn'
import { platforms, type PlatformInfo } from '@/mocks/platforms'
import type { TransferPlatform } from '@/types/music'

interface PlatformSelectorProps {
  title: string
  subtitle: string
  selected: TransferPlatform | null
  excluded?: TransferPlatform | null // plataforma que não pode ser selecionada
  onSelect: (platform: TransferPlatform) => void
}

export function PlatformSelector({
  title,
  subtitle,
  selected,
  excluded,
  onSelect,
}: PlatformSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
          {title}
        </h3>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform: PlatformInfo) => {
          const isExcluded = platform.id === excluded
          const isSelected = platform.id === selected

          return (
            <button
              key={platform.id}
              onClick={() => !isExcluded && onSelect(platform.id)}
              disabled={isExcluded}
              className={cn(
                'flex items-center gap-3 rounded-xl border p-4 text-left transition-all',
                isSelected &&
                  'border-[var(--color-brand-500)] bg-[var(--color-brand-500)]/10',
                !isSelected &&
                  !isExcluded &&
                  'border-[var(--color-surface-600)] bg-[var(--color-surface-800)] hover:border-[var(--color-surface-600)] hover:bg-[var(--color-surface-700)]',
                isExcluded &&
                  'cursor-not-allowed border-[var(--color-surface-600)] bg-[var(--color-surface-800)] opacity-40'
              )}
            >
              {/* emoji como ícone da plataforma */}
              <span className="text-2xl">{platform.emoji}</span>

              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {platform.name}
                </p>
                {isExcluded && (
                  <p className="text-xs text-[var(--color-text-muted)]">
                    já selecionada como origem
                  </p>
                )}
              </div>

              {/* check de selecionado */}
              {isSelected && (
                <div className="ml-auto flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-500)]">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
