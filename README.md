# 🧠 Nexus Data Agent

> **An Enterprise-Ready AI Agent demonstrating LLM Tool Calling, Strict Data Validation, and Secure DevOps Practices.**

Nexus Data Agent is a modern Node.js backend application that acts as an intelligent bridge between natural language queries and a business database. Built with Fastify and TypeScript, it leverages the **Groq API** (OpenAI SDK compatible) to perform autonomous **Tool Calling**, allowing the AI to route queries to internal database services securely.

## 🚀 Key Features & Architecture

* **Agentic Tool Calling:** The LLM does not hallucinate data. It is restricted to using predefined JSON-schema tools to query local business services.
* **Modern Node.js (ESM):** Built strictly with ECMAScript Modules (`"type": "module"`) using `NodeNext` resolution.
* **Strict Validation & "Fail Fast":** 
  * API payloads are validated at runtime using **Zod**.
  * Environment variables are parsed at startup. The app will refuse to boot if required secrets are missing.
* **Secure Secrets Management:** Powered by `@dotenvx/dotenvx`. The `.env` file is safely encrypted and versioned in Git, ensuring seamless team collaboration and CI/CD integration without exposing plaintext keys.
* **DevOps Ready:** Fully containerized using a multi-stage `Dockerfile` and `docker-compose.yml`. CI/CD pipelines are configured via GitHub Actions for automated linting and building.

## 🛠️ Tech Stack

* **Backend:** Node.js 20, Fastify, TypeScript
* **AI & LLM:** Groq API (`openai/gpt-oss-20b`), OpenAI Node SDK
* **Validation:** Zod
* **DevOps & Tooling:** Docker, Docker Compose, GitHub Actions, ESLint (Flat Config), Prettier, Dotenvx

---

## 💻 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v20+)
* [Docker](https://www.docker.com/) & Docker Compose
* A [Groq API Key](https://console.groq.com/) (Free)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/nexus-data-agent.git
cd nexus-data-agent
```

### 2. Configure Secrets (Dotenvx)
Since the `.env` file is encrypted, you need to inject your Groq API key securely.
Run the following command (replace `gsk_YOUR_API_KEY` with your actual key):

```bash
npx @dotenvx/dotenvx set GROQ_API_KEY gsk_YOUR_API_KEY
```
*This command will update your local `.env.keys` (ignored by Git) and securely encrypt the variable in the `.env` file.*

---

## 🐳 Run with Docker (Recommended)

The easiest way to run the application is via Docker Compose. It will automatically load the encrypted environment variables.

```bash
docker compose up --build -d
```

View the logs to ensure the server started successfully:
```bash
docker compose logs -f
```

---

## 👨‍💻 Run Locally (Development)

Install dependencies:
```bash
npm install
```

Start the development server with live reload:
```bash
npm run dev
```

---

## 🎯 Usage / API Testing

Once the server is running (either locally or via Docker on port `3000`), you can test the Agent's ability to query the internal mock database using natural language.

**Send a POST request to the Chat endpoint:**

```bash
curl -X POST http://localhost:3000/api/chat \
-H "Content-Type: application/json" \
-d '{"message": "Trouve les informations sur le client nommé Umbrella Corp."}'
```

**Expected AI Response:**
```json
{
  "response": "Voici les informations disponibles pour le client **Umbrella Corp** :\n\n- **ID** : 4 \n- **Nom** : Umbrella Corp \n- **Adresse e-mail** : admin@umbrella.com \n- **Total dépensé** : 3 400 € \n\nSi vous avez besoin d'autres détails, n'hésitez pas à demander."
}
```

## 🏗️ Project Structure

```text
src/
├── config/        # Environment validation (Zod)
├── controllers/   # Route handlers (HTTP logic)
├── routes/        # Fastify endpoints definition
├── services/      # Business logic (LLM Orchestration, Mock DB)
├── tools/         # JSON Schemas for LLM Tool Calling
├── types/         # TypeScript definitions
└── server.ts      # Fastify application entry point
```