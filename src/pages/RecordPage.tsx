import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import Header from '@/components/common/header/Header'
import Tab from '@/components/common/tab/Tab'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'
import ConcernStep from '@/components/record/ConcernStep'
import JudgmentStep from '@/components/record/JudgmentStep'
import ValueStep from '@/components/record/ValueStep'
import ContinueListStep from '@/components/record/ContinueListStep'
import ContinueJudgmentStep from '@/components/record/ContinueJudgmentStep'
import {
  MOCK_PENDING_CONCERNS,
  getRecordsByConcern,
} from '@/mock/pendingConcerns'
import { type PendingConcern, type RecordForm } from '@/types/record'

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
  topicEtc: '',
  decision: '',
  reason: '',
  value: null,
  concernStatus: 'PENDING',
}

function RecordPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState<RecordTab>('new')
  const [step, setStep] = useState(1)
  const [selectedConcern, setSelectedConcern] = useState<PendingConcern | null>(
    null,
  )

  const methods = useForm<RecordForm>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  const isContinue = tab === 'continue'
  const isList = isContinue && selectedConcern === null
  const totalSteps = isContinue ? 2 : 3
  const stepTitles = isContinue ? CONTINUE_STEP_TITLES : NEW_STEP_TITLES

  const handleTabChange = (value: RecordTab) => {
    setTab(value)
    setStep(1)
    setSelectedConcern(null)
    methods.reset(DEFAULT_VALUES)
  }

  const handleSelectConcern = (concern: PendingConcern) => {
    setSelectedConcern(concern)
    setStep(1)
    methods.reset({ ...DEFAULT_VALUES, concern: concern.concern })
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else if (isContinue && selectedConcern) {
      setSelectedConcern(null)
    } else {
      navigate(-1)
    }
  }

  // TODO: POST /concerns, POST /concerns/pending/{concernId} 연동
  const onSubmit = (data: RecordForm) => {
    console.log('기록 남기기', { isContinue, ...data })
    navigate('/')
  }

  const handleNavChange = (value: NavValue) => {
    // TODO: 레이아웃 라우팅 개선 후 정리
    if (value === 'home') navigate('/')
  }

  return (
    <div className="flex h-dvh flex-col bg-[#E1F5FE]">
      <Header
        title={isList ? '이어쓰기' : stepTitles[step - 1]}
        onBack={isList ? undefined : handleBack}
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
                  {step === 3 && <ValueStep />}
                </>
              ) : selectedConcern === null ? (
                <ContinueListStep
                  concerns={MOCK_PENDING_CONCERNS}
                  onSelect={handleSelectConcern}
                  onGoToNew={() => handleTabChange('new')}
                />
              ) : (
                <>
                  {step === 1 && (
                    <ContinueJudgmentStep
                      concern={selectedConcern.concern}
                      records={getRecordsByConcern(selectedConcern.concern)}
                      onNext={() => setStep(2)}
                    />
                  )}
                  {step === 2 && <ValueStep />}
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </div>

      <div className="bg-[#E1F5FE] px-4 pb-4 pt-2">
        <BottomNav value="home" onChange={handleNavChange} />
      </div>
    </div>
  )
}

export default RecordPage
