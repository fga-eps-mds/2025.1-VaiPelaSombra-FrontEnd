import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';
import "./Plano-Viagens.css";
import {config} from '../config';

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
 

  const getAuthToken = () => localStorage.getItem("authToken");

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
    const token = getAuthToken();
    const userId = localStorage.getItem("userId");

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
      const response = await fetch(`${config.apiBaseUrl}/itineraries/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao criar o plano de viagem.");
    }
    await response.json(); 
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
            Dê um nome e uma data para  organizar sua próxima aventura em grupo.
          </p>

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
        {isLoading ? 'Criando' : 'Criar Plano de Viagem'}
        </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItineraryPage;
