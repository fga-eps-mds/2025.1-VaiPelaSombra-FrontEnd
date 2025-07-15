import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

// Mock do config
jest.mock('../config', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000',
  },
}));

// Componente de teste para usar o hook
const TestComponent = () => {
  const { isAuthenticated, user, getToken } = useAuth();
  
  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'authenticated' : 'not-authenticated'}
      </div>
      <div data-testid="user-info">
        {user ? user.name : 'no-user'}
      </div>
      <div data-testid="token">
        {getToken() || 'no-token'}
      </div>
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

test('renderiza estado inicial não autenticado', async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authenticated');
  });

  expect(screen.getByTestId('user-info')).toHaveTextContent('no-user');
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

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authenticated');
  });

  expect(screen.getByTestId('user-info')).toHaveTextContent('Test User');
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

  render(
    <AuthProvider>
      <TestComponent />
    </AuthProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('token')).toHaveTextContent('context-token');
  });
});