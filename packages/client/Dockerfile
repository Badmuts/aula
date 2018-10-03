FROM node:8.12-alpine AS builder
WORKDIR /app
COPY package*.json lerna.json ./
COPY packages/client ./packages/client
RUN npm install --loglevel notice --unsafe-perm \
&&  npm --prefix packages/client run build

FROM nginx:1.14-alpine
COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/packages/client/build /usr/share/nginx/html
