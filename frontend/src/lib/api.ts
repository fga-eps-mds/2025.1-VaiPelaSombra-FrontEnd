/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from '../config';

class ApiClient {
  private baseURL = config.apiBaseUrl;
  
  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }
  
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = this.getAuthToken();
    const url = `${this.baseURL}${endpoint}`;
    
    const requestConfig: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };
    
    const response = await fetch(url, requestConfig);
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        window.location.href = '/login';
        throw new Error('Token expirado');
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
  }
  
  async get(endpoint: string) {
    return this.request(endpoint);
  }
  
  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();