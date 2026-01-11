import React, { useState, useEffect, useRef } from 'react';
import { Check, X } from 'lucide-react';

interface EditTitleModalProps {
  currentTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

export const EditTitleModal: React.FC<EditTitleModalProps> = ({
  currentTitle,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(currentTitle);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);

    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onCancel();
    }, 120); // Match animation duration
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      setIsClosing(true);
      setTimeout(() => {
        onSave(title.trim());
      }, 120);
    }
  };



  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className={`fixed inset-0 bg-black/50 backdrop-blur-md z-[99999] flex items-center justify-center p-4 transition-opacity duration-120 ease-out ${
      isClosing
        ? 'opacity-0'
        : isVisible
          ? 'opacity-100'
          : 'opacity-0'
    }`} style={{ WebkitBackdropFilter: 'blur(12px)' }}>
      <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-xl p-6 w-full max-w-md transition-all duration-120 ease-out ${
        isClosing
          ? 'opacity-0 scale-95'
          : isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
      }`}>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit chat title
        </h3>
        
        <form onSubmit={handleSave}>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white backdrop-blur-md placeholder-gray-500 dark:placeholder-gray-400"
            style={{ outline: 'none', boxShadow: 'none' }}
            placeholder="Enter new title..."
            maxLength={50}
          />
          
          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-500/80 hover:bg-gray-600/80 text-white rounded-lg transition-colors backdrop-blur-md"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#FF8C00] hover:bg-[#FF6B00] disabled:bg-gray-400/80 disabled:cursor-not-allowed text-white rounded-lg transition-colors backdrop-blur-md"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <Check className="w-4 h-4" />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};