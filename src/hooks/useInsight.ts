import { useEffect, useState } from 'react'
import { fetchInsight } from '@/services/insight'
import type { InsightData } from '@/types/api'
import type { InsightFilters } from '@/types/insight'

export function useInsight(filters: InsightFilters) {
  const [data, setData] = useState<InsightData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let ignore = false

    fetchInsight(filters)
      .then((result) => {
        if (!ignore) {
          setData(result)
          setError(null)
        }
      })
      .catch((err: Error) => {
        if (!ignore) setError(err)
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [filters])

  return { data, isLoading, error }
}
