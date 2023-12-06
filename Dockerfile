# Stage1 : Build the React application 
FROM node:21-alpine3.17 AS build

WORKDIR /app

COPY . .

RUN npm install -g npm@latest
RUN npm install --force
RUN npm run build

# Stage2 : Serve the React application using Nginx
FROM nginx:1.16.0-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]

