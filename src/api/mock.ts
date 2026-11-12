import type { Transaction, UsageSummary } from '../types';
export const demoTransactions: Transaction[] = [
  { id:'1', reference:'LG-2026-00841', customer:'Acme Corporation', description:'Cloud infrastructure', amount:1240, currency:'USD', status:'success', createdAt:'2026-11-12T09:42:00Z' },
  { id:'2', reference:'LG-2026-00840', customer:'Northstar Labs', description:'API usage — October', amount:385.5, currency:'USD', status:'pending', createdAt:'2026-11-12T08:15:00Z' },
  { id:'3', reference:'LG-2026-00839', customer:'Brightline Systems', description:'Enterprise subscription', amount:2499, currency:'USD', status:'failed', createdAt:'2026-11-11T16:30:00Z' },
  { id:'4', reference:'LG-2026-00838', customer:'Vertex Studio', description:'Compute overage', amount:96.25, currency:'USD', status:'rolled_back', createdAt:'2026-11-11T14:05:00Z' },
  { id:'5', reference:'LG-2026-00837', customer:'Acme Corporation', description:'Storage usage', amount:420, currency:'USD', status:'success', createdAt:'2026-11-10T11:20:00Z' },
  { id:'6', reference:'LG-2026-00836', customer:'Orbit Analytics', description:'Monthly plan', amount:799, currency:'USD', status:'success', createdAt:'2026-11-09T10:00:00Z' }
];
export const demoUsage: UsageSummary = { totalSpend: 18450, monthlyLimit: 25000, apiCalls: 1284500, activeUsers: 248, usage: [
  {month:'Jun',spend:11200,limit:25000},{month:'Jul',spend:13800,limit:25000},{month:'Aug',spend:12100,limit:25000},{month:'Sep',spend:15900,limit:25000},{month:'Oct',spend:17100,limit:25000},{month:'Nov',spend:18450,limit:25000}
]};
