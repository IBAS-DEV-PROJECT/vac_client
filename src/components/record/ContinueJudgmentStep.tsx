import { Controller, useFormContext, useWatch } from 'react-hook-form'
import TextArea from '@/components/common/input/TextArea'
import Button from '@/components/common/button/Button'
import ConcernTitleBadge from '@/components/record/ConcernTitleBadge'
import ConcernRecordItem from '@/components/concern/ConcernRecordItem'
import { useConcernDetail } from '@/hooks/useConcernDetail'
import { VALUE_KEY_BY_LABEL } from '@/constants/values'
import { type RecordForm } from '@/types/record'

const DECISION_MAX = 50
const REASON_MAX = 100

interface ContinueJudgmentStepProps {
  concernId: string
  concern: string
  onNext: () => void
}

function ContinueJudgmentStep({
  concernId,
  concern,
  onNext,
}: ContinueJudgmentStepProps) {
  const { control } = useFormContext<RecordForm>()
  const decision = useWatch({ control, name: 'decision' })
  const reason = useWatch({ control, name: 'reason' })

  const { records, isLoading, error } = useConcernDetail(concernId)

  const canProceed =
    decision.trim().length > 0 &&
    decision.length <= DECISION_MAX &&
    reason.trim().length > 0 &&
    reason.length <= REASON_MAX

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <ConcernTitleBadge concern={concern} />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-[#201E1D]">지난 기록</p>

        {isLoading ? (
          <p className="py-4 text-sm text-[#2A1F1C]/55">불러오는 중...</p>
        ) : error ? (
          <p className="py-4 text-sm text-[#2A1F1C]/55">
            지난 기록을 불러오지 못했어요.
          </p>
        ) : (
          <div className="flex flex-col">
            {records.map((record) => (
              <ConcernRecordItem
                key={record.recordId}
                date={record.createdAt}
                decision={record.decision}
                valueKey={VALUE_KEY_BY_LABEL[record.value]}
              />
            ))}
          </div>
        )}
      </div>

      <hr className="border-[#3E2723]/22" />

      <Controller
        control={control}
        name="decision"
        render={({ field }) => (
          <TextArea
            {...field}
            label="오늘, 어떤 판단을 내렸나요?"
            maxLength={DECISION_MAX}
            rows={1}
            placeholder="예: 아직 못 정함 / A로 마음이 기움"
          />
        )}
      />

      <Controller
        control={control}
        name="reason"
        render={({ field }) => (
          <TextArea
            {...field}
            label="그건 왜인가요?"
            maxLength={REASON_MAX}
            rows={4}
            placeholder="한 줄이면 충분해요"
          />
        )}
      />

      <Button onClick={onNext} disabled={!canProceed}>
        다음
      </Button>
    </div>
  )
}

export default ContinueJudgmentStep
