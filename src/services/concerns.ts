import { api } from '@/services/api'
import {
  type ApiResult,
  type CreateConcernRequest,
  type CreateRecordRequest,
  type PendingConcernDetailData,
  type PendingConcernsData,
} from '@/types/api'

/** 이어쓸 고민 목록 조회 */
export async function getPendingConcerns(): Promise<PendingConcernsData> {
  const { data } =
    await api.get<ApiResult<PendingConcernsData>>('/concerns/pending')

  if (!data.success) throw new Error(data.error.message)
  return data.data
}

/** 특정 고민의 지난 기록 조회 */
export async function getPendingConcernDetail(
  concernId: string,
): Promise<PendingConcernDetailData> {
  const { data } = await api.get<ApiResult<PendingConcernDetailData>>(
    `/concerns/pending/${concernId}`,
  )

  if (!data.success) throw new Error(data.error.message)
  return data.data
}

/** 새 고민 작성 */
export async function createConcern(body: CreateConcernRequest): Promise<void> {
  const { data } = await api.post<ApiResult<unknown>>('/concerns', body)

  if (!data.success) throw new Error(data.error.message)
}

/** 이어쓰기 기록 작성 */
export async function createPendingRecord(
  concernId: string,
  body: CreateRecordRequest,
): Promise<void> {
  const { data } = await api.post<ApiResult<unknown>>(
    `/concerns/pending/${concernId}`,
    body,
  )

  if (!data.success) throw new Error(data.error.message)
}
