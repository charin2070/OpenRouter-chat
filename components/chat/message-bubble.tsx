'use client';

import { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Check, CheckCheck, AlertCircle, User, RotateCcw, Edit, Copy } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import React, { useRef, useState } from 'react';

interface MessageBubbleProps {
  message: ChatMessage;
  userAvatar: string | null;
  onRepeatMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string) => void;
}

export function MessageBubble({ message, userAvatar, onRepeatMessage, onEditMessage }: MessageBubbleProps) {
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

        <div className={cn(
          'text-sm leading-relaxed',
          isUser ? 'text-gray-200' : 'text-gray-300',
          isError && !isUser && 'text-red-300'
        )}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypePrism]}
            components={{
              pre: ({ children, ...props }) => {
                const preRef = useRef<HTMLPreElement | null>(null);
                const [copied, setCopied] = useState(false);

                const onCopy = async () => {
                  try {
                    const text = preRef.current?.textContent || '';
                    if (text) {
                      await navigator.clipboard.writeText(text);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }
                  } catch (e) {
                    // no-op
                  }
                };

                return (
                  <>
                    <pre ref={preRef} {...props}>
                      {children}
                    </pre>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={onCopy}
                        className="p-1 rounded-full bg-gray-700/80 hover:bg-gray-600/80 transition-colors duration-200 opacity-80 hover:opacity-100"
                        title="Копировать код"
                        aria-label="Копировать код"
                      >
                        {copied ? (
                          <Check className="w-3 h-3 text-green-400" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-200" />
                        )}
                      </button>
                    </div>
                  </>
                );
              },
              a: ({ href, children }) => (
                <a
                  href={href || ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted hover:decoration-solid"
                >
                  {children}
                </a>
              ),
            }}
            className={cn(
              'space-y-3',
              '[&_*]:break-words',
              '[&>p]:whitespace-pre-wrap',
              '[&>ul]:list-disc [&>ul]:pl-5',
              '[&>ol]:list-decimal [&>ol]:pl-5',
              '[&>h1]:text-lg [&>h1]:font-semibold',
              '[&>h2]:text-base [&>h2]:font-semibold',
              '[&>code]:bg-black/30 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded',
              '[&>pre]:bg-black/40 [&>pre]:p-3 [&>pre]:rounded-lg [&>pre]:overflow-auto'
            )}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {isUser && (
          <div className="absolute bottom-2 right-3 flex items-center gap-1">
            <span className="text-xs text-gray-500">
              {format(message.timestamp, 'HH:mm')}
            </span>
            {getStatusIcon()}
          </div>
        )}

        {/* Action buttons for user messages */}
        {isUser && (onRepeatMessage || onEditMessage) && (
          <div className="absolute -bottom-6 left-2 flex gap-1">
            {onRepeatMessage && (
              <button
                onClick={() => onRepeatMessage(message.id)}
                className="p-1 rounded-full bg-gray-700/80 hover:bg-gray-600/80 transition-colors duration-200 opacity-70 hover:opacity-100"
                title="Повторить сообщение"
              >
                <RotateCcw className="w-3 h-3 text-gray-300" />
              </button>
            )}
            {onEditMessage && (
              <button
                onClick={() => onEditMessage(message.id)}
                className="p-1 rounded-full bg-gray-700/80 hover:bg-gray-600/80 transition-colors duration-200 opacity-70 hover:opacity-100"
                title="Редактировать сообщение"
              >
                <Edit className="w-3 h-3 text-gray-300" />
              </button>
            )}
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