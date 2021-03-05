FROM node:14
WORKDIR /usr/app/satheler-survey
COPY ./dist ./package.json yarn.lock ./
RUN yarn install --production=true

CMD [ "node", "dist/start/server.js" ]