import React, { useRef, useEffect, useMemo } from 'react';
import { Brain, Code } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { Message } from '../types/chat';
import { useAuth } from '../hooks/useAuth';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string, images?: string[]) => void;
  onRegenerateMessage: (messageId: string) => void;
  isLoading?: boolean;
  multimodalEnabled?: boolean;
  isImageGenerator?: boolean;
  isReasoningModel?: boolean;
  isCoderModel?: boolean;
  isDark?: boolean;
}

const WELCOME_MESSAGES = [
  "What can I do for you today, [NAME]?",
  "How may I assist you right now, [NAME]?",
  "Is there something specific you need today, [NAME]?",
  "How would you like me to support you, [NAME]?",
  "What's on your mind today, [NAME]?",
  "Do you need any help at the moment, [NAME]?",
  "How can I be useful to you today, [NAME]?",
  "What would you like me to do for you, [NAME]?",
  "How may I serve you today, [NAME]?",
  "Is there anything I can help you with, [NAME]?",
  "What task should I assist you with, [NAME]?",
  "How can I make things easier for you, [NAME]?",
  "What's the first thing you'd like me to handle, [NAME]?",
  "Do you have something I can help you with today, [NAME]?",
  "How should I get started helping you, [NAME]?",
  "Is there a way I can support you right now, [NAME]?",
  "What do you need my assistance with, [NAME]?",
  "How can I contribute to your day, [NAME]?",
  "What would be most helpful for you now, [NAME]?",
  "How can I make today better for you, [NAME]?",
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  onRegenerateMessage,
  isLoading = false,
  multimodalEnabled = false,
  isImageGenerator = false,
  isReasoningModel = false,
  isCoderModel = false,
  isDark = false,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const welcomeMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * WELCOME_MESSAGES.length);
    let message = WELCOME_MESSAGES[randomIndex];
    if (user) {
      // Extract only the first name from displayName
      const fullName = user.displayName || user.email?.split('@')[0] || 'there';
      const firstName = fullName.split(' ')[0]; // Get only the first word
      message = message.replace('[NAME]', firstName);
    } else {
      message = message.replace(', [NAME]?', '?');
    }
    return message;
  }, [user]);



  const getBackgroundStyle = () => {
    if (isDark) {
      return { backgroundColor: '#111827' }; // gray-900
    } else {
      return { backgroundColor: '#FFF3E3' };
    }
  };

  return (
    <div
      className="flex flex-col h-full relative"
      style={{
        zIndex: 0,
        ...getBackgroundStyle(),
      }}
    >
      {/* Messages */}
       <div className="flex-1 overflow-y-auto px-6 py-4 pb-24 relative z-10 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}>
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className={`text-4xl font-bold mb-8 max-w-2xl leading-tight ${isDark ? 'text-white' : 'text-black'}`}>
              {welcomeMessage}
            </h1>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                onRegenerate={message.sender === 'ai' ? () => onRegenerateMessage(message.id) : undefined}
                isImageGenerator={isImageGenerator}
              />
            ))}
            {isLoading && (
              <div className="flex gap-4 mb-6">
                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://res.cloudinary.com/dk0f2y0hu/image/upload/v1754574404/Will%20Pro%20AI%20favicon/WillPro-watchOS-Default-1024x1024_2x_rbdnnq.png"
                    alt="Will Chat AI"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 max-w-3xl">
                   <div className="inline-block px-4 py-3 bg-white dark:bg-gray-700 rounded-2xl rounded-bl-md">
                    {isReasoningModel ? (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Brain className="w-4 h-4 text-black dark:text-white animate-pulse" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    ) : isCoderModel ? (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Code className="w-4 h-4 text-black dark:text-white animate-pulse" />
                        <span className="text-sm">Coding...</span>
                      </div>
                     ) : isImageGenerator ? (
                       <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                         <div className="w-4 h-4 border-2 border-[#FF8C00] border-t-transparent rounded-full animate-spin" style={{ animationDuration: '0.8s' }}></div>
                         <span className="text-sm">Generating...</span>
                       </div>
                     ) : (
                       <div className="flex gap-1">
                         <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></div>
                         <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                         <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                       </div>
                     )}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input - Now floating with blur */}
      <ChatInput
        onSendMessage={onSendMessage}
        isLoading={isLoading}
        multimodalEnabled={multimodalEnabled}
        isImageGenerator={isImageGenerator}
      />
    </div>
  );
};