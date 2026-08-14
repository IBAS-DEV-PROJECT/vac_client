import { useState } from 'react'
import insightPlus from '@/assets/insightPlus.svg'
import Button from '@/components/common/button/Button'
import Divider from '@/components/common/Divider'
import InsightFilterSheet from '@/components/insights/InsightFilterSheet'
import ValueInsightCard from '@/components/insights/ValueInsightCard'
import InsightCard from '@/components/insights/InsightCard'
import ValueTrendSection from '@/components/insights/ValueTrendSection'
import {
  DEFAULT_FILTERS,
  TOPIC_LABELS,
  VALUE_LABELS,
  type ChangeEntry,
  type InsightFilters,
  type TopicKey,
  type TrendDataPoint,
  type ValueKey,
} from '@/constants/insights'

const MOCK_TOTAL_RECORDS = 48

const DEFAULT_TREND_KEYS: ValueKey[] = [
  'growth',
  'stability',
  'autonomy',
  'connection',
]

const MOCK_TREND_DATA: TrendDataPoint[] = [
  { period: '6.30~7.6', growth: 45, stability: 20, autonomy: 5, connection: 8 },
  {
    period: '7.7~7.13',
    growth: 80,
    stability: 30,
    autonomy: 12,
    connection: 22,
  },
  {
    period: '7.14~7.20',
    growth: 74,
    stability: 30,
    autonomy: 8,
    connection: 26,
  },
  {
    period: '7.21~7.27',
    growth: 90,
    stability: 26,
    autonomy: 10,
    connection: 28,
  },
]

const MOCK_INSIGHT_CARDS = [
  {
    topicKey: '일' as TopicKey,
    values: [
      { key: 'growth' as ValueKey, percent: 62 },
      { key: 'stability' as ValueKey, percent: 20 },
      { key: 'autonomy' as ValueKey, percent: 12 },
      { key: 'connection' as ValueKey, percent: 6 },
    ],
    recordCount: 12,
  },
  {
    topicKey: '관계' as TopicKey,
    values: [
      { key: 'connection' as ValueKey, percent: 45 },
      { key: 'stability' as ValueKey, percent: 30 },
      { key: 'growth' as ValueKey, percent: 15 },
      { key: 'autonomy' as ValueKey, percent: 10 },
    ],
    recordCount: 11,
  },
  {
    topicKey: '건강' as TopicKey,
    values: [
      { key: 'stability' as ValueKey, percent: 50 },
      { key: 'autonomy' as ValueKey, percent: 28 },
      { key: 'growth' as ValueKey, percent: 22 },
    ],
    recordCount: 9,
  },
]

function buildFilterSummary(filters: InsightFilters): string {
  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`
  const periodLabel =
    filters.period === '캘린더' && filters.dateRange
      ? `${fmt(filters.dateRange.start)}~${fmt(filters.dateRange.end)}`
      : filters.period

  const parts: string[] = [periodLabel]

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

  const hasRecords = true

  const trendValueKeys: ValueKey[] = appliedFilters.values.includes('all')
    ? DEFAULT_TREND_KEYS
    : (appliedFilters.values as ValueKey[]).filter((v) =>
        DEFAULT_TREND_KEYS.includes(v),
      )

  const activeKeys =
    trendValueKeys.length > 0 ? trendValueKeys : DEFAULT_TREND_KEYS

  const trendChanges: ChangeEntry[] = activeKeys.map((key) => ({
    key,
    change:
      ((MOCK_TREND_DATA[MOCK_TREND_DATA.length - 1]?.[key] as number) ?? 0) -
      ((MOCK_TREND_DATA[MOCK_TREND_DATA.length - 2]?.[key] as number) ?? 0),
  }))

  const trendMaxIncrease = trendChanges.reduce((a, b) =>
    a.change >= b.change ? a : b,
  )
  const trendMaxDecrease = trendChanges.reduce((a, b) =>
    a.change <= b.change ? a : b,
  )

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
      <div className="px-5">
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
      <Divider className="my-5.5" />

      {/* 본문 콘텐츠 */}
      {hasRecords ? (
        <div className="flex flex-col">
          {/* 주제별 가치 인사이트 */}
          <section>
            <div className="flex items-center justify-between px-5 mb-4">
              <h2 className="text-sm font-bold text-[#2A1F1C]">
                주제별 가치 인사이트
              </h2>
              <span className="text-xs text-gray-400">
                전체 기록 {MOCK_TOTAL_RECORDS}건
              </span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-3 px-5 pb-1">
                {MOCK_INSIGHT_CARDS.map((card) => (
                  <ValueInsightCard
                    key={card.topicKey}
                    {...card}
                    onRecordClick={() =>
                      console.log(`${card.topicKey} 기록 클릭`)
                    }
                  />
                ))}
              </div>
            </div>
          </section>
          <Divider className="my-5.5" />
          <div className="px-5 mb-4">
            <h2 className="text-sm font-bold text-[#2A1F1C]">가치 변화 추이</h2>
            <p className="mt-1 text-xs leading-snug text-gray-400">
              선택한 기간 동안 각 가치의 선택 비율이 어떻게 변했는지 보여드려요.
            </p>
          </div>
          <ValueTrendSection
            data={MOCK_TREND_DATA}
            valueKeys={activeKeys}
            maxIncrease={trendMaxIncrease}
            maxDecrease={trendMaxDecrease}
          />
          <Divider className="my-5.5" />
          <InsightCard topTopicLabel="일·진로" topValueKey="growth" />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-10">
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
        </div>
      )}

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
