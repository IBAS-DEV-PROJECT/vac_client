import { formatDate } from '@/utils/date'

interface ConcernCardProps {
  concern: string
  /** ISO 형식 원본 날짜 (예: '2026-07-24') */
  lastRecordDate: string
  onContinue: () => void
}

function ConcernCard({
  concern,
  lastRecordDate,
  onContinue,
}: ConcernCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-white px-4 py-4">
      <span className="text-[11px] tracking-wide text-[#2A1F1C]/55">
        '{concern}'
      </span>
      <p className="text-sm font-bold text-[#201E1D]">
        마지막 기록이 {formatDate(lastRecordDate)}이에요. 오늘은 어떤가요?
      </p>
      <button
        type="button"
        onClick={onContinue}
        className="mt-1 h-9 w-fit rounded-lg border border-[#3E2723]/22 px-4 text-[13px] font-bold text-[#201E1D]"
      >
        이어쓰기
      </button>
    </div>
  )
}

export default ConcernCard
