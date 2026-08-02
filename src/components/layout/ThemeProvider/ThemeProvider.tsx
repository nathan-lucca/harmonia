'use client'

import { useEffect } from 'react'
import { usePreferencesStore } from '@/stores/preferencesStore'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = usePreferencesStore()

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'system') {
      // lê a preferência do sistema operacional
      const systemDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      root.setAttribute('data-theme', systemDark ? 'dark' : 'light')
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  return <>{children}</>
}
