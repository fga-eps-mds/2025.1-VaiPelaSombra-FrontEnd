import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import { act } from 'react';
import '@testing-library/jest-dom';

jest.mock('../config', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000',
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

global.fetch = jest.fn();

beforeEach(() => {
  localStorage.clear();
  (fetch as jest.Mock).mockClear();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
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
    
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Refresh failed'));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
      expect(screen.getByTestId('token')).toHaveTextContent('test-token');
      expect(screen.getByTestId('user-info')).toHaveTextContent('no-user');
    });
  });

  test('getToken retorna token do localStorage quando refresh falha', async () => {
    localStorage.setItem('authToken', 'stored-token');
    
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Refresh failed'));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId('token')).toHaveTextContent('stored-token');
    });
  });

  test('deve realizar login com sucesso', async () => {
    (fetch as jest.Mock)
      .mockRejectedValueOnce(new Error('No refresh token'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          accessToken: 'refreshed-token',
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@test.com',
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

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
      expect(screen.getByTestId('user-email')).toHaveTextContent('test@test.com');
    });

    expect(localStorage.getItem('authToken')).toBe('refreshed-token');
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

  test('mantem estado autenticado independente de erro de requisição', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
    });
  });
});
