interface LogoutConfirmProps {
  isVisible: boolean
  onCancel: () => void
  onConfirm: () => void
}

export default function LogoutConfirm({
  isVisible,
  onCancel,
  onConfirm,
}: LogoutConfirmProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#140B0A73]">
      <div className="w-[280px] rounded-2xl bg-white p-6">
        <h2 className="mb-[18px] text-left text-[16px] font-bold text-[#201E1D]">
          로그아웃 하시겠어요?
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="h-[39px] flex-1 rounded-[9px] border border-[#201E1D66] text-[14px] font-extrabold text-[#2A1F1C]"
          >
            아니오
          </button>
          <button
            onClick={onConfirm}
            className="h-[39px] flex-1 rounded-[9px] bg-[#201E1D] text-[14px] font-extrabold text-white"
          >
            예
          </button>
        </div>
      </div>
    </div>
  )
}
