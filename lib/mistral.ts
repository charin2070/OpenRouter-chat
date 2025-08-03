import { OpenRouterResponse, ApiError } from './types';

const MISTRAL_API_URL = 'https://api.mistral.ai/v1/chat/completions';
const API_KEY= process.env.MISTRAL_API_KEY;
const MODEL = process.env.AI_MISTRAL_MODEL;
const TEMPERATURE = process.env.AI_TEMPERATURE;
const MAX_TOKENS = process.env.AI_MAX_TOKENS;

export async function sendMessageToMistral(
  messages: { role: string; content: string }[]
): Promise<ReadableStream<Uint8Array>> {


  if (!API_KEY) {
    throw new Error('Mistral API key is not configured');
  }

  const response = await fetch(MISTRAL_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      stream: true,
      temperature: TEMPERATURE,
      max_tokens: MAX_TOKENS,
    }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error?.message || 'Failed to send message to Mistral');
  }

  if (!response.body) {
    throw new Error('No response body received');
  }

  return response.body;
}

export function parseMistralStreamChunk(chunk: string): string | null {
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);

      if (data === '[DONE]') {
        return null;
      }

      try {
        const parsed = JSON.parse(data);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          return content;
        }
      } catch (e) {
        continue;
      }
    }
  }

  return null;
}
