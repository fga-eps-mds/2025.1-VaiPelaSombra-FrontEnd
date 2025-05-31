import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ExamplePage from './pages/Example';
import PlanoViagens from './pages/Plano-Viagens';
import Signup from './pages/Signup';
import Login from './pages/Login';
import DestinationInfo from './pages/DestinationInfo';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/planoViagem" replace />} />
        <Route path="/example-page" element={<ExamplePage />} />
        <Route path="/planoViagem" element={<PlanoViagens />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/destination-info' element={<DestinationInfo/>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
