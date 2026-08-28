import Button from '@/components/common/button/Button'
import ContinueConcernItem from '@/components/home/ContinueConcernItem'
import { type PendingConcernItem } from '@/types/api'

interface ContinueListStepProps {
  concerns: PendingConcernItem[]
  isLoading: boolean
  error: Error | null
  onSelect: (concern: PendingConcernItem) => void
  onGoToNew: () => void
}

function ContinueListStep({
  concerns,
  isLoading,
  error,
  onSelect,
  onGoToNew,
}: ContinueListStepProps) {
  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-6">
        <p className="text-sm text-[#2A1F1C]/55">불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center px-6 py-6">
        <p className="text-center text-sm text-[#2A1F1C]/55">
          목록을 불러오지 못했어요.
          <br />
          잠시 후 다시 시도해주세요.
        </p>
      </div>
    )
  }

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
