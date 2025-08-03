# AI-Chat

A professional chat application that analyzes log files with Google's Gemma 3b model through the OpenRouter service. Built with Next.js, TypeScript, and shadcn/ui components.

## Features

- 🔐 **Google Authentication**: Secure sign-in with Google OAuth
- 🤖 **AI Chat Interface**: Real-time streaming responses from Google Gemma 3b model
- 💬 **Modern UI**: Clean, professional design with message bubbles and animations
- ⚡ **Real-time Streaming**: See AI responses appear in real-time as they're generated
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🛡️ **Error Handling**: Graceful error handling with retry functionality
- 🧹 **Chat Management**: Clear chat history with confirmation dialog
- 👤 **User Profile**: Display user information and sign-out functionality
- ⌨️ **Keyboard Shortcuts**: Enter to send, Shift+Enter for new lines
- 🎨 **Professional Styling**: Beautiful gradients, animations, and micro-interactions

## Technology Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with shadcn/ui components
- **Authentication**: NextAuth.js with Google OAuth
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
│   ├── api/
│   │   ├── auth/[...nextauth]/ # NextAuth API routes
│   │   └── chat/          # API route for OpenRouter communication
│   ├── globals.css        # Global styles and Tailwind CSS
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main chat page
├── components/
│   ├── auth/              # Authentication components
│   │   ├── sign-in.tsx    # Google Sign-In component
│   │   └── user-profile.tsx # User profile dropdown
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
│   ├── auth-context.tsx   # Authentication context
│   ├── types.ts           # TypeScript interfaces
│   ├── openrouter.ts      # OpenRouter API integration
│   └── utils.ts           # Utility functions
└── .env.local             # Environment variables
```

## Key Features Explained

### Google Authentication
The application uses NextAuth.js with Google OAuth for secure user authentication:
- **Sign In**: Users can sign in with their Google account
- **Session Management**: Automatic session handling and persistence
- **User Profile**: Display user information and sign-out functionality
- **Protected Routes**: Chat interface is only accessible to authenticated users

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

Create a `.env.local` file in the root directory with the following variables:

```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# App Configuration
NEXT_PUBLIC_APP_NAME=Gemma Chat
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Tetris Spinner Configuration
NEXT_PUBLIC_SPINNER_SPEED=300

# Google OAuth Configuration
# Get these from https://console.cloud.google.com/apis/credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Setting up Google OAuth

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API (or Google Identity API)
4. Go to "Credentials" and create an "OAuth 2.0 Client ID"
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local` file

### Generating NextAuth Secret

You can generate a secure secret using:
```bash
openssl rand -base64 32
```

### Environment Variables Explained

- **OPENROUTER_API_KEY**: Your OpenRouter API key for AI model access
- **NEXT_PUBLIC_APP_NAME**: The name of your application (displayed in UI)
- **NEXT_PUBLIC_APP_URL**: The base URL of your application
- **NEXT_PUBLIC_SPINNER_SPEED**: Speed of Tetris spinner animation in milliseconds (default: 300ms)
- **GOOGLE_CLIENT_ID**: Google OAuth client ID for authentication
- **GOOGLE_CLIENT_SECRET**: Google OAuth client secret for authentication
- **NEXTAUTH_SECRET**: Secret key for NextAuth.js session encryption
- **NEXTAUTH_URL**: The base URL for NextAuth.js callbacks

### Complete Setup Steps

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Set up environment variables**:
   - Copy the example environment variables above
   - Create a `.env.local` file in the root directory
   - Add your Google OAuth credentials and NextAuth secret

3. **Start the development server**:
   ```bash
   pnpm dev
   ```

4. **Access the application**:
   - Open `http://localhost:3000`
   - You'll be redirected to the sign-in page
   - Click "Sign in with Google" to authenticate
   - After successful authentication, you'll be redirected to the chat interface

## Security Considerations

- **Authentication**: Secure OAuth 2.0 flow with Google
- **Session Management**: JWT tokens with secure storage
- **API Security**: API keys are stored server-side only
- **Rate Limiting**: Considerations implemented for API endpoints
- **Input Validation**: Validation on all API endpoints
- **Error Handling**: Secure error handling without exposing internals
- **Environment Variables**: Sensitive data stored in environment variables

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