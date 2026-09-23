# Stage 1: Base
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Stage 2: Development
FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Stage 3: Builder
FROM base AS builder
RUN npm install
COPY . .
RUN npm run build

# Stage 4: Production
FROM base AS production
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]