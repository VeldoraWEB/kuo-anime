# 🏯 KUO Anime 🏯

![KUO Anime](https://github.com/user-attachments/assets/d76b6e1c-6219-4f77-aa1f-092d2158bdbc)

Добро пожаловать в **KUO Anime** — современный, быстрый и полностью бесплатный аниме-портал. Проект создан с упором на чистый дизайн, высокую скорость работы и бесплатный просмотр.

[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)](https://supabase.com/)

---
### 🌚 Просмотр
[![Live Demo](https://img.shields.io/badge/🌐_KUO_ANIME-8B5CF6?style=for-the-badge)](https://veldoraweb.github.io/kuo-anime/)

---

## 🛠 Технологический стек

Проект написан с использованием **Feature-Sliced Design (FSD)** для максимальной масштабируемости и чистоты кода.

### Frontend
* **React 19** — современный UI и хуки.
* **TypeScript** — строгая типизация и надежность.
* **Vite** — молниеносная сборка и HMR.
* **Tailwind CSS 4** — утилитарная стилизация и плавные анимации.
* **React Router 7** — клиентский роутинг (SPA).
* **Lucide React** — красивые и легкие иконки.

### State & Data Fetching
* **TanStack Query** — кэширование серверного состояния, фоновое обновление.
* **Zustand** — легковесный стейт-менеджер для пользовательской сессии.

### Backend & Infrastructure
* **Supabase** — PostgreSQL база данных, Auth (авторизация), Edge Functions (кэширование метаданных AniLibria).
* **pg_trgm** — расширение PostgreSQL для быстрого и умного поиска по названиям (устойчив к опечаткам).
* **Cloudflare Workers** — Edge-прокси для стриминга видео, обхода CORS.
* **GitHub Pages** — хостинг проекта (с кастомным SPA-роутингом через `404.html`).

### Утилиты и оптимизация
* **Sharp** — конвертация постеров и аватаров в современный формат `.webp` для экономии трафика и скорости.
* **hls.js** — воспроизведение HLS-потоков в браузерах без нативной поддержки.
* **v0** — быстрая возможность генерировать качественную верстку.

---

## 📂 Архитектура проекта (FSD)

Проект структурирован по методологии **Feature-Sliced Design**, что обеспечивает строгое разделение ответственности и легкость масштабирования.

```text
src/
├── app/       # Инициализация приложения (провайдеры, роутинг)
├── pages/     # Страницы (Home, Watch, Profile..)
├── widgets/   # Крупные самостоятельные блоки (Header, Video-Player..)
├── features/  # Разнообразные фичи (Search, ToggleMyList, RateAnime..)
├── entities/  # Бизнес-сущности (Anime, User) и их UI-компоненты
└── shared/    # Переиспользуемый код (UI-кит, утилиты, API-клиенты, конфиги)
