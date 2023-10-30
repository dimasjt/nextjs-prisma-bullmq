FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

ENV NODE_ENV=development

EXPOSE 3000
