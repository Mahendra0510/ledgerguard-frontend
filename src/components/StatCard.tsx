import type { ReactNode } from 'react';
export function StatCard({ label, value, note, icon }: { label: string; value: string; note: string; icon: ReactNode }) { return <article className="stat-card"><div className="stat-top"><span>{label}</span><span className="stat-icon">{icon}</span></div><strong>{value}</strong><small>{note}</small></article>; }
