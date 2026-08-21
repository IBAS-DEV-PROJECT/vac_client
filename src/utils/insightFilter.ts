import type { InsightFilters } from '@/types/insight'
import { MOCK_CONCERN_RECORDS } from '@/mock/concernRecords'

export function getDateRange(filters: InsightFilters): {
  start: Date
  end: Date
} {
  const end = new Date()
  end.setHours(23, 59, 59, 999)

  if (filters.period === '캘린더' && filters.dateRange) {
    return { start: filters.dateRange.start, end: filters.dateRange.end }
  }

  const start = new Date()
  start.setHours(0, 0, 0, 0)

  if (filters.period === '오늘') return { start, end }
  if (filters.period === '최근 7일') {
    start.setDate(start.getDate() - 6)
    return { start, end }
  }
  if (filters.period === '최근 30일') {
    start.setDate(start.getDate() - 29)
    return { start, end }
  }
  if (filters.period === '최근 1년') {
    start.setFullYear(start.getFullYear() - 1)
    return { start, end }
  }

  return { start, end }
}

export function filterRecords(filters: InsightFilters) {
  const { start, end } = getDateRange(filters)

  return MOCK_CONCERN_RECORDS.filter((record) => {
    const date = new Date(record.date)

    if (date < start || date > end) return false

    if (
      !filters.topics.includes('전체') &&
      !filters.topics.includes(record.topic)
    )
      return false

    if (
      !filters.values.includes('all') &&
      !filters.values.includes(record.valueKey)
    )
      return false

    return true
  })
}
