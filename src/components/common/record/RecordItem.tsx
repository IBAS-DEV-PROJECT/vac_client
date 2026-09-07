import type { HTMLAttributes } from 'react'
import ValueBadge from '@/components/common/badge/ValueBadge'
import { type ValueKey } from '@/constants/insights'
import { formatDate } from '@/utils/date'

type RecordItemVariant = 'home' | 'insight'

const TITLE_STYLE: Record<RecordItemVariant, string> = {
  home: 'text-[13px] font-normal',
  insight: 'text-[16px] font-bold',
}

interface RecordItemProps extends HTMLAttributes<HTMLDivElement> {
  valueKey: ValueKey
  title: string
  /** ISO 형식 원본 날짜 (예: '2026-07-20') → '7월 20일'로 표시됨 */
  date: string
  topic?: string
  decision?: string
  /** 사용 위치에 따른 제목 스타일. home: 13px 일반, insight: 16px 굵게 */
  variant?: RecordItemVariant
  concernStatus?: 'PENDING' | 'RESOLVED'
}

function RecordItem({
  valueKey,
  title,
  date,
  topic,
  decision,
  variant = 'home',
  concernStatus,
  className = '',
  ...props
}: RecordItemProps) {
  const formattedDate = formatDate(date)

  return (
    <div
      {...props}
      className={`flex w-full items-center justify-between gap-3 border-b border-[#3E2723]/22 py-4 ${className}`}
    >
      {concernStatus && (
        <div className="flex w-9 shrink-0 flex-col items-center gap-0.5">
          {concernStatus === 'PENDING' ? (
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#2A1F1C]"
              aria-hidden="true"
            />
          ) : (
            <span
              className="h-1.5 w-1.5 rounded-full border border-[#2A1F1C]/40"
              aria-hidden="true"
            />
          )}
          <span className="text-[11px] font-semibold leading-none text-[#2A1F1C]">
            {concernStatus === 'PENDING' ? '고민중' : '정리됨'}
          </span>
        </div>
      )}
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: `var(--color-${valueKey})` }}
          aria-hidden="true"
        />

        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={`truncate text-[#201E1D] ${TITLE_STYLE[variant]}`}>
            {title}
          </span>
          <span className="truncate text-xs text-[#2A1F1C]/55">
            {topic ? `${topic} · ${formattedDate}` : formattedDate}
          </span>
          {decision && (
            <span className="truncate text-xs text-[#2A1F1C]/70">
              {decision}
            </span>
          )}
        </div>
      </div>

      <ValueBadge valueKey={valueKey} />
    </div>
  )
}

export default RecordItem
