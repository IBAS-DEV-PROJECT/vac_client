import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import RecordItem from '@/components/common/record/RecordItem'
import {
  TOPIC_LABELS,
  VALUE_KEY_MAP,
  type TopicKey,
  type ValueKey,
} from '@/constants/insights'
import { type InsightFilters } from '@/types/insight'
import type { TopicRecordItem } from '@/types/api'
import { formatDate } from '@/utils/date'
import { getDateRange } from '@/utils/insightFilter'
import {
  fetchInsightRecords,
  toDateParam,
  ALL_TOPIC_KEYS,
} from '@/services/insight'

interface ConcernCard {
  concernId: string
  concern: string
  topic: TopicKey
  valueKey: ValueKey
  firstDate: string
}

function buildConcernCards(
  results: { topic: TopicKey; records: TopicRecordItem[] }[],
): ConcernCard[] {
  const seen = new Map<string, ConcernCard>()

  results.forEach(({ topic, records }) => {
    records.forEach((record) => {
      const existing = seen.get(record.concernId)
      if (!existing || record.recordDate < existing.firstDate) {
        seen.set(record.concernId, {
          concernId: record.concernId,
          concern: record.concern,
          topic,
          valueKey: VALUE_KEY_MAP[record.value],
          firstDate: record.recordDate,
        })
      }
    })
  })

  return Array.from(seen.values())
}

function InsightRecordListPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    filters: InsightFilters
    headerLabel: string
  } | null

  const [concernCards, setConcernCards] = useState<ConcernCard[]>([])
  const [isLoading, setIsLoading] = useState(!!state?.filters)
  const [isError, setIsError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const filters = state?.filters
    if (!filters) return

    const { start, end } = getDateRange(filters)
    const startDate = toDateParam(start)
    const endDate = toDateParam(end)

    const topics: TopicKey[] = filters.topics.includes('전체')
      ? ALL_TOPIC_KEYS
      : (filters.topics as TopicKey[])

    Promise.all(
      topics.map((topic) => fetchInsightRecords(topic, startDate, endDate)),
    )
      .then((results) => {
        const cards = buildConcernCards(
          results.map((r) => ({ topic: r.topic, records: r.records })),
        )
        setConcernCards(cards)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [state?.filters, retryCount])

  const handleRetry = () => {
    setIsLoading(true)
    setIsError(false)
    setRetryCount((c) => c + 1)
  }

  const handleConcernClick = (card: ConcernCard) => {
    navigate('/insight/timeline', {
      state: {
        concernId: card.concernId,
        concern: card.concern,
        topic: card.topic,
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
          {state?.headerLabel ?? '기록 목록'}{' '}
          {!isLoading && `${concernCards.length}건`}
        </h1>
      </div>

      {/* 고민 목록 */}
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-[#2A1F1C]/50">불러오는 중...</p>
        </div>
      ) : isError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2">
          <p className="text-sm text-[#2A1F1C]/60">
            데이터를 불러오지 못했어요.
          </p>
          <button
            type="button"
            onClick={handleRetry}
            className="text-sm font-medium text-[#3E2723] underline"
          >
            다시 시도
          </button>
        </div>
      ) : (
        <div className="mt-2 flex flex-col px-5">
          {concernCards.map((card) => (
            <RecordItem
              key={card.concernId}
              valueKey={card.valueKey}
              title={card.concern}
              topic={TOPIC_LABELS[card.topic]}
              date={formatDate(card.firstDate)}
              onClick={() => handleConcernClick(card)}
              className="cursor-pointer"
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default InsightRecordListPage
