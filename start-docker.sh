#!/bin/bash
# File: start-docker.sh

echo "🐳 Starting Docker PostgreSQL..."
docker-compose up -d

echo "⏳ Waiting for database to be ready..."
sleep 3

echo "🔧 Starting backend..."
cd server && npm run start:dev &

echo "🌐 Starting frontend..."
cd client && npm start &

echo "✅ Project running with Docker:"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:3000"
echo "API Docs: http://localhost:3000/api/docs"
echo "Database: Docker container on port 5432"