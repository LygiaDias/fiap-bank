FROM node:20-alpine

WORKDIR /app

COPY shell/package*.json ./shell/

WORKDIR /app/shell

RUN npm install

COPY shell .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-p", "3000"]
