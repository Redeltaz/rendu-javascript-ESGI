FROM node:18-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

FROM node:18-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM nginx:1.23-alpine

WORKDIR /app
COPY --from=builder /app/dist /usr/share/nginx/html

RUN apk add --no-cache openssl

RUN mkdir /etc/nginx/ssl
RUN openssl req -newkey \
                rsa:4096 \
                -x509 \
                -sha256 \
                -days 3650 \
                -nodes \
                -out /etc/nginx/ssl/cert.crt \
                -keyout /etc/nginx/ssl/cert.key \
                -subj "/C=FR/ST=Paris/L=Paris/O=ESGI/OU=Students/CN=www.rendu-javascript.com"

EXPOSE 80 443
