# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### Portfolio (`artifacts/portfolio`)
- **Type**: React + Vite (react-vite)
- **Preview path**: `/`
- **Purpose**: Personal portfolio website for Numan Nadaf
- **Tech**: React, Vite, Tailwind CSS, Framer Motion, react-icons
- **Sections**: Loading Screen, Navbar, Hero (with profile photo), About, Experience, Projects, Tech Stack, AI Section, Ventures, Stats, Contact, Footer
- **Design**: Dark futuristic — black + neon purple + electric blue, glassmorphism, Orbitron font

### API Server (`artifacts/api-server`)
- **Type**: Express 5 backend
- **Preview path**: `/api`

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
