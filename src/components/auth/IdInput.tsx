import { useId, type InputHTMLAttributes } from 'react'
import type { IdInputStatus } from '@/types/input'

interface IdInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  status?: IdInputStatus
  message?: string
  onCheckDuplicate: () => void
}

const borderStyles: Record<IdInputStatus, string> = {
  idle: 'border-gray-300',
  invalid: 'border-[#C4520E]',
  ready: 'border-gray-300',
  available: 'border-[#3AB0D9]',
  unavailable: 'border-[#C4520E]',
}

const messageStyles: Record<IdInputStatus, string> = {
  idle: 'text-[#5C6B72]',
  invalid: 'text-[#C4520E]',
  ready: 'text-[#5C6B72]',
  available: 'text-[#3AB0D9]',
  unavailable: 'text-[#C4520E]',
}

const buttonStyles: Record<IdInputStatus, string> = {
  idle: 'bg-[#DDF0FA] text-[#9AA4A8]',
  invalid: 'bg-[#DDF0FA] text-[#9AA4A8]',
  ready: 'bg-[#3AB0D9] text-[#FFFFFF]',
  available: 'bg-[#3AB0D9] text-[#FFFFFF]',
  unavailable: 'bg-[#3E2723] text-[#DDF0FA]',
}

const buttonLabels: Record<IdInputStatus, string> = {
  idle: '중복확인',
  invalid: '중복확인',
  ready: '중복확인',
  available: '확인완료',
  unavailable: '중복확인',
}

const DISABLED_STATUSES: IdInputStatus[] = ['idle', 'invalid', 'available']

function IdInput({
  label = '아이디',
  status = 'idle',
  message,
  onCheckDuplicate,
  ...props
}: IdInputProps) {
  const inputId = useId()

  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={inputId} className="text-[13px] text-[#5C6B72]">
        {label}
      </label>

      <div className="flex items-start gap-2">
        <input
          {...props}
          id={inputId}
          aria-invalid={status === 'invalid' || status === 'unavailable'}
          aria-describedby={message ? `${inputId}-message` : undefined}
          className={`h-9 w-[162px] rounded-[9px] border bg-white px-2.5 text-sm outline-none placeholder:text-[#3E2723]/22 ${borderStyles[status]}`}
        />

        <button
          type="button"
          onClick={onCheckDuplicate}
          disabled={DISABLED_STATUSES.includes(status)}
          className={`h-9 w-[84px] shrink-0 rounded-[9px] text-sm font-bold ${buttonStyles[status]}`}
        >
          {buttonLabels[status]}
        </button>
      </div>

      {message && (
        <p
          id={`${inputId}-message`}
          className={`text-[14px] leading-[1.5] ${messageStyles[status]}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default IdInput
