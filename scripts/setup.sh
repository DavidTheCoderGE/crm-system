#!/usr/bin/env bash
set -euo pipefail

# Schritt 1: Root-Dependencies installieren.
npm install

# Schritt 2: Workspace-Abhängigkeiten installieren.
npm --workspace backend install
npm --workspace frontend install

# Schritt 3: Datenbank-Migrationen lokal ausführen.
cd backend
npx prisma migrate dev --name init || true
cd -

echo "Setup abgeschlossen. Starte mit: npm run dev"
