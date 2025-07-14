import React, { useEffect, useState, useCallback } from "react";
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

const EditarItinerario: React.FC = () => {
  const { itineraryId } = useParams(); 
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

  const fetchItinerary = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`${config.apiBaseUrl}/users/${userId}/itineraries`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const itineraries = await response.json();
      const plan = itineraries.find(
        (i: { id: number; title: string; startDate: string; endDate: string; lodgingBudget?: number; foodBudget?: number; totalBudget?: number }) =>
          i.id === parseInt(itineraryId || "", 10)
      );

      if (plan) {
        setFormData({
          title: plan.title,
          startDate: plan.startDate.split("T")[0],
          endDate: plan.endDate.split("T")[0],
          lodgingBudget: plan.lodgingBudget?.toString() || "",
          foodBudget: plan.foodBudget?.toString() || "",
          totalBudget: plan.totalBudget?.toString() || "",
        });
      }
    } catch {
      setError("Erro ao carregar dados da viagem.");
    }
  }, [itineraryId, token]);

  useEffect(() => {
    if (itineraryId && token) {
      fetchItinerary();
    }
  }, [fetchItinerary, itineraryId, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!itineraryId) return;

    const payload: UpdateItineraryPayload = {
      title: formData.title,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
    };
    if (formData.lodgingBudget) payload.lodgingBudget = parseFloat(formData.lodgingBudget);
    if (formData.foodBudget) payload.foodBudget = parseFloat(formData.foodBudget);
    if (formData.totalBudget) payload.totalBudget = parseFloat(formData.totalBudget);

    try {
      setIsLoading(true);
      const response = await fetch(`${config.apiBaseUrl}/itineraries/${itineraryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Erro ao atualizar plano.");
      alert("Plano atualizado com sucesso!");
      navigate("/plano-viagens");
    } catch {
      setError("Erro ao atualizar plano.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="plano-bg">
      <Navbar />
      <div className="plano-container">
        <form className="plano-form" onSubmit={handleSubmit}>
          <h1 className="plano-title">Editar Plano de Viagem</h1>
          <p className="plano-description">Atualize as informações da sua viagem.</p>
          <div className="plano-form-group">
            <label htmlFor="title" className="plano-label">Título da Viagem</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="plano-input" />
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
              <input type="number" id="lodgingBudget" name="lodgingBudget" value={formData.lodgingBudget} onChange={handleChange} className="plano-input" />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="foodBudget" className="plano-label">Alimentação (R$)</label>
              <input type="number" id="foodBudget" name="foodBudget" value={formData.foodBudget} onChange={handleChange} className="plano-input" />
            </div>
            <div className="plano-form-group flex1">
              <label htmlFor="totalBudget" className="plano-label">Total (R$)</label>
              <input type="number" id="totalBudget" name="totalBudget" value={formData.totalBudget} onChange={handleChange} className="plano-input" />
            </div>
          </div>
          {error && <p className="plano-error">{error}</p>}
          <button type="submit" className={`plano-submit ${isLoading ? "loading" : ""}`} disabled={isLoading}>
            {isLoading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarItinerario;
