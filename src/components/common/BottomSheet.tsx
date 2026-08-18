import { type ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'

interface BottomSheetProps {
  onClose: () => void
  children: ReactNode
  className?: string
}

function BottomSheet({ onClose, children, className = '' }: BottomSheetProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative flex max-h-[80vh] flex-col rounded-t-3xl bg-[#E1F5FE] ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default BottomSheet
