export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
  images?: string[]; // URLs delle immagini
  generatedImage?: string; // URL dell'immagine generata
  originalPrompt?: string; // Prompt originale per le immagini generate
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type ModelType = 'openai/gpt-oss-20b:free' | 'openai/gpt-oss-120b:free' | 'deepseek/deepseek-r1-0528:free' | 'google/gemma-3-27b-it:free' | 'z-ai/glm-4.5-air:free' | 'moonshotai/kimi-k2:free' | 'moonshotai/kimi-dev-72b:free' | 'mistralai/mistral-small-3.2-24b-instruct:free' | 'mistralai/devstral-small-2505:free' | 'qwen/qwen3-14b:free' | 'qwen/qwen3-8b:free' | 'qwen/qwen3-4b:free' | 'qwen/qwen3-coder:free' | 'deepseek/deepseek-chat-v3-0324:free' | 'deepseek/deepseek-chat-v3.1:free' | 'deepseek/deepseek-r1-0528-qwen3-8b:free' | 'meta-llama/llama-3.2-11b-vision-instruct:free' | 'google/gemini-2.5-flash-image-preview:free' | 'google/gemini-2.0-flash-exp:free' | 'meta-llama/llama-4-maverick:free' | 'meta-llama/llama-4-scout:free' | 'google/gemma-3n-e2b-it:free' | 'google/gemma-3n-e4b-it:free' | 'google/gemma-3-4b-it:free' | 'google/gemma-3-12b-it:free' | 'moonshotai/kimi-vl-a3b-thinking:free' | 'mistralai/mistral-nemo:free' | 'meta-llama/llama-3.1-405b-instruct:free' | 'meta-llama/llama-3.2-3b-instruct:free' | 'meta-llama/llama-3.3-8b-instruct:free' | 'meta-llama/llama-3.3-70b-instruct:free' | 'x-ai/grok-4-fast:free';

export interface ModelInfo {
  id: ModelType;
  name: string;
  description: string;
  multimodal: boolean;
  isPrimary?: boolean;
  isReasoning?: boolean;
  isBase?: boolean;
  isCoder?: boolean;
  isImageGenerator?: boolean;
}