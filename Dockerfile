FROM node:12.10-alpine AS tester

WORKDIR /app

COPY package*.json .eslintrc.js bot.js ./
COPY test ./test
COPY features ./features

RUN npm install

RUN node ./node_modules/.bin/mocha

FROM node:12.10-alpine AS builder

WORKDIR /app

COPY --from=tester /root/.npm /root/.npm

COPY package*.json ./

RUN npm install --prod

FROM node:12.10-alpine

WORKDIR /app

RUN ln -s /app/env/.env /app/.env

COPY --from=builder /app/node_modules ./node_modules

COPY features ./features
COPY bot.js ./bot.js

ENTRYPOINT [ "node", "bot.js" ]