import { useEffect, useState } from 'react'
import { getHome } from '@/services/home'
import { type HomeData } from '@/types/api'

export function useHome() {
  const [data, setData] = useState<HomeData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let ignore = false

    getHome()
      .then((result) => {
        if (!ignore) setData(result)
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
  }, [])

  return { data, isLoading, error }
}
