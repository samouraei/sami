# FROM node:17-alpine3.13

# ENV PORT 8020
# # ARG NODE_ENV=sit
# # ENV NODE_ENV $NODE_ENV


# WORKDIR /app 
# COPY package.json /app
# # COPY yarn.lock /app
# # RUN yarn install s
# RUN npm install pm2 -g
# COPY . /app 
# #CMD npm start #develop 
# CMD pm2 start /app/server.js
# # RUN npm start /app/server.js

# # CMD pm2-runtime server.js
# # EXPOSE 8020




FROM node:16

# Create app directory
# WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . ./

CMD npm start ./server.js

EXPOSE 3000
CMD [ "node", "app.js" ]