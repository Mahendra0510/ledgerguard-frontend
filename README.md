# LedgerGuard Frontend

React + TypeScript frontend for Project 3 in the supplied project brief: **LedgerGuard – Dynamic Multi-Tenant Zero-Knowledge Billing Engine**.

## Features
- Enterprise sign-in screen and protected routes
- Organization workspace shell and tenant context headers
- Overview dashboard with spend, API usage, active users, transaction health and recent activity
- Searchable/filterable billing ledger with CSV export
- Usage analytics with Chart.js and historical spend reporting
- Socket.io listener for real-time `ledger:transaction` events
- Loading, empty and API error states
- Strict TypeScript configuration; no `any` types

## Run locally
1. Install Node.js 20 or newer.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env`.
4. Run `npm run dev` and open `http://localhost:5173`.
5. Run `npm run build` to check TypeScript and create the production build.

The default `.env.example` uses demo data so the UI can be reviewed before the backend is ready. Demo login fields are prefilled; use any valid email and a password with at least four characters.

## Connect your backend
Set these values in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_USE_MOCK_DATA=false
```

The frontend expects these API contracts (adjust `src/api/services.ts` if your team chooses different routes):

| Method | Endpoint | Expected response |
|---|---|---|
| POST | `/auth/login` | `{ "token": "...", "user": { "id", "name", "email", "organization", "tenantId" } }` |
| GET | `/auth/me` | authenticated user object |
| GET | `/ledger` | array of `Transaction` objects |
| GET | `/analytics/usage` | `UsageSummary` object |

For live updates the Socket.io server should emit `ledger:transaction` with a `Transaction` JSON payload. The client sends the JWT in Socket.io `auth.token`.

### Transaction JSON
```json
{
  "id": "txn_123",
  "reference": "LG-2026-00841",
  "customer": "Acme Corporation",
  "description": "Cloud infrastructure",
  "amount": 1240,
  "currency": "USD",
  "status": "success",
  "createdAt": "2026-11-12T09:42:00.000Z"
}
```
Allowed status values: `success`, `failed`, `pending`, `rolled_back`.

### Usage summary JSON
```json
{
  "totalSpend": 18450,
  "monthlyLimit": 25000,
  "apiCalls": 1284500,
  "activeUsers": 248,
  "usage": [
    { "month": "Nov", "spend": 18450, "limit": 25000 }
  ]
}
```

## Important security integration notes
- This is a frontend implementation, not a substitute for backend tenant isolation, RSA signature verification, Redis distributed locks, idempotency, or MongoDB ACID transactions.
- The backend must derive the tenant identity from a verified signed JWT. Never trust `X-Tenant-ID` alone; the header in this client is only a routing/context hint.
- For production, prefer secure, HttpOnly, SameSite cookies for access/refresh credentials rather than persisting bearer tokens in localStorage. The localStorage implementation here keeps the student demo easy to connect; review it with your backend/security team before deployment.
- Do not display secrets or private keys in the browser. RSA-256 private-key operations belong on the server.
- Demo analytics are static sample values. Replace the mock data with API responses before presenting live multi-tenant metrics.

## Suggested frontend file structure
```text
src/
  api/          client.ts, services.ts, mock.ts
  components/   Layout.tsx, StatCard.tsx, StatusBadge.tsx
  context/      AuthContext.tsx
  hooks/        useLedger.ts
  pages/        Login.tsx, Overview.tsx, Ledger.tsx, Analytics.tsx
  types/        index.ts
  utils/        format.ts
  App.tsx
  main.tsx
  styles.css
```

## Four-person team split
1. **Member 1 – Authentication & security UI:** Login page, AuthContext, protected routes, coordinate JWT contract with backend.
2. **Member 2 – Billing ledger:** Ledger page, transaction table, filters, search, CSV export, status handling.
3. **Member 3 – Analytics:** Overview cards, Chart.js visualizations, historical usage and reporting.
4. **Member 4 – Integration & quality:** API client, Socket.io updates, responsive styling, backend integration, testing and README/demo preparation.

All members should agree on API response types in `src/types/index.ts` before parallel work.


## Password field updates

The login page starts with an empty password field. Use the Show/Hide control to reveal or conceal the password. A live strength guide checks for at least 12 characters, uppercase and lowercase letters, a number, and a special character. This guide is informational on the login screen; real account password creation and enforcement must be performed by the backend during registration or password reset. In demo mode, sign-in accepts any valid email and a password of at least 4 characters.
