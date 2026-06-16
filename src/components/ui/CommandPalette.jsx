import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'

const PAGES = [
  { path: '/', label: 'Dashboard', keywords: 'overview home kpi metrics' },
  { path: '/users', label: 'Users & Cohorts', keywords: 'people user cohort retention' },
  { path: '/revenue', label: 'Revenue Analytics', keywords: 'money mrr arr plan' },
  { path: '/events', label: 'Events & Funnels', keywords: 'event funnel conversion stream' },
  { path: '/settings', label: 'Settings', keywords: 'preferences profile theme dark' },
]

export function CommandPalette() {
  const open = useAppStore((s) => s.commandOpen)
  const setOpen = useAppStore((s) => s.setCommandOpen)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  const results = query.trim()
    ? PAGES.filter(
        (p) =>
          p.label.toLowerCase().includes(query.toLowerCase()) ||
          p.keywords.includes(query.toLowerCase())
      )
    : PAGES

  const handleSelect = useCallback(
    (path) => {
      navigate(path)
      setOpen(false)
      setQuery('')
    },
    [navigate, setOpen]
  )

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(!open)
        setQuery('')
      }
      if (!open) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        handleSelect(results[selectedIndex].path)
      }
      if (e.key === 'Escape') {
        setOpen(false)
        setQuery('')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex, handleSelect, setOpen])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => { setOpen(false); setQuery('') }}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200/60 bg-white/90 shadow-glass-lg backdrop-blur-2xl dark:border-gray-800/50 dark:bg-gray-900/90"
          >
            <div className="flex items-center gap-3 border-b border-gray-200/60 px-4 dark:border-gray-800/50">
              <svg className="h-5 w-5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0) }}
                placeholder="Search pages..."
                className="flex-1 bg-transparent py-4 text-sm outline-none placeholder-gray-400 dark:text-gray-100 dark:placeholder-gray-500"
              />
              <kbd className="hidden shrink-0 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-xs text-gray-400 sm:inline-block dark:border-gray-700 dark:bg-gray-800">
                ESC
              </kbd>
            </div>
            <div className="max-h-64 overflow-y-auto p-2">
              {results.map((page, i) => (
                <button
                  key={page.path}
                  onClick={() => handleSelect(page.path)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    i === selectedIndex
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                  }`}
                >
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  {page.label}
                  <span className="ml-auto text-xs text-gray-400">{page.path}</span>
                </button>
              ))}
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-gray-400">No results found</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
