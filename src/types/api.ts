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

// ─── Insight ───────────────────────────────────────────────

export interface ValueDistributionItem {
  value: string
  percentage: number
}

export interface ValueByTopicItem {
  topic: string
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
  largestIncrease: { value: string; increaseRate: number }[]
  largestDecrease: { value: string; decreaseRate: number }[]
  insight: {
    mostTopic: string[]
    mostValue: string[]
  }
  totalCount: number
}

// ─── Topic Records ─────────────────────────────────────────

export interface TopicRecordItem {
  recordId: string
  decision: string
  value: string
  concernId: string
  concern: string
  recordDate: string
}

export interface TopicRecordsData {
  topic: string
  records: TopicRecordItem[]
  recordCount: number
}

// ─── Concern Timeline ──────────────────────────────────────

export interface TimelineRecordItem {
  recordId: string
  decision: string
  value: string
  createdAt: string
}

export interface ConcernTimelineData {
  concern: string
  topic: string
  records: TimelineRecordItem[]
  recordCount: number
}
