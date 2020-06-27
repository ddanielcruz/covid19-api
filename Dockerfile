FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.* ./

RUN yarn
RUN yarn cache clean

# Bundle app source
COPY . .

CMD [ "yarn", "start" ]
