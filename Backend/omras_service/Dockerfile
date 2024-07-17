FROM node:alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json ./

COPY ./yarn.lock ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]