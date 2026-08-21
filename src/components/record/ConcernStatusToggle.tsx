import { type ConcernStatus } from '@/types/record'

const OPTIONS: { value: ConcernStatus; label: string }[] = [
  { value: 'PENDING', label: '고민 중' },
  { value: 'RESOLVED', label: '정리됨' },
]

interface ConcernStatusToggleProps {
  value: ConcernStatus
  onChange: (value: ConcernStatus) => void
}

function ConcernStatusToggle({ value, onChange }: ConcernStatusToggleProps) {
  return (
    <div className="flex h-[38px] w-full overflow-hidden rounded-[9px] border border-[#3E2723]/22">
      {OPTIONS.map((option) => {
        const isActive = option.value === value

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
            className={`flex-1 text-[13px] font-normal ${
              isActive
                ? 'bg-[#3E2723] text-[#E1F5FE]'
                : 'bg-[#E1F5FE] text-[#201E1D]'
            }`}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default ConcernStatusToggle
