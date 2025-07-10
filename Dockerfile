FROM node:18-alpine

WORKDIR /app

# Copy shared package first
COPY shared ./shared
WORKDIR /app/shared
RUN npm install && npm run build

# Copy server files
WORKDIR /app
COPY server/package*.json ./
RUN npm install

# Copy server source
COPY server .

# Build server
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
