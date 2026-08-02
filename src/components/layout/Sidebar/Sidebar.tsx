'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Library,
  ListMusic,
  Sparkles,
  ArrowLeftRight,
  Settings,
  X,
  Menu,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { mockUser } from '@/mocks/user'
import Image from 'next/image'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/library', label: 'Biblioteca', icon: Library },
  { href: '/playlists', label: 'Playlists', icon: ListMusic },
  { href: '/insights', label: 'Insights', icon: Sparkles },
  { href: '/transfer', label: 'Transferir', icon: ArrowLeftRight },
]

// conteúdo interno da sidebar — reutilizado em desktop e mobile
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      {/* logo + botão fechar (mobile) */}
      <div
        className="flex items-center justify-between border-b border-[var(--color-surface-600)]"
        style={{ padding: '20px 24px' }}
      >
        <div className="flex items-center" style={{ gap: '10px' }}>
          <div
            className="flex items-center justify-center rounded-lg bg-[var(--color-brand-500)]"
            style={{ width: '32px', height: '32px' }}
          >
            <span className="text-sm font-bold text-white">H</span>
          </div>
          <span className="text-lg font-semibold text-[var(--color-text-primary)]">
            Harmonia
          </span>
        </div>
        {/* botão de fechar só aparece no mobile */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Fechar menu"
            className="text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* navegação */}
      <nav className="flex-1" style={{ padding: '12px' }}>
        <ul className="flex flex-col" style={{ gap: '2px' }}>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center rounded-lg text-sm font-medium transition-all',
                    'focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:outline-none',
                    isActive
                      ? 'bg-[var(--color-brand-500)]/15 text-[var(--color-brand-400)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]'
                  )}
                  style={{ gap: '12px', padding: '10px 12px' }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* rodapé: configurações + perfil */}
      <div
        className="flex flex-col border-t border-[var(--color-surface-600)]"
        style={{ padding: '12px', gap: '2px' }}
      >
        <Link
          href="/settings"
          onClick={onClose}
          className={cn(
            'flex items-center rounded-lg text-sm font-medium transition-all',
            'focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:outline-none',
            pathname === '/settings'
              ? 'bg-[var(--color-brand-500)]/15 text-[var(--color-brand-400)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-700)] hover:text-[var(--color-text-primary)]'
          )}
          style={{ gap: '12px', padding: '10px 12px' }}
          aria-current={pathname === '/settings' ? 'page' : undefined}
        >
          <Settings size={18} aria-hidden="true" />
          Configurações
        </Link>

        {/* perfil */}
        <div
          className="flex items-center overflow-hidden"
          style={{ gap: '12px', padding: '10px 12px' }}
        >
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
    </div>
  )
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* ── sidebar desktop: fixa na lateral ── */}
      <aside
        className="fixed top-0 left-0 z-40 hidden flex-col border-r border-[var(--color-surface-600)] bg-[var(--color-surface-800)] md:flex"
        style={{ width: '240px', height: 'calc(100vh - 80px)' }}
        aria-label="Navegação principal"
      >
        <SidebarContent />
      </aside>

      {/* ── botão hambúrguer mobile ── */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menu"
        className="hamburger-btn"
        style={{
          position: 'fixed',
          top: '12px',
          left: '12px',
          zIndex: 55,
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          background: 'var(--color-surface-800)',
          border: '1px solid var(--color-surface-600)',
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Menu size={20} />
      </button>

      {/* ── sidebar mobile: overlay ── */}
      {mobileOpen && (
        <>
          {/* fundo escurecido */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              background: 'rgba(0,0,0,0.6)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={() => setMobileOpen(false)}
          />
          {/* painel lateral */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 61,
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--color-surface-800)',
              width: '280px',
              height: '100vh',
            }}
          >
            <SidebarContent onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}
    </>
  )
}
