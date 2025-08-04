'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { UserProfile } from '@/components/auth/user-profile';
import { AiProviderInfo } from './ai-provider-info';
import { AIProvider } from '@/lib/types';

interface ChatHeaderProps {
  messageCount: number;
  onClearChat: () => void;
  selectedProvider: AIProvider;
}

export function ChatHeader({ messageCount, onClearChat, selectedProvider }: ChatHeaderProps) {
  return (
    <>
      <div className="chatgpt-message border-b border-gray-700 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="chatgpt-avatar chatgpt-avatar-assistant flex items-center justify-center">
              <span className="text-white text-sm font-medium">G</span>
            </div>
            <div>
              <h1 className="chatgpt-text font-medium">ChatGPT</h1>
              <p className="text-sm text-gray-400">
                {messageCount === 0
                  ? 'Ready to chat'
                  : `${Math.ceil(messageCount / 2)} ${Math.ceil(messageCount / 2) === 1 ? 'conversation' : 'conversations'
                  }`}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* AI Provider Info */}
            <AiProviderInfo
              provider={selectedProvider}
              showDescription={false}
              className="hidden md:flex"
            />

            {messageCount > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="chatgpt-clear-button text-gray-300 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Chat
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Clear Chat History</AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-300">
                      Are you sure you want to clear all messages? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={onClearChat}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Clear Chat
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            
          </div>
        </div>
      </div>


    </>
  );
}