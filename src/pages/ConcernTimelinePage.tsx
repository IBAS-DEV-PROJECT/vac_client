import { useNavigate, useLocation } from 'react-router-dom'
import RecordTimelineItem from '@/components/common/record/RecordTimelineItem'
import { TOPIC_LABELS, type TopicKey } from '@/constants/insights'
import type { ConcernRecord } from '@/types/api'
import { formatDate } from '@/utils/date'

function ConcernTimelinePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    concern: string
    topic: TopicKey
    records: ConcernRecord[]
  } | null

  const concern = state?.concern ?? ''
  const topicLabel = state?.topic ? TOPIC_LABELS[state.topic] : ''
  const records = state?.records ?? []

  return (
    <div className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <div className="flex h-15 items-center gap-3 px-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="뒤로가기"
          className="cursor-pointer text-[#2A1F1C]"
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
        <div className="flex flex-col gap-0.5">
          <h1 className="text-[15px] font-extrabold text-[#2A1F1C]">
            {concern}
          </h1>
          <p className="text-[12px] text-[#2A1F1C]/60">
            {topicLabel} · 기록 {records.length}건
          </p>
        </div>
      </div>

      <div className="h-px bg-[#3E2723]/15" />

      {/* 타임라인 */}
      <div className="pl-6 pt-5">
        {records.map((record) => (
          <RecordTimelineItem
            key={record.id}
            valueKey={record.valueKey}
            title={record.decision}
            date={formatDate(record.date)}
          />
        ))}
      </div>
    </div>
  )
}

export default ConcernTimelinePage
