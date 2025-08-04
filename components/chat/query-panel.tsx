import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Paperclip, ChevronDown, Send } from "lucide-react";
import DropButton from '@/components/ui/drop-button';
import { UserProfile } from '@/components/auth/user-profile';

// Define the QueryPanel component

const QueryPanel = ({ onSendMessage, placeholder, selectedProvider, onProviderChange }: { onSendMessage: (message: string) => void; placeholder?: string; selectedProvider: string; onProviderChange: (value: string) => void; }) => {
  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="bg-black bg-opacity-50 backdrop-blur-md ring-1 ring-gray-800 hover:ring-gray-700 focus-within:ring-gray-700 hover:focus-within:ring-gray-700 relative w-full overflow-hidden shadow shadow-black/10 rounded-3xl p-3 transition-all duration-100 ease-in-out flex flex-col max-w-2xl mx-auto">
      <div className="relative z-10 mb-12">

<UserProfile />

        <textarea
          dir="auto"
          aria-label="Опишите детали..."
          className="w-full px-3 pt-5 bg-transparent focus:outline-none text-gray-200 align-bottom resize-none h-11 text-sm"
          style={{ height: "44px" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
        />

      </div>
      
      <div className="flex items-center">
            <Select value={selectedProvider} onValueChange={onProviderChange}>
              <SelectTrigger className="h-10 px-3 py-2 text-sm rounded-full border border-gray-700 bg-black bg-opacity-60 backdrop-blur-md hover:bg-gray-700 hover:bg-opacity-80 focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600 w-fit gap-2 text-gray-300 transition-all duration-200 ease-in-out">
                <SelectValue placeholder="Mistral Medium" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google-gemma">Gemma 3</SelectItem>
                <SelectItem value="mistral-medium">Mistral Medium</SelectItem>
              </SelectContent>
            </Select>
   
      
        <div className="ml-auto flex flex-row items-end gap-1">
          <DropButton 
            label=""
            width="46px"
            height="46px"
            bgColor="transparent"
            textColor="gray-200"
            icon={Send}
            iconWidth="56px"
            iconHeight="56px"
            
            onClick={handleSendMessage} 
          />
        </div>

      </div>
    </div>
  );
};

export default QueryPanel;