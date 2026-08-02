import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'dark' | 'light' | 'system'
type LibraryView = 'list' | 'grid'

interface PreferencesStore {
  theme: Theme
  libraryView: LibraryView
  sidebarCollapsed: boolean

  setTheme: (theme: Theme) => void
  setLibraryView: (view: LibraryView) => void
  toggleSidebar: () => void
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      libraryView: 'list',
      sidebarCollapsed: false,

      setTheme: (theme) => set({ theme }),
      setLibraryView: (view) => set({ libraryView: view }),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    { name: 'harmonia-preferences' }
  )
)
