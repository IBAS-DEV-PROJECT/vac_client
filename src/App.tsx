import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Test1 from '@/pages/Test1'
import Test2 from '@/pages/Test2'
import Home from '@/pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test2 />} />
        <Route path="/test1" element={<Test1 />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
