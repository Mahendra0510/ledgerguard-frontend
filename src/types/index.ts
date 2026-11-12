export type TransactionStatus = 'success' | 'failed' | 'pending' | 'rolled_back';
export interface Transaction {
  id: string; reference: string; customer: string; description: string;
  amount: number; currency: string; status: TransactionStatus; createdAt: string;
}
export interface UsagePoint { month: string; spend: number; limit: number }
export interface UsageSummary { totalSpend: number; monthlyLimit: number; apiCalls: number; activeUsers: number; usage: UsagePoint[] }
export interface AuthUser { id: string; name: string; email: string; organization: string; tenantId: string }
export interface ApiError { message: string }
