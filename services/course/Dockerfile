FROM node:8.12-alpine

WORKDIR /usr/src/app

COPY package*.json lerna.json ./
COPY packages/base-server ./packages/base-server
COPY services/course ./services/course
RUN npm install --loglevel notice --unsafe-perm

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "--prefix", "services/course", "start"]
