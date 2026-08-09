import { TOPIC_LABELS, type TopicKey } from '@/constants/insights'

interface ConcernItemProps {
  title: string
  topic: TopicKey
  lastRecordDate: string
  onContinue?: () => void
}

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${parseInt(month)}월 ${parseInt(day)}일`
}

function ConcernItem({
  title,
  topic,
  lastRecordDate,
  onContinue,
}: ConcernItemProps) {
  return (
    <div className="w-full h-18 flex items-center justify-between border-b border-gray-200">
      <div className="flex flex-col gap-1.5">
        <span className="text-[15px] font-semibold text-gray-900">{title}</span>
        <span className="text-[12px] text-gray-400">
          {TOPIC_LABELS[topic]} · 마지막 기록이 {formatDate(lastRecordDate)}에요
        </span>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="px-3 py-1.5 rounded-[10px] border border-gray-300 flex items-center justify-center shrink-0 cursor-pointer"
      >
        <span className="text-[12px] font-extrabold text-gray-800 leading-none">
          이어쓰기
        </span>
      </button>
    </div>
  )
}

export default ConcernItem
