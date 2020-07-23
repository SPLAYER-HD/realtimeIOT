FROM node:12.18.2-alpine

RUN npm install pm2@4.4.0 -g

COPY . /home/app
WORKDIR /home/app

USER node

EXPOSE 8080
