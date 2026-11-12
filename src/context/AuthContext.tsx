import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authService } from '../api/services';
import type { AuthUser } from '../types';

interface AuthContextValue { user: AuthUser | null; loading: boolean; login: (email: string, password: string) => Promise<void>; logout: () => void }
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const demoUser: AuthUser = { id:'demo-user', name:'Alex Morgan', email:'alex@acme.example', organization:'Acme Corporation', tenantId:'acme-demo' };
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('ledgerguard_user');
    if (saved) { try { return JSON.parse(saved) as AuthUser; } catch { localStorage.removeItem('ledgerguard_user'); } }
    return MOCK && localStorage.getItem('ledgerguard_demo') === 'true' ? demoUser : null;
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const handler = () => setUser(null);
    window.addEventListener('ledgerguard:unauthorized', handler);
    return () => window.removeEventListener('ledgerguard:unauthorized', handler);
  }, []);
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (MOCK) {
        if (!email.includes('@') || password.length < 4) throw new Error('Enter a valid email and a password of at least 4 characters.');
        localStorage.setItem('ledgerguard_demo', 'true'); localStorage.setItem('ledgerguard_tenant', demoUser.tenantId); setUser(demoUser); return;
      }
      const result = await authService.login(email, password);
      localStorage.setItem('ledgerguard_token', result.token); localStorage.setItem('ledgerguard_user', JSON.stringify(result.user)); localStorage.setItem('ledgerguard_tenant', result.user.tenantId); setUser(result.user);
    } finally { setLoading(false); }
  };
  const logout = () => { ['ledgerguard_token','ledgerguard_user','ledgerguard_tenant','ledgerguard_demo'].forEach((key) => localStorage.removeItem(key)); setUser(null); };
  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth(): AuthContextValue { const value = useContext(AuthContext); if (!value) throw new Error('useAuth must be used inside AuthProvider'); return value; }
