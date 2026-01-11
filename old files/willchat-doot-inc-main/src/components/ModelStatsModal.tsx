import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModelStatsModalProps {
  modelName: string;
  embedUrl: string;
  onClose: () => void;
}

export const ModelStatsModal: React.FC<ModelStatsModalProps> = ({
  modelName,
  embedUrl,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [embedDimensions, setEmbedDimensions] = useState({ width: 800, height: 400 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setEmbedDimensions({
          width: Math.floor(rect.width),
          height: Math.floor(rect.height),
        });
      }
    };

    if (isVisible) {
      // Wait for animation to complete before calculating dimensions
      const timer = setTimeout(updateDimensions, 150);
      window.addEventListener('resize', updateDimensions);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateDimensions);
      };
    }
  }, [isVisible]);

  const dynamicEmbedUrl = embedUrl.replace(/height=\d+&width=\d+/, `height=${embedDimensions.height}&width=${embedDimensions.width}`);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 120); // Match animation duration
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-md z-[99999] flex items-center justify-center p-4 transition-opacity duration-120 ease-out ${
        isClosing
          ? 'opacity-0'
          : isVisible
            ? 'opacity-100'
            : 'opacity-0'
      }`}
      style={{ WebkitBackdropFilter: 'blur(12px)' }}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col transition-all duration-120 ease-out ${
        isClosing
          ? 'opacity-0 scale-95'
          : isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
      }`}>
        <div className="flex items-center justify-between mb-4">
           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
             {modelName} Uptime
           </h3>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
            style={{ outline: 'none', boxShadow: 'none' }}
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 min-h-0" ref={containerRef}>
          <iframe
            src={dynamicEmbedUrl}
            width={embedDimensions.width}
            height={embedDimensions.height}
            className="border-0 rounded-lg"
             title={`${modelName} Uptime`}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};