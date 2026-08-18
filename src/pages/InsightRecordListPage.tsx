import { useNavigate, useLocation } from 'react-router-dom'
import RecordItem from '@/components/common/record/RecordItem'
import { type InsightFilters } from '@/constants/insights'
import { MOCK_CONCERN_RECORDS } from '@/mock/concernRecords'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

function InsightRecordListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    filters: InsightFilters
    headerLabel: string
    count: number
  } | null

  const records = MOCK_CONCERN_RECORDS

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
          {state?.headerLabel ?? '기록 목록'} {state?.count ?? records.length}건
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
