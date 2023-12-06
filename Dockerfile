# Stage1 : Build the React application 
FROM node:21-alpine3.17

WORKDIR /app

COPY . .

RUN npm install 


# Stage2 : Serve the React application using Nginx
FROM nginx:1.16.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 3000


# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]
