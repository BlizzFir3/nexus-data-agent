import fastify, { FastifyInstance } from 'fastify';
import { env } from './config/env.js';
import { chatRoutes } from './routes/chat.routes.js';

// Initialisation de Fastify avec un logger adapté à l'environnement
const server: FastifyInstance = fastify({
  logger: {
    level: env.NODE_ENV === 'development' ? 'info' : 'warn',
    transport:
      env.NODE_ENV === 'development'
        ? {
            target: 'pino-pretty',
            options: { translateTime: 'HH:MM:ss Z', ignore: 'pid,hostname' },
          }
        : undefined,
  },
});

// Route de vérification de santé (Healthcheck)
server.get('/health', async () => {
  // Enregistrement des routes de l'API
  server.register(chatRoutes, { prefix: '/api' });
  return { status: 'ok', environment: env.NODE_ENV, timestamp: new Date().toISOString() };
});

// Démarrage du serveur
const start = async () => {
  try {
    await server.listen({ port: env.PORT, host: env.HOST });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Gestion de l'arrêt propre (Graceful Shutdown)
const gracefulShutdown = async (signal: string) => {
  server.log.info(`Signal ${signal} reçu. Arrêt propre du serveur...`);
  await server.close();
  process.exit(0);
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

start();
