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
        maxLength={maxLength}
        className="w-full resize-none rounded-[10px] border border-[#3E2723]/22 bg-white px-3 py-2.5 text-sm leading-6 text-[#2A1F1C]/70 outline-none placeholder:text-[#2A1F1C]/70"
      />

      <span className="self-end text-[11px] text-[#2A1F1C]/55">
        {value?.length} / {maxLength}
      </span>
    </div>
  )
}

export default TextArea
