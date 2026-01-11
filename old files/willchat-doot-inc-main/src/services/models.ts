import { ModelInfo, ModelType } from '../types/chat';

export const AVAILABLE_MODELS: ModelInfo[] = [
   // Primary models (shown in main selector)
   {
     id: 'openai/gpt-oss-20b:free',
     name: 'GPT-OSS 20B',
     description: 'Open-weight MoE model with 20B parameters, designed for general tasks with high efficiency.',
     multimodal: false,
     isPrimary: true,
     isReasoning: true,
   },
   {
     id: 'deepseek/deepseek-chat-v3.1:free',
     name: 'DeepSeek V3.1',
     description: 'Updated model in the V3 series, with thinking mode and better tool handling.',
     multimodal: false,
     isPrimary: true,
     isBase: true,
   },
   {
     id: 'google/gemma-3-4b-it:free',
     name: 'Gemma 3 4B',
     description: 'Lightweight Google Gemma model, instruction-tuned and suitable for low-resource devices.',
     multimodal: false,
     isPrimary: true,
     isBase: true,
   },
   {
     id: 'deepseek/deepseek-r1-0528:free',
     name: 'DeepSeek R1',
     description: 'DeepSeek model dedicated to step-by-step reasoning, strong in mathematics and programming.',
     multimodal: false,
     isPrimary: false,
     isReasoning: true,
   },
   {
     id: 'google/gemma-3-12b-it:free',
     name: 'Gemma 3 12B',
     description: 'Medium model in the Gemma 3 family, balanced between performance and resource consumption.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'google/gemma-3-27b-it:free',
     name: 'Gemma 3 27B',
     description: 'Large model in the Gemma 3 series, with enhanced reasoning capabilities.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   // Secondary models (shown in expanded view)
   {
     id: 'google/gemma-3n-e2b-it:free',
     name: 'Gemma 3N E2B',
     description: 'Compact model in the Gemma 3N line, designed for low-latency edge execution.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'google/gemma-3n-e4b-it:free',
     name: 'Gemma 3N E4B',
     description: 'Reduced model in the Gemma 3N line, optimized for efficiency on mobile devices.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
    {
      id: 'google/gemini-2.0-flash-exp:free',
      name: 'Gemini 2.0 Flash Experimental',
      description: 'Experimental Google Gemini model, designed for high speed and visual support.',
      multimodal: true,
      isPrimary: false,
    },
   {
     id: 'moonshotai/kimi-k2:free',
     name: 'Kimi K2',
     description: 'Moonshot AI MoE model, scalable and suitable for large-scale general tasks.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
    {
      id: 'moonshotai/kimi-vl-a3b-thinking:free',
      name: 'Kimi VL A3B Thinking',
      description: 'Multimodal Moonshot AI model, capable of advanced reasoning on visual inputs.',
      multimodal: false,
      isPrimary: false,
      isReasoning: true,
    },
   {
     id: 'z-ai/glm-4.5-air:free',
     name: 'GLM-4.5 Air',
     description: 'Lightweight model in the GLM-4.5 series by Zhipu, designed for fast and efficient responses.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'qwen/qwen3-4b:free',
     name: 'Qwen3 4B',
     description: 'Compact Qwen3 model with 4B parameters, optimized for dialogue and general tasks.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'mistralai/devstral-small-2505:free',
     name: 'Devstral Small',
     description: 'Mistral AI model designed for software engineering and codebase management.',
     multimodal: false,
     isPrimary: false,
     isCoder: true,
   },
   {
     id: 'qwen/qwen3-8b:free',
     name: 'Qwen3 8B',
     description: 'Intermediate Qwen3 model with 8B parameters, suitable for multitasking and general use.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'qwen/qwen3-14b:free',
     name: 'Qwen3 14B',
     description: 'Mid-to-high-end Qwen3 model, with good comprehension and reasoning capabilities.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'qwen/qwen3-coder:free',
     name: 'Qwen3 Coder',
     description: 'Qwen3 model specialized in programming and software development.',
     multimodal: false,
     isPrimary: false,
     isCoder: true,
   },
   {
     id: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
     name: 'DeepSeek R1 Qwen',
     description: 'Distillation of the R1 model on Qwen architecture, lighter but still reasoning-oriented.',
     multimodal: false,
     isPrimary: false,
     isReasoning: true,
   },
    {
      id: 'meta-llama/llama-3.2-11b-vision-instruct:free',
      name: 'Llama 3.2',
      description: 'Multimodal Meta model, capable of interpreting images and texts.',
      multimodal: true,
      isPrimary: false,
    },
   {
     id: 'mistralai/mistral-nemo:free',
     name: 'Mistral Nemo',
     description: '12B Mistral AI model, with support for long contexts and coding tasks.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'mistralai/mistral-small-3.2-24b-instruct:free',
     name: 'Mistral Small 3.2',
     description: '24B parameter Mistral model, instruction-tuned and optimized for multitasking.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'meta-llama/llama-4-scout:free',
     name: 'Llama 4 Scout',
     description: 'Meta model with MoE architecture, efficient with very long contexts.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
   {
     id: 'moonshotai/kimi-dev-72b:free',
     name: 'Kimi Dev 72B',
     description: 'Moonshot AI model with 72B parameters, specialized in software development and coding.',
     multimodal: false,
     isPrimary: false,
     isCoder: true,
   },
   {
     id: 'openai/gpt-oss-120b:free',
     name: 'GPT-OSS 120B',
     description: 'Open-weight MoE model with 120B parameters, designed for complex reasoning and extended contexts.',
     multimodal: false,
     isPrimary: false,
     isReasoning: true,
   },
   {
     id: 'meta-llama/llama-4-maverick:free',
     name: 'Llama 4 Maverick',
     description: 'Advanced Meta Llama 4 model, optimized for reasoning and programming.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
    {
      id: 'deepseek/deepseek-chat-v3-0324:free',
      name: 'DeepSeek V3',
      description: 'Conversational MoE model by DeepSeek, optimized for efficiency and multitasking.',
      multimodal: false,
      isPrimary: false,
      isBase: true,
    },
    {
      id: 'meta-llama/llama-3.1-405b-instruct:free',
      name: 'Llama 3.1 405B',
      description: 'Flagship Meta model with 405B parameters, suitable for complex linguistic tasks.',
      multimodal: false,
      isPrimary: false,
      isBase: true,
    },
    {
      id: 'meta-llama/llama-3.2-3b-instruct:free',
      name: 'Llama 3.2 3B',
      description: 'Reduced Meta Llama 3.2 model, designed for dialogue and light synthesis.',
      multimodal: false,
      isPrimary: false,
      isBase: true,
    },
    {
      id: 'meta-llama/llama-3.3-8b-instruct:free',
      name: 'Llama 3.3 8B',
      description: 'Meta Llama 3.3 model with 8B parameters, fast and instruction-tuned.',
      multimodal: false,
      isPrimary: false,
      isBase: true,
    },
    {
      id: 'meta-llama/llama-3.3-70b-instruct:free',
      name: 'Llama 3.3 70B',
      description: 'Large Meta Llama 3.3 model, optimized for multitasking and extended contexts.',
      multimodal: false,
      isPrimary: false,
      isBase: true,
    },
   {
     id: 'x-ai/grok-4-fast:free',
     name: 'Grok 4 Fast',
     description: 'Multimodal xAI model, non-reasoning version, optimized for high speed, low costs, and context up to 2 million tokens.',
     multimodal: false,
     isPrimary: false,
     isBase: true,
   },
 ];

export const getPrimaryModels = (): ModelInfo[] => {
  return AVAILABLE_MODELS.filter(model => model.isPrimary);
};

export const getSecondaryModels = (): ModelInfo[] => {
  return AVAILABLE_MODELS.filter(model => !model.isPrimary);
};

export const getModelById = (id: ModelType): ModelInfo | undefined => {
  return AVAILABLE_MODELS.find(model => model.id === id);
};

export const getDefaultModel = (): ModelType => 'openai/gpt-oss-20b:free';

// Group models by provider
export const getModelsByProvider = (): Record<string, ModelInfo[]> => {
  const grouped: Record<string, ModelInfo[]> = {};
  
  AVAILABLE_MODELS.forEach(model => {
    const provider = model.id.split('/')[0];
    if (!grouped[provider]) {
      grouped[provider] = [];
    }
    grouped[provider].push(model);
  });
  
  return grouped;
};

// Get provider display name
export const getProviderDisplayName = (provider: string): string => {
  switch (provider) {
    case 'openai':
      return 'OpenAI';
    case 'z-ai':
      return 'Z-AI';
    case 'moonshotai':
      return 'Moonshot AI';
    case 'mistralai':
      return 'Mistral AI';
    case 'qwen':
      return 'Qwen';
    case 'deepseek':
      return 'DeepSeek';
    case 'google':
      return 'Google';
    case 'meta-llama':
      return 'Meta';
    default:
      return provider.charAt(0).toUpperCase() + provider.slice(1);
     case 'openrouter':
       return 'OpenRouter';
     case 'x-ai':
       return 'xAI';
   }
};