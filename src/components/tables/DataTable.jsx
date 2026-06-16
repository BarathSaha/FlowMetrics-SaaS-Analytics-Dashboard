import { useState, useMemo } from 'react'
import { SortableHeader } from './SortableHeader'
import { Pagination } from './Pagination'

export function DataTable({ columns, data, pageSize = 10 }) {
  const [sort, setSort] = useState({ key: null, direction: 'asc' })
  const [page, setPage] = useState(1)

  const sorted = useMemo(() => {
    if (!sort.key) return data
    return [...data].sort((a, b) => {
      const aVal = a[sort.key]
      const bVal = b[sort.key]
      if (typeof aVal === 'string') {
        return sort.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      return sort.direction === 'asc' ? aVal - bVal : bVal - aVal
    })
  }, [data, sort])

  const totalPages = Math.ceil(sorted.length / pageSize)
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-4 py-3 text-left"
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.sortable ? (
                    <SortableHeader
                      label={col.label}
                      sortKey={col.key}
                      currentSort={sort}
                      onSort={setSort}
                    />
                  ) : (
                    <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      {col.label}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {paginated.map((row, i) => (
              <tr
                key={row.id || i}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-gray-400"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  )
}
