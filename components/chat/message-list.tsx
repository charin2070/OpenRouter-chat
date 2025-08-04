'use client';

import { ChatMessage } from '@/lib/types';
import { MessageBubble } from './message-bubble';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { TetrisSpinner } from '@/components/ui/tetris-spinner';

interface MessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export function MessageList({ messages, isTyping }: MessageListProps) {
  const { session } = useAuth();
  const userAvatar = session?.user?.image || null;
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
          <div className="flex flex-row items-center justify-center h-100 text-center px-4">
        
              <Image
                src="/favicon.svg"
                alt="Chat GoAI Logo"
                width={68}
                height={68}
                priority
              />
     
            <p className="text-gray-400 max-w-sm font-light text-md text-left">
              Я могу сочинить симфонию и превратить холст в шедевр, но вы
              <span
                className="text-gray-200 max-w-md font-bold text-md"
                style={{ filter: 'blur(6px)', cursor: 'pointer' }}
                title="Содержимое скрыто"
              >выебу
              </span>
              твои логи
                 </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} userAvatar={userAvatar} />
            ))}
          </div>
        )}
        
        {isTyping && (
          <div className="flex justify-center py-6">
            <TetrisSpinner />
          </div>
        )}
      </div>
    </ScrollArea>
  );
}