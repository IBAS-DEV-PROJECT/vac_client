import { api } from './api'
import type {
  InsightData,
  TopicRecordsData,
  ConcernTimelineData,
} from '@/types/api'
import type { InsightFilters } from '@/types/insight'
import {
  VALUE_LABELS,
  TOPIC_LABELS,
  type TopicKey,
  type ValueKey,
} from '@/constants/insights'
import { getDateRange } from '@/utils/insightFilter'

export function toDateParam(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const ALL_TOPIC_KEYS = Object.keys(TOPIC_LABELS) as TopicKey[]

export async function fetchInsight(
  filters: InsightFilters,
): Promise<InsightData> {
  const { start, end } = getDateRange(filters)
  const params: Record<string, string> = {
    startDate: toDateParam(start),
    endDate: toDateParam(end),
  }

  if (!filters.topics.includes('전체') && filters.topics.length > 0) {
    params.topics = filters.topics.join(',')
  }
  if (!filters.values.includes('all') && filters.values.length > 0) {
    params.values = filters.values
      .map((v) => VALUE_LABELS[v as ValueKey])
      .join(',')
  }

  const { data } = await api.get<{ success: true; data: InsightData }>(
    '/insights',
    { params },
  )
  return data.data
}

export async function fetchInsightRecords(
  topic: TopicKey,
  startDate: string,
  endDate: string,
): Promise<TopicRecordsData> {
  const { data } = await api.get<{ success: true; data: TopicRecordsData }>(
    `/insights/${encodeURIComponent(topic)}/records`,
    { params: { startDate, endDate } },
  )
  return data.data
}

export async function fetchConcernTimeline(
  concernId: string,
): Promise<ConcernTimelineData> {
  const { data } = await api.get<{ success: true; data: ConcernTimelineData }>(
    `/concerns/${concernId}/timeline`,
  )
  return data.data
}
