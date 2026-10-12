FROM mcr.microsoft.com/playwright:v1.63.0-noble

ARG UID=1000
ARG GID=1000

RUN install -d -o "${UID}" -g "${GID}" /app

USER ${UID}:${GID}

WORKDIR /app

ENV NODE_ENV=production \
    HUSKY=0 \
    HOME=/app

COPY --chown=${UID}:${GID} package.json package-lock.json ./

RUN npm ci --include=dev --no-audit --no-fund

COPY --chown=${UID}:${GID} . .

RUN npm run build

CMD ["npx", "playwright", "test"]
