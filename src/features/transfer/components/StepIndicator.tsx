import { Check } from 'lucide-react'

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
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isActive = stepNumber === currentStep

        return (
          <div
            key={stepNumber}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            {/* círculo + label */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'all 0.2s',
                  background:
                    isCompleted || isActive
                      ? 'var(--color-brand-500)'
                      : 'var(--color-surface-700)',
                  color:
                    isCompleted || isActive
                      ? 'white'
                      : 'var(--color-text-muted)',
                  border: isActive
                    ? '3px solid color-mix(in srgb, var(--color-brand-500) 30%, transparent)'
                    : 'none',
                  boxSizing: 'border-box',
                }}
              >
                {isCompleted ? <Check size={14} /> : stepNumber}
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 500,
                  color: isActive
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {labels[index]}
              </span>
            </div>

            {/* linha conectora */}
            {index < totalSteps - 1 && (
              <div
                style={{
                  height: '2px',
                  width: '32px',
                  marginBottom: '18px',
                  background:
                    stepNumber < currentStep
                      ? 'var(--color-brand-500)'
                      : 'var(--color-surface-600)',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
