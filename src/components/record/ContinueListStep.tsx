import Button from '@/components/common/button/Button'
import ContinueConcernItem from '@/components/home/ContinueConcernItem'
import { type PendingConcern } from '@/types/record'

interface ContinueListStepProps {
  concerns: PendingConcern[]
  onSelect: (concern: PendingConcern) => void
  onGoToNew: () => void
}

function ContinueListStep({
  concerns,
  onSelect,
  onGoToNew,
}: ContinueListStepProps) {
  if (concerns.length === 0) {
    return (
      <div className="flex flex-1 flex-col gap-6 px-6 py-6">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-sm text-[#2A1F1C]/55">이어쓸 고민이 없습니다.</p>
        </div>
        <Button onClick={onGoToNew}>새 고민 작성하기</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col px-6 py-6">
      {concerns.map((item) => (
        <ContinueConcernItem
          key={item.concernId}
          title={item.concern}
          topic={item.topic}
          lastRecordDate={item.lastRecordDate}
          recordCount={item.recordCount}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  )
}

export default ContinueListStep
