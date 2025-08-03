# GoAI Timeline

GoAI Timeline: анализ и визуализация инцидентов по логам и чатам
Питч проекта. Сегодня крупные ИТ-системы генерируют тысячи событий: логи, оповещения мониторинга и сообщения в чатах. Это создает «информационный шум», из‑за которого команды поддержки тратят часы на поиск причин сбоев
bigpanda.io
. GoAI Timeline предлагает автоматизировать этот процесс: приложение собирает данные из всех источников, выявляет аномальные события и отображает их на единой временной шкале. Такой подход соответствует тренду AIOps – использования ИИ для аналитики ИТ-инцидентов
bigpanda.io
splunk.com
. Он помогает быстро понять цепочку событий, точно определить корневую причину проблемы (RCA) и сократить время простоя систем
splunk.com
bigpanda.io
. Автоматическая корреляция инцидентов повышает эффективность служб поддержки и предотвращает повторные аварии – по оценке EMA Research, незапланированный простой в среднем обходится компании более чем в $14 500 за минуту
bigpanda.io
.
Инцидентная хронология объединяет все активности: сообщения команды (чат), оповещения и изменения статусов инцидента
atlassian.com
. Как отмечает Atlassian, такая единая шкала «сводит команду в одну страницу» и ускоряет разбор инцидентов
atlassian.com
atlassian.com
.
Полная запись событий позволяет при постмортеме восстановить, что, когда и почему произошло
atlassian.com
. Это экономит десятки часов на анализе и помогает команде устранить не только симптом, но и истинную причину сбоя
atlassian.com
splunk.com
.
GoAI Timeline дает ценность разным специалистам. Инженеры поддержки и SRE моментально видят подробную картину инцидента, аналитики – могут быстро сконцентрироваться на наиболее критичных аномалиях, а руководители проектов – получать KPI (MTTR, число инцидентов и пр.) и статистику для планирования улучшений
atlassian.com
bigpanda.io
.
Концепция продукта и функциональность
GoAI Timeline следует такому алгоритму обработки данных:
Сбор и нормализация данных. Пользователь загружает логи событий, переписки из рабочих чатов (Slack, Teams и др.) и оповещения мониторинга. Система централизует эти данные, готовя их к дальнейшему анализу.
Формирование таблицы событий. Для каждого исходного сообщения извлекаются ключевые поля и добавляются в таблицу globalEvents. В ней хранятся поля: уникальный id, correlation_id (идентификатор транзакции), source_service (сервис, где произошло событие), reported_service (какой сервис сообщил об этом), timestamp (время события), log_text (текст записи), anomaly_percentage (уровень аномальности относительно обычной работы) и trigger_function (функция, вызвавшая событие). Поле correlation_id связывает между собой события из разных сервисов, относящиеся к одной транзакции или проблеме
medium.com
.
Анализ аномалий и корреляция. Система использует алгоритмы AIOps/ML: обрабатывает неструктурированные логи и чат-записи, распознаёт повторяющиеся шаблоны и выявляет аномальные события
eyer.ai
eyer.ai
. Инструменты машинного обучения автоматически «парсят» текст логов, вычисляют показатели отклонения (anomaly_percentage) и связывают между собой события, связанные по смыслу или по correlation_id
eyer.ai
medium.com
. Так формируется список аномалий: система выделяет те события, которые с наибольшей вероятностью вызвали каскад других аномалий.
Определение причин и визуализация. На основе выявленных ключевых событий составляется список наиболее вероятных источников проблемы. Все события отображаются на интерактивной временной шкале (связанной с чатами и оповещениями) для наглядной визуализации последовательности. Пользователь получает готовую хронологию инцидента со всеми сигналами и переходами между ними. Это упрощает диагностику: как пишут в Atlassian, инцидентная хронология может включать «консолидированные записи страниц, оповещения и записи чата (синхронизированные со Slack)»
atlassian.com
, что помогает быстро установить последовательность и взаимосвязь событий.
GoAI Timeline фокусируется на корневом анализе (RCA – Root Cause Analysis). RCA – это структурный, основанный на данных процесс поиска фундаментальных причин проблем, который помогает предотвратить их повторение
splunk.com
. Вместо борьбы с симптомами система анализирует, что именно вызвало цепочку сбоев. Аутоматизированные AIOps-инструменты ускоряют этот анализ и делают его более точным: встраивая RCA в процессы управления инцидентами при помощи ИИ, компании «повышают надежность систем, уменьшают время простоя и повторные инциденты»
splunk.com
bigpanda.io
. Например, Splunk отмечает, что аналитика логов и метрик в сочетании с машинным обучением даёт «единую актуальную картину ИТ-сервисов», уменьшая шум оповещений и предотвращая простои
splunk.com
bigpanda.io
.
Целевая аудитория и ценность
Продукт нацелен на технические команды и менеджеров: инженеров поддержки (DevOps/SRE), аналитиков и руководителей проектов (IT-/DevOps-менеджеров). Они получат такие преимущества:
Единая картина инцидента. Инженеры поддержки работают в условиях многозадачности. Единая временная шкала по всему потоку событий позволяет сразу понять контекст и избежать «игры в телефон» между коллегами
atlassian.com
.
Ускоренное решение проблем. Автоматическая корреляция событий и приоритизация аномалий помогают быстрее сосредоточиться на наиболее критичных ошибках. По данным BigPanda, авто-корреляция алертов «снижает информационную перегрузку и усталость от оповещений»
bigpanda.io
, что сокращает время реакции (MTTR) и повышает стабильность системы
bigpanda.io
splunk.com
.
Планирование и анализ трендов. Для руководителей проекты инструмент предоставляет статистику: например, частоту и длительность инцидентов. Сохранённые хронологии можно сравнивать между собой – это помогает выявлять системные проблемы (повторяющиеся точки отказа) и улучшать процесс решения инцидентов
atlassian.com
atlassian.com
.
Технологический стек и архитектура
Интерфейс приложения реализуется на Next.js (React), используя Tailwind CSS и компоненты Shadcn UI для быстрой и адаптивной разработки фронтенда. Эта связка позволяет создавать удобный интерфейс временной шкалы и гибкие формы фильтрации данных.
Серверная часть может быть на Node.js или Python, обеспечивая API для загрузки логов и взаимодействия с БД. В качестве хранилища подойдёт реляционная БД или NoSQL (PostgreSQL, MongoDB и т.д.), где будет храниться таблица globalEvents с описанными полями. Для агрегирования логов часто используют очереди (Kafka) и движки типа ELK/EFK, но в рамках GoAI Timeline достаточно надстройки, которая вычитывает данные и наполняет таблицу событий.
Ключевым моментом является агрегация данных из разных сервисов. AIOps-платформы традиционно собирают данные со всего стека (серверы, БД, микросервисы, облако) и унифицируют их для сквозного анализа
bigpanda.io
eyer.ai
. GoAI Timeline также «ломает силосы» данных: логи и метрики разных компонентов объединяются в одно хранилище для обнаружения скрытых связей
bigpanda.io
eyer.ai
. Использование correlation_id в логах упрощает трассировку транзакций через систему
medium.com
.
Модуль анализа задействует ML/ИИ для обработки логов: распознаёт текстовые шаблоны и аномалии (алгоритмы анализа графиков, NLP, кластеризация)
eyer.ai
eyer.ai
. Система может применять библиотеку машинного обучения или внешние сервисы (например, GPT-семейства) для быстрой интерпретации сложных логов и чатов. Итоговый фронтенд будет выводить интерактивный график-временную шкалу, в котором инциденты и аномалии подсвечены и связаны по времени и корреляции.
План разработки
Примерный план работ по этапам:
Анализ требований и проектирование. Сбор требований от будущих пользователей (инженеры, аналитики), определение сценариев использования. Проектирование архитектуры системы, моделирование структуры таблицы globalEvents и прототип интерфейса временной шкалы.
Агрегация данных. Разработка бэкенда для получения и нормализации логов/алертов. Реализация механизма заполнения таблицы globalEvents, подключение источников (файловых, API чатов, систем мониторинга). Настройка передачи correlation_id и других метаданных
medium.com
.
Модуль аномалий и RCA. Реализация алгоритмов обнаружения аномалий (на основе исторических данных) и корреляции событий
eyer.ai
. Настройка ML-моделей или правил для оценки anomaly_percentage. Автоматизация вычисления причинно-следственных связей между событиями.
Фронтенд и визуализация. Создание интерфейса на Next.js/Tailwind/Shadcn UI. Компонент временной шкалы с интерактивной визуализацией: фильтрация по сервисам и времени, детализация событий по клику. Интеграция чатов и уведомлений в интерфейс (например, привязка сообщений Slack к точкам таймлайна).
Интеграция и тестирование. Подключение реальных систем мониторинга и чатов для сбора данных. Проведение юнит- и интеграционных тестов. Проведение пилотного запуска (Proof of Concept) с группой поддержки для проверки корректности обработки. По результатам доработка функций и показателей.
Релиз и итерации. Выпуск MVP, сбор обратной связи, планирование новых функций. Agile-подход с короткими спринтами (каждый 2–3 недели) позволит гибко улучшать продукт.
Команда и роли
Разработчики: фронтенд (Next.js), бэкенд (Node.js/Python), и, при необходимости, Data Scientist/ML-инженер для модуля анализа.
DevOps: настраивает CI/CD для автоматизированного развёртывания и масштабирования сервиса.
QA-инженеры: тестируют функциональность сбора логов, анализ, корректность визуализации.
Аналитики/эксперты: помогают формулировать правила детекции аномалий и корректно интерпретировать данные.
Product Owner / менеджер проекта: курирует разработку, согласует приоритеты и ресурсы.
Пользователи: инженеры поддержки и руководители проектов участвуют в тестировании, предоставляют требования и помогают оценивать результат.
Бизнес-процессы
GoAI Timeline вписывается в процессы управления инцидентами по ITIL/DevOps:
Обнаружение и загрузка. При возникновении сбоя операторы загружают в систему все доступные логи и чат-логи. GoAI Timeline автоматически нормализует данные и запускает анализ.
Визуализация и реакция. Система выдает готовую временную шкалу инцидента и список вероятных причин. Команда видит всю цепочку аномалий и принимает решение о восстановлении системы. Единая информация снижает риск недопониманий между отделами
atlassian.com
.
Постмортем и документация. После разрешения инцидента хронология сохраняется. Согласно Atlassian, подробная временная шкала «экономит часы» на постмортем-анализе, помогая ответить на вопросы “что случилось и почему”
atlassian.com
. Команда фиксирует найденную корневую причину и меры по её устранению – результат сохраняется в системе для будущих инцидентов.
Интеграция с ITSM. GoAI Timeline может синхронизироваться с системами управления инцидентами (Jira Service Management, ServiceNow и др.), автоматически создавая тикеты и связывая их с событиями на таймлайне. Это обеспечивает сквозной учёт работ по устранению проблемы.
Улучшение процесса. Со временем накопленные данные анализируются на предмет закономерностей. Сравнивая хронологии похожих инцидентов, команда выявляет узкие места в инфраструктуре и процессе, что позволяет оптимизировать мониторинг и оповещения
atlassian.com
.
Таким образом, GoAI Timeline ускоряет реакцию на аварии, устраняет «ручной анализ» данных и помогает формализовать процесс RCA. Это соответствует тенденциям быстрого роста рынка AIOps (прогнозируемый CAGR ~35% до 2027 года
eyer.ai
), где компании всё активнее используют ИИ для повышения надёжности ИТ-сервисов. Источники: ведущие эксперты в области управления инцидентами и AIOps подтверждают преимущества централизованного сбора событий, автоматической корреляции и хронологической визуализации для ускорения выявления первопричин и снижения простоев

## Features

- 🔐 **Google Authentication**: Secure sign-in with Google OAuth
- 🤖 **Multi-AI Provider Support**: Choose between Google Gemma 3b and Mistral Medium models
- 🎛️ **AI Provider Selection**: Easy switching between AI providers via sidebar dropdown
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
- **AI Integration**: OpenRouter API with multiple AI models (Google Gemma 3b, Mistral Medium)
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

The application supports multiple AI providers through OpenRouter API:

### Available AI Models
- **Google Gemma 3b**: `google/gemma-2-9b-it:free` (Free tier)
- **Mistral Medium**: `mistralai/mistral-medium` (Premium tier)

### API Endpoint
- **Base URL**: OpenRouter API (`https://openrouter.ai/api/v1/chat/completions`)
- **Features**: Streaming responses, temperature control, token limits
- **Provider Selection**: Users can switch between AI providers via the sidebar dropdown

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