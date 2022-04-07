FROM node:lts-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY ./server.js ./server.js
COPY ./src ./src

CMD node server.js
