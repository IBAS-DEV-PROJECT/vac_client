import { useNavigate, useLocation } from 'react-router-dom'
import RecordItem from '@/components/common/record/RecordItem'
import {
  type InsightFilters,
  type TopicKey,
  type ValueKey,
} from '@/constants/insights'
import { MOCK_CONCERN_RECORDS } from '@/mock/concernRecords'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

function getDateRange(filters: InsightFilters): { start: Date; end: Date } {
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

function filterRecords(filters: InsightFilters) {
  const { start, end } = getDateRange(filters)

  return MOCK_CONCERN_RECORDS.filter((record) => {
    const date = new Date(record.date)

    if (date < start || date > end) return false

    if (
      !filters.topics.includes('전체') &&
      !filters.topics.includes(record.topic as TopicKey)
    )
      return false

    if (
      !filters.values.includes('all') &&
      !filters.values.includes(record.valueKey as ValueKey)
    )
      return false

    return true
  })
}

function InsightRecordListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    filters: InsightFilters
    headerLabel: string
  } | null

  const records = state?.filters
    ? filterRecords(state.filters)
    : MOCK_CONCERN_RECORDS

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-4 py-4 shadow-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="cursor-pointer p-1 text-[#2A1F1C]"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <h1 className="text-[15px] font-bold text-[#2A1F1C]">
          {state?.headerLabel ?? '기록 목록'} {records.length}건
        </h1>
      </div>

      {/* 기록 목록 */}
      <div className="mt-2 flex flex-col px-5">
        {records.map((record) => (
          <RecordItem
            key={record.id}
            valueKey={record.valueKey}
            title={record.decision}
            topic={record.concern}
            date={formatDate(record.date)}
          />
        ))}
      </div>
    </div>
  )
}

export default InsightRecordListPage
