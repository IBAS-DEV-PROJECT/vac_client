import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNavLayout from '@/layouts/BottomNavLayout'
import InsightPage from '@/pages/InsightPage'
import InsightRecordListPage from '@/pages/InsightRecordListPage'
import ConcernTimelinePage from '@/pages/ConcernTimelinePage'
import Test1 from '@/pages/Test1'
import Test2 from '@/pages/Test2'
import Home from '@/pages/Home'
import RecordPage from '@/pages/RecordPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BottomNavLayout
              defaultTab="insight"
              pages={{
                home: <Home />,
                insight: <InsightPage />,
                setting: <div className="p-6 min-h-full">설정 페이지</div>,
              }}
            />
          }
        />
        <Route path="/insight/records" element={<InsightRecordListPage />} />
        <Route path="/insight/timeline" element={<ConcernTimelinePage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
