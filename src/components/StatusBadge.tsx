import type { TransactionStatus } from '../types';
const labels: Record<TransactionStatus, string> = { success:'Successful', failed:'Failed', pending:'Pending', rolled_back:'Rolled back' };
export function StatusBadge({ status }: { status: TransactionStatus }) { return <span className={`status status-${status}`}>{labels[status]}</span>; }
