FROM node:21.7

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]