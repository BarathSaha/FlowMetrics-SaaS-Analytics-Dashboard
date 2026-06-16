import { motion } from 'framer-motion'
import { Topbar } from './Topbar'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export function PageWrapper({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Topbar />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="p-4 sm:p-6"
      >
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
          )}
        </div>
        {children}
      </motion.main>
    </div>
  )
}
