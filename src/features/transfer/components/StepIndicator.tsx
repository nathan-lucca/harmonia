import { Check } from 'lucide-react'
import { cn } from '@/utils/cn'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function StepIndicator({
  currentStep,
  totalSteps,
  labels,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep

        return (
          <div key={stepNumber} className="flex items-center">
            {/* círculo do step */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all',
                  isCompleted && 'bg-[var(--color-brand-500)] text-white',
                  isActive &&
                    'bg-[var(--color-brand-500)] text-white ring-4 ring-[var(--color-brand-500)]/20',
                  !isCompleted &&
                    !isActive &&
                    'border border-[var(--color-surface-600)] bg-[var(--color-surface-700)] text-[var(--color-text-muted)]'
                )}
              >
                {isCompleted ? <Check size={14} /> : stepNumber}
              </div>
              <span
                className={cn(
                  'hidden text-xs whitespace-nowrap sm:block',
                  isActive
                    ? 'text-[var(--color-text-primary)]'
                    : 'text-[var(--color-text-muted)]'
                )}
              >
                {labels[index]}
              </span>
            </div>

            {/* linha conectora entre steps */}
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  'mx-2 mb-5 h-px w-12 transition-all',
                  stepNumber < currentStep
                    ? 'bg-[var(--color-brand-500)]'
                    : 'bg-[var(--color-surface-600)]'
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
