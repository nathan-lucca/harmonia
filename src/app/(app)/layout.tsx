import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { PlayerBar } from '@/features/player/components/PlayerBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface-900)]">
      <Sidebar />

      <div
        style={{ marginLeft: '240px' }}
        className="flex min-h-screen flex-col"
      >
        <Header />
        <main
          className="flex-1 p-6"
          style={{ paddingBottom: '100px' }}
          id="main-content"
        >
          {children}
        </main>
      </div>

      <PlayerBar />
    </div>
  )
}
