import type { HTMLAttributes } from 'react'
import { VALUE_LABELS, type ValueKey } from '@/constants/insights'

interface ValueBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  valueKey: ValueKey
}

function ValueBadge({ valueKey, ...props }: ValueBadgeProps) {
  const color = `var(--color-${valueKey})`

  return (
    <span
      {...props}
      style={{
        color,
        backgroundColor: `color-mix(in srgb, ${color} 14%, white)`,
      }}
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold leading-[17px]"
    >
      {VALUE_LABELS[valueKey]}
    </span>
  )
}

export default ValueBadge
