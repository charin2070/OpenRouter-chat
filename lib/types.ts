import { Description, Provider } from "@radix-ui/react-toast";

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

export interface MistralModel {
  id: string;
  object: string;
  created: number;
  owned_by: string;
  permission: any[];
  root: string;
  parent: string | null;
}

export interface MistralModelsResponse {
  object: string;
  data: MistralModel[];
}

export const OpenRouterGemma3Model: AIModel = {
  name: 'Google Gemma 3',
  index: 'google/gemma-3-4b',
  description: 'Быстрая и доступная модель от Google через OpenRouter'
};

export const OpenRouterAiProvider = {
  name: 'OpenRouter',
  models: [OpenRouterGemma3Model],
};

export type AIModel = {
  name: string;
  description: string;
  index: string;
};

export interface ProviderConfig {
  id: string;
  name: string;
  models: AIModel[];
  description: string;
}

export const Gemma3Model = {
  name: 'Google Gemma 3',
  index: 'google/gemma-3-4b',
  description: 'Топ за свои деньги'
};

// Определение типов AI провайдеров
export type AIProvider = 'google-gemma' | 'mistral-medium';

// Конфигурация AI провайдеров
export const AI_PROVIDERS: ProviderConfig[] = [
  {
    id: 'google-gemma',
    name: 'Google Gemma 3b',
    description: 'Fast and efficient model for general conversation (Free tier)',
    models: [
      {
        name: 'Google Gemma 3b',
        index: 'google/gemma-2-9b-it:free',
        description: 'Free tier model with good performance for general tasks'
      }
    ]
  },
  {
    id: 'mistral-medium',
    name: 'Mistral Medium',
    description: 'Advanced model with enhanced reasoning capabilities (Premium tier)',
    models: [
      {
        name: 'Mistral Medium',
        index: 'mistralai/mistral-medium',
        description: 'Premium tier model with enhanced reasoning and analysis capabilities'
      }
    ]
  }
];
