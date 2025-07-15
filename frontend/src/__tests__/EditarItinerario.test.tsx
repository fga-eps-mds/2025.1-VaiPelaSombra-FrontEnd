import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EditarItinerarioPage from '../pages/EditarItinerario';

jest.mock('../config/index.ts', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000',
  },
}));

const mockNavigate = jest.fn();
global.fetch = jest.fn();

jest.mock('../components/NavBar', () => () => <div data-testid="navbar" />);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useNavigate: () => mockNavigate, 
  useParams: () => ({
    itineraryId: '1', 
  }),
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
      <EditarItinerarioPage />
    </BrowserRouter>
  );
};

test('carrega os dados, permite a edição e submete com sucesso', async () => {

  (global.fetch as jest.Mock)
    .mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ 
        id: 1, 
        title: 'Viagem antiga',
        startDate: '2025-12-01T00:00:00.000Z',
        endDate: '2025-12-05T00:00:00.000Z',
        lodgingBudget: 500,
        foodBudget: 300,
        totalBudget: 800,
        itineraryStatus: 'PLANNING', 
      }),
    })


    .mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ message: 'Itinerário atualizado com sucesso!' }),
    });

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  renderPage(); 

  const titleInput = await screen.findByLabelText(/título da viagem/i);
  const startDateInput = await screen.findByLabelText(/data de início/i);
  const endDateInput = await screen.findByLabelText(/data final/i);
  const lodgingBudgetInput = await screen.findByLabelText(/hospedagem \(r\$\)/i);
  const foodBudgetInput = await screen.findByLabelText(/alimentação \(r\$\)/i);
  const totalBudgetInput = await screen.findByLabelText(/total \(r\$\)/i);


  
  await waitFor(() => {
    expect(titleInput).toHaveValue('Viagem antiga');
    expect(startDateInput).toHaveValue('2025-12-01');
    expect(endDateInput).toHaveValue('2025-12-05');
    expect(lodgingBudgetInput).toHaveValue(500);
    expect(foodBudgetInput).toHaveValue(300);
    expect(totalBudgetInput).toHaveValue(800);
  });

  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:3000/itineraries/1', 
    expect.objectContaining({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer fake-token',
      },
    })
  );

  
  fireEvent.change(titleInput, { target: { value: 'Viagem incrível a Paris' } });
  fireEvent.change(startDateInput, { target: { value: '2025-12-10' } });
  fireEvent.change(endDateInput, { target: { value: '2025-12-20' } });
  fireEvent.change(lodgingBudgetInput, { target: { value: '600' } }); 
  fireEvent.change(foodBudgetInput, { target: { value: '400' } });
  fireEvent.change(totalBudgetInput, { target: { value: '1000' } });


  const submitButton = screen.getByRole('button', { name: /salvar alterações/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/itineraries/1', 
      expect.objectContaining({
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer fake-token',
        },
        body: JSON.stringify({
          title: 'Viagem incrível a Paris',
          startDate: '2025-12-10T00:00:00.000Z',
          endDate: '2025-12-20T00:00:00.000Z',
          lodgingBudget: 600, 
          foodBudget: 400,
          totalBudget: 1000,
        }),
      })
    );
  });

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith("Plano de viagem atualizado com sucesso!");
  });

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith('/plano-viagens');
  });

  alertSpy.mockRestore();
});