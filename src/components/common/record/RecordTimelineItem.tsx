import type { HTMLAttributes } from 'react'
import ValueBadge from '@/components/common/badge/ValueBadge'
import { type ValueKey } from '@/constants/insights'

interface RecordTimelineItemProps extends HTMLAttributes<HTMLDivElement> {
  valueKey: ValueKey
  title: string
  date: string
  isLast?: boolean
}

function RecordTimelineItem({
  valueKey,
  title,
  date,
  isLast = false,
  ...props
}: RecordTimelineItemProps) {
  return (
    <div {...props} className="flex w-full gap-3 py-3">
      {/* 점 + 연결선 */}
      <div className="flex flex-col items-center self-stretch">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: `var(--color-${valueKey})` }}
          aria-hidden="true"
        />
        {!isLast && (
          <span
            className="mt-1 w-px flex-1 bg-[#3E2723]/22"
            aria-hidden="true"
          />
        )}
      </div>

      {/* 날짜 + 제목 + 뱃지 */}
      <div className="flex min-w-0 flex-col items-start gap-1.5">
        <span className="text-[11px] text-[#2A1F1C]/55">{date}</span>
        <span className="truncate text-sm font-bold text-[#201E1D]">
          {title}
        </span>
        <ValueBadge valueKey={valueKey} />
      </div>
    </div>
  )
}

export default RecordTimelineItem
