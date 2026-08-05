import { useState } from 'react'
import FilterButton from '@/components/insights/FilterButton'
import ValueButton from '@/components/insights/ValueButton'

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
    <div className="p-10 flex flex-col gap-8">
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
