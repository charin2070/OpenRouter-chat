import { OpenRouterResponse, ApiError, AIProvider } from './types';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODELS = {
  GEMMA_2_9B : 'google/gemma-2-9b-it:free'
}

const MODEL = MODELS.GEMMA_2_9B;

export async function sendMessageToGemma(
  messages: { role: string; content: string }[]
): Promise<ReadableStream<Uint8Array>> {
  return sendMessageToProvider(messages, 'google-gemma');
}

export async function sendMessageToProvider(
  messages: { role: string; content: string }[],
  provider: AIProvider
): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenRouter API key is not configured');
  }

  // Определяем модель в зависимости от провайдера
  let model: string;
  switch (provider) {
    case 'google-gemma':
      model = 'google/gemma-2-9b-it:free';
      break;
    case 'mistral-medium':
      model = 'mistralai/mistral-medium';
      break;
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': process.env.NEXT_PUBLIC_APP_NAME || 'Gemma Chat',
    },
    body: JSON.stringify({
      model: model,
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error?.message || `Failed to send message to ${provider}`);
  }

  if (!response.body) {
    throw new Error('No response body received');
  }

  return response.body;
}

export function parseStreamChunk(chunk: string): string | null {
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
        // Skip invalid JSON
        continue;
      }
    }
  }
  
  return null;
}