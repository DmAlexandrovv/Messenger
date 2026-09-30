# Telegram · GREEN-API

**🔗 Демо: [messenger-dusky-nine.vercel.app](https://messenger-dusky-nine.vercel.app/)**

Простой веб-чат для переписки в Telegram через [GREEN-API](https://green-api.com/).
Позволяет создать диалог по номеру телефона, отправлять и получать текстовые сообщения.

Приложение работает целиком в браузере: бэкенда нет, запросы уходят напрямую
в GREEN-API, а учётные данные инстанса хранятся только в `localStorage` вашего браузера.

## Стек

React 19 · TypeScript · Vite 6 · styled-components

## Локальный запуск

Нужен Node.js 20+.

```bash
git clone git@github.com:DmAlexandrovv/Messenger.git
cd Messenger
npm install
npm run dev
```

## Подключение к GREEN-API

При первом запуске приложение попросит заполнить три поля — все значения
берутся из личного кабинета [GREEN-API](https://console.green-api.com/):

| Поле        | Пример                      | Откуда взять                               |
| ----------- | --------------------------- | ------------------------------------------ |
| ID инстанса | `1101000001`                | карточка инстанса, поле `idInstance`       |
| Токен API   | `8asd8asd7321ek...`         | карточка инстанса, поле `apiTokenInstance` |
| Адрес API   | `https://api.green-api.com` | карточка инстанса, поле `apiUrl`           |

Инстанс должен быть авторизован и находиться в состоянии `authorized` —
иначе приложение покажет ошибку при сохранении настроек.

## Команды

| Команда                | Описание                            |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | дев-сервер с HMR                    |
| `npm run build`        | продакшен-сборка в `dist/`          |
| `npm run preview`      | локальный просмотр собранной версии |
| `npm run typecheck`    | проверка типов                      |
| `npm run format`       | форматирование через Prettier       |
| `npm run format:check` | проверка форматирования             |

## Деплой

Проект задеплоен на Vercel как статический сайт. Ручной деплой:

```bash
vercel --prod
```

Заголовки безопасности (CSP, `Referrer-Policy`, `X-Content-Type-Options`)
настраиваются в [`vercel.json`](./vercel.json). `connect-src` ограничен
доменами `*.green-api.com` — при переезде API на другой домен политику
нужно обновить, иначе запросы будут заблокированы браузером.
