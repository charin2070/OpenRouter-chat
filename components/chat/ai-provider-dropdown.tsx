'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Sparkles, Zap } from 'lucide-react';
import { AIProvider, AIModel } from '@/lib/types';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

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
  const [providers, setProviders] = useState<AIModel[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'ai_models')
        .single();

      if (error) {
        console.error('Error fetching AI providers:', error);
        return;
      }

      // The value from Supabase is a JSON array, so we parse it.
      // We also need to assert the type for TypeScript.
      const providerData = data.value as any[];
      
      // The data from the DB has `id`, `name`, `description`.
      // The `AIModel` type has `index`, `name`, `description`.
      // We need to map `id` to `index`.
      setProviders(providerData.map(p => ({ ...p, index: p.id })));
    };

    fetchProviders();
  }, []);
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

  // Get the selected provider's name and ensure it's always a string
  const selectedProviderName = providers.find(p => p.index === selectedProvider)?.name || 
                             (selectedProvider || 'Select a model');

  // Ensure we have a valid selected provider
  const safeSelectedProvider = selectedProvider || (providers[0]?.index as AIProvider | undefined) || 'google-gemma';

  return (
    <div className={`ai-provider-dropdown ${className}`}>
      {!compact && (
        <div className="text-xs font-medium text-gray-400 mb-2 flex items-center">
          <Bot className="w-3 h-3 mr-1" />
          AI Provider
        </div>
      )}
      <div className="relative">
        <select 
          value={safeSelectedProvider} 
          onChange={(e) => {
            console.log('Dropdown value changed to:', e.target.value);
            onProviderChange(e.target.value as AIProvider);
          }}
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
        >
          {providers.map((provider) => (
            <option key={provider.index} value={provider.index}>
              {provider.name}
              {showStatus && ` (${getProviderStatus(provider.index as AIProvider).text})`}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {getProviderIcon(safeSelectedProvider)}
        </div>
      </div>
      {showStatus && (
        <div className="mt-2 flex items-center gap-2">
          <Badge 
            variant={getProviderStatus(safeSelectedProvider).variant} 
            className="text-xs"
          >
            {getProviderStatus(safeSelectedProvider).text}
          </Badge>
        </div>
      )}
    </div>
  );
}




