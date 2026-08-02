import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { PlayerBar } from '@/features/player/components/PlayerBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface-900)]">
      <Sidebar />

      {/* ml-60 = margem esquerda igual à largura da sidebar */}
      <div className="ml-60 flex min-h-screen flex-col">
        <Header />

        {/* pb-20 = padding bottom igual à altura do player */}
        <main className="flex-1 p-6 pb-20" id="main-content">
          {children}
        </main>
      </div>

      <PlayerBar />
    </div>
  )
}
