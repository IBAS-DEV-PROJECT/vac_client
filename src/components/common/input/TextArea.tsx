import { useId, type TextareaHTMLAttributes } from 'react'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  value: string
  maxLength: number
}

function TextArea({
  label,
  value,
  maxLength,
  rows = 1,
  ...props
}: TextAreaProps) {
  const textareaId = useId()
  const isOver = value.length > maxLength

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={textareaId} className="text-[13px] text-[#2A1F1C]/70">
          {label}
        </label>
      )}

      <textarea
        {...props}
        id={textareaId}
        value={value}
        rows={rows}
        aria-invalid={isOver}
        className={`w-full resize-none rounded-[10px] border bg-white px-3 py-2.5 text-sm leading-6 text-[#2A1F1C]/70 outline-none placeholder:text-[#757575] ${
          isOver ? 'border-[#FF8A3D]' : 'border-[#3E2723]/22'
        }`}
      />

      <span
        className={`self-end text-[11px] ${isOver ? 'text-[#FF8A3D]' : 'text-[#2A1F1C]/55'}`}
      >
        {value.length} / {maxLength}
      </span>
    </div>
  )
}

export default TextArea
