import { useState } from 'react'
import FilterButton from '@/components/insights/FilterButton'
import ValueButton from '@/components/insights/ValueButton'
import CategoryInsightCard from '@/components/insights/ValueInsightCard'
import TrendInsightCard from '@/components/insights/TrendInsightCard'
import SettingsTab from '@/components/settings/SettingsTab'
import ErrorToast from '@/components/auth/ErrorToast'

const MOCK_CARD = {
  categoryKey: 'work' as const,
  title: '일·진로',
  values: [
    { key: 'growth' as const, percent: 62 },
    { key: 'stability' as const, percent: 20 },
    { key: 'autonomy' as const, percent: 12 },
    { key: 'connection' as const, percent: 6 },
  ],
  recordCount: 12,
}

const FILTERS = ['최근 7일', '최근 30일', '최근 90일']

const VALUES = [
  { category: 'all', label: '전체' },
  { category: 'growth', label: '성장' },
  { category: 'stability', label: '안정' },
  { category: 'autonomy', label: '자율' },
  { category: 'connection', label: '연결' },
  { category: 'recognition', label: '인정' },
  { category: 'fun', label: '재미' },
  { category: 'efficiency', label: '효율' },
  { category: 'meaning', label: '의미' },
  { category: 'responsibility', label: '책임' },
]

function Test2() {
  const [activeFilter, setActiveFilter] = useState('최근 7일')
  const [activeValue, setActiveValue] = useState('growth')

  return (
    <div className="p-4 flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">FilterButton</h2>
        <div className="flex gap-2">
          {FILTERS.map((label) => (
            <FilterButton
              key={label}
              label={label}
              isActive={activeFilter === label}
              onClick={() => setActiveFilter(label)}
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">
          ValueInsightCard
        </h2>
        <CategoryInsightCard {...MOCK_CARD} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">
          TrendInsightCard
        </h2>
        <div className="flex gap-3 flex-wrap">
          <TrendInsightCard
            type="increase"
            values={[{ key: 'growth', change: 16 }]}
          />
          <TrendInsightCard
            type="decrease"
            values={[{ key: 'stability', change: -8 }]}
          />
          <TrendInsightCard
            type="increase"
            values={[
              { key: 'growth', change: 8 },
              { key: 'fun', change: 8 },
            ]}
          />
          <TrendInsightCard
            type="decrease"
            values={[
              { key: 'stability', change: -5 },
              { key: 'connection', change: -5 },
            ]}
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">ErrorToast</h2>
        <ErrorToast message="모든 항목을 입력해주세요." />
        <ErrorToast message="아이디 또는 비밀번호를 다시 확인해주세요." />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">SettingsTab</h2>
        <SettingsTab label="프로필 수정" />
        <SettingsTab label="알림 설정" isHighlighted />
        <SettingsTab label="회원 탈퇴" />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">ValueButton</h2>
        <div className="flex flex-col gap-2">
          {VALUES.map(({ category, label }) => (
            <ValueButton
              key={category}
              category={category}
              label={label}
              isActive={activeValue === category}
              onClick={() => setActiveValue(category)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Test2
