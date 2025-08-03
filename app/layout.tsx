import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'Chat GoAI',
  description: 'Chat with AI assistant powered by GoAI model',
  keywords: ['AI', 'chat', 'ChatGPT', 'OpenRouter'],
  authors: [{ name: 'Chat GoAI' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased bg-gray-900">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}