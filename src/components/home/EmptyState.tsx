import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
}

function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex h-[140px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-[#3E2723]/22 bg-white px-4 py-5 text-center">
      {icon}
      <p className="text-[14px] font-semibold leading-none text-[#201E1D]">
        {title}
      </p>
      <p className="text-[12px] font-normal leading-[18px] text-[#2A1F1C]/55">
        {description}
      </p>
    </div>
  )
}

export default EmptyState
