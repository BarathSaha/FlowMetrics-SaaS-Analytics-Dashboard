export function FunnelChart({ data, valueKey = 'users', labelKey = 'step' }) {
  const maxValue = Math.max(...data.map((d) => d[valueKey]))

  return (
    <div className="space-y-2">
      {data.map((step, i) => {
        const pct = ((step[valueKey] / maxValue) * 100).toFixed(1)
        const conversion = i > 0
          ? ((step[valueKey] / data[i - 1][valueKey]) * 100).toFixed(1)
          : null
        return (
          <div key={step[labelKey]} className="relative">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {step[labelKey]}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {step[valueKey].toLocaleString()}
                {conversion && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    {conversion}%
                  </span>
                )}
              </span>
            </div>
            <div className="mt-1 h-8 w-full rounded-lg bg-gray-100 dark:bg-gray-800">
              <div
                className="h-full rounded-lg transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: step.color || '#22c55e',
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
