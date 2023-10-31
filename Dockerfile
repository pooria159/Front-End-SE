FROM node:21-alpine3.17
WORKDIR /app
COPY package.json .
RUN npm install -g npm@10.2.2
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]