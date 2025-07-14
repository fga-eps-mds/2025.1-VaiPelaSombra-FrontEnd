import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import "./ResumoViagem.css";
import {
  fetchTransportes,
  criarTransporte,
  deletarTransporte,
  atualizarTransporte,
  Transporte,
} from "../api/transportApi";

function ResumoViagem() {
  const { itineraryId } = useParams<{ itineraryId: string }>();
  const [aba, setAba] = useState("checklist");
  const [transportes, setTransportes] = useState<Transporte[]>([]);
  const [novoTransporte, setNovoTransporte] = useState<Partial<Transporte>>({
    type: "",
    cost: 0,
    departure: "",
    arrival: "",
    duration: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [transporteEditado, setTransporteEditado] = useState<Partial<Transporte>>({});

  const carregarTransportes = useCallback(async () => {
    if (!itineraryId) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const dados = await fetchTransportes(token);
      const idNum = Number(itineraryId);
      setTransportes(dados.filter((t) => t.itineraryId === idNum));
    } catch (err) {
      setError("Erro ao carregar transportes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [itineraryId]);

  useEffect(() => {
    carregarTransportes();
  }, [carregarTransportes]);

  async function handleAddTransporte(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const idNum = Number(itineraryId);
    if (isNaN(idNum)) {
      setError("ID da viagem inválido");
      return;
    }

    if (!novoTransporte.type) {
      setError("O campo 'Tipo' é obrigatório.");
      return;
    }

    if (novoTransporte.cost === undefined || novoTransporte.cost < 0) {
      setError("O campo 'Valor' deve ser um número positivo.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const criado = await criarTransporte(token, {
        ...novoTransporte,
        itineraryId: idNum,
        cost: novoTransporte.cost!,
      } as Transporte);

      setTransportes((old) => [...old, criado]);
      setNovoTransporte({
        type: "",
        cost: 0,
        departure: "",
        arrival: "",
        duration: "",
        description: "",
      });
    } catch (err) {
      setError("Erro ao adicionar transporte");
      console.error(err);
    }
  }

  async function handleDeletar(id?: number) {
    if (!id) return;
    if (!window.confirm("Confirma exclusão do transporte?")) return;
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      await deletarTransporte(token, id);
      setTransportes((old) => old.filter((t) => t.id !== id));
    } catch (err) {
      setError("Erro ao deletar transporte");
      console.error(err);
    }
  }

  function iniciarEdicao(t: Transporte) {
    setEditandoId(t.id || null);
    setTransporteEditado({ ...t });
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setTransporteEditado({});
  }

  async function salvarEdicao() {
    if (!editandoId) return;
    setError(null);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("Token não encontrado");

      const atualizado = await atualizarTransporte(token, editandoId, transporteEditado as Transporte);
      setTransportes((old) => old.map((t) => (t.id === editandoId ? atualizado : t)));
      cancelarEdicao();
    } catch (err) {
      setError("Erro ao atualizar transporte");
      console.error(err);
    }
  }

  function formatarDataHora(dt?: string) {
    if (!dt) return "";
    const d = new Date(dt);
    return d.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  }

  return (
    <div className="resumo-bg">
      <Navbar />
      <div className="resumo-container">
        <h1 className="resumo-titulo">Resumo da Viagem</h1>
        <div className="resumo-abas">
          <button className={aba === "checklist" ? "ativa" : ""} onClick={() => setAba("checklist")}>Checklist</button>
          <button className={aba === "tempo" ? "ativa" : ""} onClick={() => setAba("tempo")}>Tempo estimado de cada etapa</button>
          <button className={aba === "resumo" ? "ativa" : ""} onClick={() => setAba("resumo")}>Resumo da Viagem</button>
          <button className={aba === "cronograma" ? "ativa" : ""} onClick={() => setAba("cronograma")}>Cronograma</button>
          <button className={aba === "transportes" ? "ativa" : ""} onClick={() => setAba("transportes")}>Transportes</button>
        </div>

        {aba === "transportes" && (
          <div className="resumo-transportes">
            <h2>Transportes</h2>
            {loading && <p>Carregando transportes...</p>}
            {error && <p className="erro">{error}</p>}

            <form className="transporte-form" onSubmit={handleAddTransporte}>
              <input
                placeholder="Tipo (ex: Avião, Ônibus)"
                value={novoTransporte.type || ""}
                onChange={(e) => setNovoTransporte({ ...novoTransporte, type: e.target.value })}
                required
              />
              <input
                placeholder="Valor"
                type="number"
                min={0}
                value={novoTransporte.cost !== undefined ? novoTransporte.cost : ""}
                onChange={(e) => setNovoTransporte({ ...novoTransporte, cost: Number(e.target.value) })}
                required
              />
              <input
                type="datetime-local"
                value={novoTransporte.departure || ""}
                onChange={(e) => setNovoTransporte({ ...novoTransporte, departure: e.target.value })}
              />
              <input
                type="datetime-local"
                value={novoTransporte.arrival || ""}
                onChange={(e) => setNovoTransporte({ ...novoTransporte, arrival: e.target.value })}
              />
              <input
                placeholder="Duração"
                value={novoTransporte.duration || ""}
                onChange={(e) => setNovoTransporte({ ...novoTransporte, duration: e.target.value })}
              />
              <input
                placeholder="Descrição"
                value={novoTransporte.description || ""}
                onChange={(e) => setNovoTransporte({ ...novoTransporte, description: e.target.value })}
              />
              <button type="submit">Adicionar</button>
            </form>

            <table className="resumo-tabela">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Valor</th>
                  <th>Saída</th>
                  <th>Chegada</th>
                  <th>Duração</th>
                  <th>Descrição</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {transportes.map((t) =>
                  editandoId === t.id ? (
                    <tr key={t.id}>
                      <td>
                        <input
                          value={transporteEditado.type || ""}
                          onChange={(e) => setTransporteEditado({ ...transporteEditado, type: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          value={transporteEditado.cost !== undefined ? transporteEditado.cost : ""}
                          onChange={(e) => setTransporteEditado({ ...transporteEditado, cost: Number(e.target.value) })}
                        />
                      </td>
                      <td>
                        <input
                          type="datetime-local"
                          value={transporteEditado.departure || ""}
                          onChange={(e) => setTransporteEditado({ ...transporteEditado, departure: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="datetime-local"
                          value={transporteEditado.arrival || ""}
                          onChange={(e) => setTransporteEditado({ ...transporteEditado, arrival: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          value={transporteEditado.duration || ""}
                          onChange={(e) => setTransporteEditado({ ...transporteEditado, duration: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          value={transporteEditado.description || ""}
                          onChange={(e) => setTransporteEditado({ ...transporteEditado, description: e.target.value })}
                        />
                      </td>
                      <td>
                        <button onClick={salvarEdicao}>Salvar</button>
                        <button onClick={cancelarEdicao}>Cancelar</button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={t.id}>
                      <td>{t.type}</td>
                      <td>{t.cost ?? "-"}</td>
                      <td>{formatarDataHora(t.departure)}</td>
                      <td>{formatarDataHora(t.arrival)}</td>
                      <td>{t.duration ?? "-"}</td>
                      <td>{t.description ?? "-"}</td>
                      <td>
                        <button onClick={() => iniciarEdicao(t)}>Editar</button>
                        <button onClick={() => handleDeletar(t.id)}>Excluir</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumoViagem;
