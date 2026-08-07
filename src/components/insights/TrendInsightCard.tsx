import { VALUE_LABELS, type ValueKey } from '@/constants/insights'

interface TrendEntry {
  key: ValueKey
  change: number
}

type TrendType = 'increase' | 'decrease'

const TREND_LABELS: Record<TrendType, string> = {
  increase: '가장 많이 증가',
  decrease: '가장 많이 감소',
}

interface TrendInsightCardProps {
  type: TrendType
  values: TrendEntry[]
}

function TrendInsightCard({ type, values }: TrendInsightCardProps) {
  const isTie = values.length > 1
  const baseTitle = TREND_LABELS[type]
  const displayTitle = isTie
    ? `${baseTitle} (동률 ${values.length}개)`
    : baseTitle
  const isPositive = (values[0]?.change ?? 0) >= 0

  return (
    <div className="w-43 rounded-xl bg-white border border-gray-200 flex flex-col px-4 py-3.5">
      <span className="text-[12px] text-gray-400">{displayTitle}</span>

      <div className="mt-1.5 flex flex-col gap-1">
        {values.map((v) => (
          <div key={v.key} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: `var(--color-${v.key})` }}
            />
            <span className="text-[16px] font-bold text-gray-800">
              {VALUE_LABELS[v.key]}
            </span>
            <span
              className="text-[14px] font-semibold"
              style={{ color: isPositive ? 'var(--color-growth)' : '#ef4444' }}
            >
              {isPositive ? '+' : ''}
              {v.change}%p
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendInsightCard
