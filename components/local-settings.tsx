'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { AiProviderDropdown } from './chat/ai-provider-dropdown';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { SettingsIcon } from 'lucide-react';
import { AIProvider } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

interface LocalSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LocalSettings({ isOpen, onClose }: LocalSettingsProps) {
  const [selectedProvider, setSelectedProvider] = useState<AIProvider>('google-gemma');
  const [localProvider, setLocalProvider] = useState<AIProvider>(selectedProvider);

  useEffect(() => {
    if (selectedProvider) {
      setLocalProvider(selectedProvider);
    }
  }, [selectedProvider]);

  const handleProviderChange = useCallback((provider: AIProvider) => {
    console.log('Provider changed to:', provider);
    const validProviders: AIProvider[] = ['google-gemma', 'mistral-medium'];
    if (!validProviders.includes(provider)) {
      console.error('Invalid provider selected:', provider);
      return;
    }
    setLocalProvider(provider);
    setSelectedProvider(provider);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <Modal.Title>Настройки</Modal.Title>
        <Button onClick={onClose}>
          <SettingsIcon className="w-4 h-4" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <h2 className="text-lg font-bold">AI Провайдер</h2>
          <AiProviderDropdown
            selectedProvider={localProvider}
            onProviderChange={handleProviderChange}
            showStatus={true}
            compact={false}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
}