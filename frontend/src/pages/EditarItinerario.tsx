import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import "./Plano-Viagens.css";
import { config } from "../config";

interface UpdateItineraryPayload {
  title: string;
  startDate: string;
  endDate: string;
  lodgingBudget?: number;
  foodBudget?: number;
  totalBudget?: number;
}

interface ItineraryData {
  id: number; 
  startDate: string; 
  endDate: string;   
  lodgingBudget?: number;
  foodBudget?: number;
  totalBudget?: number;
  itineraryStatus?: string; 
}

const EditarItinerario: React.FC = () => {
  const { itineraryId } = useParams<{ itineraryId: string }>(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    lodgingBudget: "",
    foodBudget: "",
    totalBudget: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const fetchItinerary = async () => {
  try {
    if (!itineraryId || !token) {
      setError("ID do itinerário ou token de autenticação não encontrado.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const response = await fetch(`${config.apiBaseUrl}/itineraries/${itineraryId}`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
      throw new Error(`Erro ao carregar o itinerário: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const plan: ItineraryData = await response.json();

    setFormData({
      title: plan.title || "",
      startDate: plan.startDate ? plan.startDate.split("T")[0] : "",
      endDate: plan.endDate ? plan.endDate.split("T")[0] : "",
      lodgingBudget: plan.lodgingBudget?.toString() || "",
      foodBudget: plan.foodBudget?.toString() || "",
      totalBudget: plan.totalBudget?.toString() || "",
    });

  } catch (err: any) {
    console.error("Erro no fetchItinerary:", err);
    setError(err.message || "Erro ao carregar dados da viagem.");
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {

    if (itineraryId && token) {
      fetchItinerary();
    }
  }, [itineraryId, token]); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itineraryId || !token) {
        setError("Não é possível salvar: ID do itinerário ou token não encontrado.");
        return;
    }

    const payload: UpdateItineraryPayload = {
      title: formData.title,
      startDate: new Date(formData.startDate + 'T00:00:00.000Z').toISOString(),
      endDate: new Date(formData.endDate + 'T00:00:00.000Z').toISOString(),
    };

    if (formData.lodgingBudget && !isNaN(parseFloat(formData.lodgingBudget))) {
      payload.lodgingBudget = parseFloat(formData.lodgingBudget);
    }
    if (formData.foodBudget && !isNaN(parseFloat(formData.foodBudget))) {
      payload.foodBudget = parseFloat(formData.foodBudget);
    }
    if (formData.totalBudget && !isNaN(parseFloat(formData.totalBudget))) {
      payload.totalBudget = parseFloat(formData.totalBudget);
    }

    try {
      setIsLoading(true);
      setError(null); 
      const response = await fetch(`${config.apiBaseUrl}/itineraries/${itineraryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erro desconhecido" }));
        throw new Error(`Erro ao atualizar plano: ${response.status} - ${errorData.message || response.statusText}`);
      }

      alert("Plano de viagem atualizado com sucesso!");
      navigate("/plano-viagens"); 
    } catch (err: any) {
      console.error("Erro no handleSubmit:", err);
      setError(err.message || "Erro ao atualizar plano.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.title) { 
    return (
      <div className="plano-bg">
        <Navbar />
        <div className="plano-container">
          <p>Carregando plano de viagem...</p>
        </div>
      </div>
    );
  }

  
  if (error && !formData.title) { 
    return (
      <div className="plano-bg">
        <Navbar />
        <div className="plano-container">
          <p className="plano-error">Erro: {error}</p>
          <button onClick={() => navigate("/plano-viagens")}>Voltar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="plano-bg">
      <Navbar />
      <div className="plano-container">
        <form className="plano-form" onSubmit={handleSubmit}>
          <h1 className="plano-title">Editar Plano de Viagem</h1>
          <p className="plano-description">Atualize as informações da sua viagem.</p>
          
          <div className="plano-form-group">
            <label htmlFor="title" className="plano-label">Título da Viagem</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              className="plano-input" 
            />
          </div>

          <div className="plano-form-row">
            <div className="plano-form-group flex1">
              <label htmlFor="startDate" className="plano-label">Data de Início</label>
              <input 
                type="date" 
                id="startDate" 
                name="startDate" 
                value={formData.startDate} 
                onChange={handleChange} 
                required 
                className="plano-input" 
              />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="endDate" className="plano-label">Data Final</label>
              <input 
                type="date" 
                id="endDate" 
                name="endDate" 
                value={formData.endDate} 
                onChange={handleChange} 
                required 
                className="plano-input" 
              />
            </div>
          </div>

          <h2 className="plano-subtitle">Orçamento (Opcional)</h2>
          <div className="plano-form-row">
            <div className="plano-form-group flex1">
              <label htmlFor="lodgingBudget" className="plano-label">Hospedagem (R$)</label>
              <input 
                type="number" 
                id="lodgingBudget" 
                name="lodgingBudget" 
                value={formData.lodgingBudget} 
                onChange={handleChange} 
                className="plano-input" 
              />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="foodBudget" className="plano-label">Alimentação (R$)</label>
              <input 
                type="number" 
                id="foodBudget" 
                name="foodBudget" 
                value={formData.foodBudget} 
                onChange={handleChange} 
                className="plano-input" 
              />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="totalBudget" className="plano-label">Total (R$)</label>
              <input 
                type="number" 
                id="totalBudget" 
                name="totalBudget" 
                value={formData.totalBudget} 
                onChange={handleChange} 
                className="plano-input" 
              />
            </div>
          </div>
          {error && <p className="plano-error">{error}</p>}
          <button 
            type="submit" 
            className={`plano-submit ${isLoading ? "loading" : ""}`} 
            disabled={isLoading}
          >
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarItinerario;