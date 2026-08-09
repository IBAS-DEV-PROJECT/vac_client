import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalLabelProps =
  | { ariaLabel: string; ariaLabelledBy?: never }
  | { ariaLabelledBy: string; ariaLabel?: never }

type ModalProps = ModalLabelProps & {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  closeOnOverlayClick?: boolean
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

function Modal({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = false,
  ariaLabel,
  ariaLabelledBy,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!isOpen) return
    
    const previouslyFocused = document.activeElement as HTMLElement | null

    const getFocusableItems = () =>
      Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR) ?? [])

    ;(getFocusableItems()[0] ?? dialogRef.current)?.focus()
    
    const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose()
    return
  }

  if (e.key !== 'Tab') return

  const items = getFocusableItems()

  if (items.length === 0) {
    e.preventDefault()
    return
  }

  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement
  const isInside = dialogRef.current?.contains(active) ?? false

  if (e.shiftKey && (active === first || !isInside)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (active === last || !isInside)) {
    e.preventDefault()
    first.focus()
  }
}

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        tabIndex={-1}
        className="w-[260px] rounded-2xl bg-white px-5 py-5 shadow-lg outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
