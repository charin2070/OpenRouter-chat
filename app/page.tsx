'use client';

import { useChat } from '@/hooks/use-chat';
import { ChatHeader } from '@/components/chat/chat-header';
import { MessageList } from '@/components/chat/message-list';
import { MessageInput } from '@/components/chat/message-input';
import { ErrorMessage } from '@/components/chat/error-message';
import { LogUploader } from '@/components/chat/log-uploader';

export default function ChatPage() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    retryLastMessage,
  } = useChat();

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <ChatHeader 
        messageCount={messages.length} 
        onClearChat={clearChat} 
      />
      <LogUploader />

      <div className="flex-1 flex flex-col min-h-0">
        <MessageList messages={messages} isTyping={isLoading} />
        
        {error && (
          <ErrorMessage 
            message={error} 
            onRetry={retryLastMessage}
          />
        )}
        
        <MessageInput 
          onSendMessage={sendMessage} 
          disabled={isLoading} 
        />
      </div>
    </div>
  );
}