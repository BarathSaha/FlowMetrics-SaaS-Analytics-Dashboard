import { motion } from 'framer-motion'
import clsx from 'clsx'

const colors = {
  green: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  blue: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  red: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  gray: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
}

export function Badge({ children, color = 'gray', className }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        colors[color],
        className
      )}
    >
      {children}
    </motion.span>
  )
}
