import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingComponentChange from '@/components/onboarding/OnboardingComponentChange'
import OnboardingHeader from '@/components/onboarding/OnboardingHeader'
import ErrorToast from '@/components/auth/ErrorToast'

import {
  VALUE_LABELS,
  type TopicKey,
  type ValueKey,
} from '@/constants/insights'
import type { CategoryValue } from '@/constants/onboarding'
import { createConcern } from '@/services/concerns'
import { type ValueLabel } from '@/types/api'

export interface onboardingComponentProps {
  pageNumber: number
  topic: string
  setTopic: React.Dispatch<React.SetStateAction<string>>
  decision: string
  setDecision: React.Dispatch<React.SetStateAction<string>>
  reason: string
  setReason: React.Dispatch<React.SetStateAction<string>>
  selectedValue: string | null
  setSelectedValue: React.Dispatch<React.SetStateAction<ValueKey | null>>
  selectedCategory: string | null
  setSelectedCategory: Dispatch<SetStateAction<CategoryValue | null>>
}

const CATEGORY_TO_TOPIC: Record<CategoryValue, TopicKey> = {
  work: '일',
  relationship: '관계',
  money: '돈',
  health: '건강',
  self: '나',
  etc: '기타',
}

export default function Onboarding() {
  const navigate = useNavigate()

  const [topic, setTopic] = useState('')
  const [decision, setDecision] = useState('')
  const [reason, setReason] = useState('')
  const [selectedValue, setSelectedValue] = useState<ValueKey | null>(null)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  {
    /*onboarding page number*/
  }
  const [pageNumber, setPageNumber] = useState(1)

  {
    /*page move function*/
  }
  const pageMove = () => {
    if (pageNumber <= 2) {
      setPageNumber((pageNumber) => pageNumber + 1)
    }
  }

  const handleSkip = () => {
    navigate('/')
  }

  const canSubmit =
    topic.trim() !== '' &&
    selectedCategory !== null &&
    decision.trim() !== '' &&
    reason.trim() !== '' &&
    selectedValue !== null

  const handleTryIt = async () => {
    if (!canSubmit || isSubmitting) return
    if (!selectedCategory || !selectedValue) return

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await createConcern({
        concern: topic,
        topic: CATEGORY_TO_TOPIC[selectedCategory],
        topicOther: null,
        decision,
        reason,
        value: VALUE_LABELS[selectedValue] as ValueLabel,
        concernStatus: 'RESOLVED',
      })

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
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px]">
      {/* onboarding header*/}
      <OnboardingHeader pageNumber={pageNumber} />
      <div className="grow flex flex-col justify-between px-[28px] py-[48px]">
        {/* onboarding contents, change by pageNumber*/}
        <div key={pageNumber} className="onboarding-step">
          <OnboardingComponentChange
            pageNumber={pageNumber}
            topic={topic}
            setTopic={setTopic}
            decision={decision}
            setDecision={setDecision}
            reason={reason}
            setReason={setReason}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {submitError && (
          <div className="mb-[16px]">
            <ErrorToast message={submitError} />
          </div>
        )}

        {/*bottom buttons*/}
        <div className="flex flex-row justify-between">
          <button
            onClick={handleSkip}
            className="w-[84px] h-[43px] rounded-[9px] text-[14px] font-[800] text-[#3E2723]"
          >
            건너뛰기
          </button>
          {pageNumber < 3 ? (
            <button
              onClick={pageMove}
              className="w-[84px] h-[43px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723]"
            >
              다음
            </button>
          ) : (
            <button
              onClick={handleTryIt}
              disabled={!canSubmit || isSubmitting}
              className="w-[156px] h-[43px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723] disabled:opacity-50"
            >
              {isSubmitting ? '저장 중...' : '가볍게 시도해보기'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
