interface DividerProps {
  className?: string
}

function Divider({ className = '' }: DividerProps) {
  return <div className={`h-0.5 bg-gray-300 ${className}`} />
}

export default Divider
