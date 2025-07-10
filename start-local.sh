#!/bin/bash
# File: start-local.sh

echo "🔧 Installing dependencies..."
echo "📦 Installing shared package..."
cd shared && npm install && npm run build
cd ..

echo "📦 Installing server dependencies..."
cd server && npm install
cd ..

echo "📦 Installing client dependencies..."
cd client && npm install
cd ..

echo "🐘 Starting PostgreSQL..."
brew services start postgresql@15

echo "🗄️ Setting up database..."
cd server
npm run migration:run
cd ..

echo "🔧 Starting backend..."
cd server && npm run start:dev &

echo "🌐 Starting frontend..."
cd client && npm start &

echo "✅ Project running:"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:3000"
echo "API Docs: http://localhost:3000/api/docs"