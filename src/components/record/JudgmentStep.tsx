import { Controller, useFormContext, useWatch } from 'react-hook-form'
import TextArea from '@/components/common/input/TextArea'
import Button from '@/components/common/button/Button'
import ConcernTitleBadge from '@/components/record/ConcernTitleBadge'
import { type RecordForm } from '@/types/record'

const DECISION_MAX = 50
const REASON_MAX = 100

interface JudgmentStepProps {
  onNext: () => void
}

function JudgmentStep({ onNext }: JudgmentStepProps) {
  const { control } = useFormContext<RecordForm>()
  const concern = useWatch({ control, name: 'concern' })
  const decision = useWatch({ control, name: 'decision' })
  const reason = useWatch({ control, name: 'reason' })

  const canProceed =
    decision.trim().length > 0 &&
    decision.length <= DECISION_MAX &&
    reason.trim().length > 0 &&
    reason.length <= REASON_MAX

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <ConcernTitleBadge concern={concern} />

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

export default JudgmentStep
