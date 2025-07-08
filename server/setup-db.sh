#!/bin/bash

# Database Setup Script for Auth App

echo "Setting up PostgreSQL database for Auth App..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "PostgreSQL is not running. Please start PostgreSQL service first."
    echo "On macOS with Homebrew: brew services start postgresql"
    echo "On Ubuntu/Debian: sudo systemctl start postgresql"
    echo "Or use Docker: docker run --name postgres-auth -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres"
    exit 1
fi

echo "PostgreSQL is running!"

# Create database
echo "Creating database 'auth_db'..."
createdb auth_db -h localhost -U postgres 2>/dev/null || echo "Database might already exist, continuing..."

echo "Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Build the application: npm run build"
echo "2. Run migrations: npm run migration:run"
echo "3. Start the server: npm start"
