import { VALUE_COLORS, VALUE_LABELS, type ValueKey } from '@/constants/insights'

function eul(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00
  if (code < 0) return '을'
  return code % 28 === 0 ? '를' : '을'
}

interface InsightCardProps {
  topTopicLabel: string
  topValueKey: ValueKey
}

function InsightCard({ topTopicLabel, topValueKey }: InsightCardProps) {
  const topValueLabel = VALUE_LABELS[topValueKey]
  const topValueColor = VALUE_COLORS[topValueKey]

  return (
    <div className="mx-5 rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="text-[15px] font-bold text-[#2A1F1C]">
        한눈에 보는 인사이트
      </h2>

      <div className="mt-3 flex flex-col gap-2">
        <div className="flex items-center gap-3 rounded-xl bg-sky-50 px-3 py-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b7280"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M17 2l4 4-4 4" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <path d="M7 22l-4-4 4-4" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <p className="text-[13px] leading-snug text-gray-600">
            가장 많이 고민한 주제는{' '}
            <span className="font-bold text-[#2A1F1C]">'{topTopicLabel}'</span>
            였어요.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-sky-50 px-3 py-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={topValueColor}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0"
            aria-hidden="true"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" fill={topValueColor} stroke="none" />
          </svg>
          <p className="text-[13px] leading-snug text-gray-600">
            그 고민의 대부분에서{' '}
            <span className="font-bold" style={{ color: topValueColor }}>
              '{topValueLabel}'
            </span>
            {eul(topValueLabel)} 가장 중요한 기준으로 선택했어요.
          </p>
        </div>
      </div>
    </div>
  )
}

export default InsightCard
