import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BottomNavLayout from '@/layouts/BottomNavLayout'
import InsightPage from '@/pages/InsightPage'
import InsightRecordListPage from '@/pages/InsightRecordListPage'
import ConcernTimelinePage from '@/pages/ConcernTimelinePage'
import Test1 from '@/pages/Test1'
import Test2 from '@/pages/Test2'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Setting from '@/pages/Setting'
import RecordPage from '@/pages/RecordPage'
import Onboarding from '@/pages/Onboarding'
import RecordGuide from '@/pages/RecordGuide'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <BottomNavLayout
              defaultTab="home"
              pages={{
                home: <Home />,
                insight: <InsightPage />,
                setting: <Setting />,
              }}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/insight/records" element={<InsightRecordListPage />} />
        <Route path="/insight/timeline" element={<ConcernTimelinePage />} />
        <Route path="/record" element={<RecordPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/record-guide" element={<RecordGuide />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
