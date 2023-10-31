FROM node:21-alpine3.17
WORKDIR /app
COPY package.json .
RUN npm cache clean -f
RUN npm install -g npm@latest --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]