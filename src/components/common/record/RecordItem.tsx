import type { HTMLAttributes } from 'react'
import ValueBadge from '@/components/common/badge/ValueBadge'
import { type ValueKey } from '@/constants/insights'
import { formatDate } from '@/utils/date'

interface RecordItemProps extends HTMLAttributes<HTMLDivElement> {
  valueKey: ValueKey
  title: string
  /** ISO 형식 원본 날짜 (예: '2026-07-20') → '7월 20일'로 표시됨 */
  date: string
  topic?: string
  /** 제목 굵기. 홈은 'normal', 인사이트는 'bold' */
  titleWeight?: 'normal' | 'bold'
}

function RecordItem({
  valueKey,
  title,
  date,
  topic,
  titleWeight = 'normal',
  className = '',
  ...props
}: RecordItemProps) {
  const formattedDate = formatDate(date)

  return (
    <div
      {...props}
      className={`flex w-full items-center justify-between gap-3 border-b border-[#3E2723]/22 py-3 ${className}`}
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: `var(--color-${valueKey})` }}
          aria-hidden="true"
        />

        <div className="flex min-w-0 flex-col gap-0.5">
          <span
            className={`truncate text-[13px] text-[#201E1D] ${
              titleWeight === 'bold' ? 'font-bold' : 'font-normal'
            }`}
          >
            {title}
          </span>
          <span className="truncate text-xs text-[#2A1F1C]/55">
            {topic ? `${topic} · ${formattedDate}` : formattedDate}
          </span>
        </div>
      </div>

      <ValueBadge valueKey={valueKey} />
    </div>
  )
}

export default RecordItem
