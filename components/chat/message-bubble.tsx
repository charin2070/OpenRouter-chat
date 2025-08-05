'use client';

import { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Check, CheckCheck, AlertCircle, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MessageBubbleProps {
  message: ChatMessage;
  userAvatar: string | null;
}

export function MessageBubble({ message, userAvatar }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'sent':
        return <CheckCheck className="w-4 h-4 text-blue-400" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const avatar = (
    <Avatar className={cn('flex-shrink-0 w-10 h-10 rounded-full', isError && !isUser && 'border-2 border-red-500')}>
      <AvatarImage src={isUser ? userAvatar || '' : ''} alt={isUser ? 'User' : 'AI'} />
      <AvatarFallback className={cn(
        'text-white font-bold',
        isUser ? 'bg-blue-500' : 'bg-gray-700',
        isError && !isUser && 'bg-red-800'
      )}>
        {isUser ? <User size={20} /> : 'AI'}
      </AvatarFallback>
    </Avatar>
  );

  return (
    <div className={cn('flex items-start gap-4 w-full', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && avatar}
      <div className={cn(
        'relative max-w-xl min-w-[120px] rounded-xl p-4 pb-8 shadow-lg transition-all duration-300 hover:shadow-2xl',
        isUser
          ? 'bg-blue-900/50 border border-blue-800/50'
          : 'bg-gray-800/50 border border-gray-700/50',
        isError && !isUser && 'bg-red-900/50 border-red-800/50'
      )}>
        {/* Increased bottom padding to pb-8 to prevent text overlap */}
        {!isUser && (
          <div className="flex items-center justify-between mb-2">
            <span className={cn(
              'font-semibold text-sm',
              isError ? 'text-red-300' : 'text-gray-300'
            )}>
              AI Ассистент
            </span>
            <span className="text-xs text-gray-500">
              {format(message.timestamp, 'HH:mm')}
            </span>
          </div>
        )}

        <p className={cn(
          'text-sm leading-relaxed whitespace-pre-wrap',
          isUser ? 'text-gray-200' : 'text-gray-300',
          isError && !isUser && 'text-red-300'
        )}>
          {message.content}
        </p>

        {isUser && (
          <div className="absolute bottom-2 right-3 flex items-center gap-1">
            <span className="text-xs text-gray-500">
              {format(message.timestamp, 'HH:mm')}
            </span>
            {getStatusIcon()}
          </div>
        )}

        {isError && !isUser && (
          <div className="mt-2 text-xs text-red-400">
            Произошла ошибка при получении ответа.
          </div>
        )}
      </div>
      {isUser && avatar}
    </div>
  );
}