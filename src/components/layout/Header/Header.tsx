'use client'

import { usePathname } from 'next/navigation'
import { Search, Bell } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// mapeia rotas para títulos legíveis
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

  // pega o título da página atual, ou "Harmonia" como fallback
  const title = PAGE_TITLES[pathname] ?? 'Harmonia'

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b-2 border-[var(--color-surface-600)] bg-[var(--color-surface-800)] sticky top-0 z-30">
      <h1 className="text-lg font-semibold text-[var(--color-text-primary)]">
        {title}
      </h1>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" aria-label="Buscar">
          <Search size={18}></Search>
        </Button>
        <Button variant="ghost" size="sm" aria-label="Notificações">
          <Bell size={18}></Bell>
        </Button>
      </div>
    </header>
  )
}
