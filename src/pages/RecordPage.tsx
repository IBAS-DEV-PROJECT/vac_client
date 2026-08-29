import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import Header from '@/components/common/header/Header'
import Tab from '@/components/common/tab/Tab'
import ConcernStep from '@/components/record/ConcernStep'
import JudgmentStep from '@/components/record/JudgmentStep'
import ValueStep from '@/components/record/ValueStep'
import ContinueListStep from '@/components/record/ContinueListStep'
import ContinueJudgmentStep from '@/components/record/ContinueJudgmentStep'
import { usePendingConcerns } from '@/hooks/usePendingConcerns'
import { createConcern, createPendingRecord } from '@/services/concerns'
import { VALUE_LABELS } from '@/constants/insights'
import { type PendingConcernItem, type ValueLabel } from '@/types/api'
import { type RecordForm } from '@/types/record'

type RecordTab = 'new' | 'continue'

const TAB_ITEMS = [
  { value: 'new', label: '새 고민' },
  { value: 'continue', label: '이어쓰기' },
] as const

const NEW_STEP_TITLES = ['새 고민', '오늘의 판단', '이유의 가치']
const CONTINUE_STEP_TITLES = ['오늘의 판단', '이유의 가치']

const DEFAULT_VALUES: RecordForm = {
  concern: '',
  topic: null,
  topicOther: '',
  decision: '',
  reason: '',
  value: null,
  concernStatus: null,
}

function RecordPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTab: RecordTab =
    searchParams.get('tab') === 'continue' ? 'continue' : 'new'
  const targetConcernId = searchParams.get('concernId')

  const [tab, setTab] = useState<RecordTab>(initialTab)
  const [step, setStep] = useState(1)
  const [selectedConcern, setSelectedConcern] =
    useState<PendingConcernItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const methods = useForm<RecordForm>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  const isContinue = tab === 'continue'

  const {
    concerns,
    isLoading: isConcernsLoading,
    error: concernsError,
  } = usePendingConcerns(isContinue)

  // 홈에서 특정 고민의 이어쓰기로 진입한 경우 목록에서 찾아 표시
  const autoSelected =
    targetConcernId && !selectedConcern
      ? (concerns.find((c) => c.concernId === targetConcernId) ?? null)
      : null

  const activeConcern = selectedConcern ?? autoSelected

  const isList = isContinue && activeConcern === null
  const totalSteps = isContinue ? 2 : 3
  const stepTitles = isContinue ? CONTINUE_STEP_TITLES : NEW_STEP_TITLES

  const handleTabChange = (value: RecordTab) => {
    setTab(value)
    setStep(1)
    setSelectedConcern(null)
    setSubmitError(null)
    setSearchParams(value === 'continue' ? { tab: 'continue' } : {}, {
      replace: true,
    })
    methods.reset(DEFAULT_VALUES)
  }

  const handleSelectConcern = (concern: PendingConcernItem) => {
    setSelectedConcern(concern)
    setStep(1)
    methods.reset({ ...DEFAULT_VALUES, concern: concern.concern })
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else if (isContinue && activeConcern) {
      setSelectedConcern(null)
      setSearchParams({ tab: 'continue' }, { replace: true })
    } else {
      navigate(-1)
    }
  }

  const onSubmit = async (form: RecordForm) => {
    if (!form.value || !form.concernStatus) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const valueLabel = VALUE_LABELS[form.value] as ValueLabel

      if (activeConcern) {
        await createPendingRecord(activeConcern.concernId, {
          decision: form.decision,
          reason: form.reason,
          value: valueLabel,
          concernStatus: form.concernStatus,
        })
      } else {
        if (!form.topic) return

        await createConcern({
          concern: form.concern,
          topic: form.topic,
          topicOther: form.topic === '기타' ? form.topicOther : null,
          decision: form.decision,
          reason: form.reason,
          value: valueLabel,
          concernStatus: form.concernStatus,
        })
      }

      navigate('/')
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : '기록을 저장하지 못했어요. 다시 시도해주세요.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-dvh flex-col bg-[#E1F5FE]">
      <Header
        title={isList ? '이어쓰기' : stepTitles[step - 1]}
        onBack={handleBack}
        rightSlot={isList ? undefined : `${step} / ${totalSteps}`}
      />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col">
          <Tab items={TAB_ITEMS} value={tab} onChange={handleTabChange} />

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-1 flex-col"
            >
              {tab === 'new' ? (
                <>
                  {step === 1 && <ConcernStep onNext={() => setStep(2)} />}
                  {step === 2 && <JudgmentStep onNext={() => setStep(3)} />}
                  {step === 3 && <ValueStep isSubmitting={isSubmitting} />}
                </>
              ) : activeConcern === null ? (
                <ContinueListStep
                  concerns={concerns}
                  isLoading={isConcernsLoading}
                  error={concernsError}
                  onSelect={handleSelectConcern}
                  onGoToNew={() => handleTabChange('new')}
                />
              ) : (
                <>
                  {step === 1 && (
                    <ContinueJudgmentStep
                      key={activeConcern.concernId}
                      concernId={activeConcern.concernId}
                      concern={activeConcern.concern}
                      onNext={() => setStep(2)}
                    />
                  )}
                  {step === 2 && <ValueStep isSubmitting={isSubmitting} />}
                </>
              )}

              {submitError && (
                <p className="px-6 pb-4 text-center text-xs text-red-500">
                  {submitError}
                </p>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default RecordPage
