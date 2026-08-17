import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNavLayout from '@/layouts/BottomNavLayout'
import InsightPage from '@/pages/InsightPage'
import Test1 from '@/pages/Test1'
import Test2 from '@/pages/Test2'

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
                home: (
                  <div className="p-6 bg-[#E1F5FE] min-h-full">홈 페이지</div>
                ),
                insight: <InsightPage />,
                setting: (
                  <div className="p-6 bg-[#E1F5FE] min-h-full">설정 페이지</div>
                ),
              }}
            />
          }
        />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
