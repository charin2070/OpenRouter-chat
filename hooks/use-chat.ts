'use client';

import { useState, useCallback, useRef } from 'react';
import { ChatMessage } from '@/lib/types';
import { useAiProvider } from './use-ai-provider';
import { toast } from 'sonner';

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const {
    selectedProvider,
    changeProvider,
    getCurrentProvider,
    isLoading: isProviderLoading
  } = useAiProvider('google-gemma');

  const sendMessage = useCallback(async (content: string) => {
    if (isLoading || isProviderLoading) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString() + '-user',
      role: 'user',
      content,
      timestamp: new Date(),
      status: 'sending',
    };

    // Create assistant message placeholder
    const assistantMessage: ChatMessage = {
      id: Date.now().toString() + '-assistant',
      content: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);

    try {
      // Update user message status to sent
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' as const }
            : msg
        )
      );

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      // Prepare messages for API
      const apiMessages = [...messages, userMessage].map(msg => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: apiMessages,
          provider: selectedProvider 
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to send message');
      }

      if (!response.body) {
        throw new Error('No response body received');
      }

      // Read the stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.content) {
                  accumulatedContent += data.content;
                  
                  // Update assistant message with accumulated content
                  setMessages(prev =>
                    prev.map(msg =>
                      msg.id === assistantMessage.id
                        ? { ...msg, content: accumulatedContent }
                        : msg
                    )
                  );
                }
              } catch (e) {
                // Skip invalid JSON
                continue;
              }
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      if (!accumulatedContent.trim()) {
        throw new Error('No response content received');
      }

    } catch (error) {
      console.error('Send message error:', error);
      
      if (error instanceof Error && error.name === 'AbortError') {
        // Request was aborted, just clean up
        setMessages(prev => prev.filter(msg => 
          msg.id !== userMessage.id && msg.id !== assistantMessage.id
        ));
        return;
      }

      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      // Update assistant message to show error as AI response with red styling
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'error' as const }
            : msg.id === assistantMessage.id
            ? { 
                ...msg, 
                content: `❌ **Ошибка:** ${errorMessage}\n\nПожалуйста, попробуйте еще раз или выберите другую модель.`,
                status: 'error' as const
              }
            : msg
        )
      );

      toast.error('Failed to send message', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading, selectedProvider, isProviderLoading]);

  const clearChat = useCallback(() => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    
    setMessages([]);
    setIsLoading(false);
    toast.success('Chat cleared');
  }, []);

  const retryLastMessage = useCallback(() => {
    if (messages.length >= 2) {
      const lastUserMessage = messages[messages.length - 2];
      if (lastUserMessage.role === 'user') {
        // Remove the last two messages (user + assistant) and resend
        setMessages(prev => prev.slice(0, -2));
        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading: isLoading || isProviderLoading,
    selectedProvider,
    setSelectedProvider: changeProvider,
    getCurrentProvider,
    sendMessage,
    clearChat,
    retryLastMessage,
  };
}