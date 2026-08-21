import { Controller, useFormContext, useWatch } from 'react-hook-form'
import TextArea from '@/components/common/input/TextArea'
import Button from '@/components/common/button/Button'
import ConcernTitleBadge from '@/components/record/ConcernTitleBadge'
import ConcernRecordItem from '@/components/concern/ConcernRecordItem'
import { type ConcernRecord } from '@/types/api'
import { type RecordForm } from '@/types/record'

interface ContinueJudgmentStepProps {
  concern: string
  records: ConcernRecord[]
  onNext: () => void
}

function ContinueJudgmentStep({
  concern,
  records,
  onNext,
}: ContinueJudgmentStepProps) {
  const { control } = useFormContext<RecordForm>()
  const decision = useWatch({ control, name: 'decision' })

  const canProceed = decision.trim().length > 0

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <ConcernTitleBadge concern={concern} />

      <div className="flex flex-col gap-2">
        <p className="text-sm font-bold text-[#201E1D]">지난 기록</p>
        <div className="flex flex-col">
          {records.map((record) => (
            <ConcernRecordItem
              key={record.id}
              date={record.date}
              decision={record.decision}
              valueKey={record.valueKey}
            />
          ))}
        </div>
      </div>

      <hr className="border-[#3E2723]/22" />

      <Controller
        control={control}
        name="decision"
        render={({ field }) => (
          <TextArea
            {...field}
            label="오늘, 어떤 판단을 내렸나요?"
            maxLength={50}
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
            maxLength={100}
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
