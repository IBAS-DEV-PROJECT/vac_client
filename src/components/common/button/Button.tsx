import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className="h-[46px] w-full rounded-[9px] border border-black bg-[#3E2723] px-4 text-base font-bold leading-5 text-white disabled:opacity-50"
    >
      {children}
    </button>
  )
}

export default Button
