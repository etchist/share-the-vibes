# Share the Vibes

Welcome to **Share the Vibes** — a small, open-source project for sharing stories about the highs and lows of "vibe coding." Whether a burst of inspiration saved your project or a reckless refactor led to disaster, this is a place to share, learn, and laugh (or cry) together.

## What is Vibe Coding?

"Vibe coding" is when you code by intuition, flow, or gut feeling—sometimes it leads to breakthroughs, sometimes to bugs. Here, you can submit your stories about how vibe coding either saved the day or caused chaos.

## Tech Stack

- **Monorepo:** Managed with [Nx](https://nx.dev/) for structure and tooling
- **Frontend:** React (with Vite for fast builds and Mantine for UI)
- **Backend:** Supabase (database, authentication, backend functions)
- **Database:** SQLite (via Prisma ORM) for local development
- **Auth & Storage:** Supabase (for authentication and backend functions)
- **TypeScript:** End-to-end type safety
- **Testing:** Vitest (unit/integration)
- **Package Management:** pnpm

> **Note:** No secrets or sensitive keys are stored in this repository. All environment variables and credentials are managed locally and excluded from version control. See below for our gitignore policy.

## Contributing

We welcome contributions! Please:

- Share your stories (anonymously or not)
- Submit bug reports or feature requests
- Respect the code of conduct and keep things positive

## Git Ignore Policy

This repository is public. To protect secrets and local artifacts, the following are ignored:

- **Build output, dependencies, IDE/editor files, system files, Nx/cache, test/coverage, logs**
- **Prisma generated client code** (`**/prisma/generated/`)
- **Local SQLite DBs** (`**/prisma/dev.db`)
- **Supabase CLI artifacts** (`**/supabase/.env`, `**/supabase/.temp`, `**/supabase/.supabase`)
- **All environment files except example** (`.env.*`, `!.env.example`)

If you need to add environment variables for local development, use a `.env` or `.env.local` file, but never commit secrets. Provide a `.env.example` for documentation.

---

*Happy coding, and may your vibes be ever in your favor!*
