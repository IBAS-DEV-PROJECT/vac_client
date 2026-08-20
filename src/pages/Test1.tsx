import { useState } from 'react'
import FilterButton from '@/components/insights/FilterButton'
import ValueButton from '@/components/insights/ValueButton'
import CategoryInsightCard from '@/components/insights/ValueInsightCard'
import SettingsTab from '@/components/settings/SettingsTab'
import ErrorToast from '@/components/auth/ErrorToast'
import ContinueConcernItem from '@/components/home/ContinueConcernItem'
import ConcernItem from '@/components/home/ConcernItem'
import ConcernRecordItem from '@/components/concern/ConcernRecordItem'

const MOCK_CARD = {
  topicKey: '일' as const,
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
] as const

function Test1() {
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
          ContinueConcernItem
        </h2>
        <div className="w-80">
          <ContinueConcernItem
            title="A사 vs B사"
            topic="일"
            lastRecordDate="2026-07-24"
            recordCount={4}
          />
          <ContinueConcernItem
            title="헬스 다시 시작할까"
            topic="건강"
            lastRecordDate="2026-07-18"
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">RecordItem</h2>
        <div className="w-80">
          <ConcernRecordItem
            date="2026-07-20"
            decision="A사가 조금 더 마음에 남"
            valueKey="growth"
          />
          <ConcernRecordItem
            date="2026-07-15"
            decision="아직 잘 모르겠다"
            valueKey="stability"
          />
          <ConcernRecordItem
            date="2026-07-10"
            decision="B사도 나쁘지 않은 것 같다"
            valueKey="autonomy"
          />
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">ConcernItem</h2>
        <div className="w-80">
          <ConcernItem
            title="A사 vs B사"
            topic="일"
            lastRecordDate="2026-07-24"
          />
          <ConcernItem
            title="헬스 다시 시작할까"
            topic="건강"
            lastRecordDate="2026-07-18"
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

export default Test1
