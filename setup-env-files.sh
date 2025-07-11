#!/bin/bash

# Environment Setup Script
# This script helps you create environment files from templates

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_success() {
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

echo "🔧 Environment Setup Script"
echo "==========================="
echo ""

# Function to create environment file from template
create_env_file() {
    local template_file="$1"
    local target_file="$2"
    local env_name="$3"
    
    if [[ ! -f "$template_file" ]]; then
        print_error "Template file $template_file not found"
        return 1
    fi
    
    if [[ -f "$target_file" ]]; then
        print_warning "$target_file already exists"
        read -p "Do you want to overwrite it? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Skipping $target_file"
            return 0
        fi
    fi
    
    cp "$template_file" "$target_file"
    print_success "Created $target_file from $template_file"
    print_info "Please edit $target_file and fill in your actual values"
}

# Create environment files
echo "Creating environment files from templates..."
echo ""

# Base .env file
create_env_file ".env.example" ".env" "base"

# Local environment
create_env_file ".env.local.example" ".env.local" "local"

# Development environment
create_env_file ".env.dev.example" ".env.dev" "development"

# Production environment
create_env_file ".env.prod.example" ".env.prod" "production"

echo ""
echo "🎯 Next Steps:"
echo "1. Edit each .env file and replace template values with your actual values"
echo "2. For local development, update .env.local with your PostgreSQL credentials"
echo "3. For production, use Railway's environment variables instead of .env.prod"
echo "4. Never commit the actual .env files to git (they're in .gitignore)"
echo ""
echo "📋 Important Notes:"
echo "- Generate secure JWT secrets (32+ characters)"
echo "- Use different secrets for each environment"
echo "- Keep production secrets secure and never commit them"
echo ""
echo "🔐 Generate a secure JWT secret:"
echo "node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
echo ""
echo "✅ Environment setup complete!"
