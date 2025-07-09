// __tests__/TravelPlanCard.test.tsx
import { render, screen } from "@testing-library/react";
import TravelPlanCard from "../components/TravelPlanCard";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';

describe("TravelPlanCard", () => {
  it("deve exibir título, data e participantes", () => {
    const props = {
      title: "Viagem para o Rio",
      users: [{ id: 1, name: "João" }, { id: 2, name: "Maria" }],
      date: "01/01/2025",
      daysLeft: 10,
      faded: false,
      itineraryId: 5,
    };

    render(
      <BrowserRouter>
        <TravelPlanCard {...props} />
      </BrowserRouter>
    );

   expect(screen.getByText(/Viagem para o Rio/i)).toBeInTheDocument();
    expect(screen.getByText(/Faltam 10 dias/i)).toBeInTheDocument();
    expect(screen.getByText(/João/i)).toBeInTheDocument();
    expect(screen.getByText(/Maria/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Editar plano/i })).toBeInTheDocument();
  });
});
