import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/NavBar.tsx";
import TravelPlanCard from "../components/TravelPlanCard";
import Modal from "../components/ui/modal";
import "./Plano-Viagens.css";
import NavigateButton from "../components/NavigateButton";

type ApiItinerary = {
  id: number;
  title: string;
  startDate: string;
};

type TravelPlan = {
  title: string;
  users: []; 
  date: string;
  daysLeft: number;
  faded?: boolean;
};

const PlanoViagens: React.FC = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [travelHistory, setTravelHistory] = useState<TravelPlan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

 const fetchTravelPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = getAuthToken();
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Usuário não autenticado.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/itineraries/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Falha ao buscar os planos de viagem.");
      }
      const data: ApiItinerary[] = await response.json();
      const now = new Date();
      const upcoming: ApiItinerary[] = [];
      const history: ApiItinerary[] = [];

      data.forEach((plan) => {
        if (new Date(plan.startDate) >= now) {
          upcoming.push(plan);
        } else {
          history.push(plan);
        }
      });

      const formatPlan = (plan: ApiItinerary, faded = false): TravelPlan => ({
        title: plan.title,
        users: [], 
        date: new Date(plan.startDate).toLocaleDateString("pt-BR"),
        daysLeft: Math.max(
          0,
          Math.ceil(
            (new Date(plan.startDate).getTime() - now.getTime()) /
              (1000 * 60 * 60 * 24)
          )
        ),
        faded,
      });

      setTravelPlans(upcoming.map((p) => formatPlan(p)));
      setTravelHistory(history.map((p) => formatPlan(p, true)));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ocorreu um erro desconhecido."
      );
      console.error("Erro ao buscar planos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTravelPlans();
  }, [fetchTravelPlans]);

  const handleConfirmLink = async () => {
  };

  return (
    <div className="plano-viagens-bg">
      <Navbar />
      <div className="plano-viagens-container">
        <div className="plano-viagens-actions">
          <div className="primary-navigate-button-container">
            <NavigateButton
              to="/criar-plano"
              label="+ Criar um novo plano de viagem"
            />
          </div>
          <button className="btn-outline" onClick={() => setShowModal(true)}>
            Entrar com Link
          </button>
        </div>

        {isLoading && <p>Carregando seus planos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!isLoading && !error && (
          <>
            <h2 className="plano-viagens-section-title">Seus planos de viagens</h2>
            <div className="plano-viagens-cards">
              {travelPlans.length > 0 ? (
                travelPlans.map((plan, idx) => (
                  <TravelPlanCard key={idx} {...plan} />
                ))
              ) : (
                <p>Você não tem nenhuma viagem planejada.</p>
              )}
            </div>

            <h2 className="plano-viagens-section-title">Histórico de planos de viagens</h2>
            <div className="plano-viagens-cards">
              {travelHistory.length > 0 ? (
                travelHistory.map((plan, idx) => (
                  <TravelPlanCard key={idx} {...plan} />
                ))
              ) : (
                <p>Nenhuma viagem no seu histórico ainda.</p>
              )}
            </div>
          </>
        )}
      </div>

      {showModal && (
        <Modal
          title="Insira o link do plano de viagem"
          inputValue={linkInput}
          onInputChange={setLinkInput}
          onConfirm={handleConfirmLink}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PlanoViagens;