import BottomNavLayout from '@/layouts/BottomNavLayout'
import InsightPage from '@/pages/InsightPage'

function App() {
  return (
    <BottomNavLayout
      defaultTab="insight"
      pages={{
        home: <div className="p-6 bg-[#E1F5FE] min-h-full">홈 페이지</div>,
        insight: <InsightPage />,
        setting: <div className="p-6 bg-[#E1F5FE] min-h-full">설정 페이지</div>,
      }}
    />
  )
}

export default App
