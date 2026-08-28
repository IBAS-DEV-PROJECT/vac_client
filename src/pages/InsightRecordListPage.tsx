import { useNavigate, useLocation } from 'react-router-dom'
import RecordItem from '@/components/common/record/RecordItem'
import { type InsightFilters } from '@/types/insight'
import { MOCK_CONCERN_RECORDS } from '@/mock/concernRecords'
import { filterRecords } from '@/utils/insightFilter'

function InsightRecordListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    filters: InsightFilters
    headerLabel: string
  } | null

  const filteredRecords = state?.filters
    ? filterRecords(state.filters)
    : MOCK_CONCERN_RECORDS

  // 고민 단위로 중복 제거
  const seen = new Set<string>()
  const concernCards = filteredRecords
    .filter((r) => {
      if (seen.has(r.concern)) return false
      seen.add(r.concern)
      return true
    })
    .map((r) => {
      // 해당 고민의 첫 기록일 (전체 mock 기준)
      const firstDate = MOCK_CONCERN_RECORDS.filter(
        (cr) => cr.concern === r.concern,
      ).sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )[0].date
      return { ...r, firstDate }
    })

  const handleConcernClick = (concern: (typeof concernCards)[number]) => {
    const records = MOCK_CONCERN_RECORDS.filter(
      (r) => r.concern === concern.concern,
    ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    navigate('/insight/timeline', {
      state: {
        concern: concern.concern,
        topic: concern.topic,
        records,
      },
    })
  }

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
        <h1 className="text-[15px] font-extrabold text-[#2A1F1C]">
          {state?.headerLabel ?? '기록 목록'} {concernCards.length}건
        </h1>
      </div>

      {/* 고민 목록 */}
      <div className="mt-2 flex flex-col px-5">
        {concernCards.map((concern) => (
          <RecordItem
            key={concern.concern}
            valueKey={concern.valueKey}
            title={concern.decision}
            topic={concern.concern}
            date={concern.firstDate}
            variant="insight"
            onClick={() => handleConcernClick(concern)}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  )
}

export default InsightRecordListPage
