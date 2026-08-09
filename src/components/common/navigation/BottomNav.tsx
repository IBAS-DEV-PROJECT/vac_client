import type { ReactNode } from 'react'

export type NavValue = 'home' | 'insight' | 'setting'

interface BottomNavProps {
  value: NavValue
  onChange: (value: NavValue) => void
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

const NAV_ITEMS: { value: NavValue; label: string; icon: ReactNode }[] = [
  {
    value: 'home',
    label: '홈',
    icon: (
      <svg {...iconProps}>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5.5 9.5V20h13V9.5" />
      </svg>
    ),
  },
  {
    value: 'insight',
    label: '인사이트',
    icon: (
      <svg {...iconProps}>
        <path d="M6 20v-5" />
        <path d="M12 20V9" />
        <path d="M18 20v-8" />
      </svg>
    ),
  },
  {
    value: 'setting',
    label: '설정',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

function BottomNav({ value, onChange }: BottomNavProps) {
  const activeIndex = NAV_ITEMS.findIndex((item) => item.value === value)

  return (
    <nav className="relative flex h-[70px] w-full items-center gap-1 rounded-full border border-[#3E2723]/22 bg-white p-1.5 shadow-lg">
      <span
        className="absolute left-1.5 top-1.5 h-14 rounded-full bg-[#3E2723] transition-transform duration-200 ease-out"
        style={{
          width: 'calc((100% - 12px - 8px) / 3)',
          transform: `translateX(calc(${activeIndex} * (100% + 4px)))`,
        }}
        aria-hidden="true"
      />

      {NAV_ITEMS.map((item) => {
        const isActive = item.value === value

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            aria-current={isActive ? 'page' : undefined}
            className={`relative z-10 flex h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-full px-1 transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-[#9AA4A8]'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav
