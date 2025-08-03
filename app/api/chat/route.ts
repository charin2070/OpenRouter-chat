export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToProvider, parseStreamChunk } from '@/lib/openrouter';
import { AIProvider } from '@/lib/types';
import { getModels } from '@/lib/mistral';

export async function POST(request: NextRequest) {
  try {
    const { messages, provider = 'google-gemma' } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: { message: 'Messages array is required' } },
        { status: 400 }
      );
    }

    // Валидация провайдера
    const validProviders: AIProvider[] = ['google-gemma', 'mistral-medium'];
    if (!validProviders.includes(provider)) {
      return NextResponse.json(
        { error: { message: 'Invalid provider specified' } },
        { status: 400 }
      );
    }

    const stream = await sendMessageToProvider(messages, provider);
    const reader = stream.getReader();
    const decoder = new TextDecoder();

    const customReadable = new ReadableStream({
      start(controller) {
        async function pump() {
          try {
            while (true) {
              const { done, value } = await reader.read();
              
              if (done) {
                controller.close();
                break;
              }

              const chunk = decoder.decode(value, { stream: true });
              const content = parseStreamChunk(chunk);
              
              if (content) {
                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
            }
          } catch (error) {
            console.error('Stream error:', error);
            controller.error(error);
          }
        }
        pump();
      },
    });

    return new Response(customReadable, {
      headers: {
        'Content-Type': 'text/stream-event',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { 
        error: { 
          message: error instanceof Error ? error.message : 'Internal server error' 
        } 
      },
      { status: 500 }
    );
  }
}