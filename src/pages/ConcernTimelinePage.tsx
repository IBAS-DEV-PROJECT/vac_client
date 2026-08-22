import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import RecordTimelineItem from '@/components/common/record/RecordTimelineItem'
import {
  TOPIC_LABELS,
  VALUE_KEY_MAP,
  type TopicKey,
} from '@/constants/insights'
import type { ConcernTimelineData } from '@/types/api'
import { formatDate } from '@/utils/date'
import { fetchConcernTimeline } from '@/services/insight'

function ConcernTimelinePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    concernId: string
    concern: string
    topic: TopicKey
  } | null

  const [timelineData, setTimelineData] = useState<ConcernTimelineData | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(!!state?.concernId)

  useEffect(() => {
    if (!state?.concernId) return
    fetchConcernTimeline(state.concernId)
      .then(setTimelineData)
      .catch(() => setTimelineData(null))
      .finally(() => setIsLoading(false))
  }, [state?.concernId])

  const concern = timelineData?.concern ?? state?.concern ?? ''
  const topic = timelineData?.topic ?? state?.topic
  const topicLabel = topic ? TOPIC_LABELS[topic] : ''
  const records = timelineData?.records ?? []

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
            {topicLabel} · 기록 {timelineData?.recordCount ?? 0}건
          </p>
        </div>
      </div>

      <div className="h-px bg-[#3E2723]/15" />

      {/* 타임라인 */}
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-[#2A1F1C]/50">불러오는 중...</p>
        </div>
      ) : (
        <div className="pl-6 pt-5">
          {records.map((record) => (
            <RecordTimelineItem
              key={record.recordId}
              valueKey={VALUE_KEY_MAP[record.value]}
              title={record.decision}
              date={formatDate(record.createdAt)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ConcernTimelinePage
