export function SortableHeader({ label, sortKey, currentSort, onSort }) {
  const isAsc = currentSort?.key === sortKey && currentSort?.direction === 'asc'
  const isDesc = currentSort?.key === sortKey && currentSort?.direction === 'desc'

  return (
    <button
      onClick={() =>
        onSort({
          key: sortKey,
          direction: isAsc ? 'desc' : 'asc',
        })
      }
      className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
    >
      {label}
      <span className="inline-flex flex-col leading-none">
        <svg
          className={`h-3 w-3 ${isAsc ? 'text-brand-500' : 'text-gray-300 dark:text-gray-600'}`}
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M5 0L10 6H0z" />
        </svg>
        <svg
          className={`h-3 w-3 ${isDesc ? 'text-brand-500' : 'text-gray-300 dark:text-gray-600'}`}
          viewBox="0 0 10 6"
          fill="currentColor"
        >
          <path d="M5 6L0 0h10z" />
        </svg>
      </span>
    </button>
  )
}
