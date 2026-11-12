import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const api = axios.create({ baseURL: API_URL, timeout: 15000, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ledgerguard_token');
  const tenantId = localStorage.getItem('ledgerguard_tenant');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // Tenant identity is sent as context; the backend must verify it against the signed JWT.
  if (tenantId) config.headers['X-Tenant-ID'] = tenantId;
  return config;
});

api.interceptors.response.use((response) => response, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    localStorage.removeItem('ledgerguard_token');
    localStorage.removeItem('ledgerguard_user');
    window.dispatchEvent(new Event('ledgerguard:unauthorized'));
  }
  return Promise.reject(error);
});
