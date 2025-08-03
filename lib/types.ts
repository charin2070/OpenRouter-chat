export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface OpenRouterStreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      role?: 'assistant';
      content?: string;
    };
    finish_reason?: string;
  }[];
}

export interface ApiError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

export type AIProvider = 'google-gemma' | 'mistral-medium';

export interface ProviderConfig {
  id: AIProvider;
  name: string;
  description: string;
}

export const AI_PROVIDERS: ProviderConfig[] = [
  {
    id: 'google-gemma',
    name: 'Google Gemma 3b',
    description: 'Fast and efficient model for general conversation'
  },
  {
    id: 'mistral-medium',
    name: 'Mistral Medium',
    description: 'Advanced model with enhanced reasoning capabilities'
  }
];