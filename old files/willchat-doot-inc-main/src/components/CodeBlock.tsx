import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children, language, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Extract language from className if not provided
  const lang = language || (className?.match(/language-(\w+)/)?.[1] || 'plaintext');

  return (
    <div className="relative group my-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 w-full max-w-full md:max-w-3xl">
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 text-gray-600 dark:text-gray-300 rounded transition-colors"
          style={{ outline: 'none', boxShadow: 'none' }}
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="max-w-full overflow-hidden">
        <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap break-words">
          <code className={`text-gray-900 dark:text-gray-100 ${className || ''}`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  );
};