interface StatusLabelProps {
  status: 'PENDING' | 'RESOLVED'
}

function StatusLabel({ status }: StatusLabelProps) {
  const isPending = status === 'PENDING'
  return (
    <div className="flex shrink-0 items-center gap-1">
      {isPending ? (
        <span
          className="h-1.5 w-1.5 rounded-full bg-[#2A1F1C]"
          aria-hidden="true"
        />
      ) : (
        <span
          className="h-1.5 w-1.5 rounded-full border border-[#2A1F1C]/40"
          aria-hidden="true"
        />
      )}
      <span
        className={`text-[11px] font-semibold leading-none ${isPending ? 'text-[#2A1F1C]' : 'text-[#2A1F1C]/40'}`}
      >
        {isPending ? '고민중' : '정리됨'}
      </span>
    </div>
  )
}

export default StatusLabel
