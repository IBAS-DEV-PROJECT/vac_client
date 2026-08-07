interface ErrorToastProps {
  message: string
}

function ErrorToast({ message }: ErrorToastProps) {
  return (
    <div
      className="w-[95%] mx-auto rounded-xl flex items-center gap-3 px-4 py-3.5"
      style={{ backgroundColor: '#2A1F1C' }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle cx="10" cy="10" r="9" stroke="#F5A623" strokeWidth="1.5" />
        <path
          d="M10 6V10.5"
          stroke="#F5A623"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="10" cy="13.5" r="0.75" fill="#F5A623" />
      </svg>
      <span className="text-[14px] text-white">{message}</span>
    </div>
  )
}

export default ErrorToast
