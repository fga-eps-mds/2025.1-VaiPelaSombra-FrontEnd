
import { render, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { act } from 'react-dom/test-utils';

jest.mock('../config', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000/api',
  },
}));


const TestComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  return (
    <div>
      <p data-testid="auth">{isAuthenticated ? 'logado' : 'deslogado'}</p>
      <p data-testid="user-email">{user?.email || 'sem usuário'}</p>
      <button onClick={() => login('teste@teste.com', '123456')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('deve iniciar como não autenticado', async () => {

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    }) as jest.Mock;

    let utils: ReturnType<typeof render>;

    await act(async () => {
      utils = render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    const { getByTestId } = utils!;
    expect(getByTestId('auth').textContent).toBe('deslogado');
    expect(getByTestId('user-email').textContent).toBe('sem usuário');
  });

  it('deve realizar login com sucesso', async () => {

    (global.fetch as jest.Mock) = jest.fn()
      .mockResolvedValueOnce({ ok: false }) 
      .mockResolvedValueOnce({             
        ok: true,
        json: async () => ({
          accessToken: 'fake-token',
          user: {
            id: 1,
            name: 'Usuário Teste',
            email: 'teste@teste.com',
          },
        }),
      });

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => getByText('Login'));
    fireEvent.click(getByText('Login'));

    await waitFor(() => {
      expect(getByTestId('auth').textContent).toBe('logado');
      expect(getByTestId('user-email').textContent).toBe('teste@teste.com');
    });

    expect(localStorage.getItem('authToken')).toBe('fake-token');
    expect(localStorage.getItem('userId')).toBe('1');
  });

  it('deve deslogar com sucesso', async () => {

    localStorage.setItem('authToken', 'fake-token');
    localStorage.setItem('userId', '1');

    (global.fetch as jest.Mock) = jest.fn()
      .mockResolvedValueOnce({ ok: false })
      .mockResolvedValueOnce({ ok: true });

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => getByText('Logout'));
    fireEvent.click(getByText('Logout'));

    await waitFor(() => {
      expect(getByTestId('auth').textContent).toBe('deslogado');
      expect(getByTestId('user-email').textContent).toBe('sem usuário');
    });

    expect(localStorage.getItem('authToken')).toBe(null);
    expect(localStorage.getItem('userId')).toBe(null);
  });
});
