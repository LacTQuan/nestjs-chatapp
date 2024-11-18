FROM node:18

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "yarn prisma generate && yarn prisma migrate deploy && yarn start"]