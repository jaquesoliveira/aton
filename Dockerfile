# FROM node:10-alpine
# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
# WORKDIR /home/node/app
# COPY package*.json ./
# USER node
# RUN npm install
# COPY --chown=node:node . .
# EXPOSE 8080
# CMD [ "node", "app.js" ]

FROM node:18.16.0
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production
COPY . .
EXPOSE 80
CMD ["npm", "start"]