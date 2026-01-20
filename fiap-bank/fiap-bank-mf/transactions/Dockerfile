FROM node:20-alpine

WORKDIR /app

COPY transactions/package*.json ./transactions/

WORKDIR /app/transactions

RUN npm install

COPY transactions .

EXPOSE 3001

CMD ["npm", "run", "dev", "--", "-p", "3001"]
