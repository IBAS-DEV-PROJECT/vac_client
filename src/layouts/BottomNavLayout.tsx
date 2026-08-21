import { useState, type ReactNode } from 'react'
import BottomNav, {
  type NavValue,
} from '@/components/common/navigation/BottomNav'

interface BottomNavLayoutProps {
  pages: Record<NavValue, ReactNode>
  defaultTab?: NavValue
}

function BottomNavLayout({ pages, defaultTab = 'home' }: BottomNavLayoutProps) {
  const [activeTab, setActiveTab] = useState<NavValue>(defaultTab)

  return (
    <div className="flex h-dvh flex-col">
      <main className="flex-1 overflow-y-auto">{pages[activeTab]}</main>
      <div className="bg-[#E1F5FE] px-4 pb-4 pt-2">
        <BottomNav value={activeTab} onChange={setActiveTab} />
      </div>
    </div>
  )
}

export default BottomNavLayout
