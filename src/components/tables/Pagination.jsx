import clsx from 'clsx'

export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-800">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Prev
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const start = Math.max(1, currentPage - 2)
          const page = start + i
          if (page > totalPages) return null
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={clsx(
                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-brand-500 text-white'
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              )}
            >
              {page}
            </button>
          )
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Next
        </button>
      </div>
    </div>
  )
}
