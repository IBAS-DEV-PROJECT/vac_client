import { useEffect, useState } from 'react'
import { getPendingConcernDetail } from '@/services/concerns'
import { type PendingRecordItem } from '@/types/api'

export function useConcernDetail(concernId: string) {
  const [records, setRecords] = useState<PendingRecordItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let ignore = false

    getPendingConcernDetail(concernId)
      .then((result) => {
        if (!ignore)
          setRecords(
            [...result.records].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            ),
          )
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
  }, [concernId])

  return { records, isLoading, error }
}
