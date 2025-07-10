#!/bin/bash
# File: start-docker.sh

echo "Installing dependencies..."
echo "📦 Installing shared package..."
cd shared && npm install && npm run build
cd ..

echo "📦 Installing server dependencies..."
cd server && npm install
cd ..

echo "📦 Installing client dependencies..."
cd client && npm install
cd ..

echo "�🐳 Starting Docker PostgreSQL..."
docker-compose up -d

echo "⏳ Waiting for database to be ready..."
sleep 5

echo "🗄️ Setting up database..."
cd server
npm run migration:run
cd ..

echo "🔧 Starting backend..."
cd server && npm run start:dev &

echo "🌐 Starting frontend..."
cd client && npm start &

echo "✅ Project running with Docker:"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:3000"
echo "API Docs: http://localhost:3000/api/docs"
echo "Database: Docker container on port 5432"