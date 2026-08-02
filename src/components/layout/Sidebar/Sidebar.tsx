'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Library,
  ListMusic,
  Sparkles,
  ArrowLeftRight,
  Settings,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { mockUser } from '@/mocks/user'
import Image from 'next/image'

// definição dos itens de navegação em um array
// facilita adicionar/remover itens sem mexer no JSX
const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/library', label: 'Biblioteca', icon: Library },
  { href: '/playlists', label: 'Playlists', icon: ListMusic },
  { href: '/insights', label: 'Insights', icon: Sparkles },
  { href: '/transfer', label: 'Transferir', icon: ArrowLeftRight },
]

export function Sidebar() {
  // usePathname retorna a rota atual - usamos para destacar o item ativo
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-40', // fixo na lateral esquerda
        'h-[calc(100vh-80px)] w-60', // altura total, 240px de largura
        'flex flex-col overflow-hidden',
        'bg-[var(--color-surface-800)]',
        'border-r border-[var(--color-surface-600)]'
      )}
      // informa leitores de tela que é a navegação principal
      aria-label="Navegação principal"
    >
      {/* logo */}
      <div className="flex items-center gap-2 border-b border-[var(--color-surface-600)] px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-brand-500)]">
          <span className="text-sm font-bold text-white">H</span>
        </div>
        <span className="text-lg font-semibold text-[var(--color-text-primary)]">
          Harmonia
        </span>
      </div>

      {/* navegação principal */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          // um item é "ativo" se a rota atual começa com o href dele
          const isActive = pathname === href || pathname.startsWith(href + '/')

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5',
                'text-sm font-medium transition-all duration-150',
                'focus-visible:ring-2 focus-visible:outline-none',
                'focus-visible:ring-[var(--color-brand-500)]',
                isActive
                  ? 'bg-[var(--color-brand-500)]/15 text-[var(--color-brand-400)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]'
              )}
              // aria-current informa ao leitor de tela qual página está ativa
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* configurações + avatar do usuário */}
      <div className="flex flex-col gap-1 border-t border-[var(--color-surface-600)] px-3 py-4">
        <Link
          href="/settings"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2.5',
            'text-sm font-medium transition-all duration-150',
            'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:outline-none',
            pathname === '/settings' &&
              'bg-[var(--color-brand-500)]/15 text-[var(--color-brand-400)]'
          )}
          aria-current={pathname === '/settings' ? 'page' : undefined}
        >
          <Settings size={18} aria-hidden="true" />
          Configurações
        </Link>

        {/* perfil do usuário */}
        <div className="mt-1 flex items-center gap-3 overflow-hidden px-3 py-2.5">
          <Image
            src={mockUser.avatarUrl}
            alt={`Avatar de ${mockUser.name}`}
            width={32}
            height={32}
            unoptimized
            className="flex-shrink-0 rounded-full bg-[var(--color-surface-600)]"
          />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-[var(--color-text-primary)]">
              {mockUser.name}
            </p>
            <p className="truncate text-xs text-[var(--color-text-muted)]">
              @{mockUser.username}
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
