import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { act } from 'react-dom/test-utils';

jest.mock('../config', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000/api',
  },
}));


const TestComponent = () => {
  const { isAuthenticated, user, getToken, login, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="user-info">
        {user ? user.name : 'no-user'}
      </div>
      <div data-testid="user-email">
        {user ? user.email : 'no-email'}
      </div>
      <div data-testid="token">
        {getToken() || 'no-token'}
      </div>
      <button onClick={() => login('teste@teste.com', '123456')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// Mock do fetch
global.fetch = jest.fn();

beforeEach(() => {
  localStorage.clear();
  (fetch as jest.Mock).mockClear();
});

afterEach(() => {
  localStorage.clear();
});

describe('AuthContext', () => {
  test('renderiza estado inicial não autenticado', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    });

    expect(screen.getByTestId('user-info')).toHaveTextContent('no-user');
    expect(screen.getByTestId('token')).toHaveTextContent('no-token');
  });

  test('inicializa com token do localStorage', async () => {
    localStorage.setItem('authToken', 'test-token');
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken: 'refreshed-token',
        user: { id: 1, name: 'Test User', email: 'test@test.com' }
      }),
    });

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    });

    expect(screen.getByTestId('user-info')).toHaveTextContent('Test User');
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@test.com');
  });

  test('getToken retorna token do contexto', async () => {
    localStorage.setItem('authToken', 'stored-token');
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        accessToken: 'context-token',
        user: { id: 1, name: 'Test User', email: 'test@test.com' }
      }),
    });

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('token')).toHaveTextContent('context-token');
    });
  });

  test('deve realizar login com sucesso', async () => {
    (fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('No refresh token'))
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

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    // Aguardar carregamento inicial
    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    // Realizar login
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
      expect(screen.getByTestId('user-email')).toHaveTextContent('teste@teste.com');
    });

    expect(localStorage.getItem('authToken')).toBe('fake-token');
    expect(localStorage.getItem('userId')).toBe('1');
  });

  test('deve deslogar com sucesso', async () => {
    localStorage.setItem('authToken', 'fake-token');
    localStorage.setItem('userId', '1');

    (fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          accessToken: 'fake-token',
          user: { id: 1, name: 'Test User', email: 'test@test.com' }
        }),
      })
      .mockResolvedValueOnce({ ok: true });

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    // Aguardar autenticação inicial
    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Logout'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
      expect(screen.getByTestId('user-email')).toHaveTextContent('no-email');
    });

    expect(localStorage.getItem('authToken')).toBe(null);
    expect(localStorage.getItem('userId')).toBe(null);
  });

  test('lida com erro de login', async () => {
    (fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('No refresh token'))
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: 'Invalid credentials' }),
      });

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    });
  });
});
