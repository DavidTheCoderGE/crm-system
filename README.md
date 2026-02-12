# ERP System (Webbasiert)

Produktionsnahes ERP-Monorepo mit Backend (Node.js/Express + TypeScript), Frontend (React + TypeScript), Datenbank (Prisma), Security-Baseline, Docker und CI/CD.

## 1) Projektstruktur

- `backend/` API, Authentifizierung, Module, Tests, Prisma-Schema
- `frontend/` SPA mit Dashboard, Login, Navigation, Datenvisualisierung
- `docs/` Architekturdiagramme
- `.github/workflows/ci.yml` CI-Pipeline
- `docker-compose.yml` Lokale Bereitstellung

## 2) Setup / Installation

```bash
npm run setup
cp backend/.env.example backend/.env
npm run dev
```

## 3) Backend Highlights

- REST API unter `/api/*`
- JWT-Auth (`/api/auth/login`) + RBAC (Admin, Manager, Employee, Guest)
- Module: Users, Products, Inventory, Purchases, Sales, Finance, Reporting
- Security: `helmet`, `cors`, `rateLimit`, Zod-Validierung
- Logging: `morgan`
- OpenAPI: `/openapi.json`

## 4) Frontend Highlights

- React SPA mit TypeScript + Router
- Login/Logout-Mechanik über JWT im LocalStorage
- Dashboard mit KPI-Balkendiagramm (Recharts)
- Tabellenansicht für Produkte
- Responsive Layout

## 5) Datenbank

Definiert in `backend/prisma/schema.prisma`:
- Nutzer, Rollen
- Produkte, Lager, Bestände
- Einkaufsbestellungen
- Verkaufsbestellungen
- Rechnungen, Zahlungen

Migration:
```bash
cd backend
npx prisma migrate dev --name init
```

## 6) Deployment

### Docker Compose
```bash
docker compose up --build
```

### Cloud-Idee
- Backend auf Render/Heroku/Fly.io
- Frontend auf Vercel/Netlify
- Datenbank als managed PostgreSQL

## 7) Tests und Coverage

```bash
npm run test
npm --workspace backend run test -- --coverage
```

## 8) API-Dokumentation

OpenAPI JSON: `GET /openapi.json`
