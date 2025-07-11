import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {config} from '@/config';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;

  const login = async (email: string, password: string) => {
    const res = await fetch(`${config.apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await res.json();
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    await fetch(`${config.apiBaseUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setAccessToken(null);
    setUser(null);
  };

  const refresh = async () => {
    const res = await fetch(`${config.apiBaseUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('Refresh failed');
    const data = await res.json();
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await refresh();
      } catch {
        console.log('No valid refresh token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, refresh, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};