
import { render, screen } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../context/AuthContext';


jest.mock('../config', () => ({
  config: {
    apiBaseUrl: 'http://localhost:3000/api'
  }
}));


beforeEach(() => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === 'authToken') return 'storedToken123';
    return null;
  });
});

describe('useAuth hook', () => {
  it('deve acessar o contexto e retornar valores corretamente', () => {
    const mockContext = {
      user: { id: 1, name: 'Test User', email: 'test@test.com' },
      accessToken: '123abc',
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
      refresh: jest.fn(),
    };

    const TestComponent = () => {
      const auth = useAuth();
      return (
        <>
          <p data-testid="token">{auth.getToken()}</p>
          <p data-testid="stored-token">{auth.getStoredToken()}</p>
        </>
      );
    };

    render(
      <AuthContext.Provider value={mockContext}>
        <TestComponent />
      </AuthContext.Provider>
    );

    expect(screen.getByTestId('token').textContent).toBe('123abc');
    expect(screen.getByTestId('stored-token').textContent).toBe('storedToken123');
  });

  it('deve lançar erro se usado fora de AuthProvider', () => {
    const TestComponent = () => {
      useAuth();
      return <p>Teste</p>;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useAuth must be used within AuthProvider'
    );
  });
});
