# DEVELOPMENT BUILD 

FROM node:20.12.0-bookworm-slim AS development

RUN apt-get update && apt-get install -y procps

WORKDIR /usr/src/app
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .

# PRODUCTION BUILD

FROM node:20.12.0-bookworm-slim AS build

ARG NODE_ENV=production
ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app
COPY --chown=node:node --from=fetch /usr/src/app ./
RUN npm run build
USER node

# PRODUCTION IMAGE

FROM node:20.12.0-bookworm-slim AS production

ARG NODE_ENV=production
ENV NODE_ENV=${APP_ENV}

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json ./
#COPY --chown=node:node --from=build /usr/src/app/assets ./assets
USER node