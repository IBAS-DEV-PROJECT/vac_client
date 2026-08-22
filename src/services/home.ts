import { api } from '@/services/api'
import { type ApiResult, type HomeData } from '@/types/api'

export async function getHome(): Promise<HomeData> {
  const { data } = await api.get<ApiResult<HomeData>>('/home')

  if (!data.success) {
    throw new Error(data.error.message)
  }

  return data.data
}
