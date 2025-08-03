'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="chatgpt-input-container p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Message ChatGPT..."
              disabled={disabled}
              className={cn(
                'chatgpt-input-box min-h-[44px] max-h-[120px] resize-none pr-12 transition-colors',
                'focus:ring-0 focus:border-blue-500',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              rows={1}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            size="default"
            className={cn(
              'chatgpt-send-button h-11 px-4 transition-all duration-200',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            {disabled ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </div>
        
        <div className="mt-2 text-xs text-gray-400 text-center">
          ChatGPT can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  );
}