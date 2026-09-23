import { z } from 'zod';

export const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Le message ne peut pas être vide'),
});

// Inférence du type TypeScript à partir du schéma Zod
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
