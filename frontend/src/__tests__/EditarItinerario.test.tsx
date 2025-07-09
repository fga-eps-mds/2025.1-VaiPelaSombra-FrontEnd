import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EditarItinerario from '../pages/EditarItinerario';

const mockNavigate = jest.fn();
global.fetch = jest.fn();
jest.mock('../components/NavBar', () => () => <div data-testid="navbar" />);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
  mockNavigate.mockClear();
  localStorage.setItem("authToken", "fake-token");
  localStorage.setItem("userId", "123");
});

const renderComponent = () => {
  render(
    <MemoryRouter initialEntries={['/editar/1']}>
      <Routes>
        <Route path="/editar/:itineraryId" element={<EditarItinerario />} />
      </Routes>
    </MemoryRouter>
  );
};

const mockInitialItinerary = {
  id: 1,
  title: "Viagem a Paris",
  startDate: "2025-12-10T00:00:00.000Z",
  endDate: "2025-12-20T00:00:00.000Z",
};

test('carrega os dados, permite a edição e submete com sucesso', async () => {
  (global.fetch as jest.Mock).mockImplementation((url, options) => {
    if (url.endsWith('/itineraries/123')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockInitialItinerary]),
      });
    }
    if (options?.method === 'PUT' && url.endsWith('/itineraries/1')) {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Atualizado' }),
      });
    }
    return Promise.reject(new Error(`Unhandled fetch call: ${url}`));
  });

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  renderComponent();
  
  expect(await screen.findByDisplayValue("Viagem a Paris")).toBeInTheDocument();
  expect(screen.getByDisplayValue("2025-12-10")).toBeInTheDocument();
  expect(screen.getByDisplayValue("2025-12-20")).toBeInTheDocument();
  
  const titleInput = screen.getByLabelText(/título da viagem/i);
  fireEvent.change(titleInput, { target: { value: 'Viagem incrível a Paris' } });
  
  const submitButton = screen.getByRole('button', { name: /salvar alterações/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/itineraries/1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          title: 'Viagem incrível a Paris',
          startDate: new Date('2025-12-10').toISOString(),
          endDate: new Date('2025-12-20').toISOString(),
        })
      })
    );
  });
  
  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith("Plano atualizado com sucesso!");
  });
  
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/plano-viagens");
  });

  alertSpy.mockRestore();
});