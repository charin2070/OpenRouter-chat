'use client';

import { ChatMessage } from '@/lib/types';
import { MessageBubble } from './message-bubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  return (
    <ScrollArea ref={scrollAreaRef} className="flex-1">
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="chatgpt-welcome flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="chatgpt-welcome-icon flex items-center justify-center mb-4">
              <span className="text-white text-xl font-bold">G</span>
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              Chat GoAI
            </h3>
            <p className="text-gray-400 max-w-md">
              Я могу сочинить симфонию и превратить холст в шедевр.
              Но займусь твоими проблемами.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        
        {isTyping && (
          <div className="chatgpt-message chatgpt-message-assistant">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="flex items-start space-x-4">
                <div className="chatgpt-avatar chatgpt-avatar-assistant flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">G</span>
                </div>
                <div className="flex-1">
                  <div className="chatgpt-text">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: '1s',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}