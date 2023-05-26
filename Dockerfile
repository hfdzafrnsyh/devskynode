FROM node:16.20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g sequelize-cli

COPY . .


EXPOSE 3030

CMD ["npm" , "start"]

# RUN npm start


