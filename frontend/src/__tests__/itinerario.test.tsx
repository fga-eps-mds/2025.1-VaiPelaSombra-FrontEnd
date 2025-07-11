import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateItineraryPage from '../pages/itinerario';

const mockNavigate = jest.fn();
global.fetch = jest.fn();
jest.mock('../components/NavBar', () => () => <div data-testid="navbar" />);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  (global.fetch as jest.Mock).mockReset();
  mockNavigate.mockReset();
  localStorage.setItem("authToken", "fake-token");
  localStorage.setItem("userId", "123");
});

const renderPage = () => {
  render(
    <BrowserRouter>
      <CreateItineraryPage />
    </BrowserRouter>
  );
};

test.skip('submete o formulário com sucesso e redireciona', async () => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ id: 'novo-id', title: 'Viagem dos Sonhos' }),
  });

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  renderPage();

  const titleInput = screen.getByLabelText(/título da viagem/i);
  const startDateInput = screen.getByLabelText(/data de início/i);
  const endDateInput = screen.getByLabelText(/data final/i);
  const submitButton = screen.getByRole('button', { name: /criar plano de viagem/i });

  fireEvent.change(titleInput, { target: { value: 'Viagem dos Sonhos' } });
  fireEvent.change(startDateInput, { target: { value: '2025-10-10' } });
  fireEvent.change(endDateInput, { target: { value: '2025-10-20' } });

  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/itineraries/123',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake-token',
        },
        body: JSON.stringify({
          title: 'Viagem dos Sonhos',
          startDate: new Date('2025-10-10').toISOString(),
          endDate: new Date('2025-10-20').toISOString(),
          itineraryStatus: 'PLANNING',
        }),
      })
    );
  });
  
  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith("Plano de viagem criado com sucesso!");
  });
  
  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/plano-viagens');
  });

  alertSpy.mockRestore();
});