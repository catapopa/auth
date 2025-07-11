# Multi-stage build for Angular application
FROM node:18-alpine AS builder

# Build arguments
ARG API_URL=https://your-api.railway.app
ARG CLIENT_URL=https://your-app.railway.app

# Set working directory
WORKDIR /app

# Copy shared package first
COPY shared ./shared
WORKDIR /app/shared
RUN npm install && npm run build

# Copy client package.json and install dependencies
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install

# Copy client source code
COPY client ./

# Build for production
RUN npm run build:prod

# Production stage - Use nginx to serve the app
FROM nginx:alpine

# Copy built app from builder stage
COPY --from=builder /app/client/dist/client/browser /usr/share/nginx/html

# Copy nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
