import { useEffect, useState, useCallback, useRef } from "react";
import Navbar from "../components/NavBar.tsx";
import TravelPlanCard from "../components/TravelPlanCard";
import Modal from "../components/ui/modal";
import "./Plano-Viagens.css";
import NavigateButton from "../components/NavigateButton";
import { config } from "../config";
import { useAuth } from "../hooks/useAuth";

type User = {
  id: number;
  name: string;
};

type ApiItinerary = {
  id: number;
  title: string;
  startDate: string;
  users: User[];
};

type TravelPlan = {
  id: number;
  title: string;
  users: User[];
  date: string;
  daysLeft: number;
  faded?: boolean;
};

const PlanoViagens: React.FC = () => {
  const { getToken } = useAuth();
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [travelHistory, setTravelHistory] = useState<TravelPlan[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [linkInput, setLinkInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasInitialized = useRef(false);
  const isRequestInProgress = useRef(false);

  const fetchTravelPlans = useCallback(async () => {
    if (isRequestInProgress.current) {
      return;
    }

    isRequestInProgress.current = true;
    setIsLoading(true);
    setError(null);
    
    const token = getToken();
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      const errorMsg = "Usuário não autenticado.";
      setError(errorMsg);
      setIsLoading(false);
      isRequestInProgress.current = false;
      return;
    }

    try {
      const url = `${config.apiBaseUrl}/users/${userId}/itineraries`;
      
      const response = await fetch(url, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha ao buscar os planos de viagem. Status: ${response.status}`);
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
        id: plan.id,
        title: plan.title,
        users: plan.users || [],
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

      const formattedUpcoming = upcoming.map((p) => formatPlan(p));
      const formattedHistory = history.map((p) => formatPlan(p, true));

      setTravelPlans(formattedUpcoming);
      setTravelHistory(formattedHistory);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Ocorreu um erro desconhecido.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      isRequestInProgress.current = false;
    }
  }, [getToken]);

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      fetchTravelPlans();
    }
  }, []);

  const handleConfirmLink = useCallback(async () => {
    const token = getToken();
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setError("Autenticação necessária. Por favor, faça login novamente.");
      return;
    }

    try {
      const match = linkInput.match(/(\d+)$/);
      const itineraryId = match ? match[1] : null;

      if (!itineraryId) {
        setError("Link inválido. Certifique-se de colar o link correto.");
        return;
      }

      const response = await fetch(
        `${config.apiBaseUrl}/itineraries/${itineraryId}/users/${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Falha ao entrar no plano de viagem.");
      }

      alert("Você entrou com sucesso no plano de viagem!");
      setShowModal(false);
      setLinkInput("");
      
      fetchTravelPlans();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro.");
    }
  }, [getToken, linkInput, fetchTravelPlans]);

  const handleLinkInputChange = useCallback((value: string) => {
    setLinkInput(value);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setLinkInput("");
  }, []);

  return (
    <div className="plano-viagens-bg">
      <Navbar />
      <div className="plano-viagens-container">
        <div className="plano-viagens-actions">
          <div className="primary-navigate-button-container">
            <NavigateButton
              to="/itinerario"
              label="+ Criar um novo plano de viagem"
            />
          </div>
          <button className="btn-outline" onClick={() => setShowModal(true)}>
            Entrar com Link
          </button>
        </div>

        {isLoading && <p>Carregando planos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <>
          <h2 className="plano-viagens-section-title">Seus planos de viagens</h2>
          <div className="plano-viagens-cards">
            {travelPlans.length > 0 ? (
              travelPlans.map((plan) => (
                <TravelPlanCard key={plan.id} {...plan} itineraryId={plan.id} />
              ))
            ) : (
              <p>Você não tem nenhuma viagem planejada.</p>
            )}
          </div>

          <h2 className="plano-viagens-section-title">Histórico de planos de viagens</h2>
          <div className="plano-viagens-cards">
            {travelHistory.length > 0 ? (
              travelHistory.map((plan) => (
                <TravelPlanCard key={plan.id} {...plan} itineraryId={plan.id} />
              ))
            ) : (
              <p>Nenhuma viagem no seu histórico ainda.</p>
            )}
          </div>
        </>
      </div>

      {showModal && (
        <Modal
          title="Insira o link do plano de viagem"
          inputValue={linkInput}
          onInputChange={handleLinkInputChange}
          onConfirm={handleConfirmLink}
          onCancel={handleCloseModal}
        />
      )}
    </div>
  );
};

export default PlanoViagens;