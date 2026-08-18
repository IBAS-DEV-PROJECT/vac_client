import type { TopicKey, ValueKey } from '@/constants/insights'

export type PeriodOption =
  '최근 1년' | '오늘' | '최근 7일' | '최근 30일' | '캘린더'
export type TopicOption = '전체' | TopicKey

export interface InsightFilters {
  period: PeriodOption
  dateRange?: { start: Date; end: Date }
  topics: TopicOption[]
  values: (ValueKey | 'all')[]
}

export const DEFAULT_FILTERS: InsightFilters = {
  period: '최근 7일',
  topics: ['전체'],
  values: ['all'],
}

export interface TrendDataPoint {
  period: string
  [key: string]: number | string
}

export interface ChangeEntry {
  key: ValueKey
  change: number
}
