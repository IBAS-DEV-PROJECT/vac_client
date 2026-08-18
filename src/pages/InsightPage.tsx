import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import insightPlus from '@/assets/insightPlus.svg'
import insightEmpty from '@/assets/insightEmpty.png'
import valueEmpty from '@/assets/valueEmpty.png'
import topicEmpty from '@/assets/topicEmpty.svg'
import pencil from '@/assets/pencil.png'
import Button from '@/components/common/button/Button'
import Divider from '@/components/common/Divider'
import InsightFilterSheet from '@/components/insights/InsightFilterSheet'
import InsightSectionEmpty from '@/components/insights/InsightSectionEmpty'
import ValueInsightCard from '@/components/insights/ValueInsightCard'
import InsightCard from '@/components/insights/InsightCard'
import ValueTrendSection from '@/components/insights/ValueTrendSection'
import {
  DEFAULT_FILTERS,
  TOPIC_LABELS,
  VALUE_LABELS,
  VALUE_KEY_MAP,
  type ChangeEntry,
  type InsightFilters,
  type TopicKey,
  type TrendDataPoint,
  type ValueKey,
} from '@/constants/insights'
import { MOCK_INSIGHT } from '@/mock/insight'

function formatPeriodLabel(startDate: string, endDate: string): string {
  const [, sm, sd] = startDate.split('-')
  const [, em, ed] = endDate.split('-')
  return `${Number(sm)}.${Number(sd)}~${Number(em)}.${Number(ed)}`
}

const TREND_DATA: TrendDataPoint[] = MOCK_INSIGHT.trend.map((item) => {
  const point: TrendDataPoint = {
    period: formatPeriodLabel(item.startDate, item.endDate),
  }
  item.valueDistribution.forEach(({ value, percentage }) => {
    const key = VALUE_KEY_MAP[value]
    if (key) point[key] = percentage
  })
  return point
})

const TREND_KEYS: ValueKey[] = Array.from(
  new Set(
    MOCK_INSIGHT.trend.flatMap((item) =>
      item.valueDistribution
        .map(({ value }) => VALUE_KEY_MAP[value])
        .filter((k): k is ValueKey => !!k),
    ),
  ),
)

const INSIGHT_CARDS = MOCK_INSIGHT.valueByTopic.map((item) => ({
  topicKey: item.topic as TopicKey,
  values: item.valueDistribution
    .map(({ value, percentage }) => ({
      key: VALUE_KEY_MAP[value] as ValueKey,
      percent: percentage,
    }))
    .filter((v) => v.key),
  recordCount: item.count,
}))

function buildHeaderLabel(filters: InsightFilters): string {
  const fmt = (d: Date) => `${d.getMonth() + 1}/${d.getDate()}`
  const periodLabel =
    filters.period === '캘린더' && filters.dateRange
      ? `${fmt(filters.dateRange.start)}~${fmt(filters.dateRange.end)}`
      : filters.period

  const parts: string[] = [periodLabel]

  if (filters.topics.length > 0 && !filters.topics.includes('전체')) {
    filters.topics.forEach((t) => parts.push(TOPIC_LABELS[t as TopicKey]))
  }

  if (filters.values.length > 0 && !filters.values.includes('all')) {
    filters.values.forEach((v) => parts.push(VALUE_LABELS[v as ValueKey]))
  }

  return parts.join('·') + ' 기록'
}

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

const topicEmptyIcon = (
  <img
    src={topicEmpty}
    alt=""
    aria-hidden="true"
    className="w-6.5 h-6.5 object-contain"
  />
)

const trendEmptyIcon = (
  <img
    src={valueEmpty}
    alt=""
    aria-hidden="true"
    className="w-6.5 h-6.5 object-contain"
  />
)

const insightEmptyIcon = (
  <img
    src={insightEmpty}
    alt=""
    aria-hidden="true"
    className="w-6.5 h-6.5 object-contain"
  />
)

const lightbulbIcon = <span aria-hidden="true">💡</span>
const chartHintIcon = <span aria-hidden="true">📊</span>
const pencilIcon = <span aria-hidden="true">✏️</span>

