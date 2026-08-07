interface SettingsTabProps {
  label: string
  isHighlighted?: boolean
  onClick?: () => void
}

function SettingsTab({
  label,
  isHighlighted = false,
  onClick,
}: SettingsTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-13.75 flex items-center border-b border-gray-200 cursor-pointer ${
        isHighlighted ? 'text-gray-900' : 'text-gray-500'
      }`}
    >
      {label}
    </button>
  )
}

export default SettingsTab
