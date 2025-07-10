#!/bin/bash
# File: start-local.sh

echo "Starting PostgreSQL..."
brew services start postgresql@15

echo "Starting backend..."
cd server && npm run start:dev &

echo "Starting frontend..."
cd client && npm start &

echo "✅ Project running:"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:3000"
echo "API Docs: http://localhost:3000/api/docs"