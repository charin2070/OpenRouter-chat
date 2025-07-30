# Gemma Chat Application

A professional chat application that communicates with Google's Gemma 3b model through the OpenRouter service. Built with Next.js, TypeScript, and shadcn/ui components.

## Features

- 🤖 **AI Chat Interface**: Real-time streaming responses from Google Gemma 3b model
- 💬 **Modern UI**: Clean, professional design with message bubbles and animations
- ⚡ **Real-time Streaming**: See AI responses appear in real-time as they're generated
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🛡️ **Error Handling**: Graceful error handling with retry functionality
- 🧹 **Chat Management**: Clear chat history with confirmation dialog
- ⌨️ **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines
- 🎨 **Professional Styling**: Beautiful gradients, animations, and micro-interactions

## Technology Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: OpenRouter API with Google Gemma 3b model
- **Package Manager**: pnpm (recommended) or npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- OpenRouter API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gemma-chat-app
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local` and update if needed
   - The OpenRouter API key is pre-configured for the Gemma 3b free tier

4. Start the development server:
   ```bash
   pnpm redev
   # or
   npm run redev
   ```

   The `redev` script includes a 20-second countdown and automatically opens your browser to `http://localhost:3000`.

### Alternative Development Commands

```bash
# Standard development server
pnpm dev
# or
npm run dev

# Build for production
pnpm build
# or  
npm run build

# Start production server
pnpm start
# or
npm start
```

## API Configuration

The application is configured to use:
- **Model**: `google/gemma-2-9b-it:free` (Google Gemma 3b Free tier)
- **API Endpoint**: OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`)
- **Features**: Streaming responses, temperature control, token limits

## Project Structure

```
├── app/
│   ├── api/chat/          # API route for OpenRouter communication
│   ├── globals.css        # Global styles and Tailwind CSS
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main chat page
├── components/
│   ├── chat/              # Chat-specific components
│   │   ├── chat-header.tsx     # Header with clear chat functionality
│   │   ├── message-list.tsx    # Scrollable message container
│   │   ├── message-bubble.tsx  # Individual message bubbles
│   │   ├── message-input.tsx   # Input field with send button
│   │   └── error-message.tsx   # Error display with retry
│   └── ui/                # shadcn/ui components
├── hooks/
│   └── use-chat.ts        # Custom hook for chat functionality
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── openrouter.ts      # OpenRouter API integration
│   └── utils.ts           # Utility functions
└── .env.local             # Environment variables
```

## Key Features Explained

### Streaming Responses
The application uses Server-Sent Events (SSE) to stream AI responses in real-time, providing a smooth chat experience.

### Message Status Indicators
Each message shows its status:
- **Sending**: Single check mark (gray)
- **Sent**: Double check mark (blue)  
- **Error**: Alert circle (red)

### Error Handling
- Network errors are caught and displayed with retry options
- API errors show user-friendly messages
- Graceful degradation when streaming fails

### Responsive Design
- Mobile-first design approach
- Adaptive message bubble sizes
- Touch-friendly interface elements
- Proper keyboard navigation

## Environment Variables

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
NEXT_PUBLIC_APP_NAME=Gemma Chat
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Security Considerations

- API keys are stored server-side only
- Rate limiting considerations implemented
- Input validation on all API endpoints
- Secure error handling without exposing internals

## Performance Optimizations

- Efficient React rendering patterns
- Proper memoization of components
- Optimized bundle size with Next.js
- Streaming responses to reduce perceived latency

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add appropriate tests
5. Submit a pull request

## License

This project is licensed under the MIT License. See LICENSE file for details.

## Support

For issues and questions:
1. Check the [OpenRouter documentation](https://openrouter.ai/docs)
2. Review the GitHub issues
3. Create a new issue with detailed information

---

Built with ❤️ using Next.js, TypeScript, and the power of Google's Gemma AI model.