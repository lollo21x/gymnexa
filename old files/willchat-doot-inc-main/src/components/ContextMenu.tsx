import React, { useEffect, useRef, useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  x,
  y,
  onEdit,
  onDelete,
  onClose,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [adjustedPosition, setAdjustedPosition] = useState({ left: x, top: y });

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 10);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleClose = () => {
      setIsClosing(true);
      setTimeout(() => {
        onClose();
      }, 150); // Match animation duration
    };

    // Adjust position to keep menu within viewport
    const adjustPosition = () => {
      if (menuRef.current) {
        const rect = menuRef.current.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const menuWidth = rect.width || 160; // fallback to min-width
        const menuHeight = rect.height || 80; // approximate height

        let newLeft = x;
        let newTop = y;

        // Adjust horizontal position
        if (x + menuWidth > viewportWidth) {
          newLeft = viewportWidth - menuWidth - 10; // 10px margin
        }
        if (newLeft < 10) {
          newLeft = 10;
        }

        // Adjust vertical position
        if (y + menuHeight > viewportHeight) {
          newTop = viewportHeight - menuHeight - 10;
        }
        if (newTop < 10) {
          newTop = 10;
        }

        setAdjustedPosition({ left: newLeft, top: newTop });
      }
    };

    // Adjust position after render
    setTimeout(adjustPosition, 0);

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, x, y]);

  return (
    <div
      ref={menuRef}
      className={`fixed z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border border-gray-300 dark:border-gray-600 rounded-xl py-2 min-w-[160px] transition-all duration-200 ease-out ${
        isClosing
          ? 'opacity-0 scale-95'
          : isVisible
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95'
      }`}
      style={{
        left: adjustedPosition.left,
        top: adjustedPosition.top,
        transformOrigin: 'top left',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }}
    >
      <button
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => {
            onEdit();
            onClose();
          }, 150);
        }}
        className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-colors"
        style={{ outline: 'none', boxShadow: 'none' }}
      >
        <Edit3 className="w-4 h-4" />
        Edit title
      </button>
      <button
        onClick={() => {
          setIsClosing(true);
          setTimeout(() => {
            onDelete();
            onClose();
          }, 150);
        }}
        className="w-full flex items-center gap-3 px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50/80 dark:hover:bg-red-900/20 transition-colors"
        style={{ outline: 'none', boxShadow: 'none' }}
      >
        <Trash2 className="w-4 h-4" />
        Delete chat
      </button>
    </div>
  );
};