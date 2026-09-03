import { useRef, useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'

const NAV_VALUES: NavValue[] = ['home', 'insight', 'setting']

function isNavValue(v: string | null): v is NavValue {
  return NAV_VALUES.includes(v as NavValue)
}

interface BottomNavLayoutProps {
  pages: Record<NavValue, ReactNode>
  defaultTab?: NavValue
}

function BottomNavLayout({ pages, defaultTab = 'home' }: BottomNavLayoutProps) {
  const [searchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const initialTab = isNavValue(tabParam) ? tabParam : defaultTab

  const [activeTab, setActiveTab] = useState<NavValue>(initialTab)
  const mainRef = useRef<HTMLElement>(null)

  const handleTabChange = (tab: NavValue) => {
    setActiveTab(tab)
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex h-dvh flex-col">
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        {pages[activeTab]}
      </main>
      <div className="bg-[#E1F5FE] px-4 pb-4 pt-2">
        <BottomNav value={activeTab} onChange={handleTabChange} />
      </div>
    </div>
  )
}

export default BottomNavLayout
