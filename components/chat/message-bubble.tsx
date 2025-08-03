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
  const isError = message.status === 'error';
  
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
    <div className={cn(
      'chatgpt-message',
      isUser ? 'chatgpt-message-user' : 'chatgpt-message-assistant',
      isError && !isUser && 'chatgpt-message-error'
    )}>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-start space-x-4">
          <div className={cn(
            'chatgpt-avatar flex items-center justify-center flex-shrink-0',
            isUser ? 'chatgpt-avatar-user' : 'chatgpt-avatar-assistant',
            isError && !isUser && 'chatgpt-avatar-error'
          )}>
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <span className={cn(
                "text-white text-sm font-medium",
                isError && "text-red-200"
              )}>
                {isError ? '❌' : 'G'}
              </span>
            )}
          </div>
          
          <div className="flex-1">
            <div className={cn(
              'chatgpt-text',
              isUser ? 'chatgpt-text-user' : 'chatgpt-text-assistant',
              isError && !isUser && 'chatgpt-text-error'
            )}>
              <p className={cn(
                "text-sm leading-relaxed whitespace-pre-wrap",
                isError && !isUser && "text-red-200"
              )}>
                {message.content}
              </p>
            </div>
            
            <div className="flex items-center space-x-1 mt-2 text-xs text-gray-400">
              <span>{format(message.timestamp, 'HH:mm')}</span>
              {isUser && getStatusIcon()}
              {isError && !isUser && (
                <span className="text-red-400 text-xs">Ошибка</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}