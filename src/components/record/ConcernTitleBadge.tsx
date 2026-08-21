interface ConcernTitleBadgeProps {
  concern: string
}

function ConcernTitleBadge({ concern }: ConcernTitleBadgeProps) {
  return (
    <span className="w-fit rounded-[7px] border border-[#3E2723] bg-[#E1F5FE] px-2.5 py-1.5 text-[11px] font-normal text-[#3E2723]">
      {concern}
    </span>
  )
}

export default ConcernTitleBadge
