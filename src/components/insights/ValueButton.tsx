const COLOR_KEYS = [
  'all',
  'growth',
  'stability',
  'autonomy',
  'connection',
  'recognition',
  'fun',
  'efficiency',
  'meaning',
  'responsibility',
]

function ValueButton({ category, label, isActive = false, onClick }) {
  if (!COLOR_KEYS.includes(category)) return null

  return (
    <button
      type="button"
      onClick={onClick}
      style={{ '--btn-color': `var(--color-${category})` }}
      className={`w-full flex items-center gap-2.5 pl-2.5 py-2.25 pr-3 rounded-lg border transition-colors cursor-pointer ${
        isActive
          ? 'border-(--btn-color) bg-[color-mix(in_srgb,var(--btn-color)_15%,white)]'
          : 'border-gray-200 bg-white'
      }`}
    >
      <div
        className={`w-4 h-4 rounded shrink-0 flex items-center justify-center border-2 ${
          isActive ? 'bg-(--btn-color) border-(--btn-color)' : 'border-gray-300'
        }`}
      >
        {isActive && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.5 6L8 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {category !== 'all' && (
        <div className="w-2.25 h-2.25 rounded-xs shrink-0 bg-(--btn-color)" />
      )}

      <span className="text-sm font-medium text-gray-800">{label}</span>
    </button>
  )
}

export default ValueButton
