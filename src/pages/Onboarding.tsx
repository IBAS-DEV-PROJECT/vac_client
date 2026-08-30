import React, { Dispatch, SetStateAction, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OnboardingComponentChange from '@/components/onboarding/OnboardingComponentChange'
import OnboardingHeader from '@/components/onboarding/OnboardingHeader'

import { type ValueKey } from '@/constants/insights'
import type { CategoryValue } from '@/constants/onboarding'

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

export default function Onboarding() {
  const navigate = useNavigate()

  const [topic, setTopic] = useState('')
  const [decision, setDecision] = useState('')
  const [reason, setReason] = useState('')
  const [selectedValue, setSelectedValue] = useState<ValueKey | null>(null)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue | null>(null)

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
      return
    }
    navigate('/record')
  }

  const handleSkip = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px]">
      {/* onboarding header*/}
      <OnboardingHeader pageNumber={pageNumber} />
      <div className="grow flex flex-col justify-between px-[28px] py-[48px]">
        {/* onboarding contents, change by pageNumber*/}
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

        {/*bottom buttons*/}
        <div className="flex flex-row justify-between">
          <button
            onClick={handleSkip}
            className="w-[84px] h-[43px] rounded-[9px] text-[14px] font-[800] text-[#3E2723]"
          >
            건너뛰기
          </button>
          <button
            onClick={pageMove}
            className={`${pageNumber < 3 ? 'w-[84px]' : 'w-[156px]'} h-[43px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723]`}
          >
            {pageNumber < 3 ? '다음' : '가볍게 시도해보기'}
          </button>
        </div>
      </div>
    </div>
  )
}
