import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '../hooks/useCountUp'
import { mockRevenue, mockGeography } from '../data/mockRevenue'
import { formatCurrency, formatPercent } from '../utils/formatters'
import { BarChart, LineChart } from '../components/charts'
import { DataTable } from '../components/tables/DataTable'
import { CardSkeleton, ChartSkeleton } from '../components/ui/Skeleton'

const summaryCards = [
  { label: 'MRR', value: 58420, change: 3.2 },
  { label: 'ARR', value: 701040, change: 12.8 },
  { label: 'Avg Revenue/User', value: 42, change: 5.1, prefix: '$' },
  { label: 'Active Subscribers', value: 1380, change: 7.4 },
]

const upgradeEvents = [
  { user: 'Sarah Chen', from: 'Starter', to: 'Pro', date: '2026-06-15', value: 29 },
  { user: 'James Wilson', from: 'Pro', to: 'Enterprise', date: '2026-06-14', value: 99 },
  { user: 'Maria Garcia', from: 'Starter', to: 'Pro', date: '2026-06-12', value: 29 },
  { user: 'Alex Thompson', from: 'Trial', to: 'Starter', date: '2026-06-11', value: 19 },
  { user: 'Lisa Park', from: 'Starter', to: 'Pro', date: '2026-06-10', value: 29 },
  { user: 'David Kim', from: 'Pro', to: 'Enterprise', date: '2026-06-09', value: 99 },
  { user: 'Emma Davis', from: 'Trial', to: 'Starter', date: '2026-06-08', value: 19 },
  { user: 'Ryan O\'Brien', from: 'Starter', to: 'Pro', date: '2026-06-07', value: 29 },
]

const downgradeEvents = [
  { user: 'John Smith', from: 'Enterprise', to: 'Pro', date: '2026-06-13', value: -70 },
  { user: 'Anna Kowalski', from: 'Pro', to: 'Starter', date: '2026-06-11', value: -10 },
  { user: 'Tom Brown', from: 'Pro', to: 'Starter', date: '2026-06-09', value: -10 },
  { user: 'Nina Patel', from: 'Enterprise', to: 'Pro', date: '2026-06-06', value: -70 },
]

function AnimatedCard({ card }) {
  const animatedValue = useCountUp(card.value)
  return (
    <div className="card-hover">
      <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
        {card.prefix || '$'}{animatedValue.toLocaleString()}
      </p>
      <span
        className={`mt-1 inline-flex items-center gap-1 text-sm font-medium ${
          card.change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        <svg
          className={`h-4 w-4 ${card.change >= 0 ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        {formatPercent(card.change)}
      </span>
    </div>
  )
}

export default function Revenue() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  const changeColumns = [
    { key: 'user', label: 'User', sortable: true },
    { key: 'from', label: 'From', sortable: true, render: (r) => <span className="capitalize">{r.from}</span> },
    { key: 'to', label: 'To', sortable: true, render: (r) => <span className="capitalize">{r.to}</span> },
    { key: 'date', label: 'Date', sortable: true },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (row) => (
        <span className={row.value >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
          {row.value >= 0 ? '+' : ''}${row.value}
        </span>
      ),
    },
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <motion.div variants={item} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label}>
            {loading ? <CardSkeleton /> : <AnimatedCard card={card} />}
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          {loading ? <ChartSkeleton /> : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Revenue by Plan
              </h3>
              <BarChart
                data={mockRevenue}
                bars={[
                  { dataKey: 'starter', name: 'Starter', color: '#86efac' },
                  { dataKey: 'pro', name: 'Pro', color: '#22c55e' },
                  { dataKey: 'enterprise', name: 'Enterprise', color: '#14532d' },
                ]}
                stacked
              />
            </div>
          )}
        </motion.div>
        <motion.div variants={item}>
          {loading ? <ChartSkeleton /> : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                MRR Trend
              </h3>
              <LineChart
                data={mockRevenue}
                lines={[{ dataKey: 'mrr', name: 'MRR', color: '#22c55e' }]}
                showAvg
              />
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          {loading ? <ChartSkeleton /> : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Revenue by Geography
              </h3>
              <div className="space-y-3">
                {mockGeography.map((geo, i) => {
                  const maxRev = Math.max(...mockGeography.map((g) => g.revenue))
                  const pct = (geo.revenue / maxRev) * 100
                  return (
                    <motion.div
                      key={geo.country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300">{geo.country}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          {formatCurrency(geo.revenue)}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100 dark:bg-gray-800">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: i * 0.05 + 0.3, duration: 0.8, ease: 'easeOut' }}
                          className="h-2 rounded-full bg-brand-500"
                        />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </motion.div>
        <motion.div variants={item}>
          {loading ? <ChartSkeleton /> : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                MRR by Plan
              </h3>
              <BarChart
                data={mockRevenue}
                bars={[
                  { dataKey: 'starter', name: 'Starter', color: '#86efac' },
                  { dataKey: 'pro', name: 'Pro', color: '#22c55e' },
                  { dataKey: 'enterprise', name: 'Enterprise', color: '#14532d' },
                ]}
                stacked
              />
            </div>
          )}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          <div className="card">
            <h3 className="mb-4 text-sm font-semibold text-green-600 dark:text-green-400">
              Upgrades
            </h3>
            <DataTable columns={changeColumns} data={upgradeEvents} pageSize={5} />
          </div>
        </motion.div>
        <motion.div variants={item}>
          <div className="card">
            <h3 className="mb-4 text-sm font-semibold text-red-600 dark:text-red-400">
              Downgrades
            </h3>
            <DataTable columns={changeColumns} data={downgradeEvents} pageSize={5} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
