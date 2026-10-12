# syntax=docker/dockerfile:1.7
FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm ci --include=dev --no-audit --no-fund

COPY . .

RUN npm run build

COPY --chown=node:node /.vercel ./.vercel

CMD ["npx", "playwright", "test"]
