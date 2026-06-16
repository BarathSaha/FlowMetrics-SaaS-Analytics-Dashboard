import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

const presets = [
  { value: '7d', label: '7d' },
  { value: '30d', label: '30d' },
  { value: '90d', label: '90d' },
]

export function Topbar() {
  const theme = useAppStore((s) => s.theme)
  const toggleTheme = useAppStore((s) => s.toggleTheme)
  const dateRange = useAppStore((s) => s.dateRange)
  const setDateRange = useAppStore((s) => s.setDateRange)
  const setSidebarOpen = useAppStore((s) => s.setSidebarOpen)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200/60 bg-white/70 px-4 backdrop-blur-2xl dark:border-gray-800/50 dark:bg-gray-950/70 sm:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>

        {/* Date range pills */}
        <div className="relative flex items-center gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
          {presets.map((p) => (
            <button
              key={p.value}
              onClick={() => setDateRange(p.value)}
              className="relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            >
              {dateRange === p.value && (
                <motion.div
                  layoutId="date-pill"
                  className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-gray-700"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${dateRange === p.value ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                {p.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          title="Toggle theme"
        >
          {theme === 'light' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )}
        </motion.button>
      </div>
    </header>
  )
}
