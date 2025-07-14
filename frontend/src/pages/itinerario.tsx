import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../components/NavBar';
import "./Plano-Viagens.css";
import { config } from '../config';
import { useAuth } from '../hooks/useAuth';

interface CreateItineraryPayload {
  title: string;
  startDate: string;
  endDate: string;
  itineraryStatus: 'PLANNING';
  lodgingBudget?: number;
  foodBudget?: number;
  totalBudget?: number;
}

const CreateItineraryPage: React.FC = () => {
  const { getToken, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    lodgingBudget: '',
    foodBudget: '',
    totalBudget: '',
    imageUrl: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Adicionar states para link sharing
  const [pageLink, setPageLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Verificar autenticação usando o hook
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const token = getToken();
    if (!token) {
      navigate('/login');
      return;
    }

    let userId;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const decoded: any = jwtDecode(token);
      userId = decoded.id || decoded.userId || decoded.sub;
      
      // Garantir que o userId está salvo no localStorage
      if (userId && !localStorage.getItem("userId")) {
        localStorage.setItem("userId", userId);
      }
    } catch (error) { // ✅ Mudei de 'e' para 'error'
      console.error('Token inválido:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      navigate('/login');
      return;
    }
  }, [navigate, isAuthenticated, getToken]);

  useEffect(() => {
    setPageLink(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.startDate || !formData.endDate) {
      setError("Por favor, preencha o título e as datas da viagem.");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      setError("A data final não pode ser anterior à data de início.");
      return;
    }

    setIsLoading(true);
    const token = getToken();
    let userId = localStorage.getItem("userId");

    if (!userId && token) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const decoded: any = jwtDecode(token);
        userId = decoded.id || decoded.userId || decoded.sub;
        if (userId) localStorage.setItem("userId", userId);
      } catch (error) { // ✅ Mudei de 'e' para 'error' e agora uso a variável
        console.error('Token inválido ao decodificar:', error);
        setError("Token inválido. Por favor, faça login novamente.");
        setIsLoading(false);
        return;
      }
    }

    if (!token || !userId) {
      setError("Autenticação necessária. Por favor, faça login novamente.");
      setIsLoading(false);
      return;
    }

    const payload: CreateItineraryPayload = {
      title: formData.title,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      itineraryStatus: 'PLANNING',
    };

    if (formData.lodgingBudget) payload.lodgingBudget = parseFloat(formData.lodgingBudget);
    if (formData.foodBudget) payload.foodBudget = parseFloat(formData.foodBudget);
    if (formData.totalBudget) payload.totalBudget = parseFloat(formData.totalBudget);

    try {
      const response = await fetch(`${config.apiBaseUrl}/users/${userId}/itineraries`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao criar o plano de viagem.");
      }
      
      alert("Plano de viagem criado com sucesso!");
      navigate('/plano-viagens');

    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocorreu um erro.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="plano-bg">
      <Navbar />
      <div className="plano-container">
        <form className="plano-form" onSubmit={handleSubmit}>
          <h1 className="plano-title">Criar Novo Plano de Viagem</h1>
          <p className="plano-description">
            Dê um nome e uma data para organizar sua próxima aventura em grupo.
          </p>

          <div className="plano-form-group">
            <label className="plano-label">Compartilhar página</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={pageLink}
                readOnly
                className="plano-input"
                style={{ flex: 1 }}
              />
              <button 
                type="button" 
                onClick={handleCopyLink}
                className="plano-submit"
                style={{ width: 'auto', padding: '8px 16px' }}
              >
                {copied ? 'Copiado!' : 'Copiar link'}
              </button>
            </div>
          </div>

          <div className="plano-form-group">
            <label htmlFor="title" className="plano-label">Título da Viagem</label>
            <input type="text" id="title" name="title"  value={formData.title} onChange={handleChange} required className="plano-input" />
          </div>

          <div className="plano-form-row">
            <div className="plano-form-group flex1">
              <label htmlFor="startDate" className="plano-label">Data de Início</label>
              <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required className="plano-input" />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="endDate" className="plano-label">Data Final</label>
              <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required className="plano-input" />
            </div>
          </div>

          <h2 className="plano-subtitle">Orçamento (Opcional)</h2>
          <div className="plano-form-row">
            <div className="plano-form-group flex1">
              <label htmlFor="lodgingBudget" className="plano-label">Hospedagem (R$)</label>
              <input type="number" id="lodgingBudget" name="lodgingBudget"   value={formData.lodgingBudget} onChange={handleChange} className="plano-input" />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="foodBudget" className="plano-label">Alimentação (R$)</label>
              <input type="number" id="foodBudget" name="foodBudget"   value={formData.foodBudget} onChange={handleChange} className="plano-input" />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="totalBudget" className="plano-label">Total (R$)</label>
              <input type="number" id="totalBudget" name="totalBudget"   value={formData.totalBudget} onChange={handleChange} className="plano-input" />
            </div>
          </div>

          {error && <p className="plano-error">{error}</p>}
          <button 
            type="submit" 
            className={`plano-submit ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Criando...' : 'Criar Plano de Viagem'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItineraryPage;
