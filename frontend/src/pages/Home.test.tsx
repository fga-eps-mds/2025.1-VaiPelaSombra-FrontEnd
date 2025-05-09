import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Home from "../pages/Home"; // Ajuste o caminho conforme sua estrutura de pastas
import { AppContextProvider } from "../context/AppContext"; // Certifique-se de que este é o caminho correto para o seu contexto

describe("Home Component", () => {
  test("renders correctly", () => {
    // Renderiza o componente dentro do contexto AppContext
    render(
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    );

    // Verifica se o título e o texto estão sendo renderizados corretamente
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
    expect(screen.getByText(/Bem-vindo à página inicial!/i)).toBeInTheDocument();
    expect(screen.getByText(/Tema atual:/i)).toBeInTheDocument();
  });

  test("toggles theme when button is clicked", () => {
    // Renderiza o componente dentro do contexto AppContext
    render(
      <AppContextProvider>
        <Home />
      </AppContextProvider>
    );

    // Encontra o botão de alternância de tema
    const button = screen.getByText(/Alternar tema/i);
    
    // Simula o clique no botão
    fireEvent.click(button);

    // Verifica se o tema foi alterado. Neste caso, você precisará confirmar que a mudança do tema é refletida corretamente.
    // O texto do tema muda para "dark" após o clique.
    expect(screen.getByText(/Tema atual: dark/i)).toBeInTheDocument();

    // Simula o clique novamente para alternar de volta para "light"
    fireEvent.click(button);
    
    // Verifica se o tema voltou para "light"
    expect(screen.getByText(/Tema atual: light/i)).toBeInTheDocument();
  });
});
