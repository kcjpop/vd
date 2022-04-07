FROM node:lts-alpine as builder

ADD https://github.com/benbjohnson/litestream/releases/download/v0.3.8/litestream-v0.3.8-linux-amd64-static.tar.gz /tmp/litestream.tar.gz
RUN tar -C /usr/local/bin -xzf /tmp/litestream.tar.gz

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY ./litestream.yml /etc/litestream.yml
COPY ./server.js ./server.js
COPY ./src ./src
COPY ./db ./db

ENTRYPOINT litestream replicate -exec "node server.js"
