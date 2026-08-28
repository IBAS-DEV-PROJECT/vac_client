import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  description?: string
  isSelected?: boolean
  /** 카드 안쪽 하단에 들어갈 추가 요소 (예: 기타 선택 시 직접 입력란) */
  bottomSlot?: ReactNode
}

function CategoryButton({
  title,
  description,
  isSelected = false,
  bottomSlot,
  ...props
}: CategoryButtonProps) {
  const containerClass = `flex w-full flex-col rounded-[10px] border ${
    isSelected
      ? 'border-[#3AB0D9] bg-[#3AB0D9]/14'
      : 'border-[#3E2723]/22 bg-white'
  }`

  const label = (
    <>
      <span className="text-sm font-bold text-[#201E1D]">{title}</span>
      {description && (
        <span className="text-xs text-[#2A1F1C]/55">{description}</span>
      )}
    </>
  )

  if (!bottomSlot) {
    return (
      <button
        type="button"
        {...props}
        aria-pressed={isSelected}
        className={`${containerClass} min-h-[69px] justify-center gap-0.5 px-[14px] py-3 text-left`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className={containerClass}>
      <button
        type="button"
        {...props}
        aria-pressed={isSelected}
        className="flex min-h-[69px] w-full flex-col justify-center gap-0.5 px-[14px] py-3 text-left"
      >
        {label}
      </button>
      <div className="px-[14px] pb-3">{bottomSlot}</div>
    </div>
  )
}

export default CategoryButton
