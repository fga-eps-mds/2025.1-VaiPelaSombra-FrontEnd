import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  
  const getToken = (): string | null => {
    // Usar apenas o contexto como fonte única da verdade
    return context.accessToken;
  };
  
  const getStoredToken = (): string | null => {
    // Método separado para acessar localStorage quando necessário
    return localStorage.getItem("authToken");
  };
  
  return {
    ...context,
    getToken,
    getStoredToken,
  };
};