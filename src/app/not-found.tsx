import Link from 'next/link'
import { Home, Music } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-surface-900)] px-4">
      <div className="flex max-w-md flex-col items-center gap-6 text-center">
        {/* ilustração simples com CSS */}
        <div className="relative">
          {/* número 404 grande como fundo */}
          <p className="text-[120px] leading-none font-black text-[var(--color-surface-700)] select-none">
            404
          </p>
          {/* ícone de música sobre o número */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-brand-500)]/30 bg-[var(--color-brand-500)]/20">
              <Music size={32} className="text-[var(--color-brand-400)]" />
            </div>
          </div>
        </div>

        {/* texto */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Página não encontrada
          </h1>
          <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
            Parece que essa faixa não está na nossa biblioteca. A página que
            você procura não existe ou foi removida.
          </p>
        </div>

        {/* ações */}
        <div className="flex gap-3">
          <Button variant="primary" leftIcon={<Home size={16} />}>
            <Link href="/dashboard">Voltar ao início</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
