import { useEffect, useRef } from 'react'

interface LogoutConfirmProps {
  isVisible: boolean
  onCancel: () => void
  onConfirm: () => void
}

const FOCUSABLE_SELECTORS =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function LogoutConfirm({
  isVisible,
  onCancel,
  onConfirm,
}: LogoutConfirmProps) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<Element | null>(null)

  useEffect(() => {
    if (!isVisible) return

    // 모달 열릴 때 트리거 저장 후 첫 버튼으로 포커스 이동
    triggerRef.current = document.activeElement
    const focusable =
      dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
    focusable?.[0]?.focus()

    return () => {
      // 모달 닫힐 때 트리거로 포커스 복원
      ;(triggerRef.current as HTMLElement | null)?.focus()
    }
  }, [isVisible])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onCancel()
      return
    }

    if (e.key !== 'Tab' || !dialogRef.current) return

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
    )
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#140B0A73]">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-dialog-title"
        onKeyDown={handleKeyDown}
        className="w-70 rounded-2xl bg-white p-6"
      >
        <h2
          id="logout-dialog-title"
          className="mb-4.5 text-left text-[16px] font-bold text-[#201E1D]"
        >
          로그아웃 하시겠어요?
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="h-9.75 flex-1 rounded-[9px] border border-[#201E1D66] text-[14px] font-extrabold text-[#2A1F1C]"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="h-9.75 flex-1 rounded-[9px] bg-[#201E1D] text-[14px] font-extrabold text-white"
          >
            예
          </button>
        </div>
      </div>
    </div>
  )
}
