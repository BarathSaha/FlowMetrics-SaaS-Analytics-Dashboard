import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { useFilteredData } from '../hooks/useFilteredData'
import { mockUsers } from '../data/mockUsers'
import { mockRevenue } from '../data/mockRevenue'
import { formatCurrency, formatDate } from '../utils/formatters'
import { BarChart } from '../components/charts'
import { DataTable } from '../components/tables/DataTable'
import { Badge } from '../components/ui/Badge'
import { Input } from '../components/ui/Input'
import { CardSkeleton, ChartSkeleton } from '../components/ui/Skeleton'

const planColors = { starter: 'blue', pro: 'green', enterprise: 'yellow' }
const statusColors = { active: 'green', churned: 'red', trial: 'yellow' }

function CohortHeatmap() {
  const cohorts = useMemo(() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return months.map((m, i) => ({
      month: m,
      cohorts: months.map((_, j) => {
        if (j < i) return null
        return Math.floor(Math.random() * 40) + 60
      }),
    }))
  }, [])

  return (
    <div className="card overflow-x-auto">
      <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
        Cohort Retention
      </h3>
      <div className="inline-block" style={{ minWidth: 400 }}>
        <div className="grid" style={{ gridTemplateColumns: `100px repeat(12, 1fr)` }}>
          <div className="text-xs font-medium text-gray-400" />
          {cohorts.map((c) => (
            <div key={c.month} className="px-1 text-center text-xs font-medium text-gray-400">
              {c.month}
            </div>
          ))}
          {cohorts.map((row) => (
            <>
              <div className="py-1 pr-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                {row.month}
              </div>
              {row.cohorts.map((val, i) => (
                <div key={i} className="p-0.5">
                  {val !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.03, duration: 0.3 }}
                      className="flex h-10 items-center justify-center rounded text-xs font-medium text-white transition-all hover:scale-105 hover:shadow-lg"
                      style={{
                        backgroundColor: `hsl(${120 - val * 0.7}, 60%, ${30 + val * 0.3}%)`,
                      }}
                      title={`${val}%`}
                    >
                      {val}%
                    </motion.div>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Users() {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const filters = useAppStore((s) => s.filters)
  const setFilter = useAppStore((s) => s.setFilter)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useFilteredData(mockUsers)
  const searched = useMemo(
    () =>
      filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      ),
    [filtered, search]
  )

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'plan',
      label: 'Plan',
      sortable: true,
      render: (row) => <Badge color={planColors[row.plan]}>{row.plan}</Badge>,
    },
    { key: 'country', label: 'Country', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => <Badge color={statusColors[row.status]}>{row.status}</Badge>,
    },
    {
      key: 'mrr',
      label: 'MRR',
      sortable: true,
      render: (row) => formatCurrency(row.mrr),
    },
    {
      key: 'joinedAt',
      label: 'Joined',
      sortable: true,
      render: (row) => formatDate(row.joinedAt),
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                User Growth (12 months)
              </h3>
              <BarChart
                data={mockRevenue}
                bars={[{ dataKey: 'mrr', name: 'New Users', color: '#22c55e' }]}
              />
            </div>
          )}
        </div>
        <motion.div variants={item}>
          {loading ? <CardSkeleton /> : <CohortHeatmap />}
        </motion.div>
      </motion.div>

      <motion.div variants={item}>
        <div className="card">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-xs"
            />
            <select
              value={filters.plan}
              onChange={(e) => setFilter('plan', e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="all">All Plans</option>
              <option value="starter">Starter</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <select
              value={filters.country}
              onChange={(e) => setFilter('country', e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="all">All Countries</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Germany">Germany</option>
              <option value="Canada">Canada</option>
            </select>
            <select
              value={filters.status}
              onChange={(e) => setFilter('status', e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="churned">Churned</option>
              <option value="trial">Trial</option>
            </select>
          </div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 animate-shimmer rounded-lg bg-shimmer-light dark:bg-shimmer-dark" />
              ))}
            </div>
          ) : (
            <DataTable columns={columns} data={searched} pageSize={50} />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
