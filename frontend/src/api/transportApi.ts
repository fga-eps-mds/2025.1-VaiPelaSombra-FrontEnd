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

const transportesMock: Transporte[] = [
  {
    id: 1,
    type: "Avião",
    cost: 1200,
    departure: "2025-08-01T08:00",
    arrival: "2025-08-01T10:00",
    duration: "2h",
    description: "Voo direto",
    itineraryId: 1,
  },
  {
    id: 2,
    type: "Ônibus",
    cost: 200,
    departure: "2025-08-05T08:00",
    arrival: "2025-08-05T14:00",
    duration: "6h",
    description: "Viagem de ônibus",
    itineraryId: 1,
  },
];

let nextId = 3;

export async function fetchTransportes(): Promise<Transporte[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...transportesMock]), 500);
  });
}

export async function criarTransporte(data: Transporte): Promise<Transporte> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const novo = { ...data, id: nextId++ };
      transportesMock.push(novo);
      resolve(novo);
    }, 500);
  });
}

export async function atualizarTransporte(id: number, data: Transporte): Promise<Transporte> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = transportesMock.findIndex((t) => t.id === id);
      if (index === -1) return reject(new Error("Transporte não encontrado"));
      const atualizado = { ...transportesMock[index], ...data };
      transportesMock[index] = atualizado;
      resolve(atualizado);
    }, 500);
  });
}

export async function deletarTransporte(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = transportesMock.findIndex((t) => t.id === id);
      if (index === -1) return reject(new Error("Transporte não encontrado"));
      transportesMock.splice(index, 1);
      resolve();
    }, 500);
  });
}