function InsightPage() {
  const navigate = useNavigate()
  const [appliedFilters, setAppliedFilters] = useState<InsightFilters>(() => ({
    ...DEFAULT_FILTERS,
    topics: [...DEFAULT_FILTERS.topics],
    values: [...DEFAULT_FILTERS.values],
  }))
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredTrendKeys = appliedFilters.values.includes('all')
    ? TREND_KEYS
    : (appliedFilters.values as ValueKey[]).filter((v) =>
        TREND_KEYS.includes(v),
      )

  const activeKeys =
    filteredTrendKeys.length > 0 ? filteredTrendKeys : TREND_KEYS

  const trendMaxIncrease: ChangeEntry = {
    key: VALUE_KEY_MAP[MOCK_INSIGHT.largestIncrease[0].value] as ValueKey,
    change: MOCK_INSIGHT.largestIncrease[0].increaseRate,
  }
  const trendMaxDecrease: ChangeEntry = {
    key: VALUE_KEY_MAP[MOCK_INSIGHT.largestDecrease[0].value] as ValueKey,
    change: MOCK_INSIGHT.largestDecrease[0].decreaseRate,
  }

  const topTopicLabel =
    TOPIC_LABELS[MOCK_INSIGHT.insight.mostTopic[0] as TopicKey]
  const topValueKey = VALUE_KEY_MAP[
    MOCK_INSIGHT.insight.mostValue[0]
  ] as ValueKey

  const hasTopicData = false
  const hasTrendData = false
  const hasInsightData = false
  const hasAllEmpty = false // 섹션별 빈 상태 테스트용

  return (
    <div className="flex min-h-full flex-col">
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
      {hasAllEmpty ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 py-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
              <img
                src={insightPlus}
                alt=""
                aria-hidden="true"
                className="w-10 h-10"
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
              <Button onClick={() => console.log('지금 기록하기 클릭')}>
                지금 기록하기
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col pb-6">
          {/* 주제별 가치 인사이트 */}
          <section>
            {hasTopicData ? (
              <>
                <div className="flex items-center justify-between px-5 mb-4">
                  <h2 className="text-sm font-bold text-[#2A1F1C]">
                    주제별 가치 인사이트
                  </h2>
                  <span className="text-xs text-gray-400">
                    전체 기록 {MOCK_INSIGHT.totalCount}건
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <div className="flex gap-3 px-5 pb-1">
                    {INSIGHT_CARDS.map((card) => (
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
              </>
            ) : (
              <InsightSectionEmpty
                sectionTitle="주제별 가치 인사이트"
                icon={topicEmptyIcon}
                title="아직 분석할 기록이 없어요."
                description="기록이 쌓이면 어떤 가치가 가장 많이 등장했는지와 자주 고민하는 주제를 한눈에 보여드려요."
                hintIcon={lightbulbIcon}
                hintText="주요 가치의 순위와 변화, 나만의 고민 키워드를 확인할 수 있어요."
              />
            )}
          </section>

          <Divider className="my-5.5" />

          {/* 가치 변화 추이 */}
          <section>
            {hasTrendData ? (
              <>
                <div className="px-5 mb-4">
                  <h2 className="text-sm font-bold text-[#2A1F1C]">
                    가치 변화 추이
                  </h2>
                  <p className="mt-1 text-xs leading-snug text-gray-400">
                    선택한 기간 동안 각 가치의 선택 비율이 어떻게 변했는지
                    보여드려요.
                  </p>
                </div>
                <ValueTrendSection
                  data={TREND_DATA}
                  valueKeys={activeKeys}
                  maxIncrease={trendMaxIncrease}
                  maxDecrease={trendMaxDecrease}
                />
              </>
            ) : (
              <InsightSectionEmpty
                sectionTitle="가치 변화 추이"
                icon={trendEmptyIcon}
                title="아직 변화가 없어요."
                description="기록이 쌓이면 나의 가치가 어떻게 변해왔는지 그래프로 확인할 수 있어요."
                hintIcon={chartHintIcon}
                hintText="시간이 지날수록 나의 고민과 가치의 흐름을 한눈에 볼 수 있어요."
              />
            )}
          </section>

          <Divider className="my-5.5" />

          {/* 한눈에 보는 인사이트 */}
          <section>
            {hasInsightData ? (
              <InsightCard
                topTopicLabel={topTopicLabel}
                topValueKey={topValueKey}
              />
            ) : (
              <InsightSectionEmpty
                sectionTitle="한눈에 보는 인사이트"
                icon={insightEmptyIcon}
                title="아직 요약할 내용이 없어요."
                description="기록이 쌓이면 AI가 나의 고민을 정리해 핵심 인사이트를 한눈에 보여드려요."
                hintIcon={pencilIcon}
                hintText="반복되는 고민, 숨겨진 패턴까지 쉽게 확인할 수 있어요."
              />
            )}
          </section>

          {/* 하단 CTA */}
          <div className="mx-5 mt-6">
            <button
              type="button"
              onClick={() => console.log('기록하기 클릭')}
              className="flex w-full items-center justify-center gap-2 rounded-[9px] bg-[#3E2723] px-5 py-4 text-white"
            >
              <img
                src={pencil}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 object-contain"
              />
              <span className="text-[16px] font-extrabold">
                지금 기록해서 인사이트 만들기
              </span>
              <span className="text-base">›</span>
            </button>
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
            navigate('/insight/records', {
              state: {
                filters: f,
                headerLabel: buildHeaderLabel(f),
              },
            })
          }}
          onClose={() => setIsFilterOpen(false)}
        />
      )}
    </div>
  )
}

export default InsightPage
