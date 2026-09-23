import { FastifyInstance } from 'fastify';
import { handleChat } from '../controllers/chat.controller.js';

export default async function chatRoutes(server: FastifyInstance) {
  server.post('/chat', handleChat);
}
