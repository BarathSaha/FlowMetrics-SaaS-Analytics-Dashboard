import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { useDateRange } from '../hooks/useDateRange'
import { useCountUp } from '../hooks/useCountUp'
import { mockRevenue } from '../data/mockRevenue'
import { formatCurrency, formatPercent } from '../utils/formatters'
import { LineChart, DonutChart, Sparkline } from '../components/charts'
import { DataTable } from '../components/tables/DataTable'
import { CardSkeleton, ChartSkeleton } from '../components/ui/Skeleton'
import { Badge } from '../components/ui/Badge'

const KPIS = [
  { label: 'MRR', value: 58420, change: 12.5, prefix: '$' },
  { label: 'DAU', value: 12480, change: 8.3, prefix: '' },
  { label: 'Churn Rate', value: 2.4, change: -0.6, prefix: '', suffix: '%' },
  { label: 'NPS', value: 72, change: 4.1, prefix: '', suffix: '' },
]

const trafficSources = [
  { name: 'Direct', value: 35 },
  { name: 'Organic', value: 28 },
  { name: 'Social', value: 20 },
  { name: 'Referral', value: 12 },
  { name: 'Email', value: 5 },
]

const topEvents = [
  { event: 'page_view', count: 28450, change: 5.2, trend: [2400, 2580, 2450, 2600, 2800, 2750, 2845] },
  { event: 'signup', count: 3200, change: 12.8, trend: [210, 245, 260, 290, 310, 305, 320] },
  { event: 'login', count: 18900, change: -2.1, trend: [1950, 1920, 1880, 1900, 1870, 1850, 1890] },
  { event: 'purchase', count: 1450, change: 8.7, trend: [95, 105, 110, 120, 135, 140, 145] },
  { event: 'upgrade', count: 380, change: 15.3, trend: [22, 25, 28, 30, 35, 36, 38] },
  { event: 'trial_started', count: 2100, change: -1.5, trend: [215, 220, 210, 205, 195, 200, 210] },
  { event: 'invite_sent', count: 890, change: 22.4, trend: [48, 52, 60, 68, 72, 80, 89] },
  { event: 'logout', count: 17600, change: 3.1, trend: [1800, 1750, 1780, 1740, 1760, 1750, 1760] },
  { event: 'downgrade', count: 120, change: -8.9, trend: [15, 14, 13, 12, 11, 12, 12] },
  { event: 'trial_ended', count: 980, change: 4.6, trend: [68, 72, 70, 75, 78, 82, 98] },
]

function AnimatedKPI({ kpi }) {
  const animatedValue = useCountUp(kpi.value)

  return (
    <div className="card-hover">
      <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
        {kpi.prefix}{animatedValue.toLocaleString()}{kpi.suffix || ''}
      </p>
      <span
        className={`mt-1 inline-flex items-center gap-1 text-sm font-medium ${
          kpi.change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}
      >
        <motion.svg
          initial={{ rotate: kpi.change >= 0 ? -180 : 0 }}
          animate={{ rotate: 0 }}
          className={`h-4 w-4 ${kpi.change >= 0 ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </motion.svg>
        {formatPercent(kpi.change)}
      </span>
    </div>
  )
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const dateRange = useAppStore((s) => s.dateRange)
  useDateRange()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => (
          <motion.div key={kpi.label} variants={item}>
            {loading ? <CardSkeleton /> : <AnimatedKPI kpi={kpi} />}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div variants={item} className="lg:col-span-2">
          {loading ? (
            <ChartSkeleton />
          ) : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Revenue Trend ({dateRange})
              </h3>
              <LineChart
                data={mockRevenue}
                lines={[
                  { dataKey: 'mrr', name: 'MRR', color: '#22c55e' },
                ]}
                showAvg
              />
            </div>
          )}
        </motion.div>
        <motion.div variants={item}>
          {loading ? (
            <ChartSkeleton />
          ) : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Traffic Sources
              </h3>
              <DonutChart data={trafficSources} />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div variants={item}>
        {loading ? (
          <div className="card space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 animate-shimmer rounded-lg bg-shimmer-light dark:bg-shimmer-dark" />
            ))}
          </div>
        ) : (
          <div className="card">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Top Events
            </h3>
            <DataTable
              columns={[
                { key: 'event', label: 'Event', sortable: true },
                { key: 'count', label: 'Count', sortable: true },
                {
                  key: 'change',
                  label: 'Change',
                  sortable: true,
                  render: (row) => (
                    <span className={row.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {formatPercent(row.change)}
                      </motion.span>
                    </span>
                  ),
                },
                {
                  key: 'trend',
                  label: 'Trend',
                  render: (row) => <Sparkline data={row.trend} />,
                },
              ]}
              data={topEvents}
              pageSize={10}
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
