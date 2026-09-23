# Nexus Data Agent

Nexus Data Agent est une API RESTful conçue pour interfacer un agent conversationnel (LLM) avec une base de données d'entreprise via l'utilisation du Tool Calling (Function Calling). 

Ce micro-service démontre une architecture robuste et fragmentée, intégrant la validation stricte des données, la gestion sécurisée des secrets et un pipeline CI/CD moderne.

## 🛠️ Stack Technique

- **Backend** : Node.js 20, Fastify, TypeScript
- **Validation & Typage** : Zod
- **Intelligence Artificielle** : API OpenAI (Tool Calling)
- **Infrastructure & DevOps** : Docker (Multi-stage build), Docker Compose, GitHub Actions (CI)
- **Sécurité** : @dotenvx/dotenvx (Chiffrement des variables d'environnement dans Git)
- **Qualité de code** : ESLint, Prettier, Conventionnal Commits

## 📂 Architecture

Le projet respecte une séparation stricte des responsabilités (Separation of Concerns) :

```text
src/
├── config/       # Validation des variables d'environnement (Zod)
├── controllers/  # Logique des routes HTTP
├── routes/       # Définition des endpoints Fastify
├── services/     # Logique métier (LLM, Base de données)
├── tools/        # Fonctions isolées exposées au LLM (Tool Calling)
└── types/        # Interfaces TypeScript globales

```

## 🚀 Installation & Démarrage

### Prérequis

* Node.js (v20+)
* Docker & Docker Compose
* Une clé API OpenAI valide

### 1. Cloner et installer

```bash
git clone [https://github.com/blizzfir3/nexus-data-agent.git](https://github.com/blizzfir3/nexus-data-agent.git)
cd nexus-data-agent
npm install

```

### 2. Configuration des secrets

Le projet utilise `dotenvx` pour gérer les secrets. Initialisez vos variables (elles seront chiffrées automatiquement) :

```bash
npx dotenvx set PORT 3000
npx dotenvx set HOST 0.0.0.0
npx dotenvx set NODE_ENV development
npx dotenvx set OPENAI_API_KEY sk-votre-cle-api

```

### 3. Lancer l'application

**En mode développement (avec rechargement à chaud) :**

```bash
npm run dev

```

**En production (via Docker) :**

```bash
docker compose up -d

```

## 📡 Utilisation (API)

**Endpoint :** `POST /api/chat`

**Requête :**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Quel est le client qui a généré le plus de chiffre d'affaires ?"}'

```

**Réponse attendue :**

```json
{
  "response": "Le client ayant généré le plus de chiffre d'affaires est l'entreprise XYZ avec un total de 45 000€ sur l'année en cours."
}

```

## 📜 Qualité et CI/CD

Le projet intègre un pipeline GitHub Actions qui valide automatiquement :

* La compilation TypeScript (`tsc --noEmit`)
* Les règles de linting (`eslint`)
* Le formatage du code (`prettier`)

```

***

**Rappel Git :** C'est le bon moment pour faire un commit atomique afin de valider l'ajout du README.

```powershell
git add README.md
git commit -m "docs: add comprehensive project README for portfolio"
git push

```