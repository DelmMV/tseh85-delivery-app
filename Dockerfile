FROM node

WORKDIR /tseh85-app

COPY package.json /tseh85-app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
