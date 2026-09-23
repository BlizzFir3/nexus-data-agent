import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  GROQ_API_KEY: z.string().min(1, 'La clé API Groq est requise'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Erreur critique : Variables d'environnement invalides");
  console.error(_env.error.format());
  process.exit(1);
}

export const env = _env.data;
