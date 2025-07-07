import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ExamplePage from './pages/Example';
import PlanoViagens from './pages/Plano-Viagens';
import Signup from './pages/Signup';
import Login from './pages/Login';
import DestinationInfo from './pages/DestinationInfo';
import Profile from './pages/Profile'

import CreateItineraryPage from './pages/itinerario';
import EditarItinerario from './pages/editaritinerario';
function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/" element={<Navigate to="/planoViagem" replace />} />
        <Route path="/example-page" element={<ExamplePage />} />
        <Route path="/planoViagem" element={<PlanoViagens />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/destination-info' element={<DestinationInfo/>} />
        <Route path="/criar-plano" element={<CreateItineraryPage />} />
        <Route path="/editar-plano/:itineraryId" element={<EditarItinerario />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
