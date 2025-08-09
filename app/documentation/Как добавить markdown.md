# Как добавить Markdown в чат

Основное место для рендеринга сообщений — компонент `components/chat/message-bubble.tsx`.
Мы заменяем простой `<p>` на `ReactMarkdown` с `remark-gfm` и аккуратными классами Tailwind.

Ключевые моменты реализации:
- Импорты:
  ```tsx
  import ReactMarkdown from 'react-markdown';
  import remarkGfm from 'remark-gfm';
  ```
- Рендеринг (пример):
  ```tsx
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      a: ({ href, children }) => (
        <a href={href || ''} target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:decoration-solid">
          {children}
        </a>
      ),
    }}
    className={cn(
      'space-y-3',
      '[&_*]:break-words',
      '[&>p]:whitespace-pre-wrap',
      '[&>ul]:list-disc [&>ul]:pl-5',
      '[&>ol]:list-decimal [&>ol]:pl-5',
      '[&>h1]:text-lg [&>h1]:font-semibold',
      '[&>h2]:text-base [&>h2]:font-semibold',
      '[&>code]:bg-black/30 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded',
      '[&>pre]:bg-black/40 [&>pre]:p-3 [&>pre]:rounded-lg [&>pre]:overflow-auto'
    )}
  >{message.content}</ReactMarkdown>
  ```
- HTML по умолчанию не рендерится и это хорошо с точки зрения безопасности. При необходимости можно дополнительно настраивать разрешённые элементы/ссылки через rehype-плагины, но это требует строгой валидации.

## Безопасность
- Не рендерим сырой HTML из пользовательского ввода
- Ссылки открываем в новой вкладке через кастомный компонент ссылки в `ReactMarkdown` (`target="_blank"`, `rel="noopener noreferrer"`)
- При добавлении новых плагинов внимательно проверяйте XSS-поведение

## Стилизация
- Используем utility-классы Tailwind через `className` у `ReactMarkdown`
- Настроены базовые стили для списков, заголовков, инлайн-кода и блоков кода
- Цвета текста наследуются от пузыря сообщения (пользователь/ассистент/ошибка)

## Тестовые примеры
Отправьте в чат:
```markdown
# Заголовок H1
## Заголовок H2

Текст с **жирным**, *курсивом* и `inline code`.

- Список 1
- Список 2

1. Нумерация
2. Пункты

Таблица (GFM):

| Колонка A | Колонка B |
|----------:|:----------|
| 1         | текст     |
| 2         | **bold**  |

- [x] Чекбокс
- [ ] Не отмечен

Ссылка: https://example.com

Блок кода:
```ts
function hello(name: string) {
  return `Hello, ${name}!`;
}
```
```
Если все настроено верно, вы увидите отформатированный Markdown прямо в пузырях сообщений.

## Типичные проблемы
- «Cannot find module 'react-markdown'»: установите зависимости `pnpm add react-markdown remark-gfm`
- Стили «схлопнулись»: убедитесь, что классы Tailwind применены к `ReactMarkdown`, а контейнер пузыря не переопределяет `whitespace`
- Длинные строки «разъезжают» вёрстку: активирован `break-words` для предотвращения переполнения

## Где вносить изменения дальше
- Кастомизация рендеринга отдельных элементов (например, ссылки, изображения) — через проп `components` у `ReactMarkdown`
- Подсветка синтаксиса в блоках кода — добавить rehype-плагин (например, `rehype-prism-plus`), обязательно оценив влияние на бандл и безопасность

## Подсветка синтаксиса (Syntax Highlighting)
Чтобы включить подсветку кода в чат-сообщениях, используем `rehype-prism-plus` и темы из `prism-themes`.

### Установка
```bash
pnpm add rehype-prism-plus prism-themes
```

### Подключение
1) В `components/chat/message-bubble.tsx` импортируйте и добавьте плагин:
```tsx
import rehypePrism from 'rehype-prism-plus';

<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypePrism]}
>
  {message.content}
</ReactMarkdown>
```

2) Импортируйте тему Prism глобально (например, в `app/layout.tsx`):
```tsx
import 'prism-themes/themes/prism-vsc-dark-plus.css';
```

### Советы
- Для корректной подсветки указывайте язык в тройных кавычках: ```ts, ```js, ```bash и т.д.
- Тема выбирается импортом нужного CSS из `prism-themes/themes/*`. Можно заменить на любую другую из пакета.
- Если блоки кода слишком «плотные», добавьте кастомные отступы/скругления в Tailwind классах контейнера `pre` (см. уже добавленные утилити-классы в компоненте).
