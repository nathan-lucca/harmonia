import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Next.js baixa a Inter no build e serve do próprio servidor
// isso evita requisição externa e melhora o Lighthouse
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Harmonia',
  description:
    'Plataforma musical com dashboard, player e transferência de playlists.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
