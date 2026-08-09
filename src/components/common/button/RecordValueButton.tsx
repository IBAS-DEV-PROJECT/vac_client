import type { ButtonHTMLAttributes } from 'react'
import { type ValueKey } from '@/constants/insights'

interface RecordValueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueKey: ValueKey
  title: string
  description?: string
  isSelected?: boolean
}

function RecordValueButton({
  valueKey,
  title,
  description,
  isSelected = false,
  ...props
}: RecordValueButtonProps) {
  const color = `var(--color-${valueKey})`

  return (
    <button
      type="button"
      {...props}
      aria-pressed={isSelected}
      style={
        isSelected
          ? {
              borderColor: color,
              backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
            }
          : undefined
      }
      className={`flex min-h-[69px] w-full items-center gap-3 rounded-[10px] border px-[14px] py-3 text-left ${
        isSelected ? '' : 'border-[#3E2723]/22 bg-white'
      }`}
    >
      <span
        className="h-[14px] w-[14px] shrink-0 rounded-full"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />

      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-bold text-[#201E1D]">{title}</span>
        {description && (
          <span className="text-xs text-[#2A1F1C]/55">{description}</span>
        )}
      </span>
    </button>
  )
}

export default RecordValueButton
