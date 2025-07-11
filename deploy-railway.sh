#!/bin/bash

# Railway Web Deployment Validation Script
# This script validates your setup for Railway web deployment

set -e

echo "🚀 Railway Web Deployment Validation"
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️ $1${NC}"
}

print_info "This script validates your files for Railway web deployment"
print_info "You'll deploy through the Railway dashboard at: https://railway.app"

echo ""
echo "🔧 Pre-deployment checks..."

# Check if required files exist
required_files=(
    "railway.toml"
    "Dockerfile"
    "client/Dockerfile"
    "client/nginx.conf"
    "client/src/environments/environment.prod.ts"
)

for file in "${required_files[@]}"; do
    if [[ -f "$file" ]]; then
        print_status "Found $file"
    else
        print_error "Missing required file: $file"
        exit 1
    fi
done

# Check if environment templates exist
print_info "Checking if environment files are properly configured..."
env_files=(".env" ".env.local" ".env.dev" ".env.prod")
for env_file in "${env_files[@]}"; do
    if [[ -f "$env_file" ]]; then
        print_status "Found $env_file"
    else
        print_error "Missing $env_file - run setup-env.sh to create it"
    fi
done

echo ""
echo "🎯 Railway Web Deployment Steps:"
echo "1. Go to https://railway.app and login"
echo "2. Click 'New Project' → 'Deploy from GitHub repo'"
echo "3. Select this repository"
echo "4. Railway will detect your railway.toml and create 2 services:"
echo "   - auth-backend (from root directory)"
echo "   - auth-frontend (from client directory)"
echo "5. Add PostgreSQL database addon"
echo "6. Set environment variables (see below)"
echo "7. Deploy!"
echo ""
echo "📋 Required Railway Environment Variables:"
echo ""
echo "🔧 Backend Service (auth-backend):"
echo "- DATABASE_URL (automatically provided by PostgreSQL addon)"
echo "- JWT_SECRET (generate a secure random string, 32+ characters)"
echo "- JWT_EXPIRES_IN (default: 24h)"
echo "- CLIENT_URL (your frontend Railway URL after deployment)"
echo "- CORS_ORIGINS (your frontend Railway URL after deployment)"
echo ""
echo "🌐 Frontend Service (auth-frontend):"
echo "- API_URL (your backend Railway URL after deployment)"
echo ""
echo "� Tips:"
echo "1. Deploy backend first, then use its URL for frontend API_URL"
echo "2. After frontend deploys, update backend with frontend URLs"
echo "3. Check deployment logs if services fail to start"
echo "4. Test login with: admin@example.com / Admin@2024#Secure!"
echo ""
echo "� Railway Dashboard: https://railway.app/dashboard"
