import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { AuthProvider } from '../context/AuthContext';
import { ReactNode } from 'react';
import '@testing-library/jest-dom';
import { act } from 'react';

jest.mock('../config', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000',
  },
}));

global.fetch = jest.fn();

const wrapper = ({ children }: { children: ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

beforeEach(() => {
  localStorage.clear();
  (fetch as jest.Mock).mockClear();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

test('lança erro quando usado fora do AuthProvider', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  expect(() => {
    renderHook(() => useAuth());
  }).toThrow('useAuth must be used within AuthProvider');
  
  consoleSpy.mockRestore();
});

test('getToken retorna null quando não há token', async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.getToken()).toBeNull();
  });
});

test('getStoredToken funciona independente do contexto', async () => {
  localStorage.setItem('authToken', 'stored-token');
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

  await act(async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    await waitFor(() => {
      expect(result.current.getStoredToken()).toBe('stored-token');
    });
  });
});

test('getToken prioriza contexto quando disponível', async () => {
  localStorage.setItem('authToken', 'stored-token');
  
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      accessToken: 'refreshed-token',
      user: { id: 1, name: 'Test User', email: 'test@test.com' }
    }),
  });

  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.getToken()).toBe('refreshed-token');
  });
});

test('getToken usa localStorage quando contexto falha', async () => {
  localStorage.setItem('authToken', 'fallback-token');
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.getToken()).toBe('fallback-token');
  });
});

test('isAuthenticated é false quando não há usuário nem token', async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.isAuthenticated).toBe(false);
  });
});

test('isAuthenticated é true quando há usuário e token', async () => {
  localStorage.setItem('authToken', 'valid-token');
  
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      accessToken: 'refreshed-token',
      user: { id: 1, name: 'Test User', email: 'test@test.com' }
    }),
  });

  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.isAuthenticated).toBe(true);
  });
});

test('user é null quando não autenticado', async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('No refresh token'));

  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.user).toBeNull();
  });
});

test('user contém dados quando autenticado', async () => {
  localStorage.setItem('authToken', 'valid-token');
  const mockUser = { id: 1, name: 'Test User', email: 'test@test.com' };
  
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({
      accessToken: 'refreshed-token',
      user: mockUser
    }),
  });

  const { result } = renderHook(() => useAuth(), { wrapper });

  await waitFor(() => {
    expect(result.current.user).toEqual(mockUser);
  });
});
