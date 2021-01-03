FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app

# Install required packages
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Setup port
EXPOSE 8000

# Running command
CMD [ "node", "index.js" ]