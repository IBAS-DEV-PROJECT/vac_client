interface TabItem<T extends string> {
  value: T
  label: string
}

interface TabProps<T extends string> {
  items: readonly [TabItem<T>, TabItem<T>]
  value: T
  onChange: (value: T) => void
}

function Tab<T extends string>({ items, value, onChange }: TabProps<T>) {
  return (
    <div role="tablist" className="flex h-[60px] w-full bg-[#E1F5FE] px-6">
      {items.map((item, index) => {
        const isActive = item.value === value

        return (
          <div key={item.value} className="flex flex-1 items-center">
            {index > 0 && <span className="h-4 w-px shrink-0 bg-[#9AA4A8]" />}

            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item.value)}
              className={`h-full w-full border-b-2 text-sm font-bold ${
                isActive
                  ? 'border-[#2A1F1C] text-[#2A1F1C]'
                  : 'border-[#9AA4A8]/40 text-[#9AA4A8]'
              }`}
            >
              {item.label}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Tab
