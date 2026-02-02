# Fullstack TypeScript Monorepo Template

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11-e0234e?logo=nestjs&logoColor=white)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Turborepo](https://img.shields.io/badge/Turborepo-2-0f0f0f?logo=turborepo&logoColor=white)](https://turbo.build/)
[![Terraform](https://img.shields.io/badge/Terraform-AWS-7b42bc?logo=terraform&logoColor=white)](https://www.terraform.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-ready, batteries-included **Turborepo monorepo starter** for building fullstack TypeScript applications with **NestJS**, **Next.js**, **GraphQL**, and **AWS infrastructure** — all wired together and ready to deploy.

> Skip weeks of boilerplate. Clone, rename, build.

---

## Why This Template?

- **Zero config to first request** — `pnpm install && pnpm docker:up && pnpm dev` gets you a running API + dashboard
- **Real auth out of the box** — BetterAuth with email/password, session management, and guard decorators
- **GraphQL subscriptions** — Real-time updates via `graphql-ws` with Redis pub/sub
- **Deploy-ready infrastructure** — Complete Terraform modules for VPC, RDS, ECS Fargate, S3, Step Functions, and more
- **Type-safe from database to UI** — Drizzle ORM schema flows through GraphQL resolvers to Apollo Client
- **Monorepo done right** — Shared packages for auth, database, storage, ESLint, and TypeScript configs

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Monorepo** | Turborepo 2, pnpm 10 workspaces |
| **API** | NestJS 11, GraphQL Code-First, graphql-ws subscriptions |
| **Frontend** | Next.js 15 (App Router), Mantine 8, Apollo Client 4 |
| **Auth** | BetterAuth 1.4 (email/password, social login ready) |
| **Database** | PostgreSQL 16, Drizzle ORM 0.45 |
| **Cache / PubSub** | Redis 7 via ioredis (dual connections for pub/sub) |
| **Pipeline** | AWS Step Functions + Lambda (tsup build) |
| **Storage** | S3 with presigned uploads |
| **Infrastructure** | Terraform (VPC, RDS, ElastiCache, ECS Fargate, ALB, EventBridge) |
| **CI/CD** | GitHub Actions with OIDC deployment |
| **Testing** | Playwright E2E |
| **Code Quality** | ESLint 9 flat config, Prettier, TypeScript strict mode |

## Project Structure

```
apps/
  api/              NestJS 11 · GraphQL · BetterAuth · Redis pub/sub
  dashboard/        Next.js 15 · Mantine 8 · Apollo Client 4
  pipeline/         AWS Lambda handlers for Step Functions
packages/
  database/         Drizzle ORM · PostgreSQL schema · migrations
  storage/          S3 utilities (@aws-sdk/client-s3)
  auth/             BetterAuth shared config (server + client)
  eslint-config/    Shared ESLint 9 flat configs
  typescript-config/ Shared tsconfig presets
infrastructure/
  terraform/        Full AWS infra (VPC, RDS, ECS, S3, Step Functions, EventBridge)
docker/             PostgreSQL 16, Redis 7, Mailpit
```

## Getting Started

### 1. Create from template

Click **"Use this template"** on GitHub, then clone your new repo.

### 2. Rename the project

Replace all `myapp` / `@myapp/` / `MyApp` placeholders with your project name:

```bash
# macOS
find . -type f \( -name '*.json' -o -name '*.ts' -o -name '*.tsx' -o -name '*.mjs' \
  -o -name '*.yml' -o -name '*.yaml' -o -name '*.md' -o -name '*.tf' \
  -o -name '*.example' -o -name '.env*' -o -name 'Dockerfile' \) \
  ! -path '*/node_modules/*' ! -path '*/.git/*' ! -name 'pnpm-lock.yaml' \
  -exec sed -i '' 's/@myapp\//@yourproject\//g; s/myapp/yourproject/g; s/MyApp/YourProject/g' {} +

# Linux
find . -type f \( -name '*.json' -o -name '*.ts' -o -name '*.tsx' -o -name '*.mjs' \
  -o -name '*.yml' -o -name '*.yaml' -o -name '*.md' -o -name '*.tf' \
  -o -name '*.example' -o -name '.env*' -o -name 'Dockerfile' \) \
  ! -path '*/node_modules/*' ! -path '*/.git/*' ! -name 'pnpm-lock.yaml' \
  -exec sed -i 's/@myapp\//@yourproject\//g; s/myapp/yourproject/g; s/MyApp/YourProject/g' {} +
```

### 3. Install and run

```bash
pnpm install          # Install dependencies
cp .env.example .env  # Configure environment
pnpm docker:up        # Start PostgreSQL, Redis, Mailpit
pnpm db:push          # Push database schema
pnpm dev              # Start all apps
```

- **API** — http://localhost:4000
- **GraphQL Playground** — http://localhost:4000/graphql
- **Dashboard** — http://localhost:3000
- **Mailpit UI** — http://localhost:8025

### Prerequisites

- [Node.js 22](https://nodejs.org/)
- [pnpm 10](https://pnpm.io/)
- [Docker](https://www.docker.com/)

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps and packages |
| `pnpm lint` | Lint all workspaces |
| `pnpm typecheck` | Type check all workspaces |
| `pnpm db:push` | Push Drizzle schema to PostgreSQL |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm docker:up` | Start PostgreSQL + Redis + Mailpit |
| `pnpm docker:down` | Stop Docker services |
| `pnpm test:e2e` | Run Playwright E2E tests |

## Infrastructure

### Local Development

Docker Compose provides:
- **PostgreSQL 16** on port 5432
- **Redis 7** on port 6379
- **Mailpit** SMTP on port 1025, UI on port 8025

### AWS (Terraform)

Production-grade AWS infrastructure defined in `infrastructure/terraform/`:

- VPC with public/private subnets across 3 AZs
- RDS PostgreSQL 16 (encrypted, automated backups)
- ElastiCache Redis 7 (encrypted, in-transit)
- ECS Fargate for API and Dashboard
- ALB with HTTPS and path-based routing
- Step Functions pipeline (Ingest → Process → Store → Notify)
- EventBridge for scheduled and event-driven triggers
- S3 for file storage with presigned uploads
- GitHub Actions OIDC for keyless deployments

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Dashboard  │────▶│   API        │────▶│  PostgreSQL   │
│   Next.js 15 │     │   NestJS 11  │     │  Drizzle ORM  │
│   Apollo     │◀────│   GraphQL    │     └──────────────┘
│   Client     │ ws  │   BetterAuth │────▶┌──────────────┐
└──────────────┘     └──────┬───────┘     │    Redis      │
                            │             │    pub/sub    │
                            ▼             └──────────────┘
                     ┌──────────────┐
                     │  S3 Storage  │
                     └──────────────┘
                            │
           ┌────────────────┼────────────────┐
           ▼                ▼                ▼
    ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
    │   Ingest    │ │   Process   │ │   Notify    │
    │   Lambda    │▶│   Lambda    │▶│   Lambda    │
    └─────────────┘ └─────────────┘ └─────────────┘
              Step Functions Pipeline
```

## Conventions

- TypeScript strict mode everywhere
- ESM for packages and pipeline, CJS for NestJS
- GraphQL Code-First with `@nestjs/graphql`
- Dual Redis connections for pub/sub (Redis protocol requirement)
- `turbo prune --docker` for minimal production images

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

[MIT](LICENSE)
