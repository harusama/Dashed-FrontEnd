FROM node:8.9.4
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install && yarn cache clean