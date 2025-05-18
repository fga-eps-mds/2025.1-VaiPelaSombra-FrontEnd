import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ExamplePage from './pages/Example'
import Signup from './pages/Signup'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/example-page" element={<ExamplePage />} />
        <Route path='/signup' element = {<Signup />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes