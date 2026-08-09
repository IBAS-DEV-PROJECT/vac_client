import { useId, type InputHTMLAttributes } from 'react'
import type { InputStatus } from '@/types/input'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  status?: InputStatus
  message?: string
}

const borderStyles: Record<InputStatus, string> = {
  default: 'border-[#3E272338]',
  success: 'border-[#3AB0D9]',
  error: 'border-[#C4520E]',
}

const messageStyles: Record<InputStatus, string> = {
  default: 'text-#5C6B72]',
  success: 'text-[#3AB0D9]',
  error: 'text-[#C4520E]',
}

function Input({ label, status = 'default', message, ...props }: InputProps) {
  const inputId = useId()

  return (
    <div className="flex w-full flex-col gap-1">
      <label htmlFor={inputId} className="text-[13px] text-gray-700">
        {label}
      </label>

      <input
        {...props}
        id={inputId}
        aria-invalid={status === 'error'}
        aria-describedby={message ? `${inputId}-message` : undefined}
        className={`h-9 w-full rounded-lg border bg-white px-3 text-sm outline-none placeholder:text-gray-400 ${borderStyles[status]}`}
      />

      {message && (
        <p
          id={`${inputId}-message`}
          className={`text-[13px] leading-[1.5] ${messageStyles[status]}`}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default Input
