import HeaderLogo from '@/assets/HeaderLogo.svg'

function HomeHeader() {
  return (
    <header className="flex h-[70px] w-full items-center border-b border-[#3E2723]/22 pl-[23px]">
      <img src={HeaderLogo} alt="Layer" className="h-6 w-[70px]" />
    </header>
  )
}

export default HomeHeader
