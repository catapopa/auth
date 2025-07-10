FROM node:18-alpine

WORKDIR /app

# Copy package.json files for workspace setup
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY server/package*.json ./server/

# Install all dependencies using npm workspaces
RUN npm install

# Copy source code
COPY shared ./shared
COPY server ./server

# Build shared package
RUN npm run build --workspace=shared

# Build server
RUN npm run build --workspace=server

EXPOSE 3000

CMD ["npm", "run", "start:prod", "--workspace=server"]
