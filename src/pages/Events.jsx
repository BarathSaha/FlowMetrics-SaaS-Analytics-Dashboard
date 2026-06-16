import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { mockEventStream, mockFunnel } from '../data/mockEvents'
import { formatDate } from '../utils/formatters'
import { FunnelChart, LineChart } from '../components/charts'
import { Badge } from '../components/ui/Badge'
import { ChartSkeleton } from '../components/ui/Skeleton'

const eventColors = {
  page_view: 'blue',
  signup: 'green',
  login: 'gray',
  purchase: 'yellow',
  upgrade: 'green',
  downgrade: 'red',
  logout: 'gray',
  trial_started: 'blue',
  invite_sent: 'yellow',
}

const conversionTrend = [
  { month: 'Jan', rate: 3.8 },
  { month: 'Feb', rate: 4.1 },
  { month: 'Mar', rate: 3.5 },
  { month: 'Apr', rate: 4.3 },
  { month: 'May', rate: 4.8 },
  { month: 'Jun', rate: 5.2 },
  { month: 'Jul', rate: 4.9 },
  { month: 'Aug', rate: 5.5 },
  { month: 'Sep', rate: 5.1 },
  { month: 'Oct', rate: 5.8 },
  { month: 'Nov', rate: 6.2 },
  { month: 'Dec', rate: 5.9 },
]

export default function Events() {
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

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div variants={item}>
          {loading ? <ChartSkeleton /> : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Funnel
              </h3>
              <FunnelChart data={mockFunnel} />
            </div>
          )}
        </motion.div>
        <motion.div variants={item}>
          {loading ? <ChartSkeleton /> : (
            <div className="card">
              <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
                Conversion Rate Trend
              </h3>
              <LineChart
                data={conversionTrend}
                lines={[{ dataKey: 'rate', name: 'Conversion Rate', color: '#22c55e' }]}
                xKey="month"
                showAvg
              />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div variants={item}>
        {loading ? <ChartSkeleton /> : (
          <div className="card">
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Live Event Stream
            </h3>
            <div className="space-y-2">
              {mockEventStream.slice(0, 50).map((evt, i) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.01 }}
                  className="flex items-center justify-between rounded-lg border border-gray-100/60 px-4 py-3 transition-all hover:border-gray-200 hover:bg-gray-50/50 dark:border-gray-800/60 dark:hover:border-gray-700/60 dark:hover:bg-gray-800/30"
                >
                  <div className="flex items-center gap-3">
                    <Badge color={eventColors[evt.event] || 'gray'}>
                      {evt.event.replace('_', ' ')}
                    </Badge>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {evt.user}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">
                      {formatDate(evt.timestamp)}
                    </span>
                    {evt.value > 0 && (
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        ${evt.value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
