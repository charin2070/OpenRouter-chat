'use client';

import { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Check, CheckCheck, AlertCircle, User } from 'lucide-react';

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'sent':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300',
        isUser && 'flex-row-reverse space-x-reverse'
      )}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
        {isUser ? (
          <div className="w-full h-full bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">G</span>
          </div>
        )}
      </div>
      
      <div className={cn('flex flex-col max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 break-words',
            isUser
              ? 'bg-blue-500 text-white rounded-br-md'
              : 'bg-gray-100 text-gray-800 rounded-bl-md'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </div>
        
        <div
          className={cn(
            'flex items-center space-x-1 mt-1 text-xs text-gray-500',
            isUser && 'justify-end'
          )}
        >
          <span>{format(message.timestamp, 'HH:mm')}</span>
          {isUser && getStatusIcon()}
        </div>
      </div>
    </div>
  );
}