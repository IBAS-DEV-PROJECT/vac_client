import { type TopicKey, type ValueKey } from '@/constants/insights'

export type ConcernStatus = 'PENDING' | 'RESOLVED'

export interface RecordForm {
  concern: string
  topic: TopicKey | null
  topicOther: string
  decision: string
  reason: string
  value: ValueKey | null
  concernStatus: ConcernStatus | null
}
