import { FastifyInstance } from 'fastify';
import { handleChat } from '../controllers/chat.controller.js';

export const chatRoutes = async (server: FastifyInstance) => {
  // L'endpoint final sera POST /api/chat
  server.post('/chat', handleChat);
};
