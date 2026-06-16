import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useAppStore } from './store/useAppStore'
import { Sidebar } from './components/layout/Sidebar'
import { PageWrapper } from './components/layout/PageWrapper'
import { CommandPalette } from './components/ui/CommandPalette'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Revenue from './pages/Revenue'
import Events from './pages/Events'
import Settings from './pages/Settings'

function AppContent() {
  const location = useLocation()
  const theme = useAppStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const routes = [
    { path: '/', element: <Dashboard />, title: 'Dashboard', subtitle: 'Overview of your key metrics' },
    { path: '/users', element: <Users />, title: 'Users & Cohorts', subtitle: 'User management and retention analysis' },
    { path: '/revenue', element: <Revenue />, title: 'Revenue Analytics', subtitle: 'MRR, ARR, and plan breakdowns' },
    { path: '/events', element: <Events />, title: 'Events & Funnels', subtitle: 'Event stream and conversion funnels' },
    { path: '/settings', element: <Settings />, title: 'Settings', subtitle: 'Manage your account and preferences' },
  ]

  return (
    <div className="flex">
      <Sidebar />
      <div className="min-h-screen lg:ml-64 flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PageWrapper title={route.title} subtitle={route.subtitle}>
                    {route.element}
                  </PageWrapper>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </div>
      <CommandPalette />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-900 dark:text-white !shadow-glass-lg !border !border-gray-200/60 dark:!border-gray-800/50 !backdrop-blur-xl',
          duration: 3000,
        }}
      />
      <AppContent />
    </BrowserRouter>
  )
}
