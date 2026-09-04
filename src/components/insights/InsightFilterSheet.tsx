import { useState } from 'react'
import FilterButton from './FilterButton'
import ValueButton from './ValueButton'
import CalendarSheet from './CalendarSheet'
import BottomSheet from '@/components/common/BottomSheet'
import Button from '@/components/common/button/Button'
import {
  TOPIC_OPTIONS,
  VALUE_LABELS,
  type ValueKey,
} from '@/constants/insights'
import {
  DEFAULT_FILTERS,
  type InsightFilters,
  type PeriodOption,
  type TopicOption,
} from '@/types/insight'

const PERIOD_OPTIONS: PeriodOption[] = [
  '최근 1년',
  '오늘',
  '최근 7일',
  '최근 30일',
  '캘린더',
]

const VALUE_OPTIONS = (Object.keys(VALUE_LABELS) as ValueKey[]).map((key) => ({
  key,
  label: VALUE_LABELS[key],
}))

interface InsightFilterSheetProps {
  onClose: () => void
  filters: InsightFilters
  onApply: (filters: InsightFilters) => void
}

function cloneFilters(f: InsightFilters): InsightFilters {
  return {
    ...f,
    topics: [...f.topics],
    values: [...f.values],
    dateRange: f.dateRange ? { ...f.dateRange } : undefined,
  }
}

function InsightFilterSheet({
  onClose,
  filters,
  onApply,
}: InsightFilterSheetProps) {
  const [pending, setPending] = useState<InsightFilters>(() =>
    cloneFilters(filters),
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handlePeriodSelect = (period: PeriodOption) => {
    if (period === '캘린더') {
      setPending((prev) => ({ ...prev, period }))
      setIsCalendarOpen(true)
    } else {
      setPending((prev) => ({ ...prev, period, dateRange: undefined }))
    }
  }

  const handleCalendarApply = (start: Date, end: Date) => {
    setPending((prev) => ({ ...prev, dateRange: { start, end } }))
    setIsCalendarOpen(false)
  }

  const handleTopicToggle = (topic: TopicOption) => {
    if (topic === '전체') {
      setPending((prev) => ({ ...prev, topics: ['전체'] }))
      return
    }
    setPending((prev) => {
      const filtered = prev.topics.filter((t) => t !== '전체')
      const newTopics = filtered.includes(topic)
        ? filtered.filter((t) => t !== topic)
        : [...filtered, topic]
      return { ...prev, topics: newTopics.length === 0 ? ['전체'] : newTopics }
    })
  }

  const handleValueToggle = (value: ValueKey | 'all') => {
    if (value === 'all') {
      setPending((prev) => ({
        ...prev,
        values: prev.values.includes('all') ? [] : ['all'],
      }))
      return
    }
    setPending((prev) => {
      const filtered = prev.values.filter((v) => v !== 'all') as ValueKey[]
      const newValues = filtered.includes(value)
        ? filtered.filter((v) => v !== value)
        : [...filtered, value]
      return { ...prev, values: newValues }
    })
  }

  const handleReset = () => setPending(cloneFilters(DEFAULT_FILTERS))

  const handleApply = () => onApply(pending)

  const isApplyDisabled =
    pending.topics.length === 0 ||
    pending.values.length === 0 ||
    (pending.period === '캘린더' && !pending.dateRange)

  return (
    <>
      <BottomSheet onClose={onClose}>
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 pb-5 pt-7">
          <span className="text-base font-extrabold text-[#2A1F1C]">필터</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="flex cursor-pointer items-center gap-1 text-[12px] font-semibold text-black"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13.5 8A5.5 5.5 0 1 1 8 2.5c1.8 0 3.4.86 4.4 2.2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M11 4.5H13.5V2"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              초기화
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="닫기"
              className="cursor-pointer text-black"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 스크롤 가능한 콘텐츠 */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 pb-5">
          {/* 기간 */}
          <section className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-500">기간</span>
            <div className="flex flex-wrap gap-2">
              {PERIOD_OPTIONS.map((p) =>
                p === '캘린더' ? (
                  <button
                    key={p}
                    type="button"
                    onClick={() => handlePeriodSelect(p)}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      pending.period === '캘린더'
                        ? 'border-(--color-stability) bg-(--color-stability) text-black'
                        : 'border-gray-300 bg-white text-black'
                    }`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <rect x="2" y="3" width="12" height="11" rx="2" />
                      <path d="M2 7h12" />
                      <path d="M5 1v4M11 1v4" />
                    </svg>
                    직접 선택
                  </button>
                ) : (
                  <FilterButton
                    key={p}
                    label={p}
                    isActive={pending.period === p}
                    onClick={() => handlePeriodSelect(p)}
                  />
                ),
              )}
            </div>
          </section>

          {/* 주제 */}
          <section className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-500">주제</span>
            <div className="flex flex-wrap gap-2">
              {TOPIC_OPTIONS.map(({ key, label }) => (
                <FilterButton
                  key={key}
                  label={label}
                  isActive={pending.topics.includes(key)}
                  onClick={() => handleTopicToggle(key)}
                />
              ))}
            </div>
          </section>

          {/* 가치축 */}
          <section className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-500">가치축</span>
            <ValueButton
              category="all"
              label="전체 선택"
              isActive={pending.values.includes('all')}
              onClick={() => handleValueToggle('all')}
            />
            <div className="grid grid-cols-2 gap-2">
              {VALUE_OPTIONS.map(({ key, label }) => (
                <ValueButton
                  key={key}
                  category={key}
                  label={label}
                  isActive={
                    !pending.values.includes('all') &&
                    pending.values.includes(key)
                  }
                  onClick={() => handleValueToggle(key)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* 적용하기 버튼 */}
        <div className="px-5 pb-6 pt-4">
          <Button onClick={handleApply} disabled={isApplyDisabled}>
            적용하기
          </Button>
        </div>
      </BottomSheet>

      {isCalendarOpen && (
        <CalendarSheet
          initialStart={pending.dateRange?.start}
          initialEnd={pending.dateRange?.end}
          onApply={handleCalendarApply}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}
    </>
  )
}

export default InsightFilterSheet
