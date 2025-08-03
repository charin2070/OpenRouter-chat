'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Alert className="max-w-4xl mx-auto m-4 border-red-500/20 bg-red-500/10">
      <AlertCircle className="h-4 w-4 text-red-400" />
      <AlertDescription className="text-red-300 flex items-center justify-between">
        <span>{message}</span>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="ml-4 text-red-300 border-red-500/30 hover:bg-red-500/20"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Retry
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}