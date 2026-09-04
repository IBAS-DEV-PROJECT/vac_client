import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import RecordItem from '@/components/common/record/RecordItem'
import Button from '@/components/common/button/Button'
import insightPlus from '@/assets/insightPlus.svg'
import {
  TOPIC_LABELS,
  VALUE_KEY_MAP,
  type TopicKey,
  type ValueKey,
} from '@/constants/insights'
import { type InsightFilters } from '@/types/insight'
import type { TopicRecordItem } from '@/types/api'
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
  latestDate: string
  decision: string
}

function buildConcernCards(
  results: { topic: TopicKey; records: TopicRecordItem[] }[],
  valueFilter: (ValueKey | 'all')[],
): ConcernCard[] {
  const seen = new Map<string, ConcernCard>()

  results.forEach(({ topic, records }) => {
    records.forEach((record) => {
      if (!valueFilter.includes('all')) {
        const recordValueKey = VALUE_KEY_MAP[record.value]
        if (!valueFilter.includes(recordValueKey)) return
      }

      const existing = seen.get(record.concernId)
      if (!existing || record.recordDate > existing.latestDate) {
        seen.set(record.concernId, {
          concernId: record.concernId,
          concern: record.concern,
          topic,
          valueKey: VALUE_KEY_MAP[record.value],
          latestDate: record.recordDate,
          decision: record.decision,
        })
      }
    })
  })

  return Array.from(seen.values()).sort((a, b) =>
    b.latestDate.localeCompare(a.latestDate),
  )
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
          filters.values,
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
      ) : concernCards.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <img
                src={insightPlus}
                alt=""
                aria-hidden="true"
                className="h-10 w-10"
              />
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#2A1F1C]">
                선택한 조건에 맞는 기록이 아직 없어요
              </p>
              <p className="mt-1 text-sm text-[#2A1F1C]/60">
                기록을 남기고 나만의 인사이트를 확인해보세요.
              </p>
            </div>
            <div className="mt-1 w-48">
              <Button onClick={() => navigate('/record')}>지금 기록하기</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-col px-5">
          {concernCards.map((card) => (
            <RecordItem
              key={card.concernId}
              valueKey={card.valueKey}
              title={card.concern}
              topic={TOPIC_LABELS[card.topic]}
              date={card.latestDate}
              decision={card.decision}
              variant="insight"
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
