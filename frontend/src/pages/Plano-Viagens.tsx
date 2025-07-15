import Navbar from '../components/NavBar.tsx';
import TravelPlanCard from '../components/TravelPlanCard';
import './Plano-Viagens.css';
import { useEffect, useState } from 'react';
import config from '@/config';

type User = {
  name: string;
  avatar: string;
};

type TravelPlan = {
  title: string;
  image: string;
  users: User[];
  date: string;
  daysLeft: number;
  faded?: boolean;
};

// Tipo para os dados retornados pela API
type ApiTravelPlan = {
  nome: string;
  dataInicio: string;
};

const PlanoViagens: React.FC = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [travelHistory, setTravelHistory] = useState<TravelPlan[]>([]);

  useEffect(() => {
    const userId = 1; // modificar depois que obtivermos o useAuth
    fetch(`${config.apiBaseUrl}/PlanoViagem/${userId}`)
      .then((res) => res.json())
      .then((data: ApiTravelPlan[]) => {
        const now = new Date();
        const upcoming = data.filter((plan) => new Date(plan.dataInicio) > now);
        const history = data.filter((plan) => new Date(plan.dataInicio) <= now);

        const formatPlan = (plan: ApiTravelPlan, faded = false): TravelPlan => ({
          title: plan.nome,
          image:
            '/src/assets/images/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_août_2014_(2).webp',
          users: [],
          date: new Date(plan.dataInicio).toLocaleDateString('pt-BR'),
          daysLeft: Math.max(
            0,
            Math.ceil((new Date(plan.dataInicio).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          ),
          faded,
        });

        setTravelPlans(upcoming.map((p) => formatPlan(p)));
        setTravelHistory(history.map((p) => formatPlan(p, true)));
      })
      .catch((err) => {
        console.error('Erro ao buscar planos:', err);
      });
  }, []);

  return (
    <div className="plano-viagens-bg">
      <Navbar />
      <div className="plano-viagens-container">
        <div className="plano-viagens-actions">
          <button className="btn-primary">+ Criar um novo plano de viagem</button>
          <button className="btn-outline">Entrar com Link</button>
        </div>

        <h2 className="plano-viagens-section-title">Seus planos de viagens</h2>
        <div className="plano-viagens-cards">
          {travelPlans.map((plan, idx) => (
            <TravelPlanCard key={idx} {...plan} />
          ))}
        </div>

        <h2 className="plano-viagens-section-title">Histórico de planos de viagens</h2>
        <div className="plano-viagens-cards">
          {travelHistory.map((plan, idx) => (
            <TravelPlanCard key={idx} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanoViagens;
