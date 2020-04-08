FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn
RUN yarn cache clean

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "node", "bin/server.js" ]