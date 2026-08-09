import type { HTMLAttributes } from 'react'
import ValueBadge from '@/components/common/badge/ValueBadge'
import { type ValueKey } from '@/constants/insights'

interface RecordItemProps extends HTMLAttributes<HTMLDivElement> {
  valueKey: ValueKey
  title: string
  date: string
  topic?: string
}

function RecordItem({
  valueKey,
  title,
  date,
  topic,
  ...props
}: RecordItemProps) {
  return (
    <div
      {...props}
      className="flex w-full items-center justify-between gap-3 border-b border-[#3E2723]/22 py-3"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ backgroundColor: `var(--color-${valueKey})` }}
          aria-hidden="true"
        />

        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[15px] font-bold text-[#201E1D]">
            {title}
          </span>
          <span className="truncate text-xs text-[#2A1F1C]/55">
            {topic ? `${topic} · ${date}` : date}
          </span>
        </div>
      </div>

      <ValueBadge valueKey={valueKey} />
    </div>
  )
}

export default RecordItem
