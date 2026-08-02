import { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

function Skeleton({
  width,
  height,
  rounded = 'md',
  className,
  ...props
}: SkeletonProps) {
  const roundedMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-xl',
    full: 'rounded-full',
  }

  return (
    <div
      className={cn(
        // animate-pulse é a animação de fade in/out do Tailwind
        // bg-[...]/50 usa opacidade 50% na cor da superfície
        'animate-pulse bg-[var(--color-surface-600)]',
        roundedMap[rounded],
        className
      )}
      style={{
        width: width
          ? typeof width === 'number'
            ? `${width}px`
            : width
          : undefined,
        height: height
          ? typeof height === 'number'
            ? `${height}px`
            : height
          : undefined,
      }}
      // Informa leitores de tela que esse elemento é decorativo
      aria-hidden="true"
      {...props}
    />
  )
}

// SkeletonText simula linhas de texto com larguras variadas
// O efeito visual de linhas com larguras diferentes parece mais natural
function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number
  className?: string
}) {
  // Larguras pré-definidas que alternam para parecer texto real
  const widths = ['w-full', 'w-4/5', 'w-3/5', 'w-full', 'w-2/3']

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} height={14} className={widths[i % widths.length]} />
      ))}
    </div>
  )
}

// SkeletonCard simula um card completo com título e conteúdo
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-xl bg-[var(--color-surface-800)]',
        'border border-[var(--color-surface-600)] p-4',
        className
      )}
    >
      <Skeleton height={16} className="mb-3 w-1/3" />
      <Skeleton height={40} className="mb-2 w-1/2" />
      <Skeleton height={12} className="w-1/4" />
    </div>
  )
}

export { Skeleton, SkeletonText, SkeletonCard }
export type { SkeletonProps }
