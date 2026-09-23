import { FastifyRequest, FastifyReply } from 'fastify';
import { ChatRequestSchema } from '../types/chat.types.js';

export const handleChat = async (request: FastifyRequest, reply: FastifyReply) => {
  // Validation stricte du body avec Zod
  const parsed = ChatRequestSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Bad Request',
      details: parsed.error.format(),
    });
  }

  const { message } = parsed.data;

  // TODO: Appel au LLM et Tool Calling (Prochaine étape)

  return reply.status(200).send({
    response: `Message reçu : "${message}". L'intégration OpenAI est prête à être connectée.`,
  });
};
