import { TOPIC_LABELS, type TopicKey } from '@/constants/insights'
import { formatDate } from '@/utils/date'

interface ConcernItemProps {
  title: string
  topic: TopicKey
  /** ISO 형식 원본 날짜 (예: '2026-07-24') */
  lastRecordDate: string
  onContinue?: () => void
}

function ConcernItem({
  title,
  topic,
  lastRecordDate,
  onContinue,
}: ConcernItemProps) {
  return (
    <div className="flex h-18 w-full items-center justify-between border-b border-[#3E2723]/22">
      <div className="flex flex-col gap-1.5">
        <span className="text-[15px] font-semibold text-[#201E1D]">
          {title}
        </span>
        <span className="text-[12px] text-[#2A1F1C]/55">
          {TOPIC_LABELS[topic]} · 마지막 기록이 {formatDate(lastRecordDate)}에요
        </span>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="flex shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-[#3E2723]/22 px-3 py-1.5"
      >
        <span className="text-[12px] font-extrabold leading-none text-[#201E1D]">
          이어쓰기
        </span>
      </button>
    </div>
  )
}

export default ConcernItem
