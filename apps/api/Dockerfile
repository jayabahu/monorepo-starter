FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.6.0 --activate
RUN apk add --no-cache libc6-compat

FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @myapp/api --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@myapp/api

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nestjs
USER nestjs
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/dist ./dist
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/package.json ./
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/main"]
