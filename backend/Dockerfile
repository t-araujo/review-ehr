FROM node:slim

EXPOSE 4000

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD DEBUG=app node /app/src
