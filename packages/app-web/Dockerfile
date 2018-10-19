FROM node:8.12-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json lerna.json ./
COPY packages/app-web ./packages/app-web

RUN npm install --loglevel notice --unsafe-perm \
&&  npm --prefix packages/app-web run build

FROM nginx:1.14-alpine
COPY packages/app-web/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/packages/app-web/build /usr/share/nginx/html
EXPOSE 3000
