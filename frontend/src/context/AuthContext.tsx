import React, { createContext, useState, useEffect } from 'react';
import { config } from '../config';


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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!accessToken;

  const login = async (email: string, password: string) => {
    const res = await fetch(`${config.apiBaseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await res.json();
    setAccessToken(data.accessToken);
    setUser(data.user);
    
    localStorage.setItem("authToken", data.accessToken);
    if (data.user?.id) {
      localStorage.setItem("userId", data.user.id.toString());
    }
  };

  const logout = async () => {
    try {
      await fetch(`${config.apiBaseUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setUser(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    }
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

    localStorage.setItem("authToken", data.accessToken);
    if (data.user?.id) {
      localStorage.setItem("userId", data.user.id.toString());
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem("authToken");
        if (storedToken) {
          setAccessToken(storedToken);
          await refresh();
        }
      } catch {
        console.log('No valid refresh token');
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
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
    <AuthContext.Provider value={{ 
      user, 
      accessToken, 
      login, 
      logout, 
      refresh, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };