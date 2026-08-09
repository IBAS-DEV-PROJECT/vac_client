import { TOPIC_LABELS, type TopicKey } from '@/constants/insights'

interface ConcernItemProps {
  title: string
  topic: TopicKey
  lastRecordDate: string
  recordCount?: number
  onClick?: () => void
}

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${parseInt(month)}월 ${parseInt(day)}일`
}

function ConcernItem({
  title,
  topic,
  lastRecordDate,
  recordCount,
  onClick,
}: ConcernItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-21 flex items-center justify-between px-0 py-4 border-b border-gray-200 cursor-pointer text-left"
    >
      <div className="flex flex-col gap-1.5">
        <span className="text-[15px] font-semibold text-gray-900">{title}</span>
        <div className="flex items-start gap-2">
          <span className="text-[12px] text-gray-500 bg-gray-100 rounded px-1.5 py-0.5">
            {TOPIC_LABELS[topic]}
          </span>
          <span className="text-[12px] text-gray-400">
            {formatDate(lastRecordDate)}
            {recordCount !== undefined && ` · 기록 ${recordCount}건`}
          </span>
        </div>
      </div>
      <span className="text-gray-800 text-base">›</span>
    </button>
  )
}

export default ConcernItem
