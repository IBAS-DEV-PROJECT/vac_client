import { useState } from 'react'
import FilterButton from '@/components/insights/FilterButton'

const FILTERS = ['최근 7일', '최근 30일', '최근 90일']

function Test2() {
  const [active, setActive] = useState('최근 7일')

  return (
    <div className="p-10 flex flex-col gap-8">
      <section className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-gray-500">FilterButton</h2>
        <div className="flex gap-2">
          {FILTERS.map((label) => (
            <FilterButton
              key={label}
              label={label}
              isActive={active === label}
              onClick={() => setActive(label)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Test2
