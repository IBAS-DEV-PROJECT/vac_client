import type { ButtonHTMLAttributes } from 'react'

interface CategoryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  description?: string
  isSelected?: boolean
}

function CategoryButton({
  title,
  description,
  isSelected = false,
  ...props
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      {...props}
      aria-pressed={isSelected}
      className={`flex min-h-[69px] w-full flex-col justify-center gap-0.5 rounded-[10px] border px-[14px] py-3 text-left ${
        isSelected
          ? 'border-[#3AB0D9] bg-[#3AB0D9]/14'
          : 'border-[#3E2723]/22 bg-white'
      }`}
    >
      <span className="text-sm font-bold text-[#201E1D]">{title}</span>
      {description && (
        <span className="text-xs text-[#2A1F1C]/55">{description}</span>
      )}
    </button>
  )
}

export default CategoryButton
