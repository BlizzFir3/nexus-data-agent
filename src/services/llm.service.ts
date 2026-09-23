import OpenAI from 'openai';
import { env } from '../config/env.js';
import { dbService } from './db.service.js';
import { getCustomerByNameSchema } from '../tools/getCustomerByName.tool.js';
import { getTopCustomerSchema } from '../tools/getTopCustomer.tool.js';

export class LlmService {
  private openai: OpenAI;
  private systemPrompt = `Tu es un assistant IA spécialisé dans l'interrogation de bases de données. 
  Utilise les outils à ta disposition pour répondre avec précision. 
  Ne donne jamais de fausses données. Si un outil ne renvoie rien, dis-le poliment.`;

  constructor() {
    // Redirection transparente du SDK OpenAI vers les serveurs de Groq
    this.openai = new OpenAI({
      baseURL: 'https://api.groq.com/openai/v1',
      apiKey: env.GROQ_API_KEY,
    });
  }

  async processQuery(userMessage: string): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: this.systemPrompt },
      { role: 'user', content: userMessage },
    ];

    // Remplacement du modèle par un modèle open-source supportant le Tool Calling
    const model = 'openai/gpt-oss-20b';

    const response = await this.openai.chat.completions.create({
      model,
      messages,
      tools: [getCustomerByNameSchema, getTopCustomerSchema],
      tool_choice: 'auto',
    });

    const responseMessage = response.choices[0].message;

    if (responseMessage.tool_calls) {
      messages.push(responseMessage);

      for (const toolCall of responseMessage.tool_calls) {
        if (toolCall.type !== 'function') {
          continue;
        }

        let functionResult: string;
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);

        try {
          if (functionName === 'getCustomerByName') {
            const data = await dbService.getCustomerByName(functionArgs.name);
            functionResult = data ? JSON.stringify(data) : 'Aucun client trouvé.';
          } else if (functionName === 'getTopCustomer') {
            const data = await dbService.getTopCustomer();
            functionResult = JSON.stringify(data);
          } else {
            functionResult = 'Erreur : Outil non reconnu.';
          }
        } catch (error) {
          functionResult = `Erreur lors de l'exécution : ${error}`;
        }

        messages.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          content: functionResult,
        });
      }

      const finalResponse = await this.openai.chat.completions.create({
        model,
        messages,
      });

      return (
        finalResponse.choices[0].message.content || "Désolé, je n'ai pas pu formuler de réponse."
      );
    }

    return responseMessage.content || "Désolé, je n'ai pas pu générer de réponse.";
  }
}

export const llmService = new LlmService();
