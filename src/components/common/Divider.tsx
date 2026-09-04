interface DividerProps {
  className?: string
}

function Divider({ className = '' }: DividerProps) {
  return <div className={`h-0.5 bg-[#3E272338] ${className}`} />
}

export default Divider
