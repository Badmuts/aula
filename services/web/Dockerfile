FROM node:10

WORKDIR /usr/src/app

COPY services/web .
RUN npm install --loglevel notice --unsafe-perm && \
    npm run build

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "start"]
