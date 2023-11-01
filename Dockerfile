FROM node:21-alpine3.17
WORKDIR /app
COPY package.json .
RUN npm install -g npm@latest
# RUN npm install vite --legacy-peer-deps
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD ["npm","run","dev"]