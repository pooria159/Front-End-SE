# Stage1 : Build the React application 
FROM node:21-alpine3.17 AS build

WORKDIR /app

COPY package*.json .

RUN npm install --legecy-peer-deps

COPY . .

RUN npm run build

# Stage2 : Serve the React application using Nginx
FROM nginx:1.16.0-alpine

COPY --from=build /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

#RUN apk update

#RUN apk add openssl

COPY nginx/nginx.conf /etc/nginx/conf.d

COPY ./trekdestiny_certificate.pem /etc/ssl

COPY ./trekdestiny_key.key /etc/ssl

EXPOSE 443

# Start NGINX when the container runs
CMD ["nginx", "-g", "daemon off;"]

