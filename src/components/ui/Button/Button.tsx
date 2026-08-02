import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

// definindo as variantes e tamanhos como tipos TypeScript
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// forwardRef permite que componentes pai acessem o elemento DOM do botão
// é necessário para tooltips, foco programático e etc
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-lg',
      'transition-all duration-150',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'focus-visible:ring-offset-[var(--color-surface-900)]',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none cursor-pointer',
    ]

    const variants: Record<ButtonVariant, string> = {
      primary: [
        'bg-[var(--color-brand-500)] text-white',
        'hover:bg-[var(--color-brand-400)]',
        'active:bg-[var(--color-brand-600)]',
        'focus-visible:ring-[var(--color-brand-500)]',
      ].join(' '),

      secondary: [
        'bg-[var(--color-surface-700)] text-[var(--color-text-primary)]',
        'border border-[var(--color-surface-600)]',
        'hover:bg-[var(--color-surface-600)]',
        'focus-visible:ring-[var(--color-brand-500)]',
      ].join(' '),

      ghost: [
        'bg-transparent text-[var(--color-text-secondary)]',
        'hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]',
        'focus-visible:ring-[var(--color-brand-500)]',
      ].join(' '),

      danger: [
        'bg-[var(--color-error)] text-white',
        'hover:opacity-90',
        'focus-visible:ring-[var(--color-error)]',
      ].join(' '),
    }

    const sizes: Record<ButtonSize, string> = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {/* Spinner de loading — substitui o ícone esquerdo quando carregando */}
        {isLoading ? (
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          leftIcon
        )}

        {children}

        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonVariant, ButtonSize }
