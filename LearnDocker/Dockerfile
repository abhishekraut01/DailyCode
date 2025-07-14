FROM node:22-alpine

WORKDIR /APP

COPY package.json .

RUN npm install

COPY  . .

EXPOSE 3000

CMD [ "node", "index.js" ]