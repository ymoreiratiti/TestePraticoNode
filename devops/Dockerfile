FROM node:12.20.1

WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "start"]