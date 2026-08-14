import { useState } from 'react'
import insightPlus from '@/assets/insightPlus.svg'
import Button from '@/components/common/button/Button'
import InsightFilterSheet from '@/components/insights/InsightFilterSheet'
import {
  DEFAULT_FILTERS,
  TOPIC_LABELS,
  VALUE_LABELS,
  type InsightFilters,
  type TopicKey,
  type ValueKey,
} from '@/constants/insights'

function buildFilterSummary(filters: InsightFilters): string {
  const parts: string[] = [filters.period]

  if (filters.topics.length > 0 && !filters.topics.includes('전체')) {
    parts.push(filters.topics.map((t) => TOPIC_LABELS[t as TopicKey]).join('·'))
  }

  if (filters.values.length > 0 && !filters.values.includes('all')) {
    parts.push(filters.values.map((v) => VALUE_LABELS[v as ValueKey]).join('·'))
  }

  return parts.join(' · ')
}

function InsightPage() {
  const [appliedFilters, setAppliedFilters] = useState<InsightFilters>(() => ({
    ...DEFAULT_FILTERS,
    topics: [...DEFAULT_FILTERS.topics],
    values: [...DEFAULT_FILTERS.values],
  }))
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const hasRecords = false

  return (
    <div className="flex min-h-full flex-col bg-[#E1F5FE]">
      {/* 페이지 헤더 */}
      <div className="px-5 pb-5 pt-8">
        <h1 className="text-2xl font-bold text-[#2A1F1C]">인사이트</h1>
        <p className="mt-1 text-sm text-[#2A1F1C]/60">
          나의 고민과 가치 패턴을 한눈에 확인해보세요.
        </p>
      </div>

      {/* 통합 필터 바 */}
      <div className="px-5 pb-5.5">
        <button
          type="button"
          onClick={() => setIsFilterOpen(true)}
          className="flex w-full cursor-pointer items-center justify-between rounded-xl bg-white px-4 py-3.5 shadow-sm"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-[#2A1F1C]">
            <svg
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
              <circle cx="7" cy="5" r="2" fill="white" />
              <circle cx="13" cy="10" r="2" fill="white" />
              <circle cx="7" cy="15" r="2" fill="white" />
            </svg>
            통합 필터
          </div>
          <span className="text-sm text-[#2A1F1C]/50">
            {buildFilterSummary(appliedFilters)}
          </span>
        </button>
      </div>
      <div className="h-0.5 bg-gray-300" />

      {/* 본문 콘텐츠 */}
      <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-10">
        {hasRecords ? null : (
          <div className="flex flex-col items-center gap-4 text-center">
            <img
              src={insightPlus}
              alt=""
              aria-hidden="true"
              className="w-20 h-20"
            />
            <div>
              <p className="text-[15px] font-bold text-[#2A1F1C]">
                선택한 조건에 맞는 기록이 아직 없어요
              </p>
              <p className="mt-1 text-sm text-[#2A1F1C]/60">
                기록을 남기고 나만의 인사이트를 확인해보세요.
              </p>
            </div>
            <div className="mt-1 w-48">
              <Button onClick={() => console.log('지금 기록하기 클릭')}>
                지금 기록하기
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 필터 바텀시트 */}
      {isFilterOpen && (
        <InsightFilterSheet
          filters={appliedFilters}
          onApply={(f) => {
            setAppliedFilters(f)
            setIsFilterOpen(false)
          }}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  )
}

export default InsightPage
