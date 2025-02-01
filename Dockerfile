# Base image
FROM node:20-alpine as base

WORKDIR /app
RUN corepack enable

COPY package*.json ./
COPY ./pnpm-lock.yaml ./


# Build stage
FROM base as build
WORKDIR /app
# install package at this stage so no need to keep node modules in the final image
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build


# Prod Stage
FROM base as prod
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
WORKDIR /app
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]