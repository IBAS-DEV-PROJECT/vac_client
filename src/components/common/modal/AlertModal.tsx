import Modal from './Modal'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
  confirmText?: string
}

function AlertModal({
  isOpen,
  onClose,
  message,
  confirmText = '확인',
}: AlertModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <p className="mb-[14px] text-center text-[15px] font-bold leading-[1.4] text-[#201E1D">
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="h-12 w-full rounded-lg bg-[#3E2723] text-[15px] font-bold text-white"
      >
        {confirmText}
      </button>
    </Modal>
  )
}

export default AlertModal
