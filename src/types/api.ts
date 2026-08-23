import type { TopicKey, ValueKey } from '@/constants/insights'

export interface ApiResponse<T> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: {
    code: string
    message: string
  }
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse

// ─── Insight ───────────────────────────────────────────────

export type ValueLabel =
  '성장' | '안정' | '자율' | '연결' | '인정' | '재미' | '효율' | '의미' | '책임'

export interface ValueDistributionItem {
  value: ValueLabel
  percentage: number
}

export interface ValueByTopicItem {
  topic: TopicKey
  valueDistribution: ValueDistributionItem[]
  count: number
}

export interface TrendItem {
  startDate: string
  endDate: string
  valueDistribution: ValueDistributionItem[]
}

export interface InsightData {
  valueByTopic: ValueByTopicItem[]
  trend: TrendItem[]
  largestIncrease: { value: ValueLabel; increaseRate: number }[]
  largestDecrease: { value: ValueLabel; decreaseRate: number }[]
  insight: {
    mostTopic: TopicKey[]
    mostValue: ValueLabel[]
  }
  totalCount: number
}

// ─── Topic Records ─────────────────────────────────────────

export interface TopicRecordItem {
  recordId: string
  decision: string
  value: ValueLabel
  concernId: string
  concern: string
  recordDate: string
}

export interface TopicRecordsData {
  topic: TopicKey
  records: TopicRecordItem[]
  recordCount: number
}

// ─── Concern Timeline ──────────────────────────────────────

export interface TimelineRecordItem {
  recordId: string
  decision: string
  value: ValueLabel
  createdAt: string
}

export interface ConcernTimelineData {
  concern: string
  topic: TopicKey
  records: TimelineRecordItem[]
  recordCount: number
}

// ─── Concern Record (클라이언트 모델) ──────────────────────

export interface ConcernRecord {
  id: string
  decision: string
  concern: string
  topic: TopicKey
  valueKey: ValueKey
  date: string
}

// ─── Concern Record (클라이언트 모델) ──────────────────────
export interface ConcernRecord {
  id: string
  decision: string
  concern: string
  topic: TopicKey
  valueKey: ValueKey
  date: string
}

// ─── Home ──────────────────────────────────────────────────
export interface HomeOngoingConcern {
  concernId: string
  concern: string
  topic: TopicKey
  topicOther: string | null
  lastRecordDate: string
}

export interface HomeRecentRecord {
  recordId: string
  decision: string
  date: string
  value: ValueLabel
}

export interface HomeData {
  nickname: string
  ongoingConcernCount: number
  ongoingConcerns: HomeOngoingConcern[]
  monthlyValueHighlight: {
    topValue: ValueLabel
    changeRateVsLastMonth: number
  } | null
  recentRecords: HomeRecentRecord[]
}

// ─── Concerns (기록 작성) ──────────────────────────────────
export interface PendingConcernItem {
  concernId: string
  concern: string
  topic: TopicKey
  topicOther: string | null
  lastRecordDate: string
  recordCount: number
}

export interface PendingConcernsData {
  ongoingConcerns: PendingConcernItem[]
}

export interface PendingRecordItem {
  recordId: string
  decision: string
  value: ValueLabel
  createdAt: string
}

export interface PendingConcernDetailData {
  concern: string
  records: PendingRecordItem[]
}

export interface CreateConcernRequest {
  concern: string
  topic: TopicKey
  topicOther: string | null
  decision: string
  reason: string
  value: ValueLabel
  concernStatus: 'PENDING' | 'RESOLVED'
}

export interface CreateRecordRequest {
  decision: string
  reason: string
  value: ValueLabel
  concernStatus: 'PENDING' | 'RESOLVED'
}
