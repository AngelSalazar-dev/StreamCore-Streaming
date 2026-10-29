# Stream Core

Stream Core is a movie and TV shows discovery app built with the latest web technologies. Browse the catalog, search titles, watch official trailers, keep a personal library and see where each title is available on legal streaming services.

## Key Features

- **🌗 Light and Dark Mode**: adapts to your preference.
- **🧭 Discover Content**: trending, popular, now playing, upcoming and top rated lists.
- **🔎 Powerful Search**: find titles by name, actor or genre.
- **📂 Personal Library**: watchlist and history with a user account.
- **💻📱 Responsive UI**: works on desktop, tablet and mobile.
- **📲 Progressive Web App**: installable on any device.
- **🙍‍♂️ User Account**: Supabase auth with email (and optional Google OAuth).

## Technologies Used

- **Next.js App Router** (TypeScript)
- **Tailwind CSS 4**
- **HeroUI**
- **TanStack Query**
- **The Movie Database (TMDB) API**
- **Supabase** (auth + database)

## Getting Started

1. Clone the repository and install dependencies:

```
npm install
```

2. Copy the environment template and fill in your keys:

```
cp .env.local.example .env.local
```

You need a [TMDB access token](https://www.themoviedb.org/settings/api) and a [Supabase](https://supabase.com) project (URL + publishable/service keys). See `supabase/config.toml` and run the local stack with the `sb-*` scripts if you prefer self-hosting.

3. Start the development server:

```
npm run dev
```

4. Open `http://localhost:3000`.

## Project Structure

- `src/app` — App Router pages (home, discover, search, movie, tv, library, auth, about)
- `src/components` — UI and section components
- `src/api` / `src/actions` — TMDB client and server actions
- `src/utils`, `src/hooks`, `src/types` — shared utilities
- `supabase` — local config, migrations and email templates

## License

This project is a fork of [CINEXTMA](https://github.com/wisnuwirayuda15/cinextma) by Wisnu Wirayuda, licensed under the [MIT License](LICENSE). The original copyright notice is retained in `LICENSE`.
