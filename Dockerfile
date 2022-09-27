FROM node:carbon-slim

# Create app directory
WORKDIR /UNcademy_ag

# Install app dependencies
COPY package.json /UNcademy_ag/
RUN npm install

# Bundle app source
COPY . /UNcademy_ag/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
