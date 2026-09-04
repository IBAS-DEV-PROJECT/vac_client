import { type ReactNode } from 'react'
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
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab = isNavValue(tabParam) ? tabParam : defaultTab

  const handleTabChange = (tab: NavValue) => {
    setSearchParams({ tab }, { replace: true })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <main className="pb-24">{pages[activeTab]}</main>
      <div className="fixed bottom-0 left-0 right-0 px-4 pb-4 pt-2">
        <BottomNav value={activeTab} onChange={handleTabChange} />
      </div>
    </div>
  )
}

export default BottomNavLayout
