'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, Zap } from 'lucide-react';
import { AI_PROVIDERS, AIProvider } from '@/lib/types';

interface AiProviderDropdownProps {
  selectedProvider: AIProvider;
  onProviderChange: (provider: AIProvider) => void;
  className?: string;
  showStatus?: boolean;
  compact?: boolean;
}

export function AiProviderDropdown({ 
  selectedProvider, 
  onProviderChange, 
  className = '',
  showStatus = true,
  compact = false
}: AiProviderDropdownProps) {
  const getProviderIcon = (providerId: AIProvider) => {
    switch (providerId) {
      case 'google-gemma':
        return <Sparkles className="w-4 h-4" />;
      case 'mistral-medium':
        return <Zap className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  const getProviderStatus = (providerId: AIProvider) => {
    switch (providerId) {
      case 'google-gemma':
        return { text: 'Free', variant: 'default' as const };
      case 'mistral-medium':
        return { text: 'Premium', variant: 'secondary' as const };
      default:
        return { text: 'Unknown', variant: 'outline' as const };
    }
  };

  return (
    <div className={`ai-provider-dropdown ${className}`}>
      {!compact && (
        <div className="text-xs font-medium text-gray-400 mb-2 flex items-center">
          <Bot className="w-3 h-3 mr-1" />
          AI Provider
        </div>
      )}
      <Select value={selectedProvider} onValueChange={onProviderChange}>
        <SelectTrigger className="w-full h-10">
          <SelectValue placeholder="Select AI provider">
            <div className="flex items-center gap-2">
              {getProviderIcon(selectedProvider)}
              <span>{AI_PROVIDERS.find(p => p.id === selectedProvider)?.name}</span>
              {showStatus && (
                <Badge variant={getProviderStatus(selectedProvider).variant} className="text-xs">
                  {getProviderStatus(selectedProvider).text}
                </Badge>
              )}
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {AI_PROVIDERS.map((provider) => {
            const status = getProviderStatus(provider.id as AIProvider);
            return (
              <SelectItem key={provider.id} value={provider.id}>
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      {getProviderIcon(provider.id as AIProvider)}
                      <span className="font-medium">{provider.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">{provider.description}</span>
                  </div>
                  {showStatus && (
                    <Badge variant={status.variant} className="text-xs ml-2">
                      {status.text}
                    </Badge>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}




