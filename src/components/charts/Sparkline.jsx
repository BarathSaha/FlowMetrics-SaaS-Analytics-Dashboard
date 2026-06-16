import { useMemo } from 'react'

export function Sparkline({ data = [], width = 80, height = 28, color = '#22c55e' }) {
  const path = useMemo(() => {
    if (!data.length) return ''
    const min = Math.min(...data)
    const max = Math.max(...data)
    const range = max - min || 1
    const stepX = width / (data.length - 1)
    return data
      .map((v, i) => {
        const x = i * stepX
        const y = height - ((v - min) / range) * (height - 4) - 2
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(' ')
  }, [data, width, height])

  return (
    <svg width={width} height={height} className="shrink-0">
      <defs>
        <linearGradient id={`spark-fill-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`${path} L${width},${height} L0,${height} Z`}
        fill={`url(#spark-fill-${color.replace('#', '')})`}
      />
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
