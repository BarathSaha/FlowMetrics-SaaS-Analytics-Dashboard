import clsx from 'clsx'

export function Input({ className, ...props }) {
  return (
    <input
      className={clsx(
        'block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500',
        className
      )}
      {...props}
    />
  )
}
