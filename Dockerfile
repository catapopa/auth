FROM node:18-alpine

WORKDIR /app

# Copy and build shared package first
COPY shared ./shared
WORKDIR /app/shared
RUN npm install && npm run build

# Copy and build server
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install

# Copy server source
COPY server ./

# Build server
RUN npm run build

# Note: Environment variables are provided by Railway, not files
# No need to copy .env files in production

EXPOSE 3000

# Start the server
CMD ["node", "dist/src/main.js"]