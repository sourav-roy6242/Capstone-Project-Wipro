# Stage 1: Build Angular app
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install


COPY . .

RUN npx ng build --configuration production

FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*


COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
