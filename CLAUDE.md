# Project

## Project Structure

Turborepo monorepo with pnpm workspaces. Package scope: `@myapp/` (rename after cloning).

```
apps/
  api/        - NestJS 11 + GraphQL Code-First + BetterAuth (port 4000)
  dashboard/  - Next.js 15 + Mantine 8 + Apollo Client 4 (port 3000)
  pipeline/   - AWS Lambda handlers for Step Functions (tsup build)
packages/
  database/   - Drizzle ORM 0.45 + PostgreSQL schema + migrations
  storage/    - S3 utilities (@aws-sdk/client-s3)
  auth/       - BetterAuth 1.4 shared config
  eslint-config/    - Shared flat ESLint 9 configs
  typescript-config/ - Shared tsconfig files
infrastructure/
  terraform/  - Full AWS infra (VPC, RDS, ElastiCache, ECS, S3, Step Functions, EventBridge)
docker/       - PostgreSQL 16, Redis 7, Mailpit
```

## Commands

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all workspaces
- `pnpm typecheck` - Type check all workspaces
- `pnpm docker:up` - Start PostgreSQL, Redis, Mailpit
- `pnpm docker:down` - Stop Docker services
- `pnpm db:push` - Push schema to database
- `pnpm db:studio` - Open Drizzle Studio
- `pnpm test:e2e` - Run Playwright E2E tests

## Conventions

- **TypeScript** everywhere, strict mode enabled
- **ESM** for packages and pipeline, CJS for NestJS
- **Flat ESLint 9** configs with TypeScript and Prettier
- **GraphQL Code-First** approach with `@nestjs/graphql`
- **graphql-ws** for subscriptions (not subscriptions-transport-ws)
- **ioredis** direct (not cache-manager) for full pub/sub control
- **Two Redis connections** for pub/sub (Redis protocol requirement)
- **BetterAuth** for authentication, mounted at `/api/auth/*`
- **Drizzle ORM 0.45** (not v1 beta) for BetterAuth adapter compatibility
- **Apollo Client 4** with split link (HTTP + WS)
- **turbo prune --docker** for minimal Docker images

## Environment

- Node.js 22 LTS
- pnpm 10.x
- PostgreSQL 16
- Redis 7

## Auth Flow

1. BetterAuth server config in `@myapp/auth` package
2. API mounts auth at `/api/auth/*` via catch-all controller
3. Dashboard uses BetterAuth client for sign-in/sign-up/sign-out
4. GraphQL resolvers use `AuthGuard` + `@CurrentUser()` decorator
