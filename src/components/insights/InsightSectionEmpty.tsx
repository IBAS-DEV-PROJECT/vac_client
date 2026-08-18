import type { ReactNode } from 'react'

interface InsightSectionEmptyProps {
  sectionTitle: string
  icon: ReactNode
  title: string
  description: string
  hintIcon: ReactNode
  hintText: string
}

function InsightSectionEmpty({
  sectionTitle,
  icon,
  title,
  description,
  hintIcon,
  hintText,
}: InsightSectionEmptyProps) {
  return (
    <div className="mx-5 rounded-2xl bg-white p-4 shadow-sm flex flex-col gap-4">
      <p className="text-[14px] font-extrabold text-[#2A1F1C]">
        {sectionTitle}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DDF0FA]">
          {icon}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-bold text-[#2A1F1C]">{title}</p>
          <p className="text-[12px] leading-snug text-[#2A1F1C]/55">
            {description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-[#f6fbfe] px-3 py-2.5">
        <span className="shrink-0">{hintIcon}</span>
        <p className="text-[12px] leading-snug text-[#2A1F1C]/70">{hintText}</p>
      </div>
    </div>
  )
}

export default InsightSectionEmpty
