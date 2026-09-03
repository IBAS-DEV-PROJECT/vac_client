import { useRef, useState, type ReactNode } from 'react'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'

interface BottomNavLayoutProps {
  pages: Record<NavValue, ReactNode>
  defaultTab?: NavValue
}

function BottomNavLayout({ pages, defaultTab = 'home' }: BottomNavLayoutProps) {
  const [activeTab, setActiveTab] = useState<NavValue>(defaultTab)
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
