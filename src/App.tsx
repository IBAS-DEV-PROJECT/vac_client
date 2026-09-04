import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
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
import { tokenStore } from '@/store/auth'

function ProtectedRoute({ children }: { children: ReactNode }) {
  if (!tokenStore.getAccessToken()) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <BottomNavLayout
                defaultTab="home"
                pages={{
                  home: <Home />,
                  insight: <InsightPage />,
                  setting: <Setting />,
                }}
              />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/insight/records"
          element={
            <ProtectedRoute>
              <InsightRecordListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insight/timeline"
          element={
            <ProtectedRoute>
              <ConcernTimelinePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/record"
          element={
            <ProtectedRoute>
              <RecordPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/record-guide"
          element={
            <ProtectedRoute>
              <RecordGuide />
            </ProtectedRoute>
          }
        />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/test2" element={<Test2 />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
