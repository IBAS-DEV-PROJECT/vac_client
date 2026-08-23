import { useEffect, useState } from 'react'
import { getPendingConcerns } from '@/services/concerns'
import { type PendingConcernItem } from '@/types/api'

export function usePendingConcerns(enabled: boolean) {
  const [concerns, setConcerns] = useState<PendingConcernItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!enabled) return

    let ignore = false

    getPendingConcerns()
      .then((result) => {
        if (!ignore) setConcerns(result.ongoingConcerns)
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
  }, [enabled])

  return { concerns, isLoading, error }
}
