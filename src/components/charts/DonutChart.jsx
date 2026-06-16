import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null
  const { name, value } = payload[0]
  const total = payload[0]?.payload?.total || 1
  const pct = ((value / total) * 100).toFixed(1)
  return (
    <div className="rounded-xl border border-gray-200/60 bg-white/90 p-3 shadow-glass-lg backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/90">
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-500">{pct}%</p>
    </div>
  )
}

const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16']

export function DonutChart({ data, dataKey = 'value', nameKey = 'name', height = 280 }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center text-sm text-gray-400">
        No data available
      </div>
    )
  }

  const total = data.reduce((sum, d) => sum + d[dataKey], 0)
  const chartData = data.map((d) => ({ ...d, total }))

  return (
    <div className="flex flex-col items-center" style={{ minHeight: height }}>
      <div className="relative w-full" style={{ maxWidth: 400, minHeight: height }}>
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={3}
              animationBegin={200}
              animationDuration={1200}
            >
              {chartData.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <div className="text-center">
            <p className="text-xs text-gray-400 dark:text-gray-500">Total</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {total.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {chartData.map((entry, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-gray-600 dark:text-gray-400">{entry[nameKey]}</span>
            <span className="font-medium tabular-nums text-gray-900 dark:text-gray-100">
              {((entry[dataKey] / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
