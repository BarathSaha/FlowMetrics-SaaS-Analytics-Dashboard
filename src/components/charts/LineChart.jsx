import {
  ResponsiveContainer,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Area,
  ComposedChart,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload) return null
  return (
    <div className="rounded-xl border border-gray-200/60 bg-white/90 p-3 shadow-glass-lg backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-900/90">
      <p className="mb-1 text-xs text-gray-500 dark:text-gray-400">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

export function LineChart({ data, lines, xKey = 'month', height = 300, showAvg = false }) {
  const avg = showAvg && data.length
    ? data.reduce((s, d) => s + d[lines[0]?.dataKey], 0) / data.length
    : null

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
        <defs>
          {lines.map((line) => (
            <linearGradient key={line.dataKey} id={`fill-${line.dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={line.color || '#22c55e'} stopOpacity="0.2" />
              <stop offset="100%" stopColor={line.color || '#22c55e'} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-gray-200/60 dark:text-gray-800/60" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} className="text-gray-400" axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12 }} className="text-gray-400" axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'currentColor', className: 'text-gray-300 dark:text-gray-600' }} />
        {lines.map((line) => (
          <Area
            key={`area-${line.dataKey}`}
            type="monotone"
            dataKey={line.dataKey}
            fill={`url(#fill-${line.dataKey})`}
            stroke="none"
          />
        ))}
        {lines.map((line) => (
          <Line
            key={`line-${line.dataKey}`}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color || '#22c55e'}
            strokeWidth={2.5}
            dot={{ r: 3, fill: line.color || '#22c55e', strokeWidth: 0 }}
            activeDot={{ r: 6, fill: line.color || '#22c55e', stroke: 'white', strokeWidth: 2 }}
            name={line.name || line.dataKey}
          />
        ))}
        {avg !== null && (
          <ReferenceLine
            y={avg}
            stroke="currentColor"
            className="text-gray-400 dark:text-gray-500"
            strokeDasharray="4 4"
            label={{
              value: `Avg: ${Math.round(avg).toLocaleString()}`,
              position: 'insideTopRight',
              fontSize: 11,
              fill: 'currentColor',
              className: 'text-gray-400',
            }}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  )
}
