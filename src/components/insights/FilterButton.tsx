function FilterButton({ label, isActive = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-1.75 rounded-lg text-sm font-medium border transition-colors cursor-pointer ${
        isActive
          ? 'bg-(--color-stability) text-black border-(--color-stability)'
          : 'bg-white text-black border-gray-300'
      }`}
    >
      {label}
    </button>
  )
}

export default FilterButton
