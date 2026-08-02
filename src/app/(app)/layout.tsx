import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { PlayerBar } from '@/features/player/components/PlayerBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface-900)]">
      <Sidebar />

      {/*
        no desktop (md+): margem esquerda de 240px para não sobrepor a sidebar
        no mobile: sem margem, sidebar é overlay
        usamos uma classe CSS customizada no globals.css
      */}
      <div className="content-area flex min-h-screen flex-col">
        <Header />
        <main
          id="main-content"
          className="flex-1"
          style={{ padding: '24px 24px 120px' }}
        >
          {children}
        </main>
      </div>

      <PlayerBar />
    </div>
  )
}
