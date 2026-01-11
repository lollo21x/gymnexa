import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Eye, Brain, Sparkles, Code, TrendingUp } from 'lucide-react';
import { ModelType, ModelInfo } from '../types/chat';
import { getModelsByProvider, getProviderDisplayName } from '../services/models';
import { ModelStatsModal } from './ModelStatsModal';

interface AllModelsModalProps {
  currentModel: ModelInfo;
  onSelectModel: (modelId: ModelType) => void;
  onClose: () => void;
}

export const AllModelsModal: React.FC<AllModelsModalProps> = ({
  currentModel,
  onSelectModel,
  onClose,
}) => {
  const modelsByProvider = getModelsByProvider();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [statsModal, setStatsModal] = useState<{ isOpen: boolean; model: ModelInfo | null; embedUrl: string }>({
    isOpen: false,
    model: null,
    embedUrl: '',
  });
  const [filterType, setFilterType] = useState<'all' | 'base' | 'coding' | 'reasoning' | 'vision'>('all');

  const modelStatsUrls: Record<string, string> = {
    'openai/gpt-oss-20b:free': 'https://us5.datadoghq.com/graph/embed?token=b4dbba65c292dff4c2b856bd07e14b60f9dce074aec5f70378ef8e17494e4f13&legend=true&height=318&width=974',
    'openai/gpt-oss-120b:free': 'https://us5.datadoghq.com/graph/embed?token=871f17f25593cb7f5ffe5aa7f45d4957613a067b7e558b1282c966078941328b&legend=true&height=318&width=974',
    'deepseek/deepseek-chat-v3.1:free': 'https://us5.datadoghq.com/graph/embed?token=226e96c238a6ced1df63380d420a41b9429abb367fda0910e99424ea8fcf6b1b&legend=true&height=318&width=974',
    'deepseek/deepseek-r1-0528:free': 'https://us5.datadoghq.com/graph/embed?token=674e4f15607865d19d3e841395fba54a053770de848382417ff68d9c91bd6cf9&legend=true&height=318&width=974',
    'deepseek/deepseek-r1-0528-qwen3-8b:free': 'https://us5.datadoghq.com/graph/embed?token=7757f16c62d0d790ac0abe08730b0bf4c439e5cc0daea5ea834859f740c75ec6&legend=true&height=318&width=974',
    'deepseek/deepseek-chat-v3-0324:free': 'https://us5.datadoghq.com/graph/embed?token=5eac13e5b3b71dd603316338c6d9d29f30feb8ddf1866ef0f68426019cfc37a3&legend=true&height=318&width=974',
    'google/gemma-3-4b-it:free': 'https://us5.datadoghq.com/graph/embed?token=a60c3e96b4980101c66c38d458e1181334ecac95e0f48e3c53b17d9344e19ddf&legend=true&height=318&width=974',
    'google/gemma-3-12b-it:free': 'https://us5.datadoghq.com/graph/embed?token=74f8c148003d9fa1f1dc7717553ce7e7d4545638d9a51cbb4e155502f96987a1&legend=true&height=318&width=974',
    'google/gemma-3-27b-it:free': 'https://us5.datadoghq.com/graph/embed?token=4c7dc122cf2b1856d7d9a7109b13f0dc1dbd57472f6f803e008d827395e007ec&legend=true&height=318&width=974',
    'google/gemma-3n-e2b-it:free': 'https://us5.datadoghq.com/graph/embed?token=1f52b8f1dde5f9395b10c778799480f0a836eea94cf3a865eebe491410c58bf6&legend=true&height=318&width=974',
    'google/gemma-3n-e4b-it:free': 'https://us5.datadoghq.com/graph/embed?token=8f7cf40f1136bc011f537d6959633e7427940fc6ba0a395b34166f08bd306869&legend=true&height=318&width=974',
    'google/gemini-2.0-flash-exp:free': 'https://us5.datadoghq.com/graph/embed?token=5773ee36d913ba081da3088911cc05e9c57d1804826365b6819b31cb4df82fc3&legend=true&height=318&width=974',
    'moonshotai/kimi-k2:free': 'https://us5.datadoghq.com/graph/embed?token=fa97a3515b1b34540e9ce1944f7b7a6ed895b4d56ac64197ddca5ea3662f40fc&legend=true&height=318&width=974',
    'moonshotai/kimi-vl-a3b-thinking:free': 'https://us5.datadoghq.com/graph/embed?token=015c5fc0e290ccf262103f13f027c91efda54213601e2e74208c4e16518b7e29&legend=true&height=318&width=974',
    'moonshotai/kimi-dev-72b:free': 'https://us5.datadoghq.com/graph/embed?token=dbe886d18c211c9d1c12395bb4c448ff527c3c671411a439911ed19214997ec0&legend=true&height=318&width=974',
    'z-ai/glm-4.5-air:free': 'https://us5.datadoghq.com/graph/embed?token=3809517d76b0d9d9c4607a311b31f8bf4b89ce61f5406b45c5f100171a11e457&legend=true&height=318&width=974',
    'qwen/qwen3-4b:free': 'https://us5.datadoghq.com/graph/embed?token=6086f69fd4863cdc498769ba1697ac00a94a4b14da65a32678cbcd492a39d5ec&legend=true&height=318&width=974',
    'qwen/qwen3-8b:free': 'https://us5.datadoghq.com/graph/embed?token=a48642d9e5f3180ea10c638b5ca91479a2322eaaa5cf3027fb2cf8d2f004da02&legend=true&height=318&width=974',
    'qwen/qwen3-14b:free': 'https://us5.datadoghq.com/graph/embed?token=d2ee1392070b22eedb077218185b9564161466cf355578b2e813d205febcd8f7&legend=true&height=318&width=974',
    'qwen/qwen3-coder:free': 'https://us5.datadoghq.com/graph/embed?token=572c6fa22648545ba3af04111dee894010e1f4e0f94b209444f8de10f7f85380&legend=true&height=318&width=974',
    'mistralai/devstral-small-2505:free': 'https://us5.datadoghq.com/graph/embed?token=0b827c30ec6a6b4c7f644b0d7d37b67b151cfd071bf95e9dcc694ea3bc7da6a6&legend=true&height=318&width=974',
    'mistralai/mistral-nemo:free': 'https://us5.datadoghq.com/graph/embed?token=ee30dfb2154a95340a8aeca8ee7ac3509ebc115eae27b66d9e095cae6e5919bd&legend=true&height=318&width=974',
    'mistralai/mistral-small-3.2-24b-instruct:free': 'https://us5.datadoghq.com/graph/embed?token=8304a5e9c2396f3dd577b122d29c2b3d3f97e4a49af3873bc8ef42cac1b4cb71&legend=true&height=318&width=974',
    'meta-llama/llama-4-scout:free': 'https://us5.datadoghq.com/graph/embed?token=acdaea1302819adb69065457b850a535b6e0f2be10f6957f3276968a50c18e4b&legend=true&height=318&width=974',
    'meta-llama/llama-4-maverick:free': 'https://us5.datadoghq.com/graph/embed?token=fa0e41c5f3b05f7db99fc0627ec5e3f40493f55608c6f590f50b05c349c17750&legend=true&height=318&width=974',
     'x-ai/grok-4-fast:free': 'https://us5.datadoghq.com/graph/embed?token=b16da62ff58b2dfa419a7fb558ed01348bb7b9e02404756d1b1d2a6085c7a1b3&legend=true&height=318&width=974',
   };


  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 120); // Match animation duration
  };

  const handleModelSelect = (modelId: any) => {
    setIsClosing(true);
    setTimeout(() => {
      onSelectModel(modelId);
      onClose();
    }, 120);
  };

  const handleOpenStats = (model: ModelInfo, e: React.MouseEvent) => {
    e.stopPropagation();
    const embedUrl = modelStatsUrls[model.id] || '';
    setStatsModal({ isOpen: true, model, embedUrl });
  };

  const handleCloseStats = () => {
    setStatsModal({ isOpen: false, model: null, embedUrl: '' });
  };

  const filterModels = (models: ModelInfo[]) => {
    if (filterType === 'all') return models;
    return models.filter(model => {
      switch (filterType) {
        case 'base': return model.isBase;
        case 'coding': return model.isCoder;
        case 'reasoning': return model.isReasoning;
        case 'vision': return model.multimodal;
        default: return true;
      }
    });
  };

  const getModelIcon = (model: ModelInfo, isDark: boolean) => {
    const provider = model.id.split('/')[0];
    
    switch (provider) {
      case 'openai':
        return (
          <img 
            src={isDark 
              ? "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754576137/Will%20Pro%20AI%20favicon/AI%20models/OpenAI_dark_elakxx.svg"
              : "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754576136/Will%20Pro%20AI%20favicon/AI%20models/OpenAI_light_shtmjw.svg"
            }
            alt="OpenAI"
            className="w-5 h-5"
          />
        );
      case 'z-ai':
        return (
          <img 
            src={isDark 
              ? "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577464/Will%20Pro%20AI%20favicon/AI%20models/z-ai_dark_vi5eac.svg"
              : "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577462/Will%20Pro%20AI%20favicon/AI%20models/z-ai_light_acst5m.svg"
            }
            alt="Z-AI"
            className="w-5 h-5"
          />
        );
      case 'moonshotai':
        return (
          <img 
            src={isDark 
              ? "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577484/Will%20Pro%20AI%20favicon/AI%20models/Moonshot_Logo_dark_rnsa1i.svg"
              : "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577483/Will%20Pro%20AI%20favicon/AI%20models/Moonshot_Logo_light_wnlsro.svg"
            }
            alt="Moonshot AI"
            className="w-5 h-5"
          />
        );
      case 'mistralai':
        return (
          <img 
            src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577504/Will%20Pro%20AI%20favicon/AI%20models/Mistral_AI_Logo_w7glsc.svg"
            alt="Mistral AI"
            className="w-5 h-5"
          />
        );
      case 'deepseek':
        return (
          <img 
            src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577551/Will%20Pro%20AI%20favicon/AI%20models/Deepseek_AI_Logo_nbw6vi.svg"
            alt="DeepSeek"
            className="w-5 h-5"
          />
        );
      case 'qwen':
        return (
          <img 
            src={isDark 
              ? "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577558/Will%20Pro%20AI%20favicon/AI%20models/Qwen_dark_fmyzqb.svg"
              : "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577559/Will%20Pro%20AI%20favicon/AI%20models/Qwen_light_hhq57k.svg"
            }
            alt="Qwen"
            className="w-5 h-5"
          />
        );
      case 'google':
        return (
          <img 
            src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754575955/Will%20Pro%20AI%20favicon/AI%20models/SVG_Logos_from_Svgl_ksywwg.svg"
            alt="Google"
            className="w-5 h-5"
          />
        );
      case 'meta-llama':
        return (
          <img 
            src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754577587/Will%20Pro%20AI%20favicon/AI%20models/SVG_Logos_Library_bontp0.svg"
            alt="Meta"
            className="w-5 h-5"
          />
        );
       case 'openrouter':
         return (
           <img
             src={isDark
               ? "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1757164086/OpenRouter_dark_yzpbfh.svg"
               : "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1757164087/OpenRouter_light_pqiaok.svg"
             }
             alt="OpenRouter"
             className="w-5 h-5"
           />
         );
       case 'x-ai':
         return (
           <img
             src={isDark
               ? "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1758453401/xAI_Grok__dark_n69hwt.svg"
               : "https://res.cloudinary.com/dk0f2y0hu/image/upload/v1758453402/xAI_Grok__light_piczyy.svg"
             }
             alt="xAI"
             className="w-6 h-6"
           />
         );
       default:
        return <div className="w-5 h-5 bg-[#FF8C00] rounded-full"></div>;
    }
  };

  const getModelBadge = (model: ModelInfo) => {
    if (model.isReasoning) {
      return (
        <span className="px-2 py-0.5 bg-blue-100/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium flex items-center gap-1">
          <Brain className="w-3 h-3" />
          Reasoning
        </span>
      );
    }
    if (model.isCoder) {
      return (
        <span className="px-2 py-0.5 bg-green-100/80 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs rounded-full font-medium flex items-center gap-1">
          <Code className="w-3 h-3" />
          Coding
        </span>
      );
    }
    if (model.multimodal) {
      return (
        <span className="px-2 py-0.5 bg-purple-100/80 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs rounded-full font-medium flex items-center gap-1">
          <Eye className="w-3 h-3" />
          Vision
        </span>
      );
    }
    if (model.isBase) {
      return (
        <span className="px-3 py-0.5 bg-[#FF8C00]/20 text-[#FF8C00] text-xs rounded-full font-medium flex items-center gap-1 whitespace-nowrap">
          <Sparkles className="w-3 h-3" />
          Base
        </span>
      );
    }
    return null;
  };

  const modalContent = (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-md z-[99999] flex items-center justify-center p-4 transition-opacity duration-120 ease-out ${
      isClosing
        ? 'opacity-0'
        : isVisible
          ? 'opacity-100'
          : 'opacity-0'
    }`} style={{ WebkitBackdropFilter: 'blur(12px)' }}>
      <div
        className={`bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col my-auto transition-all duration-120 ease-out ${
          isClosing
            ? 'opacity-0 scale-95'
            : isVisible
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            All models
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All', icon: null },
              { key: 'base', label: 'Base', icon: Sparkles },
              { key: 'coding', label: 'Coding', icon: Code },
              { key: 'reasoning', label: 'Reasoning', icon: Brain },
              { key: 'vision', label: 'Vision', icon: Eye },
            ].map(({ key, label, icon: Icon }) => {
              const getButtonClasses = () => {
                if (filterType === key) {
                  switch (key) {
                    case 'base': return 'bg-[#FF8C00] text-white';
                    case 'coding': return 'bg-green-600 text-white';
                    case 'reasoning': return 'bg-blue-600 text-white';
                    case 'vision': return 'bg-purple-600 text-white';
                    default: return 'bg-[#FF8C00] text-white';
                  }
                }
                return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600';
              };

              return (
                <button
                  key={key}
                  onClick={() => setFilterType(key as any)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${getButtonClasses()}`}
                  style={{ outline: 'none', boxShadow: 'none' }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Models by Provider */}
        <div className="flex-1 p-6 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          <div className="space-y-8">
            {Object.entries(modelsByProvider).filter(([provider]) => provider !== 'openrouter').map(([provider, models]) => {
               const filteredModels = filterModels(models);
               if (filteredModels.length === 0) return null;
              return (
                <div key={provider}>
                  {/* Provider Header */}
                  <div className="flex items-center gap-3 mb-4">
                    {getModelIcon(filteredModels[0], document.documentElement.classList.contains('dark'))}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {getProviderDisplayName(provider)}
                    </h3>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600"></div>
                  </div>

                  {/* Models Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredModels.map((model) => (
                     <div className="relative group">
                       <button
                         key={model.id}
                         onClick={() => handleModelSelect(model.id)}
                         className={`
                           p-4 rounded-xl border text-left transition-all duration-200 w-full
                           hover:shadow-lg hover:scale-[1.02]
                           ${currentModel.id === model.id
                             ? 'border-[#FF8C00] bg-[#FF8C00]/10 dark:bg-[#FF8C00]/10'
                             : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 hover:border-[#FF8C00]/50'
                           }
                         `}
                         style={{ outline: 'none', boxShadow: 'none' }}
                       >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getModelIcon(model, document.documentElement.classList.contains('dark'))}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium mb-1 ${currentModel.id === model.id ? 'text-[#FF8C00]' : 'text-gray-900 dark:text-white'}`}>
                              {model.name}
                            </h4>
                            <div className="flex items-center gap-2 mb-2">
                              {getModelBadge(model)}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {model.description}
                            </p>
                          </div>
                        </div>
                       </button>
                       {modelStatsUrls[model.id] && (
                          <button
                            onClick={(e) => handleOpenStats(model, e)}
                            className={`absolute top-2 right-2 p-1.5 rounded-lg ${currentModel.id === model.id ? 'bg-white dark:bg-gray-700' : 'bg-gray-100/80 dark:bg-gray-700/80'} hover:bg-gray-200/80 dark:hover:bg-gray-600/80 group-hover:scale-110 transition-all duration-200`}
                            style={{ outline: 'none', boxShadow: 'none' }}
                            title="View statistics"
                          >
                           <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                         </button>
                       )}
                     </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(
    <>
      {modalContent}
      {statsModal.isOpen && statsModal.model && (
        <ModelStatsModal
          modelName={statsModal.model.name}
          embedUrl={statsModal.embedUrl}
          onClose={handleCloseStats}
        />
      )}
    </>,
    document.getElementById('modal-root')!
  );
};