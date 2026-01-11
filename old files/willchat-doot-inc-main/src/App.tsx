import React, { useState } from 'react';
import { Menu, User, LogOut, MoreVertical } from 'lucide-react';
import { UserMenu } from './components/UserMenu';
import { Sidebar } from './components/Sidebar';
import { ChatInterface } from './components/ChatInterface';
import { ModelSelector } from './components/ModelSelector';
import { AllModelsModal } from './components/AllModelsModal';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';
import { ContextMenu } from './components/ContextMenu';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import { useModel } from './hooks/useModel';
import { useAuth } from './hooks/useAuth';
import { auth } from './services/firebase';
import { signOut } from 'firebase/auth';
import { ModelType } from './types/chat';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; conversationId: string; } | null>(null);
  const [externalEditTrigger, setExternalEditTrigger] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const { user, reloadUser } = useAuth();

  const {
    conversations,
    activeConversation,
    activeConversationId,
    isLoading,
    sendMessage,
    regenerateMessage,
    createNewConversation,
    selectConversation,
    editConversationTitle,
    deleteConversation,
  } = useChat();

  const { selectedModel, currentModel, availableModels, selectModel } = useModel(createNewConversation);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModelChange = (modelId: string) => {
    selectModel(modelId as any);
  };

  const handleSelectModelFromModal = (modelId: ModelType) => {
    selectModel(modelId);
    setShowAllModels(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleMobileMenuTrigger = (conversationId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setContextMenu({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      conversationId: conversationId
    });
  };

  const handleEditTitle = (conversationId: string) => {
    setContextMenu(null);
    setExternalEditTrigger(conversationId);
    // Reset after a short delay to allow re-triggering
    setTimeout(() => setExternalEditTrigger(null), 100);
  };

  const handleDeleteChat = (conversationId: string) => {
    deleteConversation(conversationId);
    setContextMenu(null);
  };

  const handleSendMessage = (message: string, images?: string[]) => {
    sendMessage(message, images, selectedModel);
  };

  const handleRegenerateMessage = (messageId: string) => {
    regenerateMessage(messageId, selectedModel);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={selectConversation}
        onNewConversation={createNewConversation}
        onEditConversationTitle={editConversationTitle}
        onDeleteConversation={deleteConversation}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        externalEditTrigger={externalEditTrigger}
        onMobileMenuTrigger={handleMobileMenuTrigger}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div
          className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 relative transition-colors duration-300"
          style={{ zIndex: 10 }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            <ModelSelector
              currentModel={currentModel}
              availableModels={availableModels}
              onSelectModel={handleModelChange}
              onShowAllModels={() => setShowAllModels(true)}
            />
          </div>
          
           <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
             <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
               {activeConversation?.title || 'New chat'}
             </h2>
           </div>
          
          <div className="flex items-center gap-2">
            {user ? (
              <UserMenu user={user} onOpenProfile={() => setShowProfileModal(true)} />
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 min-h-0" style={{ position: 'relative', zIndex: 1 }}>
           <ChatInterface
             messages={activeConversation?.messages || []}
             onSendMessage={handleSendMessage}
             onRegenerateMessage={handleRegenerateMessage}
             isLoading={isLoading}
             multimodalEnabled={currentModel.multimodal}
             isImageGenerator={currentModel.isImageGenerator}
             isReasoningModel={currentModel.isReasoning}
             isCoderModel={currentModel.isCoder}
             isDark={isDark}
           />
        </div>
      </div>

      {showAllModels && (
        <AllModelsModal
          currentModel={currentModel}
          onSelectModel={handleSelectModelFromModal}
          onClose={() => setShowAllModels(false)}
        />
      )}

      {showLoginModal && (
        <AuthModal onClose={() => setShowLoginModal(false)} />
      )}

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} onProfileUpdate={reloadUser} />
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onEdit={() => handleEditTitle(contextMenu.conversationId)}
          onDelete={() => handleDeleteChat(contextMenu.conversationId)}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}

export default App;

