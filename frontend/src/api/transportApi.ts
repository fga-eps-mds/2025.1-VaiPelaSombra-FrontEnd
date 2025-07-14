export type Transporte = {
  id?: number;
  type: string;
  cost: number;
  departure?: string;
  arrival?: string;
  duration?: string;
  description?: string;
  itineraryId: number;
};

const API_BASE_URL = "http://localhost:3000/api";

// GET /transport
export async function fetchTransportes(token: string): Promise<Transporte[]> {
  const res = await fetch(`${API_BASE_URL}/transport`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao buscar transportes");
  return res.json();
}

// POST /transport
export async function criarTransporte(token: string, novo: Transporte): Promise<Transporte> {
  const res = await fetch(`${API_BASE_URL}/transport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(novo),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Erro ao criar transporte");
  }

  return res.json();
}

// DELETE /transport/:id
export async function deletarTransporte(token: string, id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/transport/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Erro ao deletar transporte");
}

// PUT /transport/:id
export async function atualizarTransporte(token: string, id: number, data: Transporte): Promise<Transporte> {
  const res = await fetch(`${API_BASE_URL}/transport/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const erro = await res.json();
    throw new Error(erro.message || "Erro ao atualizar transporte");
  }

  return res.json();
}
