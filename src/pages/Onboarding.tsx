import React, { Dispatch, SetStateAction, useState } from 'react'
import OnboardingComponentChange from '@/components/onboarding/OnboardingComponentChange'
import OnboardingHeader from '@/components/onboarding/OnboardingHeader'


const VALUE_KEYS = Object.keys(VALUE_LABELS) as ValueKey[]
import { VALUE_LABELS, type ValueKey } from '@/constants/insights'

const CATEGORY_OPTIONS = [
  { value: 'work', title: '일·진로', description: '취업, 이직, 업무 판단' },
  {
    value: 'relationship',
    title: '관계',
    description: '친구, 연인, 가족, 동료',
  },
  { value: 'money', title: '돈', description: '소비, 저축, 투자' },
  { value: 'health', title: '건강·몸', description: '운동, 수면, 컨디션' },
  { value: 'self', title: '나 자신', description: '성격, 원칙, 새로운 시도' },
  { value: 'etc', title: '기타', description: '위 어디에도 해당 없음' },
] as const

type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value']

export interface onboardingComponentProps {
  pageNumber : number,
  topic : string,
  setTopic : React.Dispatch<React.SetStateAction<string>>,
  decision : string
  setDecision : React.Dispatch<React.SetStateAction<string>>,
  reason : string,
  setReason : React.Dispatch<React.SetStateAction<string>>,
  selectedValue : string | null,
  setSelectedValue : React.Dispatch<React.SetStateAction<ValueKey | null>>,
  selectedCategory : string | null,
  setSelectedCategory : Dispatch<SetStateAction<"etc" | "health" | "money" | "relationship" | "self" | "work" | null>>,
}

export default function Onboarding () {

  const [topic, setTopic] = useState('');
  const [decision, setDecision] = useState('');
  const [reason, setReason] = useState('');
  const [selectedValue, setSelectedValue] = useState<ValueKey | null>(null)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue | null>(null)

  {/*onboarding page number*/}
  const [pageNumber, setPageNumber] = useState(1);

  {/*page move function*/}
  const pageMove = () => {
    if(pageNumber <= 2)
      setPageNumber(pageNumber => (pageNumber + 1));
  }

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px]">
      {/* onboarding header*/}
      <OnboardingHeader pageNumber={pageNumber} />
      <div className="grow flex flex-col justify-between px-[28px] py-[48px]">
        {/* onboarding contents, change by pageNumber*/}
        <OnboardingComponentChange 
          pageNumber={pageNumber} 
          topic = {topic} 
          setTopic = {setTopic}
          decision = {decision}
          setDecision = {setDecision}
          reason = {reason}
          setReason = {setReason}
          selectedValue = {selectedValue}
          setSelectedValue = {setSelectedValue}
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
          />

        {/*bottom buttons*/}
        <div className="flex flex-row justify-between">
          <button className="w-[84px] h-[43px] rounded-[9px] text-[14px] font-[800] text-[#3E2723]">건너뛰기</button>
          <button onClick={pageMove} className={`${pageNumber < 3 ? 'w-[84px]' : 'w-[156px]'} h-[43px] rounded-[9px] text-[14px] font-[800] text-[#E1F5FE] bg-[#3E2723]`}>{pageNumber < 3 ? '다음' : '가볍게 시도해보기'}</button>
        </div>
      </div>
    </div>
  );
}