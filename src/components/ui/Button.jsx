import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

const variants = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-500',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
  ghost: 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800',
  gradient: 'bg-brand-gradient text-white shadow-glow hover:shadow-glow-lg hover:brightness-110',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({ children, variant = 'primary', size = 'md', className, ...props }) {
  const ref = useRef(null)
  const [ripples, setRipples] = useState([])

  function handleClick(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((r) => [...r, { x, y, id }])
    setTimeout(() => setRipples((r) => r.filter((ri) => ri.id !== id)), 600)
    props.onClick?.(e)
  }

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/30 animate-fade-in"
          style={{
            left: ripple.x - 8,
            top: ripple.y - 8,
            width: 16,
            height: 16,
            transform: 'scale(4)',
            opacity: 0,
            transition: 'all 0.6s ease-out',
          }}
        />
      ))}
    </motion.button>
  )
}
