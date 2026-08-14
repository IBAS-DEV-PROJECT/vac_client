import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface BottomSheetProps {
  onClose: () => void
  children: ReactNode
  className?: string
}

function BottomSheet({ onClose, children, className = '' }: BottomSheetProps) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div
        className={`relative flex max-h-[80vh] flex-col rounded-t-3xl bg-[#E1F5FE] ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default BottomSheet
