import valueMoney from '@/assets/valueMoney.png'
import valueMyself from '@/assets/valueMyself.png'
import valueFree from '@/assets/valueFree.png'
import {
  TOPIC_ICONS,
  TOPIC_LABELS,
  VALUE_LABELS,
  type TopicKey,
  type ValueKey,
} from '@/constants/insights'

const TOPIC_IMAGE: Partial<Record<TopicKey, string>> = {
  돈: valueMoney,
  건강: valueFree,
  나: valueMyself,
}

interface ValueEntry {
  key: ValueKey
  percent: number
}

interface ValueInsightCardProps {
  topicKey: TopicKey
  values: ValueEntry[]
  recordCount: number
  onRecordClick?: () => void
}

function ValueInsightCard({
  topicKey,
  values,
  recordCount,
  onRecordClick,
}: ValueInsightCardProps) {
  const topicImage = TOPIC_IMAGE[topicKey]
  const emoji = TOPIC_ICONS[topicKey]
  const title = TOPIC_LABELS[topicKey]
  const topValue = values[0]
  const colorVar = `var(--color-${topValue?.key ?? 'growth'})`
  const colorBg = `color-mix(in srgb, ${colorVar} 14%, white)`

  return (
    <div className="w-52.5 shrink-0 rounded-[14px] border border-gray-100 bg-white shadow-sm flex flex-col px-4 pt-4 pb-4">
      <div className="flex items-center gap-2">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colorBg }}
        >
          {topicImage ? (
            <img src={topicImage} alt="" className="w-5 h-5 object-contain" />
          ) : (
            <span className="text-lg leading-none">{emoji}</span>
          )}
        </div>
        <span className="font-bold text-gray-800 text-base">{title}</span>
      </div>

      <div className="mt-3">
        <div
          className="w-fit px-2.5 h-5.5 rounded-[7px] flex items-center justify-center"
          style={{ backgroundColor: colorBg }}
        >
          <span className="text-[11px] font-medium" style={{ color: colorVar }}>
            가장 많이 선택한 가치
          </span>
        </div>
      </div>

      <div className="mt-2 leading-none">
        <span
          className="text-[20px] font-bold leading-tight"
          style={{ color: colorVar }}
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
            <div className="h-1.25 bg-gray-100 rounded-full overflow-hidden">
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
          className="h-5.5 px-2.5 rounded-[7px] flex items-center justify-center cursor-pointer"
          style={{ backgroundColor: colorBg }}
        >
          <span className="text-[11px] font-medium" style={{ color: colorVar }}>
            기록 {recordCount}건 ›
          </span>
        </button>
      </div>
    </div>
  )
}

export default ValueInsightCard
