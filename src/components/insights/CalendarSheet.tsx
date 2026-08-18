import { useState } from 'react'
import BottomSheet from '@/components/common/BottomSheet'
import Button from '@/components/common/button/Button'

interface CalendarSheetProps {
  initialStart?: Date
  initialEnd?: Date
  onApply: (start: Date, end: Date) => void
  onClose: () => void
}

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토']

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function CalendarSheet({
  initialStart,
  initialEnd,
  onApply,
  onClose,
}: CalendarSheetProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(
    initialStart?.getFullYear() ?? today.getFullYear(),
  )
  const [viewMonth, setViewMonth] = useState(
    initialStart?.getMonth() ?? today.getMonth(),
  )
  const [startDate, setStartDate] = useState<Date | null>(initialStart ?? null)
  const [endDate, setEndDate] = useState<Date | null>(initialEnd ?? null)

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const goNext = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const handleDayClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else if (date >= startDate) {
      setEndDate(date)
    } else {
      setEndDate(startDate)
      setStartDate(date)
    }
  }

  const firstDay = new Date(viewYear, viewMonth, 1)
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (Date | null)[] = Array(firstDay.getDay()).fill(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(viewYear, viewMonth, d))
  }

  const hasRange = !!startDate && !!endDate && !isSameDay(startDate, endDate)

  const checkStart = (d: Date) => !!startDate && isSameDay(d, startDate)
  const checkEnd = (d: Date) => !!endDate && isSameDay(d, endDate)
  const checkInRange = (d: Date) =>
    !!startDate && !!endDate && d > startDate && d < endDate

  const formatDate = (d: Date) => `${d.getMonth() + 1}월 ${d.getDate()}일`
  const diffDays =
    startDate && endDate
      ? Math.round((endDate.getTime() - startDate.getTime()) / 86400000) + 1
      : 0

  return (
    <BottomSheet onClose={onClose}>
      {/* 헤더 */}
      <div className="flex items-center justify-between px-5 pb-2 pt-7">
        <div>
          <h2 className="text-base font-extrabold text-[#2A1F1C]">기간 선택</h2>
          <p className="mt-3 text-xs text-[#2A1F1C]/60">
            시작일과 종료일을 각각 눌러 연속된 기간을 선택하세요.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="cursor-pointer p-1 text-[#2A1F1C]"
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

      {/* 월 네비게이션 */}
      <div className="mb-2 mt-4 flex items-center justify-between px-5">
        <span className="font-bold text-[#2A1F1C]">
          {viewYear}년 {viewMonth + 1}월
        </span>
        <div className="flex gap-0.5">
          <button
            type="button"
            onClick={goPrev}
            aria-label="이전 달"
            className="cursor-pointer p-1 text-[#2A1F1C]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="다음 달"
            className="cursor-pointer p-1 text-[#2A1F1C]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 px-3">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="flex justify-center py-1 text-xs font-medium text-[#2A1F1C]/50"
          >
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 px-3">
        {cells.map((date, i) => {
          if (!date) return <div key={`e-${i}`} className="h-13" />

          const isSelected = checkStart(date) || checkEnd(date)
          const isRangeStart = checkStart(date)
          const isRangeEnd = checkEnd(date)
          const isMiddle = checkInRange(date)

          return (
            <div
              key={date.toISOString()}
              className="relative flex h-13 items-center justify-center"
            >
              {isMiddle && (
                <div className="absolute inset-y-1 left-0 right-0 bg-[#3ab0d9]/20" />
              )}
              {isRangeStart && hasRange && (
                <div className="absolute inset-y-1 left-1/2 right-0 bg-[#3ab0d9]/20" />
              )}
              {isRangeEnd && hasRange && (
                <div className="absolute inset-y-1 left-0 right-1/2 bg-[#3ab0d9]/20" />
              )}
              <button
                type="button"
                onClick={() => handleDayClick(date)}
                className={`relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#3ab0d9] font-bold text-white'
                    : 'text-[#2A1F1C] hover:bg-[#3ab0d9]/10'
                }`}
              >
                {date.getDate()}
              </button>
            </div>
          )
        })}
      </div>

      {/* 요약 */}
      <div className="mx-5 mt-4 flex items-center justify-between rounded-xl bg-white px-4 py-3">
        {startDate && endDate ? (
          <>
            <span className="text-sm font-medium text-[#2A1F1C]">
              {formatDate(startDate)} → {formatDate(endDate)}
            </span>
            <span className="text-sm font-normal text-[#2A1F1C]/50">
              {diffDays}일간
            </span>
          </>
        ) : (
          <span className="text-sm text-[#2A1F1C]/40">
            시작일과 종료일을 선택해주세요
          </span>
        )}
      </div>

      {/* 적용하기 */}
      <div className="mx-5 my-6">
        <Button
          onClick={() => {
            if (startDate && endDate) onApply(startDate, endDate)
          }}
          disabled={!startDate || !endDate}
        >
          적용하기
        </Button>
      </div>
    </BottomSheet>
  )
}

export default CalendarSheet
