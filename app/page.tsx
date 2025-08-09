'use client';

import { useChat } from '@/hooks/use-chat';
import { ChatHeader } from '@/components/chat/chat-header';
import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { ErrorMessage } from '@/components/chat/error-message';
import { LogUploader } from '@/components/chat/log-uploader';

import { SignIn } from '@/components/auth/sign-in';
import { useAuth } from '@/lib/auth-context';
import { Loading } from '@/components/ui/loading';
import QueryPanel, { QueryPanelRef } from '@/components/chat/query-panel';
import { AppNavbar } from '@/components/app-navbar';
import { useRef } from 'react';

export default function ChatPage() {
  const { session, status, isLoading } = useAuth();
  const queryPanelRef = useRef<QueryPanelRef>(null);
  
  const {
    messages,
    isLoading: chatLoading,
    sendMessage,
    clearChat,
    retryLastMessage,
    repeatMessage,
    editMessage,
  } = useChat();

  const handleEditMessage = (messageId: string) => {
    const messageContent = editMessage(messageId);
    if (messageContent && queryPanelRef.current) {
      queryPanelRef.current.setInputValue(messageContent);
    }
  };

  // Show loading state while checking authentication
  if (isLoading || status === 'loading') {
    return <Loading />;
  }

  // Show sign-in page if not authenticated
  if (status === 'unauthenticated' || !session) {
    return <SignIn />;
  }

  // Show chat interface if authenticated
  return (
    <div className="chatgpt-container flex h-screen flex-col">
      <AppNavbar className="h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-lg" />
      <div className="chatgpt-main flex flex-col flex-1">
        <div className="flex-1 flex flex-col min-h-0">
          <MessageList 
            messages={messages} 
            isTyping={chatLoading} 
            onRepeatMessage={repeatMessage}
            onEditMessage={handleEditMessage}
          />
          <QueryPanel 
            ref={queryPanelRef}
            placeholder='Добавьте детали...'
            onSendMessage={sendMessage}
            onClearChat={clearChat}
          />
        </div>
      </div>
    </div>
  );
}