# syntax=docker/dockerfile:1

FROM node:24-alpine AS builder
WORKDIR /app

ARG NODE_ENV=production
ARG NUXT_PUBLIC_I18N_BASE_URL=https://sft.com
ARG NUXT_APP_CDN_URL=/
ARG NUXT_SITE_ENV=production
ARG NUXT_SITE_URL=https://sft.com
ARG NUXT_SITE_NAME=SFT
ARG NUXT_OG_IMAGE_SECRET=secret

ENV HUSKY=0
ENV NUXT_PUBLIC_I18N_BASE_URL=$NUXT_PUBLIC_I18N_BASE_URL \
    NUXT_APP_CDN_URL=$NUXT_APP_CDN_URL \
    NUXT_SITE_ENV=$NUXT_SITE_ENV \
    NUXT_SITE_URL=$NUXT_SITE_URL \
    NUXT_OG_IMAGE_SECRET=$NUXT_OG_IMAGE_SECRET \
    NUXT_SITE_NAME=$NUXT_SITE_NAME

RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN NODE_ENV=$NODE_ENV pnpm build

FROM node:24-alpine AS runtime
WORKDIR /app

ARG NODE_ENV=production
ARG NUXT_PUBLIC_I18N_BASE_URL=https://sft.com
ARG NUXT_APP_CDN_URL=/
ARG NUXT_SITE_ENV=production
ARG NUXT_SITE_URL=https://sft.com
ARG NUXT_SITE_NAME=SFT
ARG NUXT_OG_IMAGE_SECRET=secret

RUN apk add --no-cache curl

USER node

ENV NODE_ENV=$NODE_ENV \
    NUXT_PUBLIC_I18N_BASE_URL=$NUXT_PUBLIC_I18N_BASE_URL \
    NUXT_APP_CDN_URL=$NUXT_APP_CDN_URL \
    NUXT_SITE_ENV=$NUXT_SITE_ENV \
    NUXT_SITE_URL=$NUXT_SITE_URL \
    NUXT_SITE_NAME=$NUXT_SITE_NAME \
    NUXT_OG_IMAGE_SECRET=$NUXT_OG_IMAGE_SECRET \
    NITRO_PORT=3000 \
    NITRO_HOST=0.0.0.0

COPY --from=builder --chown=node:node /app/.output ./.output

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://127.0.0.1:$NITRO_PORT/ || exit 1

CMD ["node", ".output/server/index.mjs"]
