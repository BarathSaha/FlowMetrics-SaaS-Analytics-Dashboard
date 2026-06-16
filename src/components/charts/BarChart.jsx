import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null
  return (
    <div className="rounded-xl border border-gray-200/60 bg-white/90 p-3 shadow-glass-lg backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/90">
      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

const BAR_COLORS = ['#86efac', '#22c55e', '#14532d']

export function BarChart({ data, bars, xKey = 'month', height = 300, stacked = false }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200/60 dark:text-gray-800/60" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} className="text-gray-400" axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} className="text-gray-400" axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'currentColor', className: 'text-gray-100/50 dark:text-gray-800/50' }} />
        <Legend iconType="circle" />
        {bars.map((bar, idx) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={bar.color || BAR_COLORS[idx % BAR_COLORS.length]}
            name={bar.name || bar.dataKey}
            stackId={stacked ? 'stack' : undefined}
            radius={[4, 4, 0, 0]}
            animationBegin={idx * 150}
            animationDuration={800}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}
