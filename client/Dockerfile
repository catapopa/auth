FROM node:18-alpine as builder

WORKDIR /app

# Copy shared package first
COPY ../shared ./shared
WORKDIR /app/shared
RUN npm install && npm run build

# Copy client package
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy client source
COPY . .

# Build client
RUN npm run build:prod

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
