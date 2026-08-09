import { type ValueKey } from '@/constants/insights'

interface ConcernRecordItemProps {
  date: string
  decision: string
  valueKey: ValueKey
}

function formatDate(dateStr: string): string {
  const [, month, day] = dateStr.split('-')
  return `${parseInt(month)}월 ${parseInt(day)}일`
}

function ConcernRecordItem({
  date,
  decision,
  valueKey,
}: ConcernRecordItemProps) {
  return (
    <div className="h-16.25 flex gap-2.5">
      <div className="flex flex-col items-center justify-center">
        <div
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: `var(--color-${valueKey})` }}
        />
        <div className="w-px h-8.25 bg-gray-200 mt-1" />
      </div>
      <div className="flex flex-col gap-1 justify-center">
        <span className="text-[11px] text-gray-400">{formatDate(date)}</span>
        <span className="text-[13px] text-gray-800">{decision}</span>
      </div>
    </div>
  )
}

export default ConcernRecordItem
