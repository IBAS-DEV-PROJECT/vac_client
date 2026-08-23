import { Controller, useFormContext, useWatch } from 'react-hook-form'
import TextArea from '@/components/common/input/TextArea'
import CategoryButton from '@/components/common/button/CategoryButton'
import Button from '@/components/common/button/Button'
import { type TopicKey } from '@/constants/insights'
import { type RecordForm } from '@/types/record'

const TOPIC_OPTIONS: { value: TopicKey; title: string; description: string }[] =
  [
    { value: '일', title: '일·진로', description: '취업, 이직, 업무 판단' },
    { value: '관계', title: '관계', description: '친구, 연인, 가족, 동료' },
    { value: '돈', title: '돈', description: '소비, 저축, 투자' },
    { value: '건강', title: '건강·몸', description: '운동, 수면, 컨디션' },
    { value: '나', title: '나 자신', description: '성격, 원칙, 새로운 시도' },
    { value: '기타', title: '기타', description: '위 어디에도 해당 없음' },
  ]

const CONCERN_MAX = 50
const TOPIC_OTHER_MAX = 5

interface ConcernStepProps {
  onNext: () => void
}

function ConcernStep({ onNext }: ConcernStepProps) {
  const { control, register } = useFormContext<RecordForm>()
  const concern = useWatch({ control, name: 'concern' })
  const topic = useWatch({ control, name: 'topic' })
  const topicOther = useWatch({ control, name: 'topicOther' })

  const isConcernOver = concern.length > CONCERN_MAX
  const isTopicOtherOver = topicOther.length > TOPIC_OTHER_MAX

  const canProceed =
    concern.trim().length > 0 &&
    !isConcernOver &&
    topic !== null &&
    !isTopicOtherOver

  return (
    <div className="flex flex-col gap-6 px-6 py-6">
      <Controller
        control={control}
        name="concern"
        render={({ field }) => (
          <TextArea
            {...field}
            label="무슨 고민인가요?"
            maxLength={CONCERN_MAX}
            placeholder="예: A사 vs B사"
          />
        )}
      />

      <div className="flex flex-col gap-2">
        <p className="text-[13px] text-[#2A1F1C]/70">
          이 고민은 어떤 영역인가요?
        </p>

        <Controller
          control={control}
          name="topic"
          render={({ field }) => (
            <>
              {TOPIC_OPTIONS.map((option) => (
                <CategoryButton
                  key={option.value}
                  title={option.title}
                  description={option.description}
                  isSelected={field.value === option.value}
                  onClick={() => field.onChange(option.value)}
                  bottomSlot={
                    option.value === '기타' && field.value === '기타' ? (
                      <input
                        type="text"
                        placeholder="직접 입력 (5자 이내)"
                        {...register('topicOther')}
                        aria-invalid={isTopicOtherOver}
                        className={`min-h-9 w-full rounded-[9px] border bg-white px-2.5 py-2.5 text-[13px] text-[#201E1D] outline-none placeholder:text-[#757575] ${
                          isTopicOtherOver
                            ? 'border-[#F97316]'
                            : 'border-[#3E2723]/22'
                        }`}
                      />
                    ) : undefined
                  }
                />
              ))}
            </>
          )}
        />

        {isTopicOtherOver && (
          <p className="text-[11px] text-[#F97316]">5자 이내로 작성해주세요</p>
        )}
      </div>

      <Button onClick={onNext} disabled={!canProceed}>
        다음
      </Button>
    </div>
  )
}

export default ConcernStep
