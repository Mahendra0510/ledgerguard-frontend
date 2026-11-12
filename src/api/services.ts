import { api } from './client';
import type { AuthUser, Transaction, UsageSummary } from '../types';

export interface LoginResponse { token: string; user: AuthUser }
export const authService = {
  login: async (email: string, password: string) => (await api.post<LoginResponse>('/auth/login', { email, password })).data,
  me: async () => (await api.get<AuthUser>('/auth/me')).data,
};
export const ledgerService = {
  list: async () => (await api.get<Transaction[]>('/ledger')).data,
};
export const analyticsService = {
  summary: async () => (await api.get<UsageSummary>('/analytics/usage')).data,
};
