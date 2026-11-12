export const money = (amount: number, currency = 'USD'): string => new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
export const shortDate = (date: string): string => new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date));
export const initials = (name: string): string => name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
