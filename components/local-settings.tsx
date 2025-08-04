'use_client';

import React from 'react';
import { useState } from 'react';

export function LocalSettings() {
    // Default settings
    const defaultSettings = { activeProvider: 'google-gemma', theme: 'light', language: 'rus', maxTokens: 1000, temperature: 0.7  };

    // Check and apply settings from localStorage or set default settings
    const localStorageData = localStorage.getItem('settings');
    const settings = localStorageData ? JSON.parse(localStorageData) : defaultSettings;

    if (!localStorageData) {
        localStorage.setItem('settings', JSON.stringify(defaultSettings));
    }

    const activeProvider = settings.activeProvider;

    const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newProvider = event.target.value;
        settings.activeProvider = newProvider;
        localStorage.setItem('settings', JSON.stringify(settings));
        window.location.reload();
    };

    return (
        <div className="local-settings">
            <h2>Local Settings</h2>
            <label htmlFor="provider-select">Select AI Provider:</label>
            <select id="provider-select" value={activeProvider} onChange={handleProviderChange}>
                <option value="google-gemma">Google Gemma</option>
                <option value="mistral-medium">Mistral Medium</option>
            </select>
        </div>
    );
}