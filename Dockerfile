FROM node:10
ARG SERVICE
WORKDIR /usr/src/app

COPY --chown=node:node package*.json lerna.json ./
COPY --chown=node:node packages/ ./packages
COPY --chown=node:node services/${SERVICE} ./services/${SERVICE}
RUN npm install --loglevel notice --unsafe-perm

ENV NODE_ENV=production \
    PORT=3000 \
    SERVICE_NAME=${SERVICE}

# HEALTHCHECK --interval=30s \
#     --timeout=2s \
#     --retries=10 \
#     CMD node services/${SERVICE}/healthcheck.js

EXPOSE 3000
CMD ["npm", "--prefix", "services/${SERVICE}", "start"]
