import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useFilteredData(rawData) {
  const filters = useAppStore((s) => s.filters)

  return useMemo(() => {
    return rawData.filter((item) => {
      const byPlan = filters.plan === 'all' || item.plan === filters.plan
      const byCountry =
        filters.country === 'all' || item.country === filters.country
      const byStatus =
        filters.status === 'all' || item.status === filters.status
      return byPlan && byCountry && byStatus
    })
  }, [rawData, filters])
}
