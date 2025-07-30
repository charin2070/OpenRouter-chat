export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { sendMessageToGemma, parseStreamChunk } from '@/lib/openrouter';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: { message: 'Messages array is required' } },
        { status: 400 }
      );
    }

    const stream = await sendMessageToGemma(messages);
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