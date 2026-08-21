import { MOCK_CONCERN_RECORDS } from '@/mock/concernRecords'
import { type PendingConcern } from '@/types/record'

// TODO: GET /concerns/pending 연동 전 임시 데이터
// 기존 기록 목업에서 고민 단위로 묶어 파생
// 빈 상태 확인용 → 아래 배열을 [] 로 변경
export const MOCK_PENDING_CONCERNS: PendingConcern[] = Object.values(
  MOCK_CONCERN_RECORDS.reduce<Record<string, PendingConcern>>((acc, record) => {
    const existing = acc[record.concern]

    if (!existing) {
      acc[record.concern] = {
        concern: record.concern,
        topic: record.topic,
        lastRecordDate: record.date,
        recordCount: 1,
      }
      return acc
    }

    existing.recordCount += 1
    if (record.date > existing.lastRecordDate) {
      existing.lastRecordDate = record.date
    }
    return acc
  }, {}),
).sort((a, b) => a.lastRecordDate.localeCompare(b.lastRecordDate))

/** 특정 고민의 지난 기록 (오래된 순) */
export function getRecordsByConcern(concern: string) {
  return MOCK_CONCERN_RECORDS.filter((r) => r.concern === concern).sort(
    (a, b) => a.date.localeCompare(b.date),
  )
}
