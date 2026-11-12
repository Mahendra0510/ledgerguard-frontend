import { useCallback, useEffect, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { ledgerService } from '../api/services';
import { demoTransactions } from '../api/mock';
import type { Transaction } from '../types';
const MOCK = import.meta.env.VITE_USE_MOCK_DATA !== 'false';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
export function useLedger() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setLoading(true); setError('');
    try { setTransactions(MOCK ? demoTransactions : await ledgerService.list()); }
    catch { setError('Unable to load ledger. Check your API connection and try again.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  useEffect(() => {
    if (MOCK) return;
    const socket: Socket = io(SOCKET_URL, { transports: ['websocket'], auth: { token: localStorage.getItem('ledgerguard_token') } });
    socket.on('ledger:transaction', (transaction: Transaction) => setTransactions((current) => [transaction, ...current.filter((item) => item.id !== transaction.id)]));
    return () => { socket.disconnect(); };
  }, []);
  return { transactions, loading, error, refresh };
}
