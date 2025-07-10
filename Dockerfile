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

# Verify the build output
RUN ls -la dist/ && ls -la dist/

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
