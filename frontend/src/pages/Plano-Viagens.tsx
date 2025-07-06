import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/NavBar.tsx";
import TravelPlanCard from "../components/TravelPlanCard";
import Modal from "../components/ui/modal";
import "./Plano-Viagens.css";
import NavigateButton from "../components/NavigateButton";
// Interface para os dados que vêm da API (corresponde ao schema do Prisma)
// É uma boa prática ter tipos que espelham a resposta da sua API.
type ApiItinerary = {
  id: number;
  title: string;
  startDate: string;
  // Assumindo que o backend inclua os usuários para exibição
  users: { id: number; name: string; profileImage: string | null }[];
};

type TravelPlan = {
  title: string;
  image: string; // Você pode adicionar um campo de imagem ao seu modelo Itinerary no futuro
  users: { name: string; avatar: string }[];
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

  // É CRUCIAL ter o token de autenticação para fazer chamadas seguras.
  // Substitua esta linha pela forma como você gerencia o estado de autenticação (Context, Redux, etc.).
  const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Exemplo: pegando o token do localStorage
  };

  const fetchTravelPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = getAuthToken();

    if (!token) {
      setError("Usuário não autenticado.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. ENDPOINT CORRIGIDO: Busca os itinerários do usuário logado.
      const response = await fetch("http://localhost:3000/itineraries/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

      // 2. MAPEAMENTO CORRIGIDO: Mapeia os dados da API para o formato esperado pelo card.
      const formatPlan = (plan: ApiItinerary, faded = false): TravelPlan => ({
        title: plan.title,
        image: "/src/assets/images/placeholder-image.webp", // Use uma imagem placeholder
        users: plan.users.map(u => ({ name: u.name, avatar: u.profileImage || '/src/assets/images/default-avatar.png' })),
        date: new Date(plan.startDate).toLocaleDateString("pt-BR"),
        daysLeft: Math.max(0, Math.ceil((new Date(plan.startDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))),
        faded,
      });

      setTravelPlans(upcoming.map((p) => formatPlan(p)));
      setTravelHistory(history.map((p) => formatPlan(p, true)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro desconhecido.");
      console.error("Erro ao buscar planos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTravelPlans();
  }, [fetchTravelPlans]);

  // 3. LÓGICA DO MODAL IMPLEMENTADA: Função para entrar em um grupo via link.
  const handleConfirmLink = async () => {
    if (!linkInput.trim()) {
      alert("Por favor, insira um link.");
      return;
    }

    const token = getAuthToken();
    if (!token) {
      alert("Você precisa estar logado para entrar em um grupo.");
      return;
    }

    try {
      // Extrai a última parte da URL, que deve ser o ID do itinerário.
      const urlParts = linkInput.split('/');
      const itineraryId = parseInt(urlParts[urlParts.length - 1], 10);

      if (isNaN(itineraryId)) {
        throw new Error("O link fornecido não é válido.");
      }

      const response = await fetch(`http://localhost:3000/itineraries/join/${itineraryId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Não foi possível entrar no grupo. Verifique o link e tente novamente.");
      }

      alert("Você entrou no grupo com sucesso!");
      setShowModal(false);
      setLinkInput("");
      fetchTravelPlans(); // Recarrega os planos para mostrar o novo grupo.

    } catch (error) {
      alert(error instanceof Error ? error.message : "Ocorreu um erro ao processar o link.");
      console.error("Erro ao processar o link de convite:", error);
    }
  };

  return (
    <div className="plano-viagens-bg">
      <Navbar />
      <div className="plano-viagens-container">
         <div className="plano-viagens-actions">
        
        {/* 1. CRIE UMA DIV "WRAPPER" AO REDOR DO BOTÃO */}
        <div className="primary-navigate-button-container">
            <NavigateButton
                to="/criar-plano"
                label="+ Criar um novo plano de viagem"
                // Repare que não passamos a className para o componente
            />
        </div>

        <button className="btn-outline" onClick={() => setShowModal(true)}>
            Entrar com Link
        </button>
    </div>

        {isLoading && <p>Carregando seus planos...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && !error && (
          <>
            <h2 className="plano-viagens-section-title">Seus planos de viagens</h2>
            <div className="plano-viagens-cards">
              {travelPlans.length > 0 ? (
                travelPlans.map((plan, idx) => (
                  <TravelPlanCard key={idx} {...plan} />
                ))
              ) : (
                <p>Você não tem nenhuma viagem planejada. Que tal criar uma?</p>
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