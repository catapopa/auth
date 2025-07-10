FROM node:18-alpine

WORKDIR /app

# Copy and build shared package
COPY shared ./shared
WORKDIR /app/shared
RUN npm install && npm run build

# Copy server files
WORKDIR /app
COPY server ./server

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Manually copy shared package to node_modules
RUN mkdir -p node_modules/@auth
RUN cp -r ../shared node_modules/@auth/shared

# Build server
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
