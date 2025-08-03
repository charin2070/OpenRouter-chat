'use client';

import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';

interface SidebarProps {
  onNewChat: () => void;
}

export function Sidebar({ onNewChat }: SidebarProps) {
  return (
    <div className="chatgpt-sidebar flex flex-col h-full">
      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={onNewChat}
          className="chatgpt-new-chat-button w-full justify-start h-10 px-3"
          variant="outline"
        >
          <Plus className="w-4 h-4 mr-2" />
          New chat
        </Button>
      </div>

      {/* Chat History (placeholder for now) */}
      <div className="flex-1 overflow-y-auto px-3">
        {/* This would contain chat history items */}
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-gray-700">
        <Button
          onClick={onNewChat}
          className="chatgpt-clear-button w-full justify-start h-10 px-3"
          variant="outline"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear conversations
        </Button>
      </div>
    </div>
  );
} 