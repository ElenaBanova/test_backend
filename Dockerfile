FROM node:22-alpine

LABEL maintainer="Olena Banova"

RUN mkdir /app
WORKDIR /app

COPY ./backend/package.json .

RUN npm i
