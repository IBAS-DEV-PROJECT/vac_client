import { MOCK_CONCERN_RECORDS } from '@/mock/concernRecords'
import { type ConcernRecord } from '@/types/api'
import { type PendingConcern } from '@/types/record'

// TODO: GET /concerns/pending 연동 전 임시 데이터
// concernRecords 목업에 concernId가 없어 제목 순서로 임시 부여
const CONCERN_IDS = new Map<string, string>()
MOCK_CONCERN_RECORDS.forEach((record) => {
  if (!CONCERN_IDS.has(record.concern)) {
    CONCERN_IDS.set(record.concern, `c${CONCERN_IDS.size + 1}`)
  }
})

const RECORDS_BY_ID = new Map<string, ConcernRecord[]>()
MOCK_CONCERN_RECORDS.forEach((record) => {
  const id = CONCERN_IDS.get(record.concern)!
  RECORDS_BY_ID.set(id, [...(RECORDS_BY_ID.get(id) ?? []), record])
})

// 빈 상태 확인용 → 아래 배열을 [] 로 변경
export const MOCK_PENDING_CONCERNS: PendingConcern[] = Array.from(
  RECORDS_BY_ID.entries(),
)
  .map(([concernId, records]) => ({
    concernId,
    concern: records[0].concern,
    topic: records[0].topic,
    lastRecordDate: records.reduce(
      (latest, r) => (r.date > latest ? r.date : latest),
      records[0].date,
    ),
    recordCount: records.length,
  }))
  .sort((a, b) => a.lastRecordDate.localeCompare(b.lastRecordDate))

/** 특정 고민의 지난 기록 (오래된 순) */
export function getRecordsByConcernId(concernId: string): ConcernRecord[] {
  return [...(RECORDS_BY_ID.get(concernId) ?? [])].sort((a, b) =>
    a.date.localeCompare(b.date),
  )
}
