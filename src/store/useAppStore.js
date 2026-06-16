import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAppStore = create(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),

      dateRange: '30d',
      setDateRange: (range) => set({ dateRange: range }),

      filters: { plan: 'all', country: 'all', status: 'all' },
      setFilter: (key, val) =>
        set((s) => ({ filters: { ...s.filters, [key]: val } })),

      commandOpen: false,
      setCommandOpen: (val) => set({ commandOpen: val }),

      sidebarOpen: false,
      setSidebarOpen: (val) => set({ sidebarOpen: val }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    { name: 'flowmetrics-store' }
  )
)
