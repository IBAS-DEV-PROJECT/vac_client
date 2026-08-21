import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`h-[46px] w-full rounded-[9px] border border-black bg-[#3E2723] px-4 text-[15px] font-extrabold leading-[18px] text-[#E1F5FE] disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
