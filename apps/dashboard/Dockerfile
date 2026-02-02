FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.6.0 --activate
RUN apk add --no-cache libc6-compat

FROM base AS pruner
WORKDIR /app
RUN pnpm add -g turbo
COPY . .
RUN turbo prune @myapp/dashboard --docker

FROM base AS installer
WORKDIR /app
COPY --from=pruner /app/out/json/ .
RUN pnpm install --frozen-lockfile
COPY --from=pruner /app/out/full/ .
RUN pnpm turbo build --filter=@myapp/dashboard

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
USER nextjs
COPY --from=installer --chown=nextjs:nodejs /app/apps/dashboard/public ./public
COPY --from=installer --chown=nextjs:nodejs /app/apps/dashboard/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/dashboard/.next/static ./.next/static
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
