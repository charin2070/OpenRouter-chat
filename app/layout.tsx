import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gemma Chat - AI Assistant',
  description: 'Chat with Google Gemma 3b model via OpenRouter',
  keywords: ['AI', 'chat', 'Gemma', 'Google', 'OpenRouter'],
  authors: [{ name: 'Gemma Chat App' }],
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}