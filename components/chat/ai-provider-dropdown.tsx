'use client';

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      <Select 
  value={safeSelectedProvider} 
  onValueChange={(value) => {
    console.log('Dropdown value changed to:', value);
    onProviderChange(value as AIProvider);
  }}
>
  {providers.map((provider) => (
    <SelectItem key={provider.index} value={provider.index}>
      <div className="flex items-center gap-2">
        {getProviderIcon(provider.index as AIProvider)}
        <span className="truncate">{provider.name}</span>
        {showStatus && (
          <Badge 
            variant={getProviderStatus(provider.index as AIProvider).variant} 
            className="text-xs flex-shrink-0"
          >
            {getProviderStatus(provider.index as AIProvider).text}
          </Badge>
        )}
      </div>
    </SelectItem>
  ))}
</Select>
    </div>
  );
}




