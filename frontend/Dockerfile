FROM node:14.4.0-slim AS builder

WORKDIR /app

ADD package.json /app/package.json

RUN npm install

COPY . /app

RUN npm run build

RUN npm prune --production

FROM node:14.4.0-slim

WORKDIR /app

COPY --from=builder /app .

RUN npm -g install serve

EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "/app/build"]
