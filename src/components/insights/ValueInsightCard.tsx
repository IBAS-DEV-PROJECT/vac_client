import {
  CATEGORY_CONFIG,
  VALUE_LABELS,
  type CategoryKey,
  type ValueKey,
} from '@/constants/insights'

interface ValueEntry {
  key: ValueKey
  percent: number
}

interface ValueInsightCardProps {
  categoryKey: CategoryKey
  title: string
  values: ValueEntry[]
  recordCount: number
  onRecordClick?: () => void
}

function ValueInsightCard({
  categoryKey,
  title,
  values,
  recordCount,
  onRecordClick,
}: ValueInsightCardProps) {
  const emoji = CATEGORY_CONFIG[categoryKey]?.emoji ?? '📋'
  const topValue = values[0]

  return (
    <div className="w-52.5 rounded-[14px] bg-white border border-gray-100 shadow-sm flex flex-col px-4 pt-4 pb-4">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-[color-mix(in_srgb,var(--color-growth)_12%,white)] flex items-center justify-center">
          <span className="text-lg leading-none">{emoji}</span>
        </div>
        <span className="font-bold text-gray-800 text-[15px]">{title}</span>
      </div>

      <div className="mt-3">
        <div className="w-28.25 h-5.5 rounded-[7px] bg-[color-mix(in_srgb,var(--color-growth)_15%,white)] flex items-center justify-center">
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--color-growth)' }}
          >
            가장 많이 선택한 가치
          </span>
        </div>
      </div>

      <div className="mt-1.5 leading-none">
        <span
          className="text-[20px] font-bold leading-tight"
          style={{ color: `var(--color-${topValue?.key ?? 'growth'})` }}
        >
          {topValue ? VALUE_LABELS[topValue.key] : ''}
        </span>
      </div>

      <div className="mt-2.5 flex flex-col gap-2">
        {values.map((v) => (
          <div key={v.key}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[12px] text-gray-700">
                {VALUE_LABELS[v.key]}
              </span>
              <span className="text-[12px] text-gray-400">{v.percent}%</span>
            </div>
            <div className="h-1.25 bg-blue-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${v.percent}%`,
                  backgroundColor: `var(--color-${v.key})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <button
          type="button"
          onClick={onRecordClick}
          className="w-17.5 h-5.5 rounded-[7px] bg-[color-mix(in_srgb,var(--color-growth)_15%,white)] flex items-center justify-center cursor-pointer"
        >
          <span
            className="text-[11px] font-medium"
            style={{ color: 'var(--color-growth)' }}
          >
            기록{recordCount}건 ›
          </span>
        </button>
      </div>
    </div>
  )
}

export default ValueInsightCard
