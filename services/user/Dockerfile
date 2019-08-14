FROM node:8.12-alpine

WORKDIR /usr/src/app

COPY package*.json lerna.json ./
COPY packages/base-server ./packages/base-server
COPY packages/crypto ./packages/crypto
COPY services/user ./services/user
RUN npm install --loglevel notice --unsafe-perm

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "--prefix", "services/user", "start"]
