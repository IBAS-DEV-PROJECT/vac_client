import { Controller, useFormContext, useWatch } from 'react-hook-form'
import Button from '@/components/common/button/Button'
import RecordValueButton from '@/components/common/button/RecordValueButton'
import ConcernStatusToggle from '@/components/record/ConcernStatusToggle'
import { VALUE_LABELS, type ValueKey } from '@/constants/insights'
import { VALUE_DESCRIPTIONS } from '@/constants/values'
import { type RecordForm } from '@/types/record'

const VALUE_KEYS = Object.keys(VALUE_LABELS) as ValueKey[]

interface ValueStepProps {
  isSubmitting: boolean
}

function ValueStep({ isSubmitting }: ValueStepProps) {
  const { control } = useFormContext<RecordForm>()
  const value = useWatch({ control, name: 'value' })
  const concernStatus = useWatch({ control, name: 'concernStatus' })

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <div className="flex flex-col gap-2">
        <p className="text-[13px] text-[#2A1F1C]/70">
          방금 그 이유, 가장 가까운 하나는?
        </p>

        <Controller
          control={control}
          name="value"
          render={({ field }) => (
            <>
              {VALUE_KEYS.map((key) => (
                <RecordValueButton
                  key={key}
                  valueKey={key}
                  title={VALUE_LABELS[key]}
                  description={VALUE_DESCRIPTIONS[key]}
                  isSelected={field.value === key}
                  onClick={() => field.onChange(key)}
                />
              ))}
            </>
          )}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[13px] text-[#2A1F1C]/70">
          이 고민, 지금 어떤 상태인가요?
        </p>
        <Controller
          control={control}
          name="concernStatus"
          render={({ field }) => (
            <ConcernStatusToggle
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <Button
        type="submit"
        disabled={value === null || concernStatus === null || isSubmitting}
      >
        {isSubmitting ? '저장 중...' : '기록 남기기'}
      </Button>
    </div>
  )
}

export default ValueStep
