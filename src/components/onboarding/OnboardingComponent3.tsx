import { useState, type ChangeEvent } from 'react'

import RecordValueButton from '@/components/common/button/RecordValueButton'
import TextArea from '@/components/common/input/TextArea'
import CategoryButton from '@/components/common/button/CategoryButton'

import { VALUE_LABELS, type ValueKey } from '@/constants/insights'
import { VALUE_DESCRIPTIONS } from '@/constants/values'



const VALUE_KEYS = Object.keys(VALUE_LABELS) as ValueKey[]

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


export default function OnboardingComponent3() {

  const [topic, setTopic] = useState('');
  const [selectedValue, setSelectedValue] = useState<ValueKey | null>(null)
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue | null>(null)
    
  return (
    <>
      <div>
        <h1 className="text-[32px] font-[800] text-[#201E1D] mb-[13px] ">지금 고민,<br/>하나씩 적어볼까요?</h1>
        <p className="text-[13px] font-[400] text-[#2A1F1C8C] mb-[20px]">아직 연습이예요. 편하게 가볍게 한 번 써볼까요?</p>
        <div className="w-[344px] h-[64px] px-[16px] py-[14px] bg-[#DDF0FA] text-[12px] font-[400] text-[#201E1D] mb-[20px]">고민은 취업, 관계, 돈, 건강처럼 <b>영역</b>으로 나눠서 적어볼 수 있어요. 아래에서 골라보세요.</div>
      </div>
      <section className="flex w-[352px] flex-col gap-5 mb-[20px]">
        <TextArea
          label="무슨 고민인가요?"
          placeholder="예: A사 vs B사"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxLength={50}
        />
      </section>
      <section className="flex w-[352px] flex-col gap-3 mb-[20px]">
        <h2 className="text-[13px] text-[#2A1F1C]/70">이 고민은 어떤 영역인가요?</h2>
        <div className="flex flex-col gap-2">
          {CATEGORY_OPTIONS.map((option) => (
            <CategoryButton
              key={option.value}
              title={option.title}
              description={option.description}
              isSelected={selectedCategory === option.value}
              onClick={() => setSelectedCategory(option.value)}
            />
          ))}
        </div>
      </section>
      <section className="flex w-[352px] flex-col gap-5 mb-[20px]">
        <TextArea
          label="오늘, 어떤 판단을 내렸나요?"
          placeholder="예: 아직 못 정함/ A로 마음이 기움"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxLength={50}
        />
      </section>
      <div className="w-[344px] h-[64px] px-[16px] py-[14px] bg-[#DDF0FA] text-[12px] font-[400] text-[#201E1D] mb-[20px]">이유는 '성장', '안정', '재미'처럼 9가지 <b>가치</b> 중 가장 가까운 하나로 정리돼요.</div>
      
      <section className="flex w-[352px] flex-col gap-5 mb-[20px]">
        <TextArea
          label="그건 왜인가요? "
          placeholder="한 줄이면 충분해요"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          maxLength={100}
          rows={3}
        />
      </section>
      <section className="flex w-[352px] flex-col gap-3 mb-[20px]">
        <h2 className="text-[13px] text-[#2A1F1C]/70">방금 그 이유, 가장 가까운 하나는?</h2>
        <div className="flex flex-col gap-2">
          {VALUE_KEYS.map((key) => (
            <RecordValueButton
              key={key}
              valueKey={key}
              title={VALUE_LABELS[key]}
              description={VALUE_DESCRIPTIONS[key]}
              isSelected={selectedValue === key}
              onClick={() => setSelectedValue(key)}
            />
          ))}
        </div>
      </section>
    </>
  );
}