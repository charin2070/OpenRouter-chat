'use client';

import { useChat } from '@/hooks/use-chat';
import { ChatHeader } from '@/components/chat/chat-header';
import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { ErrorMessage } from '@/components/chat/error-message';
import { LogUploader } from '@/components/chat/log-uploader';
import { Sidebar } from '@/components/chat/sidebar';
import { SignIn } from '@/components/auth/sign-in';
import { useAuth } from '@/lib/auth-context';
import { Loading } from '@/components/ui/loading';
import QueryPanel from '@/components/chat/query-panel';

export default function ChatPage() {
  const { session, status, isLoading } = useAuth();
  
  const {
    messages,
    isLoading: chatLoading,
    selectedProvider,
    setSelectedProvider,
    sendMessage,
    clearChat,
    retryLastMessage,
  } = useChat();

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
    <div className="chatgpt-container flex h-screen">
      <div className="chatgpt-main flex flex-col flex-1">

        <div className="flex-1 flex flex-col min-h-0">
          <MessageList messages={messages} isTyping={chatLoading} />
          <QueryPanel 
            placeholder='Добавьте детали...'
            onSendMessage={sendMessage}
            selectedProvider={selectedProvider}
            onProviderChange={(value) => setSelectedProvider(value as any)}
          />
        </div>
      </div>
    </div>
  );
}