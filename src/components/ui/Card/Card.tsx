import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

// o Card tem variantes de aparência e padding configurável
type CardVariant = 'default' | 'elevated' | 'ghost'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', padding = 'md', className, children, ...props },
    ref
  ) => {
    const variants: Record<CardVariant, string> = {
      // default: borda sutil, fundo levemente elevado
      default:
        'bg-[var(--color-surface-800)] border border-[var(--color-surface-600)]',
      // elevated: sem borda, sombra mais forte - para cards em destaque
      elevated: 'bg-[var(--color-surface-700)] shadow-log shadow-black/20',
      // ghost: completamente transparente - para agrupar conteúdo sem visual de card
      ghost: 'bg-transparent',
    }

    const paddings = {
      none: 'p-0',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variants[variant],
          paddings[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// CardHeader, CardBody e CardFooter são subcomponentes opcionais
// que ajudam a estrutura o conteúdo do card de forma semântica
const CardHeader = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props}>
    {children}
  </div>
)
CardHeader.displayName = 'CardHeader'

const CardTitle = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      'text-base font-semibold text-[var(--color-text-primary)]',
      className
    )}
    {...props}
  >
    {children}
  </h3>
)
CardTitle.displayName = 'CardTitle'

const CardBody = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('text-[var(--color-text-secondary)]', className)}
    {...props}
  >
    {children}
  </div>
)
CardBody.displayName = 'CardBody'

export { Card, CardHeader, CardTitle, CardBody }
export type { CardProps, CardVariant }
