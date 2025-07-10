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

# Debug: Show what was actually built
RUN echo "=== Build output ===" && ls -la dist/ && echo "=== Source directory ===" && ls -la dist/src/

EXPOSE 3000

# Debug environment variables at startup
CMD ["sh", "-c", "echo 'DATABASE_URL:' $DATABASE_URL && echo 'JWT_SECRET:' $JWT_SECRET && node dist/src/main.js"]