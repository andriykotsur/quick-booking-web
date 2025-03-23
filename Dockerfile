FROM node:22-alpine AS base

FROM base AS deps

ARG tmp=/tmp/app

RUN apk add --no-cache libc6-compat

WORKDIR ${tmp}

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM base AS builder

ARG tmp=/tmp/app
ENV NODE_ENV=production

WORKDIR ${tmp}

COPY --from=deps ${tmp}/node_modules ${tmp}/node_modules
COPY . .

RUN npm run build

FROM nginx as runner

ARG tmp=/tmp/app
ENV root=/app

WORKDIR ${root}

COPY --from=builder ${tmp}/dist ${root}/
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
