'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MessageSquare, Trash2, Bot } from 'lucide-react';
import { AI_PROVIDERS, AIProvider } from '@/lib/types';

interface SidebarProps {
  onNewChat: () => void;
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
}

export function Sidebar({ onNewChat, selectedProvider, onProviderChange }: SidebarProps) {
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

      {/* AI Provider Selection */}
      <div className="px-3 pb-3">
        <div className="text-xs font-medium text-gray-400 mb-2 flex items-center">
          <Bot className="w-3 h-3 mr-1" />
          AI Provider
        </div>
        <Select value={selectedProvider} onValueChange={onProviderChange}>
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="Select AI provider" />
          </SelectTrigger>
          <SelectContent>
            {AI_PROVIDERS.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{provider.name}</span>
                  <span className="text-xs text-gray-500">{provider.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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