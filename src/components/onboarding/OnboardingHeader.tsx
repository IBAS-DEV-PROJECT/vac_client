export default function OnboardingHeader(props: { pageNumber:number; }) {
  return (
    <header className="h-[31px] px-7 flex items-end gap-2">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`h-[3px] w-8 ${
            step <= props.pageNumber ? 'bg-[#3E2723]' : 'bg-[#DDF0FA]'
          }`}
        />
      ))}
    </header>
  )
}