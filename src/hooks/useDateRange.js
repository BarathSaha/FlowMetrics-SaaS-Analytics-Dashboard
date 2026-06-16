import { useMemo } from 'react'
import { subDays, startOfDay } from 'date-fns'
import { useAppStore } from '../store/useAppStore'

const PRESETS = { '7d': 7, '30d': 30, '90d': 90 }

export function useDateRange() {
  const dateRange = useAppStore((s) => s.dateRange)

  return useMemo(() => {
    const end = startOfDay(new Date())
    const days = PRESETS[dateRange]
    if (days) {
      return { startDate: subDays(end, days), endDate: end }
    }
    return { startDate: subDays(end, 30), endDate: end }
  }, [dateRange])
}
