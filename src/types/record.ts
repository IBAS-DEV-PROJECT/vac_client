import { type TopicKey, type ValueKey } from '@/constants/insights'

export type ConcernStatus = 'PENDING' | 'RESOLVED'

export interface RecordForm {
  concern: string
  topic: TopicKey | null
  topicEtc: string
  decision: string
  reason: string
  value: ValueKey | null
  concernStatus: ConcernStatus
}

/** 이어쓸 고민 목록 항목 */
export interface PendingConcern {
  concernId: string
  concern: string
  topic: TopicKey
  lastRecordDate: string
  recordCount: number
}
