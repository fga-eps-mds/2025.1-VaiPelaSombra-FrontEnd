import Navbar from "../components/NavBar.tsx";
import TravelPlanCard from "../components/TravelPlanCard";
import "./Plano-Viagens.css"; // Crie este arquivo para os estilos da página

const PlanoViagens: React.FC = () => (
  <div className="plano-viagens-bg">
    <Navbar />
    <div className="plano-viagens-container">
      <div className="plano-viagens-actions">
        <button className="btn-primary">
          + Criar um novo plano de viagem
        </button>
        <button className="btn-outline">
          Entrar com Link
        </button>
      </div>

      <h2 className="plano-viagens-section-title">Seus planos de viagens</h2>
      <div className="plano-viagens-cards">
        /* travelPlans AQUI */
      </div>

      <h2 className="plano-viagens-section-title">Histórico de planos de viagens</h2>
      <div className="plano-viagens-cards">
       /* travelHistory aqui */
      </div>
    </div>
  </div>
);

export default PlanoViagens;
