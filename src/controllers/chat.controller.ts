import { FastifyRequest, FastifyReply } from 'fastify';
import { ChatRequestSchema } from '../types/chat.types.js';
import { llmService } from '../services/llm.service.js';

export const handleChat = async (request: FastifyRequest, reply: FastifyReply) => {
  const parsed = ChatRequestSchema.safeParse(request.body);

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Bad Request',
      details: parsed.error.format(),
    });
  }

  const { message } = parsed.data;

  try {
    const aiResponse = await llmService.processQuery(message);

    return reply.status(200).send({
      response: aiResponse,
    });
  } catch (error) {
    request.log.error(error);
    return reply.status(500).send({
      error: 'Internal Server Error',
      message: "Impossible de joindre le service d'intelligence artificielle.",
    });
  }
};
