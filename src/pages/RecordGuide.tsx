import { useState, type ChangeEvent } from 'react'
import Header from '@/components/common/header/Header'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'
import Tab from '@/components/common/tab/Tab'
import CategoryButton from '@/components/common/button/CategoryButton'
import RecordValueButton from '@/components/common/button/RecordValueButton'

import { VALUE_LABELS, type ValueKey } from '@/constants/insights'
import { VALUE_DESCRIPTIONS } from '@/constants/values'


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

const TAB_ITEMS = [
  { value: 'topic', label: '주제' },
  { value: 'value', label: '가치' },
] as const

type CategoryValue = (typeof CATEGORY_OPTIONS)[number]['value']

type TabValue = (typeof TAB_ITEMS)[number]['value']

const VALUE_KEYS = Object.keys(VALUE_LABELS) as ValueKey[]

export default function RecordGuide () {

  const [activeTab, setActiveTab] = useState<TabValue>('topic')
  const [selectedValue, setSelectedValue] = useState<ValueKey | null>(null)

  const [selectedCategory, setSelectedCategory] =
    useState<CategoryValue | null>(null)

  return (
    <div className="flex flex-col items-stretch min-h-screen bg-[#E1F5FE] pt-[34px] px-[24px]">
      <Header
        title="기록 가이드"
        onBack={() => console.log('뒤로가기')}
      />
      <Tab items={TAB_ITEMS} value={activeTab} onChange={setActiveTab} />
      
      {activeTab === 'topic' ? 
        <section className="flex w-[352px] flex-col gap-3">
          {/*active tab selected*/}
          <h2 className="text-[13px] text-[#2A1F1C]/70 mt-[17px] mb-[5px]">고민을 기록할 때 선택하는 주제예요.</h2>
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

        :

        <section className="flex w-[352px] flex-col gap-3 mb-[20px]">
          {/*vlaue tab selected*/}
          <h2 className="text-[13px] text-[#2A1F1C]/70 mt-[17px] mb-[5px]">판단의 이유로 고를 수 있는 가치 축이예요.</h2>
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
      }
    </div>
  );
}