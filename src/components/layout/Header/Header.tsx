'use client'

import { usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/library': 'Biblioteca',
  '/playlists': 'Playlists',
  '/insights': 'Insights',
  '/transfer': 'Transferir Playlists',
  '/settings': 'Configurações',
}

export function Header() {
  const pathname = usePathname()
  const title = PAGE_TITLES[pathname] ?? 'Harmonia'

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-surface-600)] bg-[var(--color-surface-800)]"
      style={{ height: '73px', padding: '0 24px' }}
    >
      {/* título da página — com margem no mobile para não sobrepor o hambúrguer */}
      <h1
        className="font-semibold text-[var(--color-text-primary)]"
        style={{ fontSize: '17px' }}
      >
        <span className="header-title-mobile">{title}</span>
        <span className="header-title-desktop">{title}</span>
      </h1>

      {/* ações do header */}
      <div className="flex items-center" style={{ gap: '4px' }}>
        <button
          aria-label="Buscar"
          className="flex items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]"
          style={{ width: '36px', height: '36px' }}
        >
          <Search size={18} />
        </button>
        <button
          aria-label="Notificações"
          className="flex items-center justify-center rounded-lg text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]"
          style={{ width: '36px', height: '36px' }}
        >
          <Bell size={18} />
        </button>
      </div>
    </header>
  )
}
