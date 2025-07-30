'use client';

import { Button } from '@/components/ui/button';
import { Trash2, MessageSquare } from 'lucide-react';
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

interface ChatHeaderProps {
  messageCount: number;
  onClearChat: () => void;
}

export function ChatHeader({ messageCount, onClearChat }: ChatHeaderProps) {
  return (
    <div className="border-b bg-white px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold">G</span>
          </div>
          <div>
            <h1 className="font-semibold text-gray-800">Gemma Chat</h1>
            <p className="text-sm text-gray-600">
              {messageCount === 0 
                ? 'Ready to chat' 
                : `${Math.ceil(messageCount / 2)} ${Math.ceil(messageCount / 2) === 1 ? 'conversation' : 'conversations'}`
              }
            </p>
          </div>
        </div>
        
        {messageCount > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-gray-600 hover:text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Chat
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear Chat History</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to clear all messages? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={onClearChat}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Clear Chat
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}