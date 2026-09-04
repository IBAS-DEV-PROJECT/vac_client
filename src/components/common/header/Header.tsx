import type { ReactNode } from 'react'

interface HeaderProps {
  title: string
  onBack?: () => void
  rightSlot?: ReactNode
}

function Header({ title, onBack, rightSlot }: HeaderProps) {
  return (
    <header className="flex h-15 w-full items-center gap-3.5 border-b-2 border-[#3E272338] bg-[#E1F5FE] px-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="이전으로"
          className="shrink-0"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
        </button>
      )}

      <h1 className="text-base font-bold text-[#3E2723]">{title}</h1>

      {rightSlot && (
        <div className="ml-auto shrink-0 text-[13px] text-[#2A1F1C]/55">
          {rightSlot}
        </div>
      )}
    </header>
  )
}

export default Header
