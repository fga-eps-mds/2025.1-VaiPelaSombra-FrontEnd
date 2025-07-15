/**
 * Application configuration
 */

const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
} as const;

export default config;
