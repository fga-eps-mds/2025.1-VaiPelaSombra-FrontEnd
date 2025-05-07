import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ExamplePage from './pages/Example'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/example-page" element={<ExamplePage />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes